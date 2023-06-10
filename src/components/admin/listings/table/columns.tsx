'use client'

import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import { ListingPriceCurrency } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Listing } from '@/types/listing'
import {
  climateMap,
  ammenitiesMap,
  parkingSpotStyleMap,
  listingPrivateServicesMap,
  listingPublicServicesMap,
  propertyTypeMap,
  listingStatusMap,
  listingTypeMap,
  listingConditionsMap,
} from '@/utils/listing'

const booleanAccessorFn = (value: boolean) => (value ? 'Sí' : 'No')

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

export const columns: ColumnDef<Listing>[] = [
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
    accessorKey: 'address',
    header: 'Dirección',
    accessorFn: (row) => Object.values(row.address).join(', '),
  },
  {
    accessorKey: 'age',
    header: 'Edad Edificio',
  },
  {
    accessorKey: 'bathrooms',
    header: 'Baños',
  },
  {
    accessorKey: 'ammenities',
    header: 'Amenidades',
    accessorFn: (row) => row.ammenities.map((a) => ammenitiesMap[a]),
  },
  {
    accessorKey: 'climate',
    header: 'Clima',
    accessorFn: (row) => climateMap[row.climate],
  },
  {
    accessorKey: 'condition',
    header: 'Condición',
    accessorFn: (row) => listingConditionsMap[row.condition],
  },
  {
    accessorKey: 'construction_style',
    header: 'Estilo de Construcción',
  },
  {
    accessorKey: 'development_buildings',
    header: 'No. de Torres',
  },
  {
    accessorKey: 'development_name',
    header: 'Nombre del Desarrollo',
  },
  {
    accessorKey: 'development_stories',
    header: 'No de Pisos',
  },
  {
    accessorKey: 'development_units',
    header: 'Total de Unidades del Desarrollo',
  },
  {
    accessorKey: 'dimension_depth',
    header: 'Fondo',
    accessorFn: (row) => `${row.dimension_depth} m2`,
  },
  {
    accessorKey: 'dimension_front',
    header: 'Frente',
    accessorFn: (row) => `${row.dimension_front} m2`,
  },
  {
    accessorKey: 'event_policy_strictness',
    header: 'Flexibilidad para Eventos',
  },
  {
    accessorKey: 'featured',
    header: 'Destacada',
  },
  {
    accessorKey: 'floor',
    header: 'Piso',
  },
  {
    accessorKey: 'furnished',
    header: 'Amueblado',
    accessorFn: (row) => booleanAccessorFn(row.furnished),
  },
  {
    accessorKey: 'maintenance_cost',
    header: 'Costo Mantenimiento',
    accessorFn: (row) => currencyFormatter(row.price_currency, row.maintenance_cost),
  },
  {
    accessorKey: 'natural_lighting',
    header: 'Iluminación Natural',
  },
  {
    accessorKey: 'orientation',
    header: 'Orientación',
  },
  {
    accessorKey: 'parking_spots',
    header: 'Lugares de Estacionamiento',
  },
  {
    accessorKey: 'parking_spots_style',
    header: 'Tipo de Estacionamiento',
    accessorFn: (row) => (row.parking_spots_style ? parkingSpotStyleMap[row.parking_spots_style] : null),
  },
  {
    accessorKey: 'pet_friendly',
    header: 'Pet Friendly',
    accessorFn: (row) => booleanAccessorFn(row.pet_friendly),
  },
  {
    accessorKey: 'price',
    header: 'Precio',
    accessorFn: (row) => currencyFormatter(row.price_currency, row.price),
  },
  {
    accessorKey: 'private_services',
    header: 'Servicios Privados',
    accessorFn: (row) => row.private_services.map((s) => listingPrivateServicesMap[s]),
  },
  {
    accessorKey: 'public_services',
    header: 'Servicios Públicos',
    accessorFn: (row) => row.public_services.map((s) => listingPublicServicesMap[s]),
  },
  {
    accessorKey: 'property_type',
    header: 'Tipo',
    accessorFn: (row) => propertyTypeMap[row.property_type],
  },
  {
    accessorKey: 'rooms',
    header: 'Habitaciones',
  },
  {
    accessorKey: 'sq_m_balcony',
    header: 'm2 Balcón',
  },
  {
    accessorKey: 'sq_m_construction',
    header: 'm2 Constucción',
  },
  {
    accessorKey: 'sq_m_garden',
    header: 'm2 Jardín',
  },
  {
    accessorKey: 'sq_m_living',
    header: 'm2 Habitables',
  },
  {
    accessorKey: 'sq_m_terrace',
    header: 'm2 Terraza',
  },
  {
    accessorKey: 'sq_m_total',
    header: 'm2 Terreno Total',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    accessorFn: (row) => listingStatusMap[row.status],
  },
  {
    accessorKey: 'storage_units',
    header: 'No. de Bodegas',
  },
  {
    accessorKey: 'stories',
    header: 'Pisos',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    accessorFn: (row) => listingTypeMap[row.type],
  },
  {
    accessorKey: 'urban_equipment',
    header: 'Equipamento Urbano',
  },
  {
    accessorKey: 'views',
    header: 'Vistas',
  },
  {
    accessorKey: 'yearly_tax',
    header: 'Predial',
    accessorFn: (row) =>
      row.yearly_tax ? `${row.yearly_tax} (${row.data.yearly_tax_period ?? 'Anual'})` : null,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Ver Opciones</span>
              <EllipsisHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.getValue('address'))}>
                Copiar Dirección
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>TBD</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      )
    },
  },
]
