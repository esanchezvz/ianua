import * as z from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, 'Campo requerido').email('Correo inválido'),
})

export const registerSchema = z.object({
  name: z.string().min(1, 'Campo requerido'),
  email: z.string().min(1, 'Campo requerido').email('Correo inválido'),
})
