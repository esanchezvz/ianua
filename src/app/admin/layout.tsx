import MainLayout from '@/components/admin/main-layout'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>
}
