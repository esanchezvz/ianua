import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'

import { authOptions } from '@/core/auth'
import { verifyCaptcha } from '@/lib/firebase-admin'

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const captcha = req.cookies.captcha ?? ''

    const { token } = await verifyCaptcha(captcha)

    if (!token) {
      return res.status(400).json({ message: 'Failed captcha validation' })
    }
  }

  return await NextAuth(req, res, authOptions)
}
