import { Listing, ListingStatus, ListingType, PropertyType, Role } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import { getSession } from '@/core/auth'
import { db } from '@/core/db'
import { createListingSchema } from '@/core/validations/listing'
import { verifyCaptcha } from '@/lib/firebase-admin'

const allowedRoles: (Role | null)[] = [Role.ADMIN, Role.SUPER_ADMIN, Role.BROKER]

export async function POST(req: NextRequest) {
  const captcha = req.cookies.get('captcha')

  const { token } = await verifyCaptcha(captcha?.value ?? '')

  if (!token) {
    return NextResponse.json({ message: 'Failed captcha validation' }, { status: 400 })
  }

  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await req.formData()
  const data = (formData.get('data') as string) || ''

  const entries = Object.entries(JSON.parse(data) ?? {}).filter(([, value]) => {
    if (value === null || value === undefined) return false

    return true
  })

  const parsedData = Object.fromEntries(entries)

  const listingData = createListingSchema.parse(parsedData)

  const brokerid = listingData.broker

  try {
    if (!allowedRoles.includes(session.user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const createdListing = await db.listing.create({
      data: {
        ...listingData,
        broker: {
          connect: {
            id: brokerid,
          },
        },
      },
    })

    return NextResponse.json(
      { message: 'Listing created successfully.', data: createdListing },
      { status: 203 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const params = new URLSearchParams(req.url.split('?')[1])

  let where = Object.fromEntries(params.entries())
  const includes = where.includes?.split(',')
  const search = where.search
  const filtered = where.filtered

  const take = !where.limit ? 20 : parseInt(where.limit) > 500 ? 500 : parseInt(where.limit)
  const page = parseInt(where.page ?? 1)

  const hasPagination = !!where.page

  let count: number | undefined = undefined

  if (hasPagination) {
    count = await db.listing.count()
  }

  delete where.limit
  delete where.page
  delete where.includes
  delete where.search
  delete where.filtered

  const parsedEntries = Object.entries(where).map(([key, value]) => {
    if (value === 'true') return [key, true]
    if (value === 'false') return [key, false]

    return [key, value]
  })

  where = Object.fromEntries(parsedEntries)

  let listings: Listing[] = []

  if (search) {
    listings = await db.listing.findMany({
      where: {
        ...where,
        OR: [
          { name: { search } },
          {
            broker: {
              user: {
                OR: [
                  { name: { search } },
                  { surname_1: { search } },
                  { surname_2: { search } },
                  { email: { search } },
                ],
              },
            },
          },
        ],
      },
      take,
      skip: (page - 1) * take,
      include: {
        broker: includes?.includes('broker')
          ? {
              include: { user: true },
            }
          : undefined,
      },
    })
  } else if (filtered) {
    listings = await db.listing.findMany({
      where: {
        status: ListingStatus.PUBLISHED,
        price: where.price ? { lte: parseInt(where.price) } : undefined,
        address: where.locality
          ? {
              path: ['locality'],
              equals: where.locality as string,
            }
          : undefined,
        property_type: where.property_type_filter
          ? { has: where.property_type_filter as PropertyType }
          : undefined,
        type: where.type ? (where.type as ListingType) : undefined,
      },
      take,
      skip: (page - 1) * take,
    })
  } else {
    listings = await db.listing.findMany({
      where,
      take,
      skip: (page - 1) * take,
      include: {
        broker: includes?.includes('broker')
          ? {
              include: { user: true },
            }
          : undefined,
      },
    })
  }

  return NextResponse.json(
    { message: 'Listings fetched successfuly', data: listings, count },
    { status: 200 }
  )
}
