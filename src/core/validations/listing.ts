import {
  ListingAmmenities,
  ListingClimate,
  ListingPrivateServices,
  ListingPublicServices,
  ListingStatus,
  ListingType,
  PropertyType,
} from '@prisma/client'
import * as z from 'zod'

export const createListingSchema = z.object({
  address: z.object({
    street_1: z.string().min(1, 'Campo requerido'),
    number: z.string().min(1, 'Campo requerido'),
    int_number: z.string().optional(),
    locality: z.string().min(1, 'Campo requerido'),
    city: z.string().min(1, 'Campo requerido').default('CDMX'),
    state: z.string().min(1, 'Campo requerido'),
    zip_code: z.string().min(1, 'Campo requerido'),
  }),
  age: z
    .string()
    .regex(/^\d+$/, 'Debe ser número')
    .or(z.number())
    .transform(Number)
    .optional()
    .or(z.number()),
  ammenities: z.array(z.nativeEnum(ListingAmmenities), { required_error: 'Campo requerido' }),
  bathrooms: z.string().min(1, 'Campo requerido').or(z.number()).transform(Number),
  broker: z.string().min(1, 'Campo requerido'),
  climate: z.nativeEnum(ListingClimate, { required_error: 'Campo requerido' }),
  condition: z.number().lte(5, 'Debe ser del 1 al 5').gte(1, 'Debe ser del 1 al 5'),
  construction_style: z.string().optional(),
  description: z.string().min(1, 'Campo requerido').max(1000, 'Máximo 1,000 caracteres'),
  development_buildings: z
    .string()
    .regex(/^\d+$/, 'Debe ser número')
    .or(z.number())
    .transform(Number)
    .optional(),
  development_name: z.string().optional(),
  development_stories: z
    .string()
    .regex(/^\d+$/, 'Debe ser número')
    .or(z.number())
    .transform(Number)
    .optional(),
  event_policy_strictness: z.number().lte(5, 'Debe ser del 1 al 5').gte(1, 'Debe ser del 1 al 5'),
  featured: z.string().optional().or(z.number()).transform(Number).transform(Boolean).or(z.boolean()),
  floor: z.string().regex(/^\d+$/, 'Debe ser número').or(z.number()).transform(Number).optional(),
  furnished: z.string().optional().or(z.number()).transform(Number).transform(Boolean).or(z.boolean()),
  interior_bathroom_furniture: z.string().optional(),
  interior_ceiling_lignts: z.string().optional(),
  interior_electric_instalations: z.string().optional(),
  interior_floors: z.string().optional(),
  interior_walls: z.string().optional(),
  last_renovation: z.date().optional(),
  location_references: z.string().optional(),
  map: z.string({ required_error: 'Campo requerido' }).optional(),
  main_feature: z.string().optional(),
  maintenance_cost: z.string().regex(/^\d+$/, 'Debe ser número').or(z.number()).transform(Number).optional(),
  name: z.string().min(1, 'Campo requerido'),
  natural_lighting: z.number().lte(5, 'Debe ser del 1 al 5').gte(1, 'Debe ser del 1 al 5'),
  nearby_social_areas: z
    .string()
    .transform((val) => val.split(','))
    .optional()
    .or(z.string().array()),
  orientation: z.string().optional(),
  outside_finishes: z.string().optional(),
  parking_spots: z
    .string()
    .min(1, 'Campo requerido')
    .regex(/^\d+$/, 'Debe ser número')
    .or(z.number())
    .transform(Number),
  pet_friendly: z.string().optional().or(z.number()).transform(Number).transform(Boolean).or(z.boolean()),
  price: z.string().regex(/^\d+$/, 'Debe ser número').or(z.number()).transform(Number),
  private_services: z.array(z.nativeEnum(ListingPrivateServices)).optional(),
  property_type: z.nativeEnum(PropertyType, { required_error: 'Campo requerido' }),
  public_services: z.array(z.nativeEnum(ListingPublicServices)).optional(),
  rooms: z.string().regex(/^\d+$/, 'Debe ser número').or(z.number()).transform(Number),
  security: z.string().optional(),
  sq_m: z.string().regex(/^\d+$/, 'Debe ser número').or(z.number()).transform(Number),
  sq_m_extra: z.string().regex(/^\d+$/, 'Debe ser número').or(z.number()).transform(Number).optional(),
  sq_m_total: z.string().regex(/^\d+$/, 'Debe ser número').or(z.number()).transform(Number),
  status: z.nativeEnum(ListingStatus, { required_error: 'Campo requerido' }).default(ListingStatus.PENDING),
  storage: z.string().optional().or(z.number()).transform(Number).transform(Boolean).or(z.boolean()),
  stories: z.string().regex(/^\d+$/, 'Debe ser número').or(z.number()).transform(Number).optional(),
  style: z.string().optional(),
  type: z.nativeEnum(ListingType, { required_error: 'Campo requerido' }),
  urban_equipment: z
    .string()
    .transform((val) => val.split(','))
    .optional()
    .or(z.string().array()),
  views: z.string().min(1, 'Campo requerido'),
  yearly_tax: z.string().regex(/^\d+$/, 'Debe ser número').or(z.number()).transform(Number).optional(),
})

/* 
type 
description
property_type
furnished
price
price_currency
sq_m_total
sq_m_front
sq_m_back
sq_m_constuction
sq_m_living
sq_m_extra
rooms
bathroms
parking_spots
parking_spots_style
storage_units
maintenance_cost
age
condition
construction_style
climate
orientation
views
natural_lighting
event_policy_strictness
pet_friendly
address 
development_name
stories
floor
development_stories
development_buildings
development_units
ammenities
private_services
public_services
urban_equipment
yearly_tax // predio
*/
