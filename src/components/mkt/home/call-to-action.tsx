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
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">Este es titulo</h2>
          <p className="mt-4 text-lg text-gray-300">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis vitae laboriosam tenetur,
            explicabo atque id sint eum quaerat nisi hic? Maxime asperiores repellat incidunt suscipit quis
            ratione sequi quisquam ullam.
          </p>
        </div>
      </Container>
    </section>
  )
}
