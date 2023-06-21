import { NextRequest, NextResponse } from 'next/server'

import { getSession } from '@/core/auth'
import { db } from '@/core/db'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession()
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await db.user.findUnique({ where: { id: params.id }, include: { profile: true } })

    return NextResponse.json(
      {
        message: 'User fetched successfully.',
        data: user,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}
