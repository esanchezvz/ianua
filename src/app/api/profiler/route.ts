import { Listing, ListingStatus, ListingType, PropertyType } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { getSession } from 'next-auth/react'

import { db } from '@/core/db'
import { verifyCaptcha } from '@/lib/firebase-admin'

export async function POST(req: NextRequest) {
  const captcha = req.cookies.get('captcha')

  const { token } = await verifyCaptcha(captcha?.value ?? '')

  if (!token) {
    return NextResponse.json({ message: 'Failed captcha validation' }, { status: 400 })
  }

  // const session = await getSession()
  // if (!session) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // }

  const formData = await req.formData()
  const data = (formData.get('data') as string) || ''

  const entries = Object.entries(JSON.parse(data) ?? {}).filter(([, value]) => {
    if (value === null || value === undefined) return false

    return true
  })

  const parsedData = Object.fromEntries(entries)

  parsedData.price = (parsedData.price as string).replaceAll(',', '')

  let listings: Listing[] = []

  // TODO - include rest of profiler properties when more listings are available

  try {
    listings = await db.listing.findMany({
      where: {
        status: ListingStatus.PUBLISHED,
        price: { lte: parseInt(parsedData.price as string) },
        property_type: { has: parsedData.property_type as PropertyType },
        type: parsedData.type as ListingType,
        pet_friendly: parsedData.pet_friendly ? true : undefined,
        address: {
          path: ['locality'],
          equals: parsedData.locality as string,
        },
      },
      take: 6,
      skip: 0,
    })

    if (!listings?.length) {
      listings = await db.listing.findMany({
        where: {
          status: ListingStatus.PUBLISHED,
          price: { lte: parseInt(parsedData.price as string) },
          property_type: { has: parsedData.property_type as PropertyType },
          type: parsedData.type as ListingType,
        },
        take: 6,
        skip: 0,
      })
    }

    return NextResponse.json(
      { message: 'Profiler results fetched successfully.', data: listings },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Unexpected Error' }, { status: 500 })
  }
}
