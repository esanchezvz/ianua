import '@/styles/main.css'
import 'focus-visible'

import { Roboto } from 'next/font/google'
import localFont from 'next/font/local'

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${roboto.variable} ${larisAlte.variable} h-min-screen antialiased`}>
      <body className="flex h-full flex-col">{children}</body>
    </html>
  )
}
