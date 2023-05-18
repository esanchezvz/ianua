'use client'

import { Fragment, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { useWindowScroll, useWindowSize } from 'react-use'

import { Button } from '@/components/ui/button'
import Logo from '@/components/ui/logo'

const navigation = [
  { name: 'Product', href: '/admin/users' },
  { name: 'Features', href: '/admin/users' },
  { name: 'Marketplace', href: '/admin/users' },
  { name: 'Company', href: '/admin/users' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [headerRef, setHeaderRef] = useState<HTMLElement | null>(null)
  const { y } = useWindowScroll()
  const { height } = useWindowSize()
  const isLightBg = y >= height / 2

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

          <div className="flex gap-20">
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

      <Transition appear show={mobileMenuOpen} as={Fragment}>
        <Dialog static as="div" className="z-50" open={mobileMenuOpen} onClose={closeMobileMenu}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="bg-brandGreen/25 fixed inset-0 z-50 backdrop-blur-sm" aria-hidden="true" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="translate-x-96"
            enterTo="translate-x-0"
            leave="ease-in duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-96"
          >
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 flex w-full flex-col overflow-y-auto bg-white p-6 shadow-2xl ring-1 sm:max-w-sm sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">IANUA</span>
                  <Logo letters />
                </Link>

                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={closeMobileMenu}
                >
                  <span className="sr-only">Cerrar menu de navegación</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

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
                    <Button onClick={closeMobileMenu} type="button">
                      Iniciar Sesión
                    </Button>
                  </div>
                </div>
              </div>

              <Link
                href="/perfilador"
                className="bg-brandGreen hover:bg-brandGreen/80  focus-visible:outline-brandGreen  mt-auto rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={closeMobileMenu}
              >
                Deja que tu casa te encuentre
              </Link>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}
