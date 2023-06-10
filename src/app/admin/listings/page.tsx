'use client'
import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { CreateListingModal } from '@/components/admin/listings/create-modal'
import { Button } from '@/components/ui/button'
import { fetchListings } from '@/services/listing'

export default function ListingsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const { data, refetch, isLoading } = useQuery(['listings'], fetchListings)

  const onCreate = async () => {
    await refetch()

    setModalOpen(false)
  }

  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <h1 className="font-body text-2xl font-bold">Propiedades</h1>

        <Button onClick={() => setModalOpen(true)} size="sm">
          Crear Propiedad
        </Button>
      </div>

      {isLoading ? (
        <h1 className="mt-10">Cargando...</h1>
      ) : (
        <h1 className="mt-10">{data?.data ?? 0} Propiedades</h1>
      )}

      <CreateListingModal onClose={() => setModalOpen(false)} onCreate={onCreate} open={modalOpen} />
    </div>
  )
}
