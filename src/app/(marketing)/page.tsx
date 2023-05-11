'use client'
import { useState } from 'react'

import AboutUs from '@/components/mkt/home/about'
import CallToAction from '@/components/mkt/home/call-to-action'
import Contact from '@/components/mkt/home/contact'
import FeaturedListings from '@/components/mkt/home/featured-listings'
import Hero from '@/components/mkt/home/hero'
import Reviews from '@/components/mkt/home/reviews'
import Services from '@/components/mkt/home/services'
import Modal from '@/components/ui/modal'
import { listings } from '@/utils/mock-data'

export default function Home() {
  const [profilerModalOpen, setProfilerModalOpen] = useState(false)

  const openProfilerModal = () => {
    setProfilerModalOpen(true)
  }

  const closeProfilerModal = () => {
    setProfilerModalOpen(false)
  }

  return (
    <>
      <main className="bg-white">
        <Hero openProfilerModal={openProfilerModal} />
        <AboutUs />
        <Services />
        <CallToAction />
        <FeaturedListings listings={listings.slice(0, 6)} />
        <Reviews />
        <Contact />
      </main>
      <Modal opened={profilerModalOpen} onClose={closeProfilerModal} title="Perfilador">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non quos reiciendis facere inventore
          obcaecati alias perspiciatis. Tempore quaerat, labore reprehenderit architecto libero laudantium
          beatae aut, facere possimus impedit quis autem.
        </p>
      </Modal>
    </>
  )
}
