import { Role } from '@prisma/client'
import { Ratelimit } from '@upstash/ratelimit'
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'

import { env } from '@/core/env'
import { redis } from '@/lib/redis'

const isDevelopment = process.env.NODE_ENV === 'development'

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(10, '10s'),
})

// TODO - send welcome email after figuring out how to pass name from register screen to next auth
// db.$use(async (params, next) => {
//   const isUserCreate = params.model === 'User' && params.action === 'create'

//   const result = await next(params)

//   if (isUserCreate) {
//     await sendWelcomeEmail()
//   }
// })

export default withAuth(
  async function middleware(req, event) {
    const headers = new Headers(req.headers)
    const res = NextResponse.next({
      request: {
        headers,
      },
    })
    const token = await getToken({ req })
    const isAuth = !!token
    let from = req.nextUrl.pathname
    if (req.nextUrl.search) {
      from += req.nextUrl.search
    }

    const isApi = req.nextUrl.pathname.startsWith('/api')
    const isAdminPage = req.nextUrl.pathname.startsWith('/admin')
    const isLogin = req.nextUrl.pathname.startsWith('/login')
    const isRegister = req.nextUrl.pathname.startsWith('/registro')
    const isProfiler = req.nextUrl.pathname.startsWith('/perfilador')
    const isAuthPage = isLogin || isRegister

    // CORS
    if (!isDevelopment && isApi) {
      res.headers.append('Access-Control-Allow-Origin', env.NEXT_PUBLIC_APP_URL)
    }

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(
          new URL(token.role !== Role.USER ? '/admin/profile' : '/perfilador', req.url)
        )
      }

      return res
    }

    if (isAdminPage) {
      if (!isAuth) {
        return NextResponse.redirect(new URL(`/login?from=${encodeURIComponent(from)}`, req.url))
      }

      if (isAuth && token.role === Role.USER) {
        return NextResponse.redirect(new URL(`/login`, req.url))
      }

      if (isAuth && token.role === Role.BROKER && req.nextUrl.pathname !== '/admin/profile') {
        return NextResponse.redirect(new URL(`/admin/profile`, req.url))
      }
    }

    if (isProfiler) {
      if (!isAuth) {
        return NextResponse.redirect(new URL(`/login?from=${encodeURIComponent(from)}`, req.url))
      }
    }

    if (isApi && !isDevelopment) {
      const ip = req.ip ?? '127.0.0.1'
      const { success, pending, limit, reset, remaining } = await ratelimit.limit(
        `ratelimit_middleware_${ip}`
      )
      event.waitUntil(pending)

      const res = success ? NextResponse.next() : NextResponse.redirect(new URL('/api/blocked', req.url))

      res.headers.set('X-RateLimit-Limit', limit.toString())
      res.headers.set('X-RateLimit-Remaining', remaining.toString())
      res.headers.set('X-RateLimit-Reset', reset.toString())
      return res
    }

    return res
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*', '/login', '/registro', '/api/:path*', '/perfilador'],
}
