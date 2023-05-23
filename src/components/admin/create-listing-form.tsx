'use client'

import { useState } from 'react'

import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { Role } from '@prisma/client'
import { error } from 'console'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm, Control, Controller } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { type SelectOption, Select } from '@/components/ui/select'
import { TextField } from '@/components/ui/text-field'
import { TextareaField } from '@/components/ui/textarea-field'
import { createListingSchema } from '@/core/validations/listing'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/utils'

type CreateUserFormProps = React.HTMLAttributes<HTMLDivElement>

type FormData = z.infer<typeof createListingSchema>

export function CreateListingForm() {
  const searchParams = useSearchParams()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(createListingSchema),
  })
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: FormData) => {
    console.log(data)
  }

  console.log(errors)

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center justify-between gap-5">
        <div className="flex w-full flex-1 flex-wrap items-center justify-between gap-5">
          <TextField
            id="name"
            placeholder="Ej. Citta San Jeronimo"
            label="Nombre"
            error={errors?.name?.message}
            type="text"
            disabled={isLoading}
            className="grow"
            {...register('name')}
          />
          <SelectField
            control={control}
            name="ammenities"
            options={[]}
            label="Amenidades"
            multiple
            fullWidth
          />
        </div>
        <div className="flex w-full flex-1 items-center justify-between gap-5">
          <TextareaField
            id="description"
            placeholder="Ej. Citta San Jeronimo"
            label="Descripción"
            error={errors?.description?.message}
            disabled={isLoading}
            className="grow"
            {...register('description')}
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
  control: Control<FormData>
  name: keyof FormData
  hint?: string
} & React.ComponentProps<typeof Select>

const SelectField = ({ control, name, hint, ...props }: SelectFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={cn('grid grow items-center gap-1.5')}>
          <Select {...props} {...field} />

          {hint && !error ? <small className="text-sm text-gray-500/50">{hint}</small> : null}
          {error?.message ? <small className="text-sm text-red-400">{error.message}</small> : null}
        </div>
      )}
    />
  )
}
