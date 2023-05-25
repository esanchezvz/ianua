'use client'

import { useEffect, useRef, useState } from 'react'

import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
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
  listingPrivateServicesOptions,
  listingPublicServicesOptions,
  lsitingTypeOptions,
  propertyTypeOptions,
} from '@/utils/listing'

import { Label } from '../ui/label'
import { RadioGroup } from '../ui/radio-group'
import { RadioGroupItem } from '../ui/radio-group'

type Form = z.infer<typeof createListingSchema>
const _Address = createListingSchema.pick({ address: true })
type _AddressFields = z.infer<typeof _Address>['address']

type AddressFields = `address.${keyof _AddressFields}`

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
  const [brokers, setBrokers] = useState<SelectOption[]>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [formData, setFormData] = useState<FormData>()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Form>({
    resolver: zodResolver(createListingSchema),
  })
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: Form) => {
    const galleryItems = formData?.getAll('gallery')
    if (!galleryItems?.length || !formData) {
      return toast({
        title: 'Oooops!',
        description: 'No olvides agregar las imagenes de la galería.',
        variant: 'destructive',
      })
    }

    setIsLoading(true)

    formData.append('data', JSON.stringify(data))

    try {
      const res = await fetch('/api/listings', {
        method: 'post',
        body: formData,
      })
      await res.json()

      onSuccess()

      toast({
        title: 'Pripedad Creada',
        description: 'La propiedad creaada exitosamente. Puedes seguir creando propiedades.',
      })

      // reset()
    } catch (error) {
      toast({
        title: 'Oooops!',
        description: 'Ocurrió un error. Intenta nuevamente.',
        variant: 'destructive',
      })
    }

    setIsLoading(false)
  }

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return
    }

    const formData = new FormData()

    Array.from(event.target.files).forEach((file) => {
      formData.append(event.target.name, file)
    })

    setFormData(formData)
  }

  useEffect(() => {
    const fetchBrokers = async () => {
      const res = await fetch('/api/brokers', {
        method: 'get',
      })

      const { data } = (await res.json()) as {
        data: {
          id: string
          user: { name: string; surname_1: string; surname_2: string }
        }[]
      }

      const _brokers = data.map((r) => ({
        value: r.id,
        label: `${r.user.name} ${r.user.surname_1} ${r.user.surname_2}`,
      }))

      setBrokers(_brokers)
    }

    fetchBrokers()
  }, [])

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center justify-between gap-5">
        <div className="flex w-full flex-1 flex-wrap items-start justify-between gap-5">
          <TextField
            id="name"
            label="Nombre"
            error={errors?.name?.message}
            type="text"
            disabled={isLoading}
            className="flex-1"
            {...register('name')}
          />
          <SelectField
            disabled={isLoading}
            control={control}
            name="ammenities"
            options={ammenitiesOptions}
            label="Amenidades"
            multiple
          />
        </div>
        <div className="flex w-full flex-1 flex-wrap items-start justify-between gap-5">
          <SelectField
            disabled={isLoading}
            control={control}
            name="broker"
            options={brokers}
            label="Broker"
          />
          <SelectField
            disabled={isLoading}
            control={control}
            name="property_type"
            options={propertyTypeOptions}
            label="¿Casa o Depa?"
          />
          <SelectField
            disabled={isLoading}
            control={control}
            name="type"
            options={lsitingTypeOptions}
            label="Tipo"
          />
        </div>
        <div className="flex w-full flex-1 flex-wrap items-start justify-between gap-5">
          <TextField
            id="price"
            label="Precio"
            error={errors?.price?.message}
            type="number"
            disabled={isLoading}
            className="flex-1"
            {...register('price')}
          />

          <TextField
            id="sq_m"
            label="Metros Cuadrados Habitables"
            error={errors?.sq_m?.message}
            type="number"
            disabled={isLoading}
            className="flex-1"
            {...register('sq_m')}
          />

          <TextField
            id="sq_m_extra"
            label="Metros Cuadrados Extra"
            error={errors?.sq_m_extra?.message}
            type="number"
            disabled={isLoading}
            hint="Terraza o Jardín"
            className="flex-1"
            {...register('sq_m_extra')}
          />
          <TextField
            id="sq_m_total"
            label="Metros Cuadrados Terreno"
            error={errors?.sq_m_total?.message}
            type="number"
            disabled={isLoading}
            className="flex-1"
            {...register('sq_m_total')}
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
            type="number"
            disabled={isLoading}
            className="flex-1"
            {...register('address.number')}
          />
          <TextField
            id="int_number"
            label="Número Interior"
            error={errors?.address?.int_number?.message}
            type="number"
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
            name="address.neighborhood"
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
        <div className="flex w-full flex-1 items-start justify-between gap-5">
          <TextField
            id="age"
            type="number"
            label="Edad Inmueble (Años)"
            error={errors?.age?.message}
            disabled={isLoading}
            className="flex-1"
            {...register('age')}
          />
          <TextField
            id="bathrooms"
            type="number"
            label="Baños"
            error={errors?.age?.message}
            disabled={isLoading}
            className="flex-1"
            {...register('bathrooms')}
          />

          <SelectField
            disabled={isLoading}
            control={control}
            name="climate"
            options={climateOptions}
            label="Clima"
          />
        </div>

        <div className="flex w-full flex-1 items-start justify-between gap-5">
          <RadioGroupField
            disabled={isLoading}
            control={control}
            options={rangeOptions}
            name="condition"
            label="Condición Inmueble"
          />

          <RadioGroupField
            disabled={isLoading}
            control={control}
            options={rangeOptions}
            name="event_policy_strictness"
            label="¿Qué tan estrictos son para eventos?"
          />
        </div>

        <div className="flex w-full flex-1 items-start justify-between gap-5">
          <TextField
            id="constuction-style"
            type="text"
            label="Estilo de Constucción"
            error={errors?.construction_style?.message}
            disabled={isLoading}
            className="flex-1"
            {...register('construction_style')}
          />
          <TextField
            id="development-name"
            type="text"
            label="Nombre de Desarrollo"
            error={errors?.development_name?.message}
            disabled={isLoading}
            className="flex-1"
            {...register('development_name')}
          />
          <TextField
            id="development-buildings"
            type="number"
            label="Edificios / Torres"
            error={errors?.development_buildings?.message}
            disabled={isLoading}
            className="flex-1"
            {...register('development_buildings')}
          />

          <TextField
            id="development-stories"
            type="number"
            label="Número de Pisos"
            error={errors?.development_stories?.message}
            disabled={isLoading}
            className="flex-1"
            {...register('development_stories')}
          />
        </div>

        <div className="flex w-full flex-1 items-start justify-between gap-5">
          <RadioGroupField
            disabled={isLoading}
            control={control}
            options={rangeOptions}
            name="natural_lighting"
            label="Iluminación Natural"
          />
          <TextField
            id="social-areas"
            type="text"
            label="Áreas Sociales Cercanas"
            error={errors?.nearby_social_areas?.message}
            disabled={isLoading}
            className="flex-1"
            hint="Separados por comas. Ej. Bares, Restaurantes, etc..."
            {...register('nearby_social_areas')}
          />
        </div>

        <div className="flex w-full flex-1 items-start justify-between gap-5">
          <TextField
            id="floor"
            type="number"
            label="¿En qué piso está?"
            error={errors?.floor?.message}
            disabled={isLoading}
            className="flex-1"
            {...register('floor')}
          />

          <SelectField
            disabled={isLoading}
            control={control}
            options={booleanOptions}
            name="furnished"
            label="Amueblado"
          />
        </div>

        <div className="flex w-full flex-1 items-start justify-between gap-5">
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
            id="views"
            type="text"
            label="Vistas"
            error={errors?.views?.message}
            disabled={isLoading}
            className="flex-1"
            {...register('views')}
          />

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
            options={booleanOptions}
            name="pet_friendly"
            label="Pet Friendly"
          />
        </div>

        <div className="flex w-full flex-1 items-start justify-between gap-5">
          <TextField
            id="gallery"
            type="file"
            label="Galería"
            name="gallery"
            accept="image/*"
            multiple
            ref={fileInputRef}
            placeholder="Galeria"
            disabled={isLoading}
            className="flex-1"
            onChange={onFileInputChange}
          />
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="mt-5 w-full">
        {isLoading && <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />}
        Crear Propiedad
      </Button>
    </form>
  )
}

type SelectFieldProps = {
  control: Control<Form>
  name: keyof Form | AddressFields
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
