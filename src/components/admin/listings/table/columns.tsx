'use client'

import { EllipsisHorizontalIcon, EyeIcon } from '@heroicons/react/24/outline'
import { ListingPriceCurrency, ListingStatus, Role } from '@prisma/client'
import { CellContext, ColumnDef, Row } from '@tanstack/react-table'
import { useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from '@/hooks/use-toast'
import { PopulatedListing } from '@/types/listing'
import { listingStatusMap, propertyTypeMap } from '@/utils/listing'

const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  currencyDisplay: 'code',
})

const MXNPeso = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  currencyDisplay: 'code',
})

const currencyFormatter = (currency: ListingPriceCurrency | null, value: number | null) => {
  if (value === null) return value
  if (currency === 'USD') return USDollar.format(value)

  return MXNPeso.format(value)
}

export const columns: (
  handlePreview: (row: Row<PopulatedListing>) => void
) => ColumnDef<PopulatedListing>[] = (handlePreview) => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar todas"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selecionar fila"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'broker',
    header: 'Broker',
    accessorFn: (row) =>
      `${row.broker?.user?.name} ${row.broker?.user?.surname_1} ${row.broker?.user?.surname_2}`,
  },
  {
    accessorKey: 'broker-email',
    header: 'Broker Email',
    accessorFn: (row) => `${row.broker?.user?.email}`,
  },
  {
    accessorKey: 'property_type',
    header: 'Tipo de Propiedad',
    accessorFn: (row) => row.property_type.map((p) => propertyTypeMap[p]),
  },
  {
    accessorKey: 'price',
    header: 'Precio',
    accessorFn: (row) => currencyFormatter(row.price_currency, row.price),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    accessorFn: (row) => listingStatusMap[row.status],
  },
  {
    id: 'actions',
    cell: (cell) => <MoreOptionsCell {...cell} handlePreview={handlePreview} />,
  },
]

const MoreOptionsCell = ({
  row,
  handlePreview,
}: CellContext<PopulatedListing, unknown> & { handlePreview: (row: Row<PopulatedListing>) => void }) => {
  const session = useSession()

  const toggleFeatured = async (id: string, value: boolean) => {
    const formData = new FormData()

    formData.append('data', JSON.stringify({ featured: value }))

    try {
      const res = await fetch(`/api/listings/${id}`, {
        method: 'put',
        body: formData,
      })
      await res.json()

      toast({
        title: 'Propiedad Actualizada',
        description: 'Propiedad actualizada correctamente.',
      })
    } catch (error) {
      toast({
        title: 'Oooops!',
        description: 'Ocurrió un error. Intenta nuevamente.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="flex items-center justify-center">
      <Button variant="ghost" onClick={() => handlePreview(row)}>
        <EyeIcon className="h-4 w-4" />
      </Button>

      {session.data?.user.role !== Role.BROKER ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Ver Opciones</span>
              <EllipsisHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.getValue('address'))}>
                Copiar Dirección
              </DropdownMenuItem>
              {row.original.status === ListingStatus.PUBLISHED ? (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => toggleFeatured(row.original.id, !row.original.featured)}>
                    {!row.original.featured ? 'Marcar como principal' : 'Quitar de principales'}
                  </DropdownMenuItem>
                </>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      ) : null}
    </div>
  )
}
