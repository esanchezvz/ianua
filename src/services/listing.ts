import { PropertyType } from '@prisma/client'
import axios from 'axios'

import { ApiResponse } from '@/types/api'
import { Listing } from '@/types/listing'

type Pagination =
  | {
      limit?: never
      page?: never
    }
  | {
      limit: number
      page: number
    }

interface ExtendedListing extends Listing {
  property_type_filter: PropertyType | PropertyType[]
}

export const fetchListings = async <T = Listing[]>(
  params?: Partial<ExtendedListing> &
    Pagination & {
      includes?: string
      search?: string
      profiler?: string
      locality?: string
      filtered?: boolean
    }
) => {
  try {
    const res = await axios.get<ApiResponse<T>>('/api/listings', {
      params,
    })
    return res.data
  } catch (err) {
    throw err
  }
}
