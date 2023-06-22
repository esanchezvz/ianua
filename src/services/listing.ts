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

export const fetchListings = async <T = Listing[]>(
  params?: Partial<Listing> &
    Pagination & { includes?: string; search?: string; profiler?: string; locality?: string }
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
