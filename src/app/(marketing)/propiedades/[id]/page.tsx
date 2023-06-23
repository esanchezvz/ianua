import { faExpand, faBed, faBath, faCar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ListingType } from '@prisma/client'
import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { env } from '@/core/env'
import { Listing } from '@/types/listing'
import {
  ammenitiesMap,
  legalStatusMap,
  listingConditionsMap,
  listingPrivateServicesMap,
  listingPublicServicesMap,
  listingTypeMap,
} from '@/utils/listing'

import { Gallery } from './gallery'

type ListingProps = {
  params: {
    id: string
  }
}

export default async function Listing({ params: { id } }: ListingProps) {
  const res = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/listings/${id}`, { method: 'get' })
  const { data: listing }: { data: Listing } = await res.json()

  const galleryImages = listing.data.gallery_keys.map(
    (key) => `${env.NEXT_PUBLIC_CDN}/listings/${listing.id}/${key}`
  )

  return (
    <div className="flex flex-col md:flex-row md:pr-14">
      <main className="grow md:w-[calc(100%-320px)]">
        <Container className="w-full pb-10 pt-20">
          <Gallery images={galleryImages} />

          <div className="flex flex-wrap items-center justify-between">
            <div className="my-5 mb-2 flex items-center gap-5">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon className="h-4 w-4 text-gray-400" aria-hidden="true" icon={faExpand} />
                <span>{listing.sq_m_total} m2</span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon className="h-4 w-4 text-gray-400" aria-hidden="true" icon={faBed} />
                <span>{listing.rooms}</span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon className="h-4 w-4 text-gray-400" aria-hidden="true" icon={faBath} />
                <span>{listing.full_bathrooms}</span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon className="h-4 w-4 text-gray-400" aria-hidden="true" icon={faCar} />
                <span>{listing.parking_spots}</span>
              </div>
            </div>
          </div>

          <div className="mb-2 flex flex-wrap items-center justify-between">
            <div className="flex flex-col gap-0">
              <h1 className="my-4 text-3xl">{listing.name}</h1>
              <div className="flex gap-3">
                <p className="text-2xl">{currency.format(listing.price)}</p>

                {listing.maintenance_cost ? (
                  <p className="text-lg">- {currency.format(listing.maintenance_cost)} Mantenimiento</p>
                ) : null}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-light-blue-300 px-3 py-0.5 font-medium text-gray-800">
                {listingTypeMap[listing.type]}
              </span>
            </div>
          </div>

          <p className="my-5">{listing.description}</p>

          {listing.construction_year ? (
            <>
              <h3 className="mb-2 mt-5 text-xl">Año de Construcción</h3>
              <div className="flex flex-wrap gap-5">
                <p>{listing.construction_year}</p>
              </div>
            </>
          ) : null}

          {listing.condition ? (
            <>
              <h3 className="mb-2 mt-5 text-xl">Condición física del inmueble</h3>
              <div className="flex flex-wrap gap-5">
                <p>{listingConditionsMap[listing.condition]}</p>
              </div>
            </>
          ) : null}

          <h3 className="mb-2 mt-5 text-xl">Amenidades</h3>
          <div className="flex w-full flex-wrap gap-5">
            {listing.ammenities.map((a) => (
              <span key={a} className="w-max rounded-full bg-light-blue px-3 py-0.5 ">
                {ammenitiesMap[a]}
              </span>
            ))}
          </div>

          <h3 className="mb-2 mt-5 text-xl">Servicios Cercanos</h3>
          <div className="flex flex-wrap gap-5">
            {listing.public_services.map((a) => (
              <span key={a} className="w-max rounded-full bg-red px-3 py-0.5 text-white ">
                {listingPublicServicesMap[a]}
              </span>
            ))}
            {listing.private_services.map((a) => (
              <span key={a} className="w-max rounded-full bg-red px-3 py-0.5 text-white ">
                {listingPrivateServicesMap[a]}
              </span>
            ))}
          </div>

          {listing.legal_status ? (
            <>
              <h3 className="mb-2 mt-5 text-xl">Situación legal</h3>
              <div className="flex flex-wrap gap-5">
                <p>{legalStatusMap[listing.legal_status]}</p>
              </div>
            </>
          ) : null}

          {listing.type === ListingType.FOR_SALE ? (
            <p className="mt-10 text-xs text-gray-400">
              El precio de venta no incluye los gastos e impuestos de escrituración, los cuales deberán ser
              asumidos por el comprador. En el caso de operaciones que involucren un crédito bancario, los
              costos de comisión de apertura, gastos de investigación, avalúo, impuestos de escrituración,
              cargos crediticios, entre otros, estarán sujetos a las condiciones establecidas por la
              institución financiera que otorgue el crédito. Es importante destacar que la descripción de la
              propiedad proporcionada en este contrato debe considerarse como una percepción personal, sin que
              necesariamente refleje la opinión de todas las partes involucradas. Todas las medidas
              mencionadas son de carácter orientativo y no se consideran exactas. Las medidas precisas serán
              aquellas indicadas en el título de propiedad correspondiente a cada inmueble. La disponibilidad
              y los precios de todas las propiedades y/o inmuebles están sujetos a cambios sin previo aviso.
              Se recomienda verificar la disponibilidad actualizada y los precios con BR360 antes de tomar
              cualquier decisión o compromiso. Estas disposiciones se incluyen con el objetivo de proporcionar
              una mayor claridad y transparencia en relación con los gastos, la descripción de la propiedad,
              las medidas y la disponibilidad de los inmuebles, brindando así un marco más completo y preciso
              para las operaciones inmobiliarias.
            </p>
          ) : null}
        </Container>
      </main>
      <aside className="sticky top-0 w-full p-3 pt-16 md:h-screen md:w-[320px]">
        <Link
          href=" https://crediteka.com/ianua/precalificate"
          target="_blank"
          className={buttonVariants({ className: 'w-full md:mt-20', variant: 'outline' })}
        >
          Precalifica para un crédito hipotecario
        </Link>

        <Link
          href={`https://wa.me/+525537627716?text=${encodeURIComponent(
            `Hola, me gustaría agendar una cita para ver la propiedad de ${listing.name}`
          )}`}
          className={buttonVariants({ variant: 'default', className: 'mt-5 w-full' })}
          target="_blank"
        >
          Agendar Cita
        </Link>
      </aside>
    </div>
  )
}

const currency = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
})
