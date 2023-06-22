import AboutUs from '@/components/mkt/home/about'
import CallToAction from '@/components/mkt/home/call-to-action'
import Contact from '@/components/mkt/home/contact'
import FeaturedListings from '@/components/mkt/home/featured-listings'
import Hero from '@/components/mkt/home/hero'
import Services from '@/components/mkt/home/services'

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <AboutUs />
        <Services />
        <CallToAction />
        <FeaturedListings />
        <Contact />
      </main>
    </>
  )
}
