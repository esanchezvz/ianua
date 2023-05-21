import AboutUs from '@/components/mkt/home/about'
import CallToAction from '@/components/mkt/home/call-to-action'
import Contact from '@/components/mkt/home/contact'
import FeaturedListings from '@/components/mkt/home/featured-listings'
import Hero from '@/components/mkt/home/hero'
import Reviews from '@/components/mkt/home/reviews'
import Services from '@/components/mkt/home/services'
import { useCaptcha } from '@/context/captcha'
import { listings } from '@/utils/mock-data'

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <AboutUs />
        <Services />
        <CallToAction />
        <FeaturedListings listings={listings.slice(0, 4)} />
        <Reviews />
        <Contact />
      </main>
    </>
  )
}
