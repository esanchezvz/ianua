import { Role } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import { getSession } from '@/core/auth'
import { db } from '@/core/db'
import { createUserSchema } from '@/core/validations/user'

const allowedRoles: (Role | null)[] = [Role.ADMIN, Role.SUPER_ADMIN]

export async function POST(req: NextRequest) {
  const body = await req.json()
  const data = createUserSchema.parse(body)

  try {
    // TODO - validate captcha
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' })
    }

    if (!allowedRoles.includes(session.user.role)) {
      return NextResponse.json({ error: 'Forbidden' })
    }

    const createdUser = await db.user.create({ data })

    return NextResponse.json({ message: 'User created successfully.', data: createdUser })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: (error as any).message || 'Unknown Error' })
  }
}
