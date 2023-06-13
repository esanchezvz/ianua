import {
  ListingAmmenities,
  ListingClimate,
  ListingCondition,
  ListingConstructionStyle,
  ListingLegalStatus,
  ListingParkingSpotStyle,
  ListingPriceCurrency,
  ListingPrivateServices,
  ListingPublicServices,
  ListingStatus,
  ListingType,
  ListingViews,
  PropertyType,
} from '@prisma/client'
import * as z from 'zod'

export const createListingSchema = z.object({
  broker: z.string({ required_error: 'Campo requerido' }).min(1, 'Campo requerido'),
  name: z.string().min(1, 'Campo requerido'),
  type: z.nativeEnum(ListingType, { required_error: 'Campo requerido' }),
  property_type: z.array(z.nativeEnum(PropertyType), { required_error: 'Campo requerido' }),
  description: z.string().min(1, 'Campo requerido').max(1000, 'Máximo 2,000 caracteres'),
  furnished: z
    .string()
    .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
    .optional()
    .or(z.number())
    .transform(Boolean)
    .or(z.boolean()),
  price: z
    .string()
    .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
    .or(z.number()),
  price_currency: z
    .nativeEnum(ListingPriceCurrency, { required_error: 'Campo requerido' })
    .default(ListingPriceCurrency.MXN),
  sq_m_balcony: z
    .string({ required_error: 'Campo requerido' })
    .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
    .or(z.number())
    .optional(),
  sq_m_construction: z
    .string({ required_error: 'Campo requerido' })
    .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
    .or(z.number())
    .optional(),
  sq_m_garden: z
    .string({ required_error: 'Campo requerido' })
    .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
    .or(z.number())
    .optional(),
  sq_m_living: z
    .string({ required_error: 'Campo requerido' })
    .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
    .or(z.number()),
  sq_m_terrace: z
    .string({ required_error: 'Campo requerido' })
    .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
    .or(z.number())
    .optional(),
  sq_m_total: z
    .string({ required_error: 'Campo requerido' })
    .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
    .or(z.number())
    .optional(),
  dimension_depth: z
    .string({ required_error: 'Campo requerido' })
    .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
    .or(z.number())
    .optional(),
  dimension_front: z
    .string({ required_error: 'Campo requerido' })
    .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
    .or(z.number())
    .optional(),
  rooms: z
    .string()
    .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
    .or(z.number()),
  full_bathrooms: z
    .string({ required_error: 'Campo requerido' })
    .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
    .or(z.number()),
  half_bathrooms: z
    .string({ required_error: 'Campo requerido' })
    .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
    .or(z.number()),
  service_rooms: z
    .string()
    .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
    .or(z.number())
    .optional(),
  parking_spots: z
    .string({ required_error: 'Campo requerido' })
    .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
    .or(z.number()),
  parking_spots_style: z.array(z.nativeEnum(ListingParkingSpotStyle), { required_error: 'Campo requerido' }),
  storage_units: z
    .string()
    .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
    .or(z.number())
    .optional(),
  maintenance_cost: z
    .string()
    .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
    .or(z.number())
    .optional(),
  construction_year: z
    .string()
    .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
    .or(z.number())
    .optional(),
  condition: z.nativeEnum(ListingCondition, { required_error: 'Campo requerido' }),
  construction_style: z.nativeEnum(ListingConstructionStyle).optional(),
  climate: z.nativeEnum(ListingClimate, { required_error: 'Campo requerido' }),
  orientation: z.string().optional(),
  views: z.nativeEnum(ListingViews, { required_error: 'Campo requerido' }),
  natural_lighting: z
    .number({ required_error: 'Campo requerido' })
    .lte(5, 'Debe ser del 1 al 5')
    .gte(1, 'Debe ser del 1 al 5'),
  event_policy_strictness: z
    .number({ required_error: 'Campo requerido' })
    .lte(5, 'Debe ser del 1 al 5')
    .gte(1, 'Debe ser del 1 al 5'),
  pet_friendly: z
    .string()
    .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
    .optional()
    .or(z.number())
    .transform(Boolean)
    .or(z.boolean()),
  address: z.object({
    street_1: z.string().min(1, 'Campo requerido'),
    number: z.string().min(1, 'Campo requerido'),
    int_number: z.string().optional(),
    locality: z.string().min(1, 'Campo requerido'),
    neighborhood: z.string().min(1, 'Campo requerido'),
    city: z.string().min(1, 'Campo requerido').default('CDMX'),
    state: z.string().min(1, 'Campo requerido').default('CDMX'),
    zip_code: z.string().min(1, 'Campo requerido'),
  }),
  development_name: z.string().optional(),
  stories: z
    .string()
    .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
    .or(z.number())
    .optional(),
  floor: z
    .string()
    .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
    .or(z.number())
    .optional(),
  development_stories: z
    .string()
    .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
    .or(z.number())
    .optional(),
  development_buildings: z
    .string()
    .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
    .or(z.number())
    .optional(),
  development_units: z
    .string()
    .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
    .or(z.number())
    .optional(),
  ammenities: z.array(z.nativeEnum(ListingAmmenities)).optional(),
  private_services: z.array(z.nativeEnum(ListingPrivateServices)).optional(),
  public_services: z.array(z.nativeEnum(ListingPublicServices)).optional(),
  urban_equipment: z
    .string()
    .transform((val) => val.split(','))
    .optional()
    .or(z.string().array()),
  yearly_tax: z
    .string()
    .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
    .or(z.number())
    .optional(),
  status: z.nativeEnum(ListingStatus, { required_error: 'Campo requerido' }).default(ListingStatus.PENDING),
  data: z.object({
    yearly_tax_period: z.string({ required_error: 'Campo requerido' }).optional(),
    condominium_units: z
      .string()
      .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
      .or(z.number())
      .optional(),
  }),
  legal_status: z.nativeEnum(ListingLegalStatus, { required_error: 'Campo requerido' }),
})

export const updateListingSchema = createListingSchema
  .omit({
    broker: true,
  })
  .deepPartial()
  .extend({
    orientation: z.string().or(z.null()).optional(),
    development_name: z.string().or(z.null()).optional(),
    construction_style: z.nativeEnum(ListingConstructionStyle).or(z.null()).optional(),
    floor: z
      .string()
      .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
      .or(z.number())
      .or(z.null())
      .optional(),
    development_stories: z
      .string()
      .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
      .or(z.number())
      .or(z.null())
      .optional(),
    development_buildings: z
      .string()
      .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
      .or(z.number())
      .or(z.null())
      .optional(),
    development_units: z
      .string()
      .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
      .or(z.number())
      .or(z.null())
      .optional(),
    construction_year: z
      .string()
      .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
      .or(z.number())
      .or(z.null())
      .optional(),
    full_bathrooms: z
      .string({ required_error: 'Campo requerido' })
      .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
      .or(z.number())
      .or(z.null()),
    half_bathrooms: z
      .string({ required_error: 'Campo requerido' })
      .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
      .or(z.number())
      .or(z.null()),
    service_rooms: z
      .string()
      .transform((s) => Number(parseFloat(s.replaceAll(',', ''))))
      .or(z.number())
      .or(z.null())
      .optional(),
    legal_status: z.nativeEnum(ListingLegalStatus, { required_error: 'Campo requerido' }).or(z.null()),
    views: z.nativeEnum(ListingViews, { required_error: 'Campo requerido' }).or(z.null()),
    data: z
      .object({
        gallery_keys: z.array(z.string()).optional(),
      })
      .optional(),
  })
export type UpdateListingSchema = z.infer<typeof updateListingSchema>
