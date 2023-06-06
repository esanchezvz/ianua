'use client'

import { useEffect, useRef, useState } from 'react'

import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { Listing, Role } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useForm, Control, Controller } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Select, SelectOption } from '@/components/ui/select'
import { TextField } from '@/components/ui/text-field'
import { TextareaField } from '@/components/ui/textarea-field'
import { createListingSchema } from '@/core/validations/listing'
import { toast } from '@/hooks/use-toast'
import { cn, zoneOptions } from '@/utils'
import {
  ammenitiesOptions,
  climateOptions,
  listingConditionOptions,
  listingCurrencyOptions,
  listingPrivateServicesOptions,
  listingPublicServicesOptions,
  lsitingTypeOptions,
  parkingSpotStyleOptions,
  propertyTypeOptions,
} from '@/utils/listing'

import ListingFileUploader from './listing-file-uploader'
import { Label } from '../ui/label'
import { RadioGroup } from '../ui/radio-group'
import { RadioGroupItem } from '../ui/radio-group'

type Form = z.infer<typeof createListingSchema>
const _Address = createListingSchema.pick({ address: true })
type _AddressFields = z.infer<typeof _Address>['address']
const _Data = createListingSchema.pick({ data: true })
type _DataFields = z.infer<typeof _Data>['data']

type AddressFields = `address.${keyof _AddressFields}`
type DataFields = `data.${keyof _DataFields}`

type Broker = {
  id: string
  user: { id: string; name: string; surname_1: string; surname_2: string }
}

const rangeOptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
]

const booleanOptions = [
  { value: '0', label: 'No' },
  { value: '1', label: 'Sí' },
]

