import NextAuth from 'next-auth'

import { authOptions } from '@/core/auth'

// @see ./src/core/auth
export default NextAuth(authOptions)
