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

export const createListingSchema = z.object({
  broker: z.string().min(1, 'Campo requerido'),
  type: z.nativeEnum(ListingType, { required_error: 'Campo requerido' }),
  property_type: z.nativeEnum(PropertyType, { required_error: 'Campo requerido' }),
  description: z.string().min(1, 'Campo requerido').max(1000, 'Máximo 2,000 caracteres'),
  furnished: z.string().optional().or(z.number()).transform(Number).transform(Boolean).or(z.boolean()),
  price: z.string().regex(/^\d+$/, 'Debe ser número').or(z.number()).transform(Number),
  price_currency: z
    .nativeEnum(ListingPriceCurrency, { required_error: 'Campo requerido' })
    .default(ListingPriceCurrency.MXN),
  sq_m_balcony: z.string().regex(/^\d+$/, 'Debe ser número').or(z.number()).transform(Number).optional(),
  sq_m_construction: z.string().regex(/^\d+$/, 'Debe ser número').or(z.number()).transform(Number),
  sq_m_garden: z.string().regex(/^\d+$/, 'Debe ser número').or(z.number()).transform(Number).optional(),
  sq_m_living: z.string().regex(/^\d+$/, 'Debe ser número').or(z.number()).transform(Number),
  sq_m_terrace: z.string().regex(/^\d+$/, 'Debe ser número').or(z.number()).transform(Number).optional(),
  sq_m_total: z.string().regex(/^\d+$/, 'Debe ser número').or(z.number()).transform(Number).optional(),
  dimension_depth: z.string().regex(/^\d+$/, 'Debe ser número').or(z.number()).transform(Number).optional(),
  dimension_front: z.string().regex(/^\d+$/, 'Debe ser número').or(z.number()).transform(Number).optional(),
  rooms: z.string().regex(/^\d+$/, 'Debe ser número').or(z.number()).transform(Number),
  bathrooms: z.string().min(1, 'Campo requerido').or(z.number()).transform(Number),
  parking_spots: z
    .string()
    .min(1, 'Campo requerido')
    .regex(/^\d+$/, 'Debe ser número')
    .or(z.number())
    .transform(Number),
  parking_spots_style: z.nativeEnum(ListingParkingSpotStyle).optional(),
  storage_units: z.string().regex(/^\d+$/, 'Debe ser número').or(z.number()).transform(Number).optional(),
  maintenance_cost: z.string().regex(/^\d+$/, 'Debe ser número').or(z.number()).transform(Number).optional(),
  age: z.string().regex(/^\d+$/, 'Debe ser número').or(z.number()).transform(Number).optional(),
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
  stories: z.string().regex(/^\d+$/, 'Debe ser número').or(z.number()).transform(Number),
  floor: z.string().regex(/^\d+$/, 'Debe ser número').or(z.number()).transform(Number).optional(),
  development_stories: z
    .string()
    .regex(/^\d+$/, 'Debe ser número')
    .or(z.number())
    .transform(Number)
    .optional(),
  development_buildings: z
    .string()
    .regex(/^\d+$/, 'Debe ser número')
    .or(z.number())
    .transform(Number)
    .optional(),
  development_units: z.string().regex(/^\d+$/, 'Debe ser número').or(z.number()).transform(Number).optional(),
  ammenities: z.array(z.nativeEnum(ListingAmmenities)).optional(),
  private_services: z.array(z.nativeEnum(ListingPrivateServices)).optional(),
  public_services: z.array(z.nativeEnum(ListingPublicServices)).optional(),
  urban_equipment: z
    .string()
    .transform((val) => val.split(','))
    .optional()
    .or(z.string().array()),
  yearly_tax: z.string().regex(/^\d+$/, 'Debe ser número').or(z.number()).transform(Number).optional(),
  status: z.nativeEnum(ListingStatus, { required_error: 'Campo requerido' }).default(ListingStatus.PENDING),
})
