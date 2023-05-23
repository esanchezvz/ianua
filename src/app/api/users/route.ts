import { Role } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import { getSession } from '@/core/auth'
import { db } from '@/core/db'

const allowedRoles: (Role | null)[] = [Role.ADMIN, Role.SUPER_ADMIN]

export async function POST(req: NextRequest) {
  const data = await req.json()

  try {
    // TODO - validate captcha
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' })
    }

    if (!allowedRoles.includes(session.user.role) || !req.body) {
      return NextResponse.json({ error: 'Forbidden' })
    }

    const createdUser = await db.user.create({ data: data })

    return NextResponse.json({ message: 'User created successfully.', data: createdUser })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: (error as any).message || 'Unknown Error' })
  }
}
