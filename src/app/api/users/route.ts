import { Role } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import { getSession } from '@/core/auth'
import { db } from '@/core/db'
import { createUserSchema } from '@/core/validations/user'

const allowedRoles: (Role | null)[] = [Role.ADMIN, Role.SUPER_ADMIN]
const exceptUser: (Role | null)[] = [Role.ADMIN, Role.SUPER_ADMIN, Role.BROKER]

export async function POST(req: NextRequest) {
  const body = await req.json()
  const data = createUserSchema.parse(body)

  try {
    // TODO - validate captcha
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!allowedRoles.includes(session.user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const createdUser = await db.user.create({ data })

    if (createdUser.role === Role.BROKER) {
      await db.broker.create({
        data: {
          userId: createdUser.id,
        },
      })
    }

    return NextResponse.json({ message: 'User created successfully.', data: createdUser }, { status: 203 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}

export async function GET() {
  const session = await getSession()

  if (!session || !exceptUser.includes(session.user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      surname_1: true,
      surname_2: true,
      role: true,
    },
  })

  return NextResponse.json({ message: 'Users fetched successfuly', data: users }, { status: 200 })
}
