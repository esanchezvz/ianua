import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { type SelectOption } from '@/components/ui/select'

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

export const zoneOptions: SelectOption[] = [
  { id: 'alvaro_obregon', label: 'Álvaro Obregón' },
  { id: 'azcapotzalco', label: 'Azcapotzalco' },
  { id: 'benito_juarez', label: 'Benito Juárez' },
  { id: 'coyoacan', label: 'Coyoacán' },
  { id: 'cuajimalpa_de_morelos', label: 'Cuajimalpa de Morelos' },
  { id: 'cuauhtemoc', label: 'Cuauhtémoc' },
  { id: 'gustavo_a_madero', label: 'Gustavo A. Madero' },
  { id: 'iztacalco', label: 'Iztacalco' },
  { id: 'iztapalapa', label: 'Iztapalapa' },
  { id: 'la_magdalena_contreras', label: 'La Magdalena Contreras' },
  { id: 'miguel_hidalgo', label: 'Miguel Hidalgo' },
  { id: 'milpa_alta', label: 'Milpa Alta' },
  { id: 'tlahuac', label: 'Tláhuac' },
  { id: 'tlalpan', label: 'Tlalpan' },
  { id: 'venustiano_carranza', label: 'Venustiano Carranza' },
  { id: 'xochimilco', label: 'Xochimilco' },
]
