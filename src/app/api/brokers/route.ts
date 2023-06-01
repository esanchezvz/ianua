import { NextResponse } from 'next/server'

import { db } from '@/core/db'

export async function GET() {
  const brokers = await db.broker.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          surname_1: true,
          surname_2: true,
        },
      },
    },
  })

  return NextResponse.json({ message: 'Brokers fetched successfuly', data: brokers }, { status: 200 })
}
