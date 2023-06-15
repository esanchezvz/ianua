import Link from 'next/link'

import { Container } from '@/components/ui/container'
import Logo from '@/components/ui/logo'

export default function AboutUs() {
  return (
    <section className="bg-light-blue-800  py-24 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-8">
          <div className="max-w-xl grow">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Deja te cuento</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Somos una empresa dedicada a la venta y renta de inmuebles. Nos enfocamos a que el proceso sea
              más efectivo, fácil y transparente. Estas preparado para encontrar tu hogar ideal?
            </p>
          </div>

          <Logo className="h-full" />
        </div>
      </Container>
    </section>
  )
}
