import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const splitArray = (array: any[], numParts: number) => {
  let result: any[] = []
  for (let i = 0; i < array.length; i++) {
    const index = i % numParts

    if (!result[index]) result[index] = []

    result[index].push(array[i])
  }
  return result
}
