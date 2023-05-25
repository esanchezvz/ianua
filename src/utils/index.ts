import { Gender } from '@prisma/client'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { type SelectOption } from '@/components/ui/select'
import { env } from '@/core/env'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const splitArray = <T>(array: T[], numParts: number) => {
  let result: Array<T[]> = []
  for (let i = 0; i < array.length; i++) {
    const index = i % numParts

    if (!result[index]) result[index] = []

    result[index].push(array[i])
  }
  return result
}

export function arrayEquals(a: unknown[], b: unknown[]) {
  return (
    Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index])
  )
}

export const capitalize = (str: string) => {
  const arr = str.split(' ')

  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
  }

  return arr.join(' ')
}

export const zoneOptions: SelectOption[] = [
  { value: 'alvaro_obregon', label: 'Álvaro Obregón' },
  { value: 'azcapotzalco', label: 'Azcapotzalco' },
  { value: 'benito_juarez', label: 'Benito Juárez' },
  { value: 'coyoacan', label: 'Coyoacán' },
  { value: 'cuajimalpa_de_morelos', label: 'Cuajimalpa de Morelos' },
  { value: 'cuauhtemoc', label: 'Cuauhtémoc' },
  { value: 'gustavo_a_madero', label: 'Gustavo A. Madero' },
  { value: 'iztacalco', label: 'Iztacalco' },
  { value: 'iztapalapa', label: 'Iztapalapa' },
  { value: 'la_magdalena_contreras', label: 'La Magdalena Contreras' },
  { value: 'miguel_hidalgo', label: 'Miguel Hidalgo' },
  { value: 'milpa_alta', label: 'Milpa Alta' },
  { value: 'tlahuac', label: 'Tláhuac' },
  { value: 'tlalpan', label: 'Tlalpan' },
  { value: 'venustiano_carranza', label: 'Venustiano Carranza' },
  { value: 'xochimilco', label: 'Xochimilco' },
]

export const absoluteUrl = (path: string) => {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}

export const getOptionsFromMap = <T extends Record<string, string>>(map: T) => {
  return Object.entries(map).map(([value, label]) => {
    return {
      value,
      label,
    } satisfies SelectOption
  })
}

export const genderMap: Record<Gender, string> = {
  [Gender.FEMALE]: 'Femenino',
  [Gender.MALE]: 'Masculino',
  [Gender.OTHER]: 'Prefiero no decir',
}

export const genderOptions = getOptionsFromMap(genderMap)
