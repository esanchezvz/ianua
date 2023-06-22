'use client'

import { useEffect, useState } from 'react'

import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { Listing, PropertyType, Role } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { get } from 'lodash'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useForm, Control, Controller } from 'react-hook-form'
import MaskedInput from 'react-text-mask'
import { createNumberMask } from 'text-mask-addons'
import * as z from 'zod'

import { ImageSort } from '@/components/shared/image-sort'
import { Button } from '@/components/ui/button'
import Carousel from '@/components/ui/carousel'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup } from '@/components/ui/radio-group'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectOption } from '@/components/ui/select'
import { TextField } from '@/components/ui/text-field'
import { TextareaField } from '@/components/ui/textarea-field'
import { env } from '@/core/env'
import { createListingSchema, updateListingSchema } from '@/core/validations/listing'
import { toast } from '@/hooks/use-toast'
import { fetchBrokers } from '@/services/brokers'
import { PopulatedListing } from '@/types/listing'
import { cn, zoneOptions } from '@/utils'
import {
  ammenitiesOptions,
  climateOptions,
  legalStatusOptions,
  listingConditionOptions,
  listingContructionStyleOptions,
  listingCurrencyOptions,
  listingPrivateServicesOptions,
  listingPublicServicesOptions,
  listingViewOptions,
  listingTypeOptions,
  parkingSpotStyleOptions,
  propertyTypeOptions,
} from '@/utils/listing'

import ListingFileUploader from '../listing-file-uploader'

type Form = z.infer<typeof createListingSchema>
const _Address = createListingSchema.pick({ address: true })
type _AddressFields = z.infer<typeof _Address>['address']
const _Data = createListingSchema.pick({ data: true })
type _DataFields = z.infer<typeof _Data>['data']

type AddressFields = `address.${keyof _AddressFields}`
type DataFields = `data.${keyof _DataFields}`

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

type Props = {
  onSuccess: () => void | Promise<void>
} & (
  | { editMode?: never; defaultValues?: never; listingId?: never }
  | {
      editMode: true
      defaultValues: PopulatedListing
      listingId: string
    }
)

const getDefaultValues = (values: PopulatedListing) => {
  const { success } = updateListingSchema.safeParse(values)

  if (!success) {
    toast({
      title: 'OOOPPSS',
      description: 'Algo está mal con esta propiedad. Reporta la propiedad a TI.',
    })

    return
  }

  const entries = Object.entries(values).filter(([, value]) => {
    if (value === null || value === undefined) return false

    return true
  })

  const result = Object.fromEntries(entries)

  result.broker = values.broker?.id

  return result as Partial<PopulatedListing> & { broker: string }
}

const getSelectDefaultValue = (options: SelectOption[], multiple: boolean, value?: string | string[]) => {
  if (multiple) {
    return options.filter((o) => value?.includes(o.value)) ?? undefined
  }

  if (typeof value === 'boolean') {
    if (!value) return booleanOptions.find((o) => o.value === '0')
    return booleanOptions.find((o) => o.value === '1')
  }

  return options.find((o) => value?.includes(o.value)) ?? undefined
}

