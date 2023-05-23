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

    const createdUser = await db.user.create({ data })

    if (createdUser.role === Role.BROKER) {
      await db.broker.create({
        data: {
          userId: createdUser.id,
        },
      })
    }

    return new NextResponse(JSON.stringify({ message: 'User created successfully.', data: createdUser }), {
      status: 203,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error(error)
    return new NextResponse(JSON.stringify({ error: 'Unexpected error' }), { status: 500 })
  }
}
