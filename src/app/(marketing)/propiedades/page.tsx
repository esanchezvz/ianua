'use client'

import { ListingStatus } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import ListingPreview from '@/components/shared/listing-preview'
import { Container } from '@/components/ui/container'
import { fetchListings } from '@/services/listing'

export default function Listings() {
  const { data } = useQuery(['featured-listings'], () =>
    fetchListings({
      featured: true,
      status: ListingStatus.PUBLISHED,
    })
  )

  const listings = data?.data.slice(0, 4) || []

  return (
    <Container className="mt-10 p-10">
      <h1 className="mb-4 text-center text-5xl">Propiedades</h1>

      <div className="px-8">
        {listings.map((l) => (
          <ListingPreview key={l.id} listing={l} />
        ))}
      </div>
    </Container>
  )
}
