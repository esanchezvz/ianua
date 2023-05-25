'use client'
import { useEffect, useState } from 'react'

import { CreateListingForm } from '@/components/admin/create-listing-form'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modal'

type TempListing = { name: string; data: { gallery_keys: string[] }; id: string }

export default function ListingsPage() {
  const [listings, setLisitings] = useState<TempListing[]>([])
  const [modalOpen, setModalOpen] = useState(false)

  const onCreate = async () => {
    const res = await fetch('/api/listings', {
      method: 'get',
    })

    const result: { data: TempListing[] } = await res.json()

    setLisitings(result.data)

    setModalOpen(false)
  }

  useEffect(() => {
    const fetchListings = async () => {
      const res = await fetch('/api/listings', {
        method: 'get',
      })

      const result: { data: TempListing[] } = await res.json()

      setLisitings(result.data)
    }

    fetchListings()
  }, [])

  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <h1 className="font-body text-2xl font-bold">Propiedades</h1>

        <Button onClick={() => setModalOpen(true)} size="sm">
          Crear Propiedad
        </Button>
      </div>

      <ul className="mt-10">
        {listings.map((l) => (
          <li key={l.id}>
            <b>{l.name}</b> - {l.data.gallery_keys.length} Images
          </li>
        ))}
      </ul>

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Crear Propiedad"
        className="max-w-5xl"
        closeOnEscape={false}
      >
        <CreateListingForm onSuccess={onCreate} />
      </Modal>
    </div>
  )
}
