import Link from 'next/link'

import { PachonMessage } from '@/components/shared/pachon-message'
import { buttonVariants } from '@/components/ui/button'
import { CircleBackground } from '@/components/ui/circle-background'
import { Container } from '@/components/ui/container'

export default function CallToAction() {
  return (
    <section id="get-free-shares-today" className="relative overflow-hidden bg-blue-500 py-20 sm:py-28">
      <div className="absolute left-20 top-1/2 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2">
        <CircleBackground color="#fff" className="animate-spin-slower" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-md sm:text-center">
          <div className="translate-x-[85px]">
            <PachonMessage
              variant="light"
              message="Estás a solo 3 minutos de encontrar tu hogar ideal. Usa nuestro perfilador para que llegue a ti."
            />
          </div>

          <Link
            className={buttonVariants({ variant: 'secondary', className: 'mt-10' })}
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Solicitar Crédito
          </Link>
        </div>
      </Container>
    </section>
  )
}
