import { Role } from '@prisma/client'
import { redirect } from 'next/navigation'

import { getSession } from '@/core/auth'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()

  if (!session || session.user.role === Role.USER) return redirect('/login')

  return <>{children}</>
}
