import {
  ListingAmmenities,
  ListingClimate,
  ListingPrivateServices,
  ListingType,
  ListingPublicServices,
  PropertyType,
  ListingStatus,
} from '@prisma/client'

import { getOptionsFromMap } from '.'

export const ammenitiesMap: Record<ListingAmmenities, string> = {
  [ListingAmmenities.BASKETBALL_COURT]: 'Cancha de Básketbol',
  [ListingAmmenities.BUSINESS_CENTER]: 'Business Center',
  [ListingAmmenities.CO_WORKING]: 'Co-Working',
  [ListingAmmenities.ELEVATOR]: 'Elevador',
  [ListingAmmenities.EVENTS_ROOM]: 'Salón de Eventos',
  [ListingAmmenities.FOOTBALL_FIELD]: 'Cancha de Fútbol',
  [ListingAmmenities.GYM]: 'Gimnasio',
  [ListingAmmenities.JACUZZI]: 'Jacuzzi',
  [ListingAmmenities.LIBRARY]: 'Biblioteca',
  [ListingAmmenities.MOVIE_THEATER]: 'Cine',
  [ListingAmmenities.PADEL_COURT]: 'Cancha de Padel',
  [ListingAmmenities.PET_DAYCARE]: 'Guardería de Mascotas',
  [ListingAmmenities.PLAY_ROOM]: 'Ludoteca',
  [ListingAmmenities.POOL]: 'Alberca',
  [ListingAmmenities.ROOFGARDEN]: 'Roof Garden',
  [ListingAmmenities.RUNNING_TRACK]: 'Pista de Correr',
  [ListingAmmenities.SAUNA]: 'Sauna',
  [ListingAmmenities.SECURITY]: 'Seguridad',
  [ListingAmmenities.SPA]: 'Spa',
  [ListingAmmenities.TENNIS_COURT]: 'Cancha de Tenis',
}

export const ammenitiesOptions = getOptionsFromMap(ammenitiesMap)

export const climateMap: Record<ListingClimate, string> = {
  [ListingClimate.COLD]: 'Frío',
  [ListingClimate.WARM]: 'Caliente',
}

export const climateOptions = getOptionsFromMap(climateMap)

export const listingTypeMap: Record<ListingType, string> = {
  [ListingType.FOR_SALE]: 'Venta',
  [ListingType.FOR_RENT]: 'Renta',
}

export const lsitingTypeOptions = getOptionsFromMap(listingTypeMap)

export const listingPrivateServicesMap: Record<ListingPrivateServices, string> = {
  [ListingPrivateServices.BANK]: 'Bancos',
  [ListingPrivateServices.DAYCARE]: 'Guarderías',
  [ListingPrivateServices.FARMACY]: 'Farmacias',
  [ListingPrivateServices.HOSPITAL]: 'Hospitales',
  [ListingPrivateServices.SCHOOL]: 'Escuelas',
  [ListingPrivateServices.SUPERMARKET]: 'Supermercados',
  [ListingPrivateServices.UNIVERSITY]: 'Universidades',
  [ListingPrivateServices.VETERINARY]: 'Veterinarias',
}

export const listingPrivateServicesOptions = getOptionsFromMap(listingPrivateServicesMap)

export const listingPublicServicesMap: Record<ListingPublicServices, string> = {
  [ListingPublicServices.DAYCARE]: 'Guarderías',
  [ListingPublicServices.HOSPITAL]: 'Hospitales',
  [ListingPublicServices.MARKET]: 'Mercados',
  [ListingPublicServices.SCHOOL]: 'Escuelas',
  [ListingPublicServices.TRANSPORT]: 'Transporte Público',
  [ListingPublicServices.UNIVERSITY]: 'Universidades',
}

export const listingPublicServicesOptions = getOptionsFromMap(listingPublicServicesMap)

export const listingStatusMap: Record<ListingStatus, string> = {
  [ListingStatus.DELETED]: 'Eliminada',
  [ListingStatus.PENDING]: 'Pendiente',
  [ListingStatus.PUBLISHED]: 'Publicada',
  [ListingStatus.UNAVAILABLE]: 'No Disponible',
}

export const listingStatusOptions = getOptionsFromMap(listingStatusMap)

export const propertyTypeMap: Record<PropertyType, string> = {
  [PropertyType.APPARTMENT]: 'Departamento',
  [PropertyType.HOUSE]: 'Casa',
}

export const propertyTypeOptions = getOptionsFromMap(propertyTypeMap)
