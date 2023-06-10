import { Listing } from '@prisma/client'
import axios from 'axios'

import { ApiResponse } from '@/types/api'

export type Broker = {
  id: string
  user: { id: string; name: string; surname_1: string; surname_2: string }
}

export const fetchBrokers = async () => {
  try {
    const res = await axios.get<ApiResponse<Broker[]>>('/api/brokers')
    return res.data
  } catch (err) {
    throw err
  }
}
