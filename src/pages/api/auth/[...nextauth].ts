import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'

import { authOptions } from '@/core/auth'

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // TODO - validate captcha on post requests
  return await NextAuth(req, res, authOptions)
}
