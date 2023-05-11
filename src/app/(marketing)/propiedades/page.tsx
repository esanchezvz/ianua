import FeaturedListings from '@/components/mkt/home/featured-listings'
import { listings } from '@/utils/mock-data'

export default function Listings() {
  return (
    <main>
      <FeaturedListings listings={listings} />
    </main>
  )
}
