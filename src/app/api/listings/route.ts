import { Listing, Role } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

import { getSession } from '@/core/auth'
import { db } from '@/core/db'
import { createListingSchema } from '@/core/validations/listing'
import { uploadListingImage } from '@/lib/supabase'

const allowedRoles: (Role | null)[] = [Role.ADMIN, Role.SUPER_ADMIN]

export async function POST(req: NextRequest) {
  const body = await req.formData()
  const galleryBlobs = body.getAll('gallery')
  const galleryKeys = galleryBlobs.map((blob: any) => {
    const extension = '.' + blob.name.split('.')[1]
    return uuidv4() + extension
  })
  body.delete('gallery')

  const listingData = createListingSchema.parse(Object.fromEntries(body))

  try {
    // TODO - validate captcha
    const session = await getSession()

    if (!session) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (!allowedRoles.includes(session.user.role)) {
      return new NextResponse(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      })
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

    return new NextResponse(
      JSON.stringify({ message: 'Listing created successfully.', data: createdListing }),
      {
        status: 203,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error(error)
    return new NextResponse(JSON.stringify({ error: 'Unexpected error' }), { status: 500 })
  }
}

export async function GET() {
  // TODO - add filters and fetch
  return await db.listing.count()
}
