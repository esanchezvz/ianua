import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { Role } from '@prisma/client'
import { DefaultSession, NextAuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'

import { db } from '@/core/db'
import { sendLoginEmail, sendWelcomeEmail } from '@/email/utils/send'

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
      image: string
    } & DefaultSession['user']
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
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    EmailProvider({
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

        if (user?.emailVerified) {
          const {
            body: { errors, message },
          } = await sendLoginEmail({ email: identifier }, { url })

          if (!!errors) {
            throw new Error(`[Mailersend:Login] - ${message}`)
          }
        }

        if (!user?.emailVerified) {
          const {
            body: { errors, message },
          } = await sendWelcomeEmail({ email: identifier }, { url })

          if (!!errors) {
            throw new Error(`[Mailersend:Welcome] - ${message}`)
          }
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.image = token.picture as string
        session.user.role = token.role as Role
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