export function CreateListingForm({ onSuccess }: { onSuccess: () => void }) {
  const session = useSession()
  const [step, setStep] = useState<'data' | 'media'>('data')
  const [listingId, setListingId] = useState('')
  const [brokers, setBrokers] = useState<Broker[]>([])
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<Form>({
    resolver: zodResolver(createListingSchema),
  })
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: Form) => {
    const formData = new FormData()

    setIsLoading(true)

    formData.append('data', JSON.stringify(data))

    try {
      const res = await fetch('/api/listings', {
        method: 'post',
        body: formData,
      })
      const response = (await res.json()) as { data: Listing }

      setListingId(response.data.id)
      setStep('media')

      toast({
        title: 'Pripedad Creada',
        description: 'La propiedad creaada exitosamente. Puedes seguir creando propiedades.',
      })
    } catch (error) {
      toast({
        title: 'Oooops!',
        description: 'Ocurrió un error. Intenta nuevamente.',
        variant: 'destructive',
      })
    }

    setIsLoading(false)
  }

  useEffect(() => {
    const fetchBrokers = async () => {
      const res = await fetch('/api/brokers', {
        method: 'get',
      })

      const { data } = (await res.json()) as {
        data: Broker[]
      }
      setBrokers(data)
    }

    fetchBrokers()
  }, [])

  useEffect(() => {
    if (session.data?.user) {
      const { user } = session.data
      const isBroker = user.role === Role.BROKER

      if (isBroker) {
        const broker = brokers.find((b) => b.user.id === user.id)

        if (broker) setValue('broker', broker.id)
      }
    }
  }, [session, brokers, setValue])

  return (
    <>
      {step === 'data' ? (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center justify-between gap-5">
            <div className="flex w-full flex-1 flex-wrap items-start justify-between gap-5">
              {session.data?.user.role !== Role.BROKER ? (
                <SelectField
                  disabled={isLoading}
                  control={control}
                  name="broker"
                  options={brokers.map((r) => ({
                    value: r.id,
                    label: `${r.user.name} ${r.user.surname_1} ${r.user.surname_2}`,
                  }))}
                  label="Broker"
                />
              ) : null}
            </div>

            <div className="flex w-full flex-1 flex-wrap items-start justify-between gap-5">
              <SelectField
                disabled={isLoading}
                control={control}
                name="type"
                options={lsitingTypeOptions}
                label="Tipo"
              />

              <SelectField
                disabled={isLoading}
                control={control}
                name="property_type"
                options={propertyTypeOptions}
                label="¿Casa o Depa?"
              />
            </div>

            <div className="flex w-full flex-1 items-start justify-between gap-5">
              <TextareaField
                id="description"
                label="Descripción"
                error={errors?.description?.message}
                disabled={isLoading}
                className="flex-1"
                {...register('description')}
              />
            </div>

            <div className="flex w-full flex-1 items-start justify-between gap-5">
              <TextField
                id="price"
                label="Precio"
                error={errors?.price?.message}
                type="number"
                disabled={isLoading}
                className="flex-1"
                {...register('price')}
              />
              <SelectField
                disabled={isLoading}
                control={control}
                options={listingCurrencyOptions}
                name="price_currency"
                label="Moneda"
              />
            </div>

            <div className="flex w-full flex-1 flex-wrap items-start justify-between gap-5">
              <TextField
                id="sq_m_total"
                label="Terreno Total (m2)"
                error={errors?.sq_m_total?.message}
                type="number"
                disabled={isLoading}
                className="flex-1"
                {...register('sq_m_total')}
              />
              <TextField
                id="sq_m_construction"
                label="Contrucción (m2)"
                error={errors?.sq_m_construction?.message}
                type="number"
                disabled={isLoading}
                className="flex-1"
                {...register('sq_m_construction')}
              />
              <TextField
                id="sq_m_living"
                label="Habitable (m2)"
                error={errors?.sq_m_living?.message}
                type="number"
                disabled={isLoading}
                className="flex-1"
                {...register('sq_m_living')}
              />
              <TextField
                id="sq_m_terrace"
                label="Terraza (m2)"
                error={errors?.sq_m_terrace?.message}
                type="number"
                disabled={isLoading}
                className="flex-1"
                {...register('sq_m_terrace')}
              />
              <TextField
                id="sq_m_balcony"
                label="Balcón (m2)"
                error={errors?.sq_m_balcony?.message}
                type="number"
                disabled={isLoading}
                className="flex-1"
                {...register('sq_m_balcony')}
              />
              <TextField
                id="sq_m_garden"
                label="Jardín (m2)"
                error={errors?.sq_m_garden?.message}
                type="number"
                disabled={isLoading}
                className="flex-1"
                {...register('sq_m_garden')}
              />
            </div>

            <div className="flex w-full flex-1 flex-wrap items-start justify-between gap-5">
              <TextField
                id="dimension_front"
                type="number"
                label="Frente"
                error={errors?.dimension_front?.message}
                disabled={isLoading}
                className="flex-1"
                {...register('dimension_front')}
              />
              <TextField
                id="dimension_depth"
                type="number"
                label="Fondo"
                error={errors?.dimension_depth?.message}
                disabled={isLoading}
                className="flex-1"
                {...register('dimension_depth')}
              />
            </div>

            <div className="flex w-full flex-1 items-start justify-between gap-5">
              <TextField
                id="rooms"
                type="number"
                label="Habitaciones"
                error={errors?.rooms?.message}
                disabled={isLoading}
                className="flex-1"
                {...register('rooms')}
              />
              <TextField
                id="bathrooms"
                type="number"
                label="Baños"
                error={errors?.bathrooms?.message}
                disabled={isLoading}
                className="flex-1"
                {...register('bathrooms')}
              />
              <TextField
                id="parking"
                type="number"
                label="Lugares de Estacionamiento"
                error={errors?.parking_spots?.message}
                disabled={isLoading}
                className="flex-1"
                {...register('parking_spots')}
              />

              <SelectField
                disabled={isLoading}
                control={control}
                name="parking_spots_style"
                options={parkingSpotStyleOptions}
                label="Tipo de Estacionamiento"
              />
            </div>

            <div className="flex w-full flex-1 flex-wrap items-start justify-between gap-5">
              <TextField
                id="storage_units"
                type="number"
                label="No. de Bodegas"
                error={errors?.storage_units?.message}
                disabled={isLoading}
                className="flex-1"
                {...register('storage_units')}
              />
              <TextField
                id="maintenance_cost"
                type="number"
                label="Costo de Mantenimiento"
                error={errors?.maintenance_cost?.message}
                disabled={isLoading}
                className="flex-1"
                {...register('maintenance_cost')}
              />
            </div>

            <div className="flex w-full flex-1 flex-wrap items-start justify-between gap-5">
              <TextField
                id="age"
                type="number"
                label="Edad Inmueble (Años)"
                error={errors?.age?.message}
                disabled={isLoading}
                className="flex-1"
                {...register('age')}
              />
              <SelectField
                disabled={isLoading}
                control={control}
                name="condition"
                options={listingConditionOptions}
                label="Condición Física Inmueble"
              />
              <TextField
                id="construction_style"
                type="text"
                label="Estilo de Construcción"
                error={errors?.construction_style?.message}
                disabled={isLoading}
                className="flex-1"
                {...register('construction_style')}
              />
            </div>

            <div className="flex w-full flex-1 flex-wrap items-start justify-between gap-5">
              <SelectField
                disabled={isLoading}
                control={control}
                name="climate"
                options={climateOptions}
                label="Clima"
              />
              <TextField
                id="views"
                type="text"
                label="Vistas"
                error={errors?.views?.message}
                disabled={isLoading}
                className="flex-1"
                {...register('views')}
              />
            </div>

            <div className="flex w-full flex-1 flex-wrap items-start justify-between gap-5">
              <RadioGroupField
                disabled={isLoading}
                control={control}
                options={rangeOptions}
                name="natural_lighting"
                label="Iluminación Natural"
              />
              <RadioGroupField
                disabled={isLoading}
                control={control}
                options={rangeOptions}
                name="event_policy_strictness"
                label="¿Qué tan estrictos son para eventos?"
              />
              <SelectField
                disabled={isLoading}
                control={control}
                options={booleanOptions}
                name="pet_friendly"
                label="Pet Friendly"
              />
            </div>

            <div className="flex w-full flex-1 items-start justify-between gap-5">
              <TextField
                id="street_1"
                label="Calle"
                error={errors?.address?.street_1?.message}
                type="text"
                disabled={isLoading}
                className="flex-1"
                {...register('address.street_1')}
              />
              <TextField
                id="number"
                label="Número"
                error={errors?.address?.number?.message}
                type="text"
                disabled={isLoading}
                className="flex-1"
                {...register('address.number')}
              />
              <TextField
                id="int_number"
                label="Número Interior"
                error={errors?.address?.int_number?.message}
                type="text"
                disabled={isLoading}
                className="flex-1"
                {...register('address.int_number')}
              />

              <TextField
                id="city"
                label="Ciudad"
                error={errors?.address?.city?.message}
                type="text"
                disabled={isLoading}
                className="flex-1"
                {...register('address.city', { value: 'CDMX' })}
              />
            </div>

            <div className="flex w-full flex-1 items-start justify-between gap-5">
              <SelectField
                disabled={isLoading}
                control={control}
                name="address.locality"
                options={zoneOptions}
                label="Alcaldía"
              />
              <TextField
                id="state"
                label="Estado"
                error={errors?.address?.state?.message}
                type="text"
                disabled={isLoading}
                className="flex-1"
                {...register('address.state', { value: 'CDMX' })}
              />
              <TextField
                id="zipCode"
                label="Código Postal"
                error={errors?.address?.zip_code?.message}
                type="text"
                disabled={isLoading}
                className="flex-1"
                {...register('address.zip_code')}
              />
            </div>

            <div className="flex w-full flex-1 flex-wrap items-start justify-between gap-5">
              <TextField
                id="development_name"
                type="text"
                label="Nombre de Desarrollo"
                error={errors?.development_name?.message}
                disabled={isLoading}
                className="flex-1"
                {...register('development_name')}
              />
              <TextField
                id="stories"
                type="number"
                label="Niveles en la Propiedad"
                error={errors?.stories?.message}
                disabled={isLoading}
                className="flex-1"
                {...register('stories')}
              />
              <TextField
                id="floor"
                type="number"
                label="¿En qué piso está?"
                error={errors?.floor?.message}
                disabled={isLoading}
                className="flex-1"
                {...register('floor')}
              />
            </div>

            <div className="flex w-full flex-1 flex-wrap items-start justify-between gap-5">
              <TextField
                id="development_stories"
                type="number"
                label="Total de pisos en el desarrollo"
                error={errors?.development_stories?.message}
                disabled={isLoading}
                className="flex-1"
                {...register('development_stories')}
              />
              <TextField
                id="development_buildings"
                type="number"
                label="No. Torres"
                error={errors?.development_buildings?.message}
                disabled={isLoading}
                className="flex-1"
                {...register('development_buildings')}
              />

              <TextField
                id="development_units"
                type="number"
                label="Total de Unidades en el desarrollo"
                error={errors?.development_units?.message}
                disabled={isLoading}
                className="flex-1"
                {...register('development_units')}
              />
            </div>

            <div className="flex w-full flex-1 flex-wrap items-start justify-between gap-5">
              <SelectField
                disabled={isLoading}
                control={control}
                name="ammenities"
                options={ammenitiesOptions}
                label="Amenidades"
                multiple
              />
              <SelectField
                disabled={isLoading}
                control={control}
                options={listingPublicServicesOptions}
                name="public_services"
                label="Servicios Públicos"
                multiple
              />
              <SelectField
                disabled={isLoading}
                control={control}
                options={listingPrivateServicesOptions}
                name="private_services"
                label="Servicios Privados"
                multiple
              />
            </div>

            <div className="flex w-full flex-1 items-start justify-between gap-5">
              <TextField
                id="urban-equipment"
                type="text"
                label="Equipamento Urbano"
                placeholder="Tipoe de alubrado, pavimento, recolección de basura, etc..."
                error={errors?.urban_equipment?.message}
                disabled={isLoading}
                className="flex-1"
                hint="Separados por comas. Ej. Bares, Restaurantes, etc..."
                {...register('urban_equipment')}
              />
              <TextField
                id="yearly_tax"
                type="number"
                label="Predial"
                error={errors?.yearly_tax?.message}
                disabled={isLoading}
                className="flex-1"
                {...register('yearly_tax')}
              />
              <SelectField
                disabled={isLoading}
                control={control}
                name="data.yearly_tax_period"
                options={[
                  { label: 'Anual', value: 'yearly' },
                  { label: 'Bimestral', value: 'bimonthly' },
                ]}
                defaultSelected={{ label: 'Anual', value: 'yearly' }}
                label="Recurrencia Predial"
              />
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="mt-5 w-full">
            {isLoading && <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />}
            Siguiente Paso
          </Button>
        </form>
      ) : null}

      {step === 'media' ? <ListingFileUploader listingId={listingId} onCreate={onSuccess} /> : null}
    </>
  )
}

