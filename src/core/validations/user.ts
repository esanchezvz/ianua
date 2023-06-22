import { Role } from '@prisma/client'
import * as z from 'zod'

export const createUserSchema = z.object({
  email: z.string().min(1, 'Campo requerido').email('Correo inválido'),
  name: z.string().min(1, 'Campo requerido'),
  surname_1: z.string().min(1, 'Campo requerido'),
  surname_2: z.string().optional(),
  role: z.nativeEnum(Role).default(Role.USER),
})
