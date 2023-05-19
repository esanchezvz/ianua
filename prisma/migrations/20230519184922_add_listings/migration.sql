-- CreateEnum
CREATE TYPE "ListingAmmenities" AS ENUM ('EVENTS_ROOM', 'GYM', 'LIBRARY', 'SPA');

-- CreateEnum
CREATE TYPE "ListingClimate" AS ENUM ('COLD', 'WARM');

-- CreateEnum
CREATE TYPE "ListingPrivateServices" AS ENUM ('BANK', 'DAYCARE', 'FARMACY', 'HOSPITAL', 'SCHOOL', 'SUPERMARKET', 'UNEVERSITY', 'VETERINARY');

-- CreateEnum
CREATE TYPE "ListingPublicServices" AS ENUM ('DAYCARE', 'HOSPITAL', 'MARKET', 'SCHOOL', 'TRANSPORT', 'UNEVERSITY');

-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('DELETED', 'PENDING', 'PUBLISHED', 'UNAVAILABLE');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('APPARTMENT', 'HOUSE');

-- CreateEnum
CREATE TYPE "ListingType" AS ENUM ('FOR_RENT', 'FOR_SALE');

-- CreateTable
CREATE TABLE "Broker" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,

    CONSTRAINT "Broker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listings" (
    "id" TEXT NOT NULL,
    "access_roads" TEXT[],
    "address" JSONB NOT NULL,
    "ammenities" "ListingAmmenities"[],
    "bathrooms" DOUBLE PRECISION NOT NULL,
    "building_event_policy_strictness" INTEGER NOT NULL,
    "climate" "ListingClimate" NOT NULL,
    "condition" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data" JSONB,
    "description" VARCHAR(1000) NOT NULL,
    "development_buildings" INTEGER,
    "development_name" TEXT,
    "development_stories" INTEGER,
    "extra_sq_m" INTEGER,
    "featured" BOOLEAN DEFAULT false,
    "floor" INTEGER,
    "furnished" BOOLEAN NOT NULL,
    "glass" TEXT NOT NULL,
    "interior_bathroom_furniture" TEXT,
    "interior_ceiling_lignts" TEXT,
    "interior_electric_instalations" TEXT,
    "interior_floors" TEXT,
    "interior_walls" TEXT,
    "last_renovation" TIMESTAMP(3),
    "living_sq_m" INTEGER NOT NULL,
    "location_references" TEXT NOT NULL,
    "locksmith" TEXT NOT NULL,
    "main_feature" TEXT NOT NULL,
    "maintenance_cost" INTEGER,
    "name" TEXT NOT NULL,
    "natural_lighting" INTEGER NOT NULL,
    "nearby_social_areas" TEXT[],
    "orientation" TEXT NOT NULL,
    "outside_finishes" TEXT,
    "parking_spots" INTEGER NOT NULL,
    "parking_sq_m" INTEGER,
    "pet_firendly" BOOLEAN NOT NULL,
    "price" INTEGER NOT NULL,
    "private_event_policy_strictness" INTEGER NOT NULL,
    "private_services" "ListingPrivateServices"[],
    "property_type" "PropertyType" NOT NULL,
    "public_services" "ListingPublicServices"[],
    "rooms" INTEGER NOT NULL,
    "security" TEXT NOT NULL,
    "status" "ListingStatus" NOT NULL,
    "storage_sq_m" INTEGER,
    "stories" INTEGER NOT NULL,
    "style" TEXT NOT NULL,
    "total_sq_m" INTEGER NOT NULL,
    "type" "ListingType" NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "urban_equipment" TEXT[],
    "views" TEXT NOT NULL,
    "yearly_tax" INTEGER,
    "broker" TEXT NOT NULL,

    CONSTRAINT "listings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Broker_user_key" ON "Broker"("user");

-- CreateIndex
CREATE UNIQUE INDEX "listings_broker_key" ON "listings"("broker");

-- AddForeignKey
ALTER TABLE "Broker" ADD CONSTRAINT "Broker_user_fkey" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listings" ADD CONSTRAINT "listings_broker_fkey" FOREIGN KEY ("broker") REFERENCES "Broker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
