import {
  ListingAmmenities,
  ListingClimate,
  ListingCondition,
  ListingParkingSpotStyle,
  ListingPriceCurrency,
  ListingPrivateServices,
  ListingPublicServices,
  ListingStatus,
  ListingType,
  PropertyType,
} from '@prisma/client'
import * as z from 'zod'

const integerRegex = /^\d{1,12}$/
const optionalIntegerRegex = /^$|^\d{1,12}$/
const floatRegex = /^\d{1,12}\.\d{1,4}$/
const optionalFloatRegex = /^$|^\d{1,12}\.\d{1,4}$/

const intRefine = (arg: string, ctx: z.RefinementCtx) => {
  const isInt = integerRegex.test(arg)

  if (isInt) return z.NEVER

  if (!isInt) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Número inválido`,
    })

    return z.NEVER
  }
}

const floatRefine = (arg: string, ctx: z.RefinementCtx) => {
  const isFloat = floatRegex.test(arg)

  if (isFloat) return z.NEVER

  if (!isFloat) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Número inválido`,
    })

    return z.NEVER
  }
}

const intOrFloatRefine = (arg: string, ctx: z.RefinementCtx) => {
  if (!arg) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Campo requerido`,
    })
  }

  const isInt = integerRegex.test(arg)
  const isFloat = floatRegex.test(arg)

  if (isInt || isFloat) return z.NEVER

  if (!isFloat) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Máximo 12 dígitos y 4 decimales`,
    })

    return z.NEVER
  }

  if (!isInt) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Máximo 12 dígitos`,
    })

    return z.NEVER
  }

  if (!isInt && !isFloat) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Máximo 12 dígitos y/o 4 decimales`,
    })

    return z.NEVER
  }
}

