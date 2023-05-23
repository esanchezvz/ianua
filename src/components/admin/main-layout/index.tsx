'use client'

import { useState } from 'react'

import Header from './header'
import Navigation from './navigation'

type MainLayoutProps = {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <Navigation setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

      <div className="lg:pl-72">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="min-h-[calc(100vh-65px)] bg-[#fff] py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  )
}
