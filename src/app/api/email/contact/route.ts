import { NextRequest, NextResponse } from 'next/server'

import { sendContactEmail } from '@/email/utils/send'
import { verifyCaptcha } from '@/lib/firebase-admin'

type ContactData = { name: string; surnames: string; phone: string; email: string; message: string }

export async function POST(req: NextRequest) {
  try {
    const captcha = req.cookies.get('captcha')

    const { token } = await verifyCaptcha(captcha?.value ?? '')

    if (!token) {
      return NextResponse.json({ message: 'Failed captcha validation' }, { status: 400 })
    }

    const body: ContactData = await req.json()

    await sendContactEmail(body)

    return NextResponse.json({ message: 'Contact email sent.' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}
