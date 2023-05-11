import Link from 'next/link'

export default function Hero() {
  return (
    <section className="flex h-screen flex-col items-center justify-center bg-home-hero bg-cover">
      <div className="mx-auto  max-w-2xl text-center">
        <h1 className="-mt-20 text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Deja que tu casa te encuentre
        </h1>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="#"
            className="rounded-md bg-blue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Buscar Propiedades
          </Link>
        </div>
      </div>
    </section>
  )
}
