'use client'
import { useState } from 'react'

import { CurrencyDollarIcon, LifebuoyIcon, ScaleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

import { PachonMessage } from '@/components/shared/pachon-message'
import { Button, buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import Modal from '@/components/ui/modal'
const features = [
  {
    name: 'Asosería Legal',
    description:
      'Deja que nuestro equipo te asesore; aún si quieres comprar con nosotros o no. Todo de la manera más transparente y segura.',
    icon: ScaleIcon,
  },
  {
    name: 'Créditos Hipotecarios',
    description:
      '¿Estás preparado? Estás a un paso de tu hogar ideal. Un crédito hipotecario te puede ayudar a que vivas antes tu sueño. Lee más sobre las ofertas de nuestros aliados.',
    icon: CurrencyDollarIcon,
    key: 'credit',
  },
  {
    name: 'Asistencias',
    description: 'Comming Soon',
    icon: LifebuoyIcon,
  },
]

export default function Services() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <section aria-label="Servicios ofrecidos por Ianua" className="py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-gray-900">Estos son nuestros servicios</h2>
          <p className="mt-2 text-lg text-gray-600">
            Nuestros servicios están diseñados para que tomes la mejor decisión y tengas la tranquilidad que
            nosotros estamos contigo aún después de comprar o rentar con Ianua.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3"
        >
          {features.map((feature) => (
            <li key={feature.name} className="rounded-2xl border border-gray-200 p-8">
              <feature.icon className="h-8 w-8" />
              <h3 className="mt-6 font-semibold text-gray-900">{feature.name}</h3>
              <p className="mt-2 text-gray-700">{feature.description}</p>

              {feature.key === 'credit' ? (
                <Button variant="ghost" onClick={() => setModalOpen(true)} className="ml-auto">
                  Ver Más
                </Button>
              ) : null}
            </li>
          ))}
        </ul>
      </Container>

      <Modal
        className="max-w-xl"
        title="Créditos Hipotecarios"
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <PachonMessage
          pachon="card"
          message="Un crédito hipotecario puede ser la diferencia para comenzar a vivir tu sueño. Te recomiendo usar la calculadora de créditos antes del perfilador y así darte un mejor estimado en tu búsqueda. ¡Deja que tu hogar te encuentre!"
        />
        <Link
          href="https://crediteka.com/ianua/#conCalculator"
          target="_blank"
          className={buttonVariants({ className: 'mt-10 w-full' })}
        >
          Calculadora de Créditos
        </Link>
      </Modal>
    </section>
  )
}