type SelectFieldProps = {
  control: Control<Form>
  name: keyof Omit<Form, 'address' | 'data'> | AddressFields | DataFields
  hint?: string
} & React.ComponentProps<typeof Select>

const SelectField = ({ control, name, hint, ...props }: SelectFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={cn('grid flex-1  items-center gap-1.5')}>
          <Select {...props} {...field} />

          {hint && !error ? <small className="text-sm text-gray-500/50">{hint}</small> : null}
          {error?.message ? <small className="text-sm text-red-400">{error.message}</small> : null}
        </div>
      )}
    />
  )
}

type RadioGroupfieldProps = {
  control: Control<Form>
  name: keyof Form | AddressFields
  options: SelectOption[]
  label?: string
  hint?: string
} & React.ComponentProps<typeof RadioGroup>

const RadioGroupField = ({ control, name, label, hint, options, ...props }: RadioGroupfieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={cn('grid flex-1 items-center gap-1.5')}>
          {label ? <Label htmlFor={field.name}>{label}</Label> : null}

          <RadioGroup
            {...props}
            ref={field.ref}
            id={field.name}
            name={field.name}
            onBlur={field.onBlur}
            className="w-full"
            onValueChange={(val) => {
              isNaN(Number(val)) ? field.onChange(val) : field.onChange(Number(val))
            }}
            value={String(field.value)}
          >
            <div className="mt-2 flex items-center gap-5">
              {options.map((o) => {
                const id = `radio-${name ? name : ''}-${o.value}`
                return (
                  <div key={o.value} className="flex items-center gap-3">
                    <RadioGroupItem id={id} value={o.value} />
                    <Label htmlFor={id}>{o.label}</Label>
                  </div>
                )
              })}
            </div>
          </RadioGroup>

          {hint && !error ? <small className="text-sm text-gray-500/50">{hint}</small> : null}
          {error?.message ? <small className="text-sm text-red-400">{error.message}</small> : null}
        </div>
      )}
    />
  )
}
