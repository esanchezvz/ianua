import '@fortawesome/fontawesome-svg-core/styles.css'

import { config } from '@fortawesome/fontawesome-svg-core'

import Footer from '@/components/mkt/footer'
import { Header } from '@/components/mkt/header'

config.autoAddCss = false

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="z-1 bg-white">{children}</div>
      <Footer />
    </>
  )
}
