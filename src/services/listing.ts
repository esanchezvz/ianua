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

export const fetchListings = async (params?: Partial<Listing> & Pagination) => {
  try {
    const res = await axios.get<ApiResponse<Listing[]>>('/api/listings', {
      params,
    })
    return res.data
  } catch (err) {
    throw err
  }
}
