'use client'

import { ListingStatus } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import ListingCard from '@/components/shared/listing-card'
import { buttonVariants } from '@/components/ui/button'
import { fetchListings } from '@/services/listing'
import { cn } from '@/utils'

export default function FeaturedListings() {
  const { data } = useQuery(['featured-listings'], () =>
    fetchListings({
      featured: true,
      status: ListingStatus.PUBLISHED,
    })
  )

  if (!data) return null

  const listings = data.data.slice(0, 4)

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Propiedades</h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-red-300 pt-10 sm:mt-16 sm:grid-cols-2 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {listings.map((t) => (
            <ListingCard listing={t} key={t.id} />
          ))}
        </div>

        {/* <div className="flex items-center justify-center">
          <Link href="/propiedades" className={cn(buttonVariants({ variant: 'link' }), 'mt-10')}>
            Ver Mas
          </Link>
        </div> */}
      </div>
    </section>
  )
}
