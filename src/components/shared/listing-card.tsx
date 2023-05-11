'use client'

import { faExpand, faBed, faBath, faCar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import Carousel from '@/components/ui/carousel'
import { type Listing } from '@/utils/mock-data'

type ListingCardProps = {
  listing: Listing // TODO - update type
}

const categoriesMap: Record<string, string> = {
  for_sale: 'En Venta',
  for_rent: 'En Renta',
}

export default function ListingCard({ listing }: ListingCardProps) {
  const router = useRouter()

  return (
    <div className="overflow-hidden rounded-lg">
      <Carousel>
        {listing.images.map((src, i) => (
          <Slide src={src} key={i} />
        ))}
      </Carousel>

      <div className="mb-2 flex items-center justify-between">
        <b className="text-lg">{listing.title}</b>

        <div className="flex items-center gap-2">
          {listing.categories.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium text-gray-800"
            >
              {categoriesMap[t]}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-2 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon className="h-4 w-4 text-gray-400" aria-hidden="true" icon={faExpand} />
          <span>{listing.sq_m} m2</span>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon className="h-4 w-4 text-gray-400" aria-hidden="true" icon={faBed} />
          <span>{listing.rooms}</span>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon className="h-4 w-4 text-gray-400" aria-hidden="true" icon={faBath} />
          <span>{listing.baths}</span>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon className="h-4 w-4 text-gray-400" aria-hidden="true" icon={faCar} />
          <span>{listing.garage}</span>
        </div>
      </div>

      <Button type="button" onClick={() => router.push(`/propiedades/${listing.id}`)} className="w-full">
        Ver Propiedad
      </Button>
    </div>
  )
}

type SlideProps = {
  src: string
}

function Slide({ src }: SlideProps) {
  return (
    <div className="relative mr-4 h-56 flex-[0_0_100%] overflow-hidden rounded-t-lg">
      <Image src={src} fill className="object-cover object-center" alt="" />
    </div>
  )
}
