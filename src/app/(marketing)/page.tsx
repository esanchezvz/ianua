import CallToAction from '@/components/mkt/home/call-to-action'
import Contact from '@/components/mkt/home/contact'
import Faqs from '@/components/mkt/home/faqs'
import Hero from '@/components/mkt/home/hero'
import Reviews from '@/components/mkt/home/reviews'
import Services from '@/components/mkt/home/services'
import Logo from '@/components/ui/logo'

export default function Home() {
  return (
    <main>
      <Logo letters />
      <Hero />
      <Services />
      <CallToAction />
      <Reviews />
      <Contact />
      <Faqs />
    </main>
  )
}
