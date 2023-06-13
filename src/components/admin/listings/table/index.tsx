'use client'

import { useMemo, useState } from 'react'

import { Role } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { PaginationState, Row } from '@tanstack/react-table'
import { debounce } from 'lodash'
import { useSession } from 'next-auth/react'

import { DataTable } from '@/components/ui/data-table'
import Drawer from '@/components/ui/drawer'
import { toast } from '@/hooks/use-toast'
import { fetchBrokers } from '@/services/brokers'
import { fetchListings } from '@/services/listing'
import { Listing, PopulatedListing } from '@/types/listing'

import { columns } from './columns'
import { CreateListingForm } from '../create-form'

export const ListingsTable = () => {
  useQuery(['brokers'], fetchBrokers)
  const { data: sessionData } = useSession()
  const [search, setSearch] = useState('')
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

  const memoColumns = useMemo(() => columns(handlePreview), [])

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
      />
      <Drawer
        opened={drawer.open}
        onClose={closeDrawer}
        title="Editiar Propiedad"
        className="w-full max-w-5xl"
      >
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
