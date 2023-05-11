import ListingCard from '@/components/shared/listing-card'
import { type Listing } from '@/utils/mock-data'

type FeaturedListingsProps = {
  listings: Listing[]
}

export default function FeaturedListings({ listings }: FeaturedListingsProps) {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-brandGreen text-3xl font-bold tracking-tight sm:text-4xl">Propiedades</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, aspernatur sint repudiandae
            laboriosam.
          </p>
        </div>
        <div className="border-brandOrange mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {listings.map((t) => (
            <ListingCard listing={t} key={t.id} />
          ))}
        </div>
      </div>
    </section>
  )
}
