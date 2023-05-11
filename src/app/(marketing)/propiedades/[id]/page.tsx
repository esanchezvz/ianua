import { Container } from '@/components/ui/container'
import { listings, type Listing } from '@/utils/mock-data'

type ListingProps = {
  listing: Listing[]
  params: {
    id: string
  }
}

export default function Listing({ params: { id } }: ListingProps) {
  const listing = listings.find((p) => p.id === id) ?? null
  return (
    <>
      <main>
        <Container className="p-20">
          <pre className="">{JSON.stringify(listing, null, 2)}</pre>
        </Container>
      </main>
    </>
  )
}
