import * as z from 'zod'

export const loginSchema = z.object({
  email: z.string({ required_error: 'Campo requerido' }).email('Correo inválido'),
})
