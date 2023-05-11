import { Button } from '@/components/ui/button'

type HeroProps = {
  openProfilerModal: () => void
}

export default function Hero({ openProfilerModal }: HeroProps) {
  return (
    <section className="flex h-screen flex-col items-center justify-center bg-home-hero bg-cover">
      <div className="mx-auto  max-w-2xl text-center">
        <h1 className="-mt-20 text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Deja que tu casa te encuentre
        </h1>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button onClick={openProfilerModal}>Buscar Propiedades</Button>
        </div>
      </div>
    </section>
  )
}
