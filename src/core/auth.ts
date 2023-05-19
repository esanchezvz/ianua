import { Role } from '@prisma/client'
import { type DefaultSession, type NextAuthOptions, getServerSession } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'

import { db, dbAuthAdapter } from '@/core/db'
import { sendLoginEmail, sendWelcomeEmail } from '@/email/utils/send'

import { env } from './env'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      role: Role
      name: string
      email: string
      email_verified: boolean
      image: string
    }
  }

  interface User {
    role: Role
    email_verified: boolean
    name: string
    email: string
    image: string
  }
}

export const authOptions: NextAuthOptions = {
  adapter: dbAuthAdapter,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  secret: env.NEXTAUTH_SECRET,
  providers: [
    EmailProvider({
      from: '',
      sendVerificationRequest: async ({ identifier, url }) => {
        const user = await db.user.findUnique({
          where: {
            email: identifier,
          },
          select: {
            emailVerified: true,
          },
        })

        // TODO validate captcha

        try {
          if (user?.emailVerified) await sendLoginEmail({ loginUrl: url, to: identifier })
          if (!user?.emailVerified) await sendWelcomeEmail({ registerUrl: url, to: identifier })
        } catch (error) {
          console.error(error)
          // throw new Error(body.message)
        }
      },
    }),
  ],
  callbacks: {
    async signIn(params) {
      console.log(params)
      return true
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.image = token.picture as string
        session.user.role = token.role as Role
        session.user.email_verified = token.email_verified as boolean
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        role: dbUser.role,
        email_verified: dbUser.emailVerified,
      }
    },
  },
}

export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions)

  if (!session) return null

  return session.user
}
