'use client'
import { useState } from 'react'

import AboutUs from '@/components/mkt/home/about'
import CallToAction from '@/components/mkt/home/call-to-action'
import Contact from '@/components/mkt/home/contact'
import FeaturedListings from '@/components/mkt/home/featured-listings'
import Hero from '@/components/mkt/home/hero'
import Reviews from '@/components/mkt/home/reviews'
import Services from '@/components/mkt/home/services'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modal'
import { listings } from '@/utils/mock-data'

export default function Home() {
  const [searchModalOpen, setSearchModalOpen] = useState(false)

  const openProfilerModal = () => {
    setSearchModalOpen(true)
  }

  const closeProfilerModal = () => {
    setSearchModalOpen(false)
  }

  return (
    <>
      <main>
        <Hero openProfilerModal={openProfilerModal} />
        <AboutUs />
        <Services />
        <CallToAction />
        <FeaturedListings listings={listings.slice(0, 6)} />
        <Reviews />
        <Contact />
      </main>
      <Modal opened={searchModalOpen} onClose={closeProfilerModal} title="Buscar Propiedades" size="xl">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non quos reiciendis facere inventore
          obcaecati alias perspiciatis. Tempore quaerat, labore reprehenderit architecto libero laudantium
          beatae aut, facere possimus impedit quis autem.
        </p>

        <Button>Buscar</Button>
      </Modal>
    </>
  )
}
