import { Listing } from '@prisma/client'
import axios from 'axios'

import { ApiResponse } from '@/types/api'

export const fetchListings = async (params?: Partial<Listing>) => {
  try {
    const res = await axios.get<ApiResponse<Listing[]>>('/api/listings', {
      params,
    })
    return res.data
  } catch (err) {
    throw err
  }
}
