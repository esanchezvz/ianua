import Link from 'next/link'

import { Container } from '@/components/ui/container'
import Logo from '@/components/ui/logo'

export default function AboutUs() {
  return (
    <section className="bg-light-blue py-24 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-8">
          <div className="max-w-xl grow">
            <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">Deja te cuento</h2>
            <p className="mt-6 text-lg leading-8">
              Somos una empresa que busca simplificar las operaciones inmobiliarias en México. Nos enfocamos
              en que el proceso sea más efectivo, fácil y transparente. <br />
              ¿Estás preparado para encontrar tu hogar ideal?
            </p>
          </div>

          <Logo className="h-full max-w-[420px]" />
        </div>
      </Container>
    </section>
  )
}
