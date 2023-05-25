import { Role } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

import { getSession } from '@/core/auth'
import { db } from '@/core/db'
import { createListingSchema } from '@/core/validations/listing'
import { uploadListingImage } from '@/lib/supabase'

const allowedRoles: (Role | null)[] = [Role.ADMIN, Role.SUPER_ADMIN]

export async function POST(req: NextRequest) {
  // TODO - validate captcha
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await req.formData()
  const data = (formData.get('data') as string) || ''
  const parsedData = JSON.parse(data)
  const galleryBlobs = formData.getAll('gallery')
  const galleryKeys = galleryBlobs.map((blob: any) => {
    const extension = '.' + blob.name.split('.')[1]
    return uuidv4() + extension
  })

  const listingData = createListingSchema.parse(parsedData)

  try {
    if (!allowedRoles.includes(session.user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const createdListing = await db.listing.create({
      data: {
        ...listingData,
        data: {
          gallery_keys: galleryKeys,
        },
        broker: {
          connect: {
            id: listingData.broker,
          },
        },
      },
    })

    const galleryUploads = galleryBlobs.map(
      async (blob: any, i) =>
        await uploadListingImage(blob, { path: `${createdListing.id}/${galleryKeys[i]}` })
    )

    await Promise.all(galleryUploads)

    return NextResponse.json(
      { message: 'Listing created successfully.', data: createdListing },
      { status: 203 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}

export async function GET() {
  const listings = await db.listing.findMany({
    select: {
      id: true,
      name: true,
      data: true,
    },
  })

  return NextResponse.json({ message: 'Listings fetched successfuly', data: listings }, { status: 200 })
}