export function CreateListingForm({ onSuccess, defaultValues, editMode }: Props) {
  const session = useSession()
  const [step, setStep] = useState<'data' | 'media'>('media')
  const [listingId, setListingId] = useState(defaultValues?.['id'] ?? '')
  const [isLoading, setIsLoading] = useState(false)
  const [acceptsTerms, setAcceptTerms] = useState(false)
  const [galleryKeys, setGalleryKeys] = useState<string[]>(defaultValues?.data?.gallery_keys ?? [])
  const { data: brokersData } = useQuery(['brokers'], fetchBrokers)
  const {
    register,
    handleSubmit,
    formState: { errors, defaultValues: _defaultValues },
    control,
    setValue,
    watch,
  } = useForm<Form>({
    resolver: zodResolver(editMode ? updateListingSchema : createListingSchema),
    defaultValues: editMode ? (getDefaultValues(defaultValues) as any) : undefined,
  })
  const brokers = brokersData?.data ?? []
  const propertyType = watch('property_type')
  const isAppartment = propertyType?.includes(PropertyType.APPARTMENT)
  const showCondominuimUnits =
    propertyType?.includes(PropertyType.HOUSE_HORIZONTAL_CONDOMINIUM) ||
    propertyType?.includes(PropertyType.HOUSE_CLOSED_CONDOMINUIM)

  const onCreateSubmit = async (data: Form) => {
    const formData = new FormData()

    if (!showCondominuimUnits && data.data.condominium_units) {
      data.data.condominium_units = undefined
    }

    if (isAppartment) {
      data.sq_m_construction = undefined
      data.sq_m_total = undefined
    }

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
        title: 'Propiedad Creada',
        description: 'Propiedad creada exitosamente. Puedes seguir creando propiedades.',
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

  const onEditSubmit = async (data: Form) => {
    const formData = new FormData()

    if (!showCondominuimUnits && data.data.condominium_units) {
      data.data.condominium_units = undefined
    }

    if (isAppartment) {
      data.sq_m_construction = undefined
      data.sq_m_total = undefined
    }

    data.data.gallery_keys = galleryKeys

    setIsLoading(true)

    formData.append('data', JSON.stringify(data))

    try {
      const res = await fetch(`/api/listings/${listingId}`, {
        method: 'put',
        body: formData,
      })
      await res.json()

      await onSuccess()
      toast({
        title: 'Propiedad Guardada',
        description: 'Propiedad guardada exitosamente.',
      })
    } catch (error) {
      toast({
        title: 'Oooops!',
        description: 'Ocurrió un error. Intenta nuevamente.',
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    if (session.data?.user) {
      const { user } = session.data
      const isBroker = user.role === Role.BROKER

      if (isBroker && user.broker_id) {
        setValue('broker', user.broker_id)
      }
    }
  }, [session, setValue])

  return (
    <>
      {editMode ? (
        <div className="mx-auto w-full max-w-4xl">
          <Carousel>
            {galleryKeys?.map((key) => (
              <Slide src={`${env.NEXT_PUBLIC_CDN}/listings/${listingId}/${key}`} key={key} />
            ))}
          </Carousel>
          <ImageSort
            onChange={setGalleryKeys}
            images={galleryKeys.map((k) => ({
              key: k,
              url: `${env.NEXT_PUBLIC_CDN}/listings/${listingId}/${k}`,
            }))}
          />
        </div>
      ) : null}
      {step === 'data' ? (
        <form noValidate onSubmit={handleSubmit(editMode ? onEditSubmit : onCreateSubmit)}>
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

            <div className="flex w-full flex-1 items-start justify-between gap-5">
              <TextField
                id="name"
                label="Nombre de la propiedad"
                error={errors?.name?.message}
                type="text"
                disabled={isLoading}
                className="grow"
                {...register('name')}
              />
            </div>

            <div className="flex w-full flex-1 flex-wrap items-start justify-between gap-5">
              <SelectField
                disabled={isLoading}
                control={control}
                name="type"
                options={listingTypeOptions}
                label="Tipo"
                defaultSelected={getSelectDefaultValue(listingTypeOptions, false, _defaultValues?.['type'])}
              />

              <SelectField
                disabled={isLoading}
                control={control}
                name="property_type"
                options={propertyTypeOptions}
                label="¿Casa o Depa?"
                multiple
              />

              {showCondominuimUnits ? (
                <TextField
                  id="condominium_units"
                  label="Casas en Condominio"
                  error={errors?.data?.condominium_units?.message}
                  type="number"
                  disabled={isLoading}
                  className="grow"
                  {...register('data.condominium_units')}
                />
              ) : null}
            </div>

            <div className="flex w-full flex-1 items-start justify-between gap-5">
              <TextareaField
                id="description"
                label="Descripción"
                error={errors?.description?.message}
                disabled={isLoading}
                className="grow"
                {...register('description')}
              />
            </div>

            <div className="flex w-full flex-1 items-start justify-between gap-5">
              <NumberField control={control} id="price" label="Precio" name="price" />

              <SelectField
                disabled={isLoading}
                control={control}
                options={listingCurrencyOptions}
                name="price_currency"
                label="Moneda"
              />

              <SelectField
                control={control}
                name="legal_status"
                options={legalStatusOptions}
                label="Situación legal"
              />
            </div>

            <div className="flex w-full flex-1 flex-wrap items-start justify-between gap-5">
              {!isAppartment ? (
                <TextField
                  id="sq_m_total"
                  label="Terreno Total (m2)"
                  error={errors?.sq_m_total?.message}
                  type="number"
                  disabled={isLoading}
                  className="grow"
                  {...register('sq_m_total')}
                />
              ) : null}
              {!isAppartment ? (
                <TextField
                  id="sq_m_construction"
                  label="Contrucción (m2)"
                  error={errors?.sq_m_construction?.message}
                  type="number"
                  disabled={isLoading}
                  className="grow"
                  {...register('sq_m_construction')}
                />
              ) : null}
              <TextField
                id="sq_m_living"
                label="Habitable (m2)"
                error={errors?.sq_m_living?.message}
                type="number"
                disabled={isLoading}
                className="grow"
                {...register('sq_m_living')}
              />
              <TextField
                id="sq_m_terrace"
                label="Terraza (m2)"
                error={errors?.sq_m_terrace?.message}
                type="number"
                disabled={isLoading}
                className="grow"
                {...register('sq_m_terrace')}
              />
              <TextField
                id="sq_m_balcony"
                label="Balcón (m2)"
                error={errors?.sq_m_balcony?.message}
                type="number"
                disabled={isLoading}
                className="grow"
                {...register('sq_m_balcony')}
              />
              <TextField
                id="sq_m_garden"
                label="Jardín (m2)"
                error={errors?.sq_m_garden?.message}
                type="number"
                disabled={isLoading}
                className="grow"
                {...register('sq_m_garden')}
              />
            </div>

            <div className="flex w-full flex-1 flex-wrap items-start justify-between gap-5">
              <NumberField control={control} id="dimension_front" label="Frente" name="dimension_front" />
              <NumberField control={control} id="dimension_depth" label="Fondo" name="dimension_depth" />
            </div>

            <div className="flex w-full flex-1 items-start justify-between gap-5">
              <TextField
                id="rooms"
                type="number"
                label="Habitaciones"
                error={errors?.rooms?.message}
                disabled={isLoading}
                className="grow"
                {...register('rooms')}
              />
              <TextField
                id="full-bathrooms"
                type="number"
                label="Baños Completos"
                error={errors?.full_bathrooms?.message}
                disabled={isLoading}
                className="grow"
                {...register('full_bathrooms')}
              />
              <TextField
                id="half-bathrooms"
                type="number"
                label="Medios Baños"
                error={errors?.half_bathrooms?.message}
                disabled={isLoading}
                className="grow"
                {...register('half_bathrooms')}
              />
              <TextField
                id="parking"
                type="number"
                label="Lugares de Estacionamiento"
                error={errors?.parking_spots?.message}
                disabled={isLoading}
                className="grow"
                {...register('parking_spots')}
              />

              <SelectField
                disabled={isLoading}
                control={control}
                name="parking_spots_style"
                options={parkingSpotStyleOptions}
                label="Tipo de Estacionamiento"
                multiple
              />
            </div>

            <div className="flex w-full flex-1 flex-wrap items-start justify-between gap-5">
              <TextField
                id="service_rooms"
                type="number"
                label="Cuartos de Servicio"
                error={errors?.service_rooms?.message}
                disabled={isLoading}
                className="grow"
                {...register('service_rooms')}
              />
              <TextField
                id="storage_units"
                type="number"
                label="No. de Bodegas"
                error={errors?.storage_units?.message}
                disabled={isLoading}
                className="grow"
                {...register('storage_units')}
              />

              <NumberField
                control={control}
                id="maintenance_cost"
                label="Costo de Mantenimiento"
                name="maintenance_cost"
              />
            </div>

            <div className="flex w-full flex-1 flex-wrap items-start justify-between gap-5">
              <TextField
                id="construction_year"
                type="number"
                label="Año de constucción"
                error={errors?.construction_year?.message}
                disabled={isLoading}
                className="grow"
                {...register('construction_year')}
              />
              <SelectField
                disabled={isLoading}
                control={control}
                name="condition"
                options={listingConditionOptions}
                label="Condición Física Inmueble"
              />

              <SelectField
                disabled={isLoading}
                control={control}
                name="construction_style"
                options={listingContructionStyleOptions}
                label="Estilo de Construcción"
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

              <SelectField
                disabled={isLoading}
                control={control}
                name="views"
                options={listingViewOptions}
                label="Vistas"
                hint="Abierta es jardín, vista padre de edificio, a bosques, etc. Cerrada es edificio de a lado, pared o no tiene."
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
                className="grow"
                {...register('address.street_1')}
              />
              <TextField
                id="neighborhood"
                label="Colonia"
                error={errors?.address?.neighborhood?.message}
                type="text"
                disabled={isLoading}
                className="grow"
                {...register('address.neighborhood')}
              />
              <TextField
                id="number"
                label="Número"
                error={errors?.address?.number?.message}
                type="text"
                disabled={isLoading}
                className="grow"
                {...register('address.number')}
              />
              <TextField
                id="int_number"
                label="Número Interior"
                error={errors?.address?.int_number?.message}
                type="text"
                disabled={isLoading}
                className="grow"
                {...register('address.int_number')}
              />

              <TextField
                id="city"
                label="Ciudad"
                error={errors?.address?.city?.message}
                type="text"
                disabled={isLoading}
                className="grow"
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
                className="grow"
                {...register('address.state', { value: 'CDMX' })}
              />
              <TextField
                id="zipCode"
                label="Código Postal"
                error={errors?.address?.zip_code?.message}
                type="text"
                disabled={isLoading}
                className="grow"
                {...register('address.zip_code')}
              />
            </div>

            <div className="flex w-full flex-1 flex-wrap items-start justify-between gap-5">
              {isAppartment ? (
                <TextField
                  id="development_name"
                  type="text"
                  label="Nombre de Desarrollo"
                  error={errors?.development_name?.message}
                  disabled={isLoading}
                  className="grow"
                  {...register('development_name')}
                />
              ) : null}
              <TextField
                id="stories"
                type="number"
                label="Niveles en la Propiedad"
                error={errors?.stories?.message}
                disabled={isLoading}
                className="grow"
                {...register('stories')}
              />

              {isAppartment ? (
                <TextField
                  id="floor"
                  type="number"
                  label="¿En qué piso está?"
                  error={errors?.floor?.message}
                  disabled={isLoading}
                  className="grow"
                  {...register('floor')}
                />
              ) : null}
            </div>

            {isAppartment ? (
              <div className="flex w-full flex-1 flex-wrap items-start justify-between gap-5">
                <TextField
                  id="development_stories"
                  type="number"
                  label="Total de pisos en el desarrollo"
                  error={errors?.development_stories?.message}
                  disabled={isLoading}
                  className="grow"
                  {...register('development_stories')}
                />
                <TextField
                  id="development_buildings"
                  type="number"
                  label="No. Torres"
                  error={errors?.development_buildings?.message}
                  disabled={isLoading}
                  className="grow"
                  {...register('development_buildings')}
                />

                <TextField
                  id="development_units"
                  type="number"
                  label="Total de Unidades en el desarrollo"
                  error={errors?.development_units?.message}
                  disabled={isLoading}
                  className="grow"
                  {...register('development_units')}
                />
              </div>
            ) : null}

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
                error={errors?.urban_equipment?.message}
                disabled={isLoading}
                className="grow"
                hint="Tipo de alumbrado, pavimento, recolección de basura, etc..."
                {...register('urban_equipment')}
              />

              <NumberField
                name="yearly_tax"
                label="Predial"
                className="grow"
                control={control}
                id="yearly_tax"
              />
              <SelectField
                disabled={isLoading}
                control={control}
                name="data.yearly_tax_period"
                options={[
                  { label: 'Anual', value: 'yearly' },
                  { label: 'Bimestral', value: 'bimonthly' },
                ]}
                label="Recurrencia Predial"
              />
            </div>
          </div>

          <div className="mt-3 flex gap-4">
            <Checkbox
              id="terms"
              checked={acceptsTerms}
              onCheckedChange={(value) => setAcceptTerms(!!value)}
            />
            <Label htmlFor="terms">
              Leí y estoy de acuerdo con los términos y condiciones y el aviso de privacidad
            </Label>
          </div>

          <Button type="submit" disabled={isLoading || !acceptsTerms} className="mt-5 w-full">
            {isLoading && <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />}
            {editMode ? 'Guardar' : 'Subir Galería'}
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

const SelectField = ({ control, name, hint, fullWidth = true, ...props }: SelectFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState: { defaultValues }, fieldState: { error } }) => {
        return (
          <div className={cn('grid grow items-center gap-1.5')}>
            <Select
              fullWidth={fullWidth}
              {...props}
              {...field}
              defaultSelected={getSelectDefaultValue(
                props.options,
                props.multiple ?? false,
                get(defaultValues, name) as any
              )}
            />

            {hint && !error ? <small className="text-sm text-gray-500/50">{hint}</small> : null}
            {error?.message ? <small className="text-sm text-red-400">{error.message}</small> : null}
          </div>
        )
      }}
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
        <div className={cn('grid grow items-center gap-1.5')}>
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

type NumberFieldProps = {
  control: Control<Form>
  name: keyof Omit<Form, 'address' | 'data'> | AddressFields | DataFields
  label: string
  id: string
  hint?: string
} & React.ComponentProps<typeof Input>

const NumberField = ({ control, name, hint, id, label, ...props }: NumberFieldProps) => {
  const mask = createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ',',
    allowDecimal: true,
    decimalSymbol: '.',
    decimalLimit: 2, // how many digits allowed after the decimal
    allowNegative: false,
    allowLeadingZeroes: false,
  })

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ...field }, fieldState: { error } }) => {
        return (
          <div className={cn('grid grow items-center gap-1.5')}>
            {label ? <Label htmlFor={id}>{label}</Label> : null}

            <MaskedInput
              {...props}
              {...field}
              value={value as string}
              mask={mask}
              render={(inputRef: (inputElement: HTMLInputElement) => void, inputProps) => {
                const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
                  inputProps.onChange(e)
                  field.onChange(e)
                }

                return (
                  <Input ref={inputRef} {...inputProps} onChange={onChange} inputMode="numeric" type="text" />
                )
              }}
            />

            {hint && !error ? <small className="text-sm text-gray-500/50">{hint}</small> : null}
            {error?.message ? <small className="text-sm text-red-400">{error.message}</small> : null}
          </div>
        )
      }}
    />
  )
}

function Slide({ src }: { src: string }) {
  return (
    <div className="relative my-4 mr-4 h-96 flex-[0_0_100%] overflow-hidden">
      <Image
        src={`${src}?width=900&resize=contain&quality=60`}
        fill
        className="object-cover object-center"
        alt=""
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}
