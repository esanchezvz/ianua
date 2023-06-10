'use client'

import { useState } from 'react'

import { Role } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { PaginationState } from '@tanstack/react-table'
import { useSession } from 'next-auth/react'

import { DataTable } from '@/components/ui/data-table'
import { fetchListings } from '@/services/listing'

import { columns } from './columns'

export const ListingsTable = () => {
  const { data: sessionData } = useSession()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  })
  const { data, isLoading } = useQuery(
    ['listings', pagination],
    () =>
      fetchListings({
        brokerId: sessionData?.user.role === Role.BROKER ? sessionData?.user.broker_id : undefined,
        limit: pagination.pageSize,
        page: pagination.pageIndex + 1,
      }),
    { keepPreviousData: true }
  )

  return (
    <DataTable
      columns={columns}
      data={data?.data ?? []}
      count={data?.count ?? 0}
      pagination={pagination}
      onPaginationChange={setPagination}
      loading={isLoading}
    />
  )
}
