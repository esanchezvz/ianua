import { Listing as PrismaListing } from '@prisma/client'

export type ListingAddress = {
  street_1: string
  street_2?: string
  number: string
  int_number?: string
  city: string
  neighborhood: string
  state: string
  zip_code: string
}

export type ListingData = {
  yearly_tax_period: string
  gallery_keys: string[]
}

export type Listing = Override<
  PrismaListing,
  {
    address: ListingAddress
    data: ListingData
  }
>
