import { Listing, Role } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import { getSession } from '@/core/auth'
import { db } from '@/core/db'
import { createListingSchema } from '@/core/validations/listing'
import { PopulatedListing } from '@/types/listing'

const allowedRoles: (Role | null)[] = [Role.ADMIN, Role.SUPER_ADMIN, Role.BROKER]

export async function POST(req: NextRequest) {
  // TODO - validate captcha
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await req.formData()
  const data = (formData.get('data') as string) || ''
  const parsedData = JSON.parse(data)

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

  const where = Object.fromEntries(params.entries())
  const includes = where.includes?.split(',')
  const search = where.search

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
