import FeaturedListings from '@/components/mkt/home/featured-listings'
import { Container } from '@/components/ui/container'
import { listings } from '@/utils/mock-data'

export default function Listings() {
  return (
    <main>
      <Container>
        <p>TBD Filtros Propiedades en lista</p>
      </Container>
      <FeaturedListings listings={listings} />
    </main>
  )
}
