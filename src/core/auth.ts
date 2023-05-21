import { type NextAuthOptions, getServerSession } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'

import { db, dbAuthAdapter } from '@/core/db'
import { sendLoginEmail, sendWelcomeEmail } from '@/email/utils/send'

import { env } from './env'

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

        if (user?.emailVerified) await sendLoginEmail({ loginUrl: url, to: identifier })
        if (!user?.emailVerified) await sendWelcomeEmail({ registerUrl: url, to: identifier })
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.role = token.role
        session.user.email_verified = token.email_verified
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