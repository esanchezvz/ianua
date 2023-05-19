export const metadata = {
  title: 'IANUA',
  description: 'Descripción para SEO',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>
}