const optionalIntOrFloatRefine = (arg: string, ctx: z.RefinementCtx) => {
  const isInt = optionalIntegerRegex.test(arg)
  const isFloat = optionalFloatRegex.test(arg)

  if (isInt || isFloat) return z.NEVER

  if (!isInt) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Máximo 12 dígitos`,
    })

    return z.NEVER
  }

  if (!isFloat) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Máximo 12 dígitos y 4 decimales`,
    })

    return z.NEVER
  }

  if (!isInt && !isFloat) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Máximo 12 dígitos y/o 4 decimales`,
    })

    return z.NEVER
  }
}

export const createListingSchema = z.object({
  broker: z.string({ required_error: 'Campo requerido' }).min(1, 'Campo requerido'),
  type: z.nativeEnum(ListingType, { required_error: 'Campo requerido' }),
  property_type: z.nativeEnum(PropertyType, { required_error: 'Campo requerido' }),
  description: z.string().min(1, 'Campo requerido').max(1000, 'Máximo 2,000 caracteres'),
  furnished: z.string().optional().or(z.number()).transform(Number).transform(Boolean).or(z.boolean()),
  price: z.string().superRefine(intOrFloatRefine).or(z.number()).transform(Number),
  price_currency: z
    .nativeEnum(ListingPriceCurrency, { required_error: 'Campo requerido' })
    .default(ListingPriceCurrency.MXN),
  sq_m_balcony: z
    .string({ required_error: 'Campo requerido' })
    .superRefine(optionalIntOrFloatRefine)
    .or(z.number())
    .transform(Number)
    .optional(),
  sq_m_construction: z
    .string({ required_error: 'Campo requerido' })
    .superRefine(intOrFloatRefine)
    .or(z.number())
    .transform(Number),
  sq_m_garden: z
    .string({ required_error: 'Campo requerido' })
    .superRefine(optionalIntOrFloatRefine)
    .or(z.number())
    .transform(Number)
    .optional(),
  sq_m_living: z
    .string({ required_error: 'Campo requerido' })
    .superRefine(intOrFloatRefine)
    .or(z.number())
    .transform(Number),
  sq_m_terrace: z
    .string({ required_error: 'Campo requerido' })
    .superRefine(optionalIntOrFloatRefine)
    .or(z.number())
    .transform(Number)
    .optional(),
  sq_m_total: z
    .string({ required_error: 'Campo requerido' })
    .superRefine(optionalIntOrFloatRefine)
    .or(z.number())
    .transform(Number)
    .optional(),
  dimension_depth: z
    .string({ required_error: 'Campo requerido' })
    .superRefine(optionalIntOrFloatRefine)
    .or(z.number())
    .transform(Number)
    .optional(),
  dimension_front: z
    .string({ required_error: 'Campo requerido' })
    .superRefine(optionalIntOrFloatRefine)
    .or(z.number())
    .transform(Number)
    .optional(),
  rooms: z.string().superRefine(intRefine).or(z.number()).transform(Number),
  bathrooms: z
    .string({ required_error: 'Campo requerido' })
    .superRefine(intOrFloatRefine)
    .or(z.number())
    .transform(Number),
  parking_spots: z
    .string({ required_error: 'Campo requerido' })
    .superRefine(intRefine)
    .or(z.number())
    .transform(Number),
  parking_spots_style: z.nativeEnum(ListingParkingSpotStyle).optional(),
  storage_units: z.string().superRefine(intRefine).or(z.number()).transform(Number).optional(),
  maintenance_cost: z.string().superRefine(intRefine).or(z.number()).transform(Number).optional(),
  age: z.string().superRefine(intRefine).or(z.number()).transform(Number).optional(),
  condition: z.nativeEnum(ListingCondition, { required_error: 'Campo requerido' }),
  construction_style: z.string().optional(),
  climate: z.nativeEnum(ListingClimate, { required_error: 'Campo requerido' }),
  orientation: z.string().optional(),
  views: z.string().min(1, 'Campo requerido'),
  natural_lighting: z.number().lte(5, 'Debe ser del 1 al 5').gte(1, 'Debe ser del 1 al 5'),
  event_policy_strictness: z.number().lte(5, 'Debe ser del 1 al 5').gte(1, 'Debe ser del 1 al 5'),
  pet_friendly: z.string().optional().or(z.number()).transform(Number).transform(Boolean).or(z.boolean()),
  address: z.object({
    street_1: z.string().min(1, 'Campo requerido'),
    number: z.string().min(1, 'Campo requerido'),
    int_number: z.string().optional(),
    locality: z.string().min(1, 'Campo requerido'),
    city: z.string().min(1, 'Campo requerido').default('CDMX'),
    state: z.string().min(1, 'Campo requerido').default('CDMX'),
    zip_code: z.string().min(1, 'Campo requerido'),
  }),
  development_name: z.string().optional(),
  stories: z.string().superRefine(intRefine).or(z.number()).transform(Number).optional(),
  floor: z.string().superRefine(intRefine).or(z.number()).transform(Number).optional(),
  development_stories: z.string().superRefine(intRefine).or(z.number()).transform(Number).optional(),
  development_buildings: z.string().superRefine(intRefine).or(z.number()).transform(Number).optional(),
  development_units: z.string().superRefine(intRefine).or(z.number()).transform(Number).optional(),
  ammenities: z.array(z.nativeEnum(ListingAmmenities)).optional(),
  private_services: z.array(z.nativeEnum(ListingPrivateServices)).optional(),
  public_services: z.array(z.nativeEnum(ListingPublicServices)).optional(),
  urban_equipment: z
    .string()
    .transform((val) => val.split(','))
    .optional()
    .or(z.string().array()),
  yearly_tax: z.string().superRefine(intRefine).or(z.number()).transform(Number).optional(),
  status: z.nativeEnum(ListingStatus, { required_error: 'Campo requerido' }).default(ListingStatus.PENDING),
  data: z.object({
    yearly_tax_period: z.string({ required_error: 'Campo requerido' }).optional(),
  }),
})

export const updateListingSchema = createListingSchema
  .omit({
    broker: true,
  })
  .deepPartial()
  .extend({
    data: z
      .object({
        gallery_keys: z.array(z.string()).optional(),
      })
      .optional(),
  })
export type UpdateListingSchema = z.infer<typeof updateListingSchema>
