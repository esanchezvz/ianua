import { ListingStatus, Role } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import { getSession } from '@/core/auth'
import { db } from '@/core/db'
import { updateListingSchema } from '@/core/validations/listing'
import { verifyCaptcha } from '@/lib/firebase-admin'

const editAllowed: (Role | null)[] = [Role.ADMIN, Role.SUPER_ADMIN, Role.BROKER]
const publishRoles: (Role | null)[] = [Role.ADMIN, Role.SUPER_ADMIN]

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const captcha = req.cookies.get('captcha')

  const { token } = await verifyCaptcha(captcha?.value ?? '')

  if (!token) {
    return NextResponse.json({ message: 'Failed captcha validation' }, { status: 400 })
  }

  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!editAllowed.includes(session.user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const formData = await req.formData()
  const data = (formData.get('data') as string) || ''
  const listingData = JSON.parse(data) ?? {}

  const parsedData = updateListingSchema.partial().parse(listingData)

  if (listingData.status !== ListingStatus.PENDING && !publishRoles.includes(session.user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const listing = await db.listing.findUnique({ where: { id: params.id } })
    const broker = await db.broker.findUnique({
      where: {
        userId: session.user.id || '',
      },
    })

    if (session.user.role === Role.BROKER && !broker) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    if (session.user.role === Role.BROKER && broker?.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    if (!listing || !params.id) {
      return NextResponse.json({ error: 'Bad Request' }, { status: 404 })
    }

    await db.listing.update({
      where: {
        id: params.id,
      },
      data: {
        ...parsedData,
        address: {
          ...((listing?.address as Record<string, string>) ?? {}),
          ...((parsedData?.address as Record<string, string>) ?? {}),
        },
        data: {
          ...((listing?.data as Record<string, string>) ?? {}),
          ...(parsedData?.data ?? {}),
        },
      },
    })

    return NextResponse.json(
      { message: 'Listing created successfully.', data: { id: params.id } },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const listing = await db.listing.findUnique({ where: { id: params.id } })

  return NextResponse.json({ message: 'Listing fetched successfully.', data: listing }, { status: 200 })
}
