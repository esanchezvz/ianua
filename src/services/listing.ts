import axios from 'axios'

import { ApiResponse } from '@/types/api'

export const fetchListings = async () => {
  try {
    const res = await axios.get<ApiResponse<number>>('/api/listings')
    return res.data
  } catch (err) {
    throw err
  }
}
