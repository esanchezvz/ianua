import { useState } from 'react'

export const usePrevious = <T>(value: T) => {
  const [tuple, setTuple] = useState<(T | null)[]>([null, value])

  if (tuple[1] !== value) {
    setTuple([tuple[1], value])
  }

  return tuple[0]
}
