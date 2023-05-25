'use client'

import { useState } from 'react'

import { faExpand, faBed, faBath, faCar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ShareIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useLocation } from 'react-use'

import { Button } from '@/components/ui/button'
import Carousel from '@/components/ui/carousel'
import { type Listing } from '@/utils/mock-data'

type ListingCardProps = {
  listing: Listing // TODO - update type
  share?: boolean
}

const categoriesMap: Record<string, string> = {
  for_sale: 'En Venta',
  for_rent: 'En Renta',
}

export default function ListingCard({ listing, share = true }: ListingCardProps) {
  const router = useRouter()
  const location = useLocation()
  const [renderShare, setRenderShare] = useState(false)

  const handleCardHover = (e: React.MouseEvent) => {
    if (!share) return
    if (!navigator.share) return

    const { type } = e

    if (type === 'mouseenter') setRenderShare(true)
    if (type === 'mouseleave') setRenderShare(false)
  }

  const handleShare = async () => {
    const url = `${location.origin}/propiedades/${listing.id}`
    const title = 'Checa esta propiedad | IANUA'
    const text =
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt sed eligendi reiciendis eos assumenda placeat sunt deserunt aliquid.'

    try {
      await navigator.share({
        url,
        title,
        text,
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div
      className="relative overflow-hidden rounded-lg sm:max-w-[330px]"
      onMouseEnter={handleCardHover}
      onMouseLeave={handleCardHover}
    >
      {renderShare ? (
        <Button
          variant="ghost"
          className="absolute right-0 top-0 z-1 m-2 flex h-6 w-6 items-center justify-center rounded-full bg-white p-0"
          onClick={handleShare}
        >
          <ShareIcon className="h-4 w-4 text-blue-50" />
        </Button>
      ) : null}

      <Carousel>
        {listing.images.map((src, i) => (
          <Slide src={src} key={i} />
        ))}
      </Carousel>

      <div className="mb-2 flex flex-wrap items-center justify-between">
        <b className="text-lg">{listing.title}</b>

        <div className="flex items-center gap-2">
          {listing.categories.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full bg-light-blue-300 px-3 py-0.5 text-xs font-medium text-gray-800"
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
      <Image
        src={src}
        fill
        className="object-cover object-center"
        alt=""
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}
