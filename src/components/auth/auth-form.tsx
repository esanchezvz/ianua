'use client'

import { useState } from 'react'

import { ArrowPathIcon, UserIcon, AtSymbolIcon } from '@heroicons/react/24/solid'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { buttonVariants } from '@/components/ui/button'
import { TextField } from '@/components/ui/text-field'
import { useCaptcha } from '@/context/captcha'
import { loginSchema, registerSchema } from '@/core/validations/auth'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/utils'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  register?: boolean
}

type FormData = Merge<z.infer<typeof loginSchema> | z.infer<typeof registerSchema>>

export function AuthForm({ className, register: isRegister, ...props }: UserAuthFormProps) {
  const { captchaToken } = useCaptcha()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const searchParams = useSearchParams()

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)

    const signInResult = await signIn('email', {
      email: data.email.toLowerCase().trim(),
      redirect: false,
      callbackUrl: searchParams?.get('from') || '/admin/listings',
      name: data.name?.trim(),
    })

    setIsLoading(false)

    if (signInResult?.error) {
      return toast({
        title: 'Oooops!',
        description: 'Ocurrió un error. Intenta nuevamente.',
        variant: 'destructive',
      })
    }

    return toast({
      title: 'Revisa tu correo',
      description: 'Te enviamos un link para poder iniciar sesión.',
    })
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-2">
          <div className="grid gap-2">
            {isRegister ? (
              <TextField
                id="name"
                placeholder="Jon Snow"
                label="Nombre"
                error={errors?.name?.message}
                type="text"
                autoCorrect="off"
                disabled={isLoading}
                leadingIcon={UserIcon}
                {...register('name')}
              />
            ) : null}
            <TextField
              id="email"
              label="Correo Electrónico"
              error={errors?.email?.message}
              type="email"
              placeholder="tu@correo.com"
              autoCorrect="off"
              disabled={isLoading}
              leadingIcon={AtSymbolIcon}
              {...register('email')}
            />
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />}
            Iniciar sesión
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">O iniciar sesión con</span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: 'outline' }))}
        onClick={() => {
          signIn('google')
        }}
        disabled={isLoading}
      >
        Google
      </button>
    </div>
  )
}
