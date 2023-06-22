import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Metadata } from 'next'
import Link from 'next/link'

import { AuthForm } from '@/components/auth/auth-form'
import { buttonVariants } from '@/components/ui/button'
import Logo from '@/components/ui/logo'
import { cn } from '@/utils'

export const metadata: Metadata = {
  title: 'Inicia Sesión',
  description: 'Ingresa a tu cuenta.',
}

export default function LoginPage() {
  return (
    <div className="m-x-auto flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(buttonVariants({ variant: 'ghost' }), 'absolute left-4 top-4 md:left-8 md:top-8')}
      >
        <>
          <ChevronLeftIcon className="mr-2 h-4 w-4" />
          Atrás
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Logo className="mb-10 h-full w-full" />
          <h1 className="text-2xl font-semibold tracking-tight">¡Bienvenido!</h1>
        </div>

        <AuthForm />

        {/* <p className="px-8 text-center text-sm ">
          <Link href="/registro" className="hover:text-brand underline underline-offset-4">
            ¿No tienes cuenta todavía? Crea una
          </Link>
        </p> */}
      </div>
    </div>
  )
}
