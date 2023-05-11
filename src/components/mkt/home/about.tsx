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
              Todos te ofrecen lo que piensan que quieres, no lo que realmente necesitas. Queremos conocerte
              mejor, con base a una breve serie de preguntas el perfilador de <b>IANUA</b> se encarga de
              encontrar las propiedades que son perfectas para ti.
              <br /> Deja que tu hogar te encuentre.
            </p>
          </div>

          <Logo className="h-full" />
        </div>
      </Container>
    </section>
  )
}