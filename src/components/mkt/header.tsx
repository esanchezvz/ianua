'use client'

import { useState } from 'react'

import { Bars3Icon } from '@heroicons/react/24/outline'
import { Role } from '@prisma/client'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useWindowScroll, useWindowSize } from 'react-use'

import { buttonVariants } from '@/components/ui/button'
import Drawer from '@/components/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Logo from '@/components/ui/logo'
import { cn } from '@/utils'

const navigation = [
  { name: 'Product', href: '/admin/users' },
  { name: 'Features', href: '/admin/users' },
  { name: 'Marketplace', href: '/admin/users' },
  { name: 'Company', href: '/admin/users' },
]

const darkLogoHeader = ['/perfilador', '/faq']

export function Header() {
  const pathname = usePathname() ?? ''
  const { data: sessionData } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [headerRef, setHeaderRef] = useState<HTMLElement | null>(null)
  const { y } = useWindowScroll()
  const { height } = useWindowSize()
  const isLightBg = y >= height / 2 || darkLogoHeader.includes(pathname)

  const headerHeight = headerRef?.clientHeight ?? 0

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const openMobileMenu = () => {
    setMobileMenuOpen(true)
  }

  return (
    <>
      <header
        className={clsx('sticky top-0 z-10 backdrop-blur transition ease-linear', {
          'bg-white/50': isLightBg,
        })}
        ref={setHeaderRef}
        style={{ marginBottom: -headerHeight ?? undefined }}
      >
        <div className="flex items-center justify-between px-5 py-3 md:px-10 lg:px-20">
          <div className="flex">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">IANUA</span>
              <Logo letters variant={isLightBg ? 'default' : 'light'} />
            </Link>
          </div>

          <nav
            className={cn('hidden gap-10 md:flex', {
              'text-white': !isLightBg,
            })}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button>Servicios</button>
              </DropdownMenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Créditos Hipotecarios</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Asesoría Legal</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Paquete de Asistencias</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenu>
            <Link href="/perfilador">Perfilador</Link>
            {sessionData?.user ? (
              <Link href={sessionData.user.role === Role.USER ? '/perfil' : '/admin/profile'}>Perfil</Link>
            ) : (
              <Link href="/login">Iniciar Sesión</Link>
            )}
          </nav>

          <div className="flex gap-20 md:hidden">
            <div className="flex">
              <button
                type="button"
                className="text-brandOrange -m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
                onClick={openMobileMenu}
              >
                <span className="sr-only">Abrir menu de navegación</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <Drawer onClose={closeMobileMenu} opened={mobileMenuOpen}>
        <Link href="/" className="absolute left-0 top-0 mb-10 ml-5 mt-2">
          <span className="sr-only">IANUA</span>
          <Logo letters />
        </Link>

        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50/40"
                  onClick={closeMobileMenu}
                >
                  {item.name}
                </Link>
              ))}

              <Link href="/login" className={cn(buttonVariants())} onClick={closeMobileMenu}>
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  )
}
