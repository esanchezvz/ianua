'use client'

import { useState } from 'react'

import { Role } from '@prisma/client'
import { Session } from 'next-auth'

import { cn } from '@/utils'

import Header from './header'
import Navigation from './navigation'

type MainLayoutProps = {
  children: React.ReactNode
  session: Session | null
}

export default function MainLayout({ children, session }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      {session?.user.role !== Role.BROKER ? (
        <Navigation setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      ) : null}

      <div
        className={cn({
          'lg:pl-72': session?.user.role !== Role.BROKER,
        })}
      >
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="min-h-[calc(100vh-65px)] bg-[#fff] py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  )
}
