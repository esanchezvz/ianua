import {
  ListingAmmenities,
  ListingClimate,
  ListingPrivateServices,
  ListingConstructionStyle,
  ListingType,
  ListingPublicServices,
  PropertyType,
  ListingStatus,
  ListingPriceCurrency,
  ListingParkingSpotStyle,
  ListingCondition,
  ListingViews,
  ListingLegalStatus,
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
  [ListingAmmenities.GAME_ROOM]: 'Salón de Juegos',
  [ListingAmmenities.GARDEN]: 'Jardín',
  [ListingAmmenities.STUDIO]: 'Estudio',
  [ListingAmmenities.BAR]: 'BAR',
}

export const ammenitiesOptions = getOptionsFromMap(ammenitiesMap)

export const climateMap: Record<ListingClimate, string> = {
  [ListingClimate.COLD]: 'Frío',
  [ListingClimate.WARM]: 'Templado',
  [ListingClimate.HOT]: 'Caliente',
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
  [PropertyType.HOUSE]: 'Casa Sola',
  [PropertyType.HOUSE_CLOSED_CONDOMINUIM]: 'Casa Fracccionamiento Cerrado',
  [PropertyType.HOUSE_HORIZONTAL_CONDOMINIUM]: 'Casa Condominio Horizontal',
  [PropertyType.CLOSED_STREET]: 'Calle Cerrada',
}

export const propertyTypeOptions = getOptionsFromMap(propertyTypeMap)

export const currencyMap: Record<ListingPriceCurrency, string> = {
  [ListingPriceCurrency.MXN]: 'MXN',
  [ListingPriceCurrency.USD]: 'USD',
}

export const listingCurrencyOptions = getOptionsFromMap(currencyMap)

export const parkingSpotStyleMap: Record<ListingParkingSpotStyle, string> = {
  [ListingParkingSpotStyle.INDEPENDENT]: 'Independientes',
  [ListingParkingSpotStyle.LINEAL]: 'Lineales',
  [ListingParkingSpotStyle.OUTDOOR]: 'Aire Libre',
  [ListingParkingSpotStyle.WITH_ROOF]: 'Techado',
}

export const parkingSpotStyleOptions = getOptionsFromMap(parkingSpotStyleMap)

export const listingConditionsMap: Record<ListingCondition, string> = {
  [ListingCondition.BAD]: 'Para Tirar',
  [ListingCondition.EXCELENT]: 'Excelente',
  [ListingCondition.GOOD]: 'Bueno',
  [ListingCondition.NEEDS_WORK]: 'Para Remodelar',
  [ListingCondition.NEW]: 'Nuevo',
  [ListingCondition.REGULAR]: 'Regular',
}

export const listingConditionOptions = getOptionsFromMap(listingConditionsMap)

export const listingConstuctionStyleMap: Record<ListingConstructionStyle, string> = {
  [ListingConstructionStyle.MEXICAN]: 'Estilo Mexicano',
  [ListingConstructionStyle.CLASSIC]: 'Estilo Clásico',
  [ListingConstructionStyle.CONTEMPORARY]: 'Estilo Contemporáneo',
  [ListingConstructionStyle.INDUSTRIAL]: 'Estilo Industrial',
}

export const listingContructionStyleOptions = getOptionsFromMap(listingConstuctionStyleMap)

export const listingViewMap: Record<ListingViews, string> = {
  [ListingViews.CLOSED]: 'Cerrada',
  [ListingViews.OPEN]: 'Abierta',
}

export const listingViewOptions = getOptionsFromMap(listingViewMap)

export const legalStatusMap: Record<ListingLegalStatus, string> = {
  [ListingLegalStatus.ASSESMENT_OR_LITIGATION_FREE]: 'Libre de gravamen o litigio',
  [ListingLegalStatus.IN_LITIGATION]: 'Litigio',
  [ListingLegalStatus.SETTLED_MORTGAGE]: 'Hipoteca liquidada pero vigente',
  [ListingLegalStatus.UNSETTLED_MORTGAGE]: 'Hipoteca sin liquidar',
}

export const legalStatusOptions = getOptionsFromMap(legalStatusMap)
