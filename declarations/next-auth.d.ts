import { Role } from '@prisma/client'
import NextAuth from 'next-auth'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      broker_id?: string
      email_verified: Date | null
      email: string | null
      id: string | null
      image: string | null
      name: string | null
      role: Role | null
      surnames: string | null
    }
  }

  interface User {
    broker_id?: string
    email_verified: Date | null
    email: string | null
    image: string | null
    name: string | null
    role: Role | null
    surnames: string | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    broker_id?: string
    email_verified: Date | null
    email: string | null
    id: string | null
    name: string | null
    picture: string | null
    role: Role | null
    surnames: string | null
  }
}

declare module 'next-auth/react' {
  interface Session extends DefaultSession {
    user: {
      broker_id?: string
      email_verified: Date | null
      email: string | null
      id: string | null
      image: string | null
      name: string | null
      role: Role | null
      surnames: string | null
    }
  }
}
