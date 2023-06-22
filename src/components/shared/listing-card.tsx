'use client'

import { useState } from 'react'

import { faExpand, faBed, faBath, faCar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ShareIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLocation } from 'react-use'

import { Button, buttonVariants } from '@/components/ui/button'
import Carousel from '@/components/ui/carousel'
import { env } from '@/core/env'
import { Listing } from '@/types/listing'
import { listingTypeMap } from '@/utils/listing'

type ListingCardProps = {
  listing: Listing
  share?: boolean
  target?: string
}

export default function ListingCard({ listing, share = true, target }: ListingCardProps) {
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
    const text = listing.description.substring(0, 45) + '...'

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
        {listing.data.gallery_keys.map((key) => (
          <Slide src={`${env.NEXT_PUBLIC_CDN}/listings/${listing.id}/${key}`} key={key} />
        ))}
      </Carousel>

      <div className="mb-2 flex flex-wrap items-center justify-between">
        <b className="text-lg">{listing.name}</b>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-light-blue-300 px-3 py-0.5 text-xs font-medium text-gray-800">
            {listingTypeMap[listing.type]}
          </span>
        </div>
      </div>

      <div className="mb-2 flex items-center justify-between text-sm">
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

      <Link
        href={`/propiedades/${listing.id}`}
        className={buttonVariants({ className: 'w-full' })}
        target={target}
      >
        Ver Propiedad
      </Link>
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
