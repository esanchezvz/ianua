import CallToAction from '@/components/mkt/home/call-to-action'
import Contact from '@/components/mkt/home/contact'
import FeaturedListings from '@/components/mkt/home/featured-listings'
import Hero from '@/components/mkt/home/hero'
import Reviews from '@/components/mkt/home/reviews'
import Services from '@/components/mkt/home/services'
import Logo from '@/components/ui/logo'
import { listings } from '@/utils/mock-data'

export default function Home() {
  return (
    <main>
      <Logo letters />
      <Hero />
      <Services />
      <CallToAction />
      <FeaturedListings listings={listings.slice(0, 6)} />
      <Reviews />
      <Contact />
    </main>
  )
}
