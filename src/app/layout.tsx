import '@/styles/main.css'
import 'focus-visible'

import { Roboto } from 'next/font/google'
import localFont from 'next/font/local'

import { Toaster } from '@/components/shared/toaster'
import { CapthaProvider } from '@/context/captcha'
import { CookiesProvider } from '@/context/cookies'
import { SessionProvider } from '@/context/session'
import { getSession } from '@/core/auth'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
  fallback: ['sans-serif'],
})

const larisAlte = localFont({ src: '../assets/fonts/LarishAlte-SemiBold.otf', variable: '--font-heading' })

export const metadata = {
  title: 'IANUA',
  description: 'Descripción para SEO',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()

  return (
    <html lang="es" className={`${roboto.variable} ${larisAlte.variable} h-min-screen antialiased`}>
      <body className="flex h-full flex-col">
        <SessionProvider session={session}>
          <CookiesProvider>
            <CapthaProvider>
              {children}
              <Toaster />
            </CapthaProvider>
          </CookiesProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
