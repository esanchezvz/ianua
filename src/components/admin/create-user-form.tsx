'use client'

import { useState } from 'react'

import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { Role } from '@prisma/client'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/text-field'
import { createUserSchema } from '@/core/validations/user'
import { toast } from '@/hooks/use-toast'

type CreateUserFormProps = React.HTMLAttributes<HTMLDivElement>

type FormData = z.infer<typeof createUserSchema>

export function CreateUserForm() {
  const searchParams = useSearchParams()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(createUserSchema),
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    const res = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({ ...data, role: Role.BROKER }),
    })

    const result = await res.json()

    if (result.error) {
      setIsLoading(false)
      return toast({
        title: 'Oooops!',
        description: 'Ocurrió un error. Intenta nuevamente.',
        variant: 'destructive',
      })
    }

    await signIn('email', {
      email: data.email.toLowerCase().trim(),
      redirect: false,
      callbackUrl: searchParams?.get('from') || '/admin/listings',
      name: data.name?.trim(),
    })

    reset()

    setIsLoading(false)

    return toast({
      title: 'Usuario Creado',
      description: 'Hemos enviado un link al correo proporcionando para que puedan iniciar sesión.',
    })
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center justify-between gap-5">
        <div className="flex flex-1 items-center justify-between gap-5">
          <TextField
            id="name"
            placeholder="María de los Angeles"
            label="Nombre (s)"
            error={errors?.name?.message}
            type="text"
            autoCorrect="off"
            disabled={isLoading}
            className="grow"
            {...register('name')}
          />
        </div>
        <div className="flex items-center justify-between gap-5">
          <TextField
            id="surname_1"
            placeholder="Gutierrez"
            label="Apellido Paterno"
            error={errors?.surname_1?.message}
            type="text"
            autoCorrect="off"
            disabled={isLoading}
            className="flex-1"
            {...register('surname_1')}
          />
          <TextField
            id="surname_1"
            placeholder="Álvarez"
            label="Apellido Materno"
            error={errors?.surname_2?.message}
            type="text"
            autoCorrect="off"
            disabled={isLoading}
            className="flex-1"
            {...register('surname_2')}
          />
        </div>
        <div className="flex items-center justify-between gap-5">
          <TextField
            id="email"
            label="Correo Electrónico"
            error={errors?.email?.message}
            type="email"
            placeholder="tu@correo.com"
            autoCorrect="off"
            disabled={isLoading}
            className="flex-1"
            {...register('email')}
          />
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="mt-5">
        {isLoading && <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />}
        Iniciar sesión
      </Button>
    </form>
  )
}
