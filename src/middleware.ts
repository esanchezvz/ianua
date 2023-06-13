import { Role } from '@prisma/client'
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'

import { env } from '@/core/env'

const isDevelopment = process.env.NODE_ENV === 'development'

export default withAuth(
  async function middleware(req) {
    const headers = new Headers(req.headers)
    const res = NextResponse.next({
      request: {
        headers,
      },
    })
    const token = await getToken({ req })
    const isAuth = !!token

    const isAdminPage = req.nextUrl.pathname.startsWith('/admin')
    const isLogin = req.nextUrl.pathname.startsWith('/login')
    const isRegister = req.nextUrl.pathname.startsWith('/registro')
    const isAuthPage = isLogin || isRegister

    // CORS
    if (!isDevelopment && req.nextUrl.pathname.startsWith('/api')) {
      res.headers.append('Access-Control-Allow-Origin', env.NEXT_PUBLIC_APP_URL)
    }

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(
          new URL(token.role !== Role.USER ? '/admin/profile' : '/perfil', req.url)
        )
      }

      return res
    }

    if (isAdminPage) {
      if (!isAuth) {
        let from = req.nextUrl.pathname
        if (req.nextUrl.search) {
          from += req.nextUrl.search
        }

        return NextResponse.redirect(new URL(`/login?from=${encodeURIComponent(from)}`, req.url))
      }

      if (isAuth && token.role === Role.USER) {
        return NextResponse.redirect(new URL(`/login`, req.url))
      }

      if (isAuth && token.role === Role.BROKER && req.nextUrl.pathname !== '/admin/profile') {
        return NextResponse.redirect(new URL(`/admin/profile`, req.url))
      }
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
  matcher: ['/admin/:path*', '/login', '/registro', '/api/:path*'],
}
