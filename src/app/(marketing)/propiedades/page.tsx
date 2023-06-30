'use client'

import { useEffect, useState } from 'react'

import { faFilter, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ListingType, PropertyType } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { FieldValues, useForm } from 'react-hook-form'

import ListingPreview from '@/components/shared/listing-preview'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import Drawer from '@/components/ui/drawer'
import { NumberField } from '@/components/ui/number-field'
import { SelectOption } from '@/components/ui/select'
import { SelectField } from '@/components/ui/select-field'
import { fetchListings } from '@/services/listing'
import { Listing } from '@/types/listing'
import { zoneOptions } from '@/utils'
import { listingTypeOptions, propertyTypeOptions } from '@/utils/listing'

type Filters = {
  price?: string | number | null | undefined
  locality?: string | null | undefined
  property_type_filter?: PropertyType | null | undefined
  type?: ListingType | null | undefined
}

export default function Listings() {
  const [page, setPage] = useState(1)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [listings, setListings] = useState<Listing[]>([])
  const [filters, setFilters] = useState<Filters>({
    locality: null,
    price: null,
    property_type_filter: null,
    type: null,
  })
  const { control, getValues, handleSubmit, reset } = useForm()
  const { data, isLoading, isFetching } = useQuery(
    ['flitered-listings', page, JSON.stringify(filters)],
    () =>
      fetchListings({
        limit: 10,
        page,
        filtered: true,
        ...getValidFilters(filters),
      }),
    { keepPreviousData: true }
  )
  const count = data?.count || 0

  const onSubmit = (data: FieldValues) => {
    const parsedFilters = getValidFilters(data)

    setListings([])
    setFilters(parsedFilters)
    setPage(1)
    setDrawerOpen(false)
  }

  const resetFilters = () => {
    setFilters({
      locality: null,
      price: null,
      property_type_filter: null,
      type: null,
    })
    setPage(1)
    setDrawerOpen(false)
    reset()
  }

  useEffect(() => {
    if (data) {
      setListings((prev) => {
        const arr = prev.concat(data.data)

        return arr.filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i)
      })
    }
  }, [data])

  if (!data && isLoading) {
    return (
      <div className="flex h-screen items-center justify-center p-5">
        <FontAwesomeIcon
          className="animate-spin text-light-blue"
          aria-hidden="true"
          size="5x"
          icon={faSpinner}
        />
      </div>
    )
  }

  return (
    <Container className="mt-10 p-10">
      <h1 className="mb-10 text-center text-5xl">Propiedades</h1>

      <div className="px-8">
        <div className="flex items-center justify-end">
          <Button variant="ghost" className="flex items-center gap-3" onClick={() => setDrawerOpen(true)}>
            <FontAwesomeIcon icon={faFilter} />
            Filtros
          </Button>
        </div>
        {listings.length ? (
          listings.map((l) => <ListingPreview key={l.id} listing={l} />)
        ) : (
          <div className="flex h-[70vh] items-center justify-center p-5">
            <h2 className="text-3xl">No se encontraron resultados.</h2>
          </div>
        )}
      </div>

      {listings.length && listings.length < count ? (
        <div className="flex items-center justify-center">
          <Button onClick={() => setPage(page + 1)} disabled={isLoading || isFetching}>
            {isLoading || isFetching ? 'Cargando...' : 'Cargar Más'}
          </Button>
        </div>
      ) : null}

      <Drawer title="Filtros" opened={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 w-full">
            <NumberField id="budget" control={control} name="price" label="Presupuesto" />
          </div>

          <div className="mb-6 w-full">
            <SelectField
              fullWidth
              control={control}
              name="property_type_filter"
              options={propertyTypeOptions.filter((o) => o.value !== PropertyType.CLOSED_STREET)}
              label="¿Casa o Depa?"
              defaultSelected={getSelectDefaultValue(propertyTypeOptions, false, getValues('preperty_type'))}
            />
          </div>

          <div className="mb-6 w-full">
            <SelectField
              fullWidth
              control={control}
              name="type"
              options={listingTypeOptions}
              label="Venta o Renta"
              defaultSelected={getSelectDefaultValue(listingTypeOptions, false, getValues('type'))}
            />
          </div>

          <div className="mb-6 w-full">
            <SelectField
              fullWidth
              control={control}
              name="desired_area"
              options={zoneOptions}
              label="Alcaldía"
              defaultSelected={getSelectDefaultValue(zoneOptions, false, getValues('desired_area'))}
            />
          </div>
          <Button className="mb-3 w-full" type="submit">
            Buscar
          </Button>
          <Button className="mb-3 w-full" type="button" variant="outline" onClick={resetFilters}>
            Borrar Filtros
          </Button>
        </form>
      </Drawer>
    </Container>
  )
}

const getSelectDefaultValue = (options: SelectOption[], multiple: boolean, value?: string | string[]) => {
  if (multiple) {
    return options.filter((o) => value?.includes(o.value)) ?? undefined
  }

  return options.find((o) => value?.includes(o.value)) ?? undefined
}

const getValidFilters = (data: Filters) => {
  const valid = Object.fromEntries(
    Object.entries(data ?? {}).filter(([, value]) => {
      if (value === null || value === undefined) return false

      return true
    })
  )

  if (valid.price && typeof valid.price == 'string') {
    valid.price = parseInt(valid.price.replaceAll(',', ''))
  }

  return valid as {
    price?: number
    locality?: string
    property_type_filter?: PropertyType
    type?: ListingType
  }
}
