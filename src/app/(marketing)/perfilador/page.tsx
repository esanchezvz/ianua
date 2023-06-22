import { ProfilerCarousel } from '@/components/mkt/profiler-carousel'
import { PachonMessage } from '@/components/shared/pachon-message'

export default function Profiler() {
  return (
    <main className="flex h-full">
      <div className="hidden h-full grow-[2] flex-col items-center justify-center bg-blue text-white md:flex">
        <div className="max-w-[500px]">
          <PachonMessage
            variant="light"
            message="Todos te ofrecen lo que piensan que quieres, no lo que realmente necesitas. Queremos conocerte mejor,
        con base a una breve serie de preguntas el perfilador de IANUA se encarga de encontrar las propiedades
        que son perfectas para ti. Deja que tu hogar te encuentre."
          />
        </div>
      </div>
      <div className="relative flex h-full grow-[6] flex-col items-center justify-center bg-white p-10 md:w-[50%]">
        <ProfilerCarousel />
      </div>
    </main>
  )
}
