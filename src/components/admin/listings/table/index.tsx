'use client'

import { useMemo, useState } from 'react'

import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { ListingStatus, Role } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { PaginationState, Row } from '@tanstack/react-table'
import { debounce } from 'lodash'
import { useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import Drawer from '@/components/ui/drawer'
import { Select } from '@/components/ui/select'
import { toast } from '@/hooks/use-toast'
import { fetchBrokers } from '@/services/brokers'
import { fetchListings } from '@/services/listing'
import { Listing, PopulatedListing } from '@/types/listing'
import { listingStatusOptions } from '@/utils/listing'

import { columns } from './columns'
import { CreateListingForm } from '../create-update-form'

export const ListingsTable = () => {
  useQuery(['brokers'], fetchBrokers)
  const [publishing, setPublishing] = useState(false)
  const { data: sessionData } = useSession()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<ListingStatus>()
  const [drawer, setDrawer] = useState<{
    open: boolean
    listing: Listing | null
  }>({
    open: false,
    listing: null,
  })

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  })
  const { data, isLoading, refetch } = useQuery(
    ['listings', pagination],
    () =>
      fetchListings<PopulatedListing[]>({
        brokerId: sessionData?.user.role === Role.BROKER ? sessionData?.user.broker_id : undefined,
        limit: pagination.pageSize,
        page: pagination.pageIndex + 1,
        includes: 'broker',
        search,
        status,
      }),
    { keepPreviousData: true }
  )

  const handleSearch = debounce<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    setSearch(e.target.value)
    setTimeout(refetch, 1)
  }, 350)

  const handlePreview = (row: Row<PopulatedListing>) => {
    setDrawer({
      open: true,
      listing: row.original,
    })
  }

  const closeDrawer = () => {
    setDrawer((prev) => ({ ...prev, open: false }))
  }

  const onSuccess = async () => {
    await refetch()
    closeDrawer()
  }

  const publishListing = async () => {
    setPublishing(true)
    const formData = new FormData()
    formData.append(
      'data',
      JSON.stringify({
        status:
          drawer.listing?.status === ListingStatus.PUBLISHED
            ? ListingStatus.PENDING
            : ListingStatus.PUBLISHED,
      })
    )

    try {
      const res = await fetch(`/api/listings/${drawer.listing?.id}`, {
        method: 'put',
        body: formData,
      })
      await res.json()
      await onSuccess()

      toast({
        title: 'Propiedad Publicada',
        description: 'Propiedad publicada exitosamente.',
      })
    } catch (error) {
      toast({
        title: 'Oooops!',
        description: 'Ocurrió un error. Intenta nuevamente.',
        variant: 'destructive',
      })
    }

    setPublishing(false)
  }

  const removeListing = async () => {
    setPublishing(true)
    const formData = new FormData()
    formData.append(
      'data',
      JSON.stringify({
        status: ListingStatus.DELETED,
      })
    )

    try {
      const res = await fetch(`/api/listings/${drawer.listing?.id}`, {
        method: 'put',
        body: formData,
      })
      await res.json()
      await onSuccess()

      toast({
        title: 'Propiedad Eliminada',
        description: 'Puede ser reactivada.',
      })
    } catch (error) {
      toast({
        title: 'Oooops!',
        description: 'Ocurrió un error. Intenta nuevamente.',
        variant: 'destructive',
      })
    }

    setPublishing(false)
  }

  const memoColumns = useMemo(() => columns(handlePreview), [])

  const publishUnpublish =
    drawer.listing?.status === ListingStatus.PUBLISHED || drawer.listing?.status === ListingStatus.PENDING

  return (
    <>
      <DataTable
        columns={memoColumns}
        data={data?.data ?? []}
        count={data?.count ?? 0}
        pagination={pagination}
        onPaginationChange={setPagination}
        loading={isLoading}
        onSearchChange={handleSearch}
        filters={
          <>
            <div>
              <Select
                options={listingStatusOptions}
                label="Status"
                onChange={setStatus as (v: string) => void}
              />
            </div>
          </>
        }
      />
      <Drawer
        opened={drawer.open}
        onClose={closeDrawer}
        title="Editar Propiedad"
        className="w-full max-w-5xl"
      >
        {sessionData?.user.role !== Role.BROKER ? (
          <div className="flex items-center justify-end gap-5">
            {publishUnpublish ? (
              <Button disabled={publishing} variant="secondary" onClick={publishListing}>
                {publishing && <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />}
                {drawer.listing?.status === ListingStatus.PUBLISHED ? 'Despublicar' : 'Publicar'}
              </Button>
            ) : null}
            <Button disabled={publishing} variant="destructive" onClick={removeListing}>
              {publishing && <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />}
              Eliminar
            </Button>
          </div>
        ) : null}

        {drawer.listing ? (
          <CreateListingForm
            onSuccess={onSuccess}
            editMode
            defaultValues={drawer.listing}
            listingId={drawer.listing.id}
          />
        ) : null}
      </Drawer>
    </>
  )
}
