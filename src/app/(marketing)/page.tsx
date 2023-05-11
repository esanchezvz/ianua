'use client'
import { useState } from 'react'

import Link from 'next/link'

import AboutUs from '@/components/mkt/home/about'
import CallToAction from '@/components/mkt/home/call-to-action'
import Contact from '@/components/mkt/home/contact'
import FeaturedListings from '@/components/mkt/home/featured-listings'
import Hero from '@/components/mkt/home/hero'
import Reviews from '@/components/mkt/home/reviews'
import Services from '@/components/mkt/home/services'
import { buttonVariants } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import Modal from '@/components/ui/modal'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Select from '@/components/ui/select'
import { zoneOptions } from '@/utils'
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
        <div className="mb-5">
          <p>¿En qué zona estás buscando?</p>
          <Select options={zoneOptions} />
        </div>

        <RadioGroup className="mb-5 flex flex-wrap">
          <p className="w-full">¿Venta o renta?</p>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="venta" id="r1" />
            <Label htmlFor="r1">Venta</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="renta" id="r2" />
            <Label htmlFor="r2">Renta</Label>
          </div>
        </RadioGroup>

        <RadioGroup className="mb-5 flex flex-wrap">
          <p className="w-full">Case o depa?</p>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="casa" id="r1" />
            <Label htmlFor="r1">Casa</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="depa" id="r2" />
            <Label htmlFor="r2">Depa</Label>
          </div>
        </RadioGroup>

        <div className="mb-5 flex space-x-2">
          <Checkbox id="dancing" />
          <Label
            htmlFor="dancing"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Te gusta bailar
          </Label>
        </div>

        <Link className={buttonVariants({ variant: 'default' })} href="/propiedades">
          Buscar
        </Link>
      </Modal>
    </>
  )
}
