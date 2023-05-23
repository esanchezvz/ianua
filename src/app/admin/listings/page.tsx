'use client'
import { useState } from 'react'

import { CreateListingForm } from '@/components/admin/create-listing-form'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modal'

export default function ListingsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-body text-2xl font-bold">Propiedades</h1>

      <Button onClick={() => setModalOpen(true)} size="sm">
        Crear Propiedad
      </Button>

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Crear Propiedad"
        className="max-w-5xl"
      >
        <CreateListingForm />
      </Modal>
    </div>
  )
}
