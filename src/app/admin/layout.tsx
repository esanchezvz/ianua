import MainLayout from '@/components/admin/main-layout'
import { getSession } from '@/core/auth'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  return <MainLayout session={session}>{children}</MainLayout>
}
