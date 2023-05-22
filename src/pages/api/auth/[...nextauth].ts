import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'

import { authOptions } from '@/core/auth'

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // TODO validate captcha from cookies here
    const captcha = req.cookies.captcha
  }

  return await NextAuth(req, res, authOptions)
}
