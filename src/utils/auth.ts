import { Role } from '@prisma/client'

import { SelectOption } from '@/components/ui/select'

import { capitalize } from '.'

export const roleOptions = Object.keys(Role).map((key) => {
  return { value: key as Role, label: capitalize(key.toLowerCase().replaceAll('_', ' ')) }
}) satisfies SelectOption[]
