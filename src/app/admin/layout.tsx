import { Role } from '@prisma/client'
import { notFound } from 'next/navigation'

import { getCurrentUser } from '@/core/auth'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()

  if (!user || user.role === Role.USER) return notFound()

  return <>{children}</>
}
