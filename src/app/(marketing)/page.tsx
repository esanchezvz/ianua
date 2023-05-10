import { CallToAction } from './components/home/call-to-action'
import { Contact } from './components/home/contact'
import { Faqs } from './components/home/faqs'
import { Hero } from './components/home/hero'
import { Reviews } from './components/home/reviews'
import { Services } from './components/home/services'

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <CallToAction />
      <Reviews />
      <Contact />
      <Faqs />
    </main>
  )
}
