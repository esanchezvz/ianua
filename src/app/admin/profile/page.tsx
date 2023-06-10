'use client'
import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

import { CreateListingModal } from '@/components/admin/listings/create-modal'
import { Button } from '@/components/ui/button'
import { fetchListings } from '@/services/listing'

export default function ProfilePage() {
  const [modalOpen, setModalOpen] = useState(false)
  const { data: sessionData } = useSession()
  const { data: listingsData, refetch, isLoading } = useQuery(['listings'], fetchListings)

  const listings = listingsData?.data
  const user = sessionData?.user

  const onCreate = async () => {
    await refetch()

    setModalOpen(false)
  }

  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <h1 className="font-body text-2xl font-bold">Mi Perfil</h1>

        <Button onClick={() => setModalOpen(true)} size="sm">
          Crear Propiedad
        </Button>
      </div>

      {user ? (
        <>
          <h2>
            {user.name} {user.surnames}
          </h2>
          <p>{user.email}</p>
        </>
      ) : null}

      {isLoading ? (
        <h1 className="mt-10">Cargando...</h1>
      ) : (
        <h1 className="mt-10">{listings ?? 0} Propiedades</h1>
      )}

      <CreateListingModal onClose={() => setModalOpen(false)} onCreate={onCreate} open={modalOpen} />
    </div>
  )
}
