-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "ListingAmmenities" AS ENUM ('BASKETBALL_COURT', 'BUSINESS_CENTER', 'CO_WORKING', 'ELEVATOR', 'EVENTS_ROOM', 'FOOTBALL_FIELD', 'GYM', 'JACUZZI', 'LIBRARY', 'MOVIE_THEATER', 'PADEL_COURT', 'PET_DAYCARE', 'PLAY_ROOM', 'POOL', 'ROOFGARDEN', 'RUNNING_TRACK', 'SAUNA', 'SECURITY', 'SPA', 'TENNIS_COURT');

-- CreateEnum
CREATE TYPE "ListingClimate" AS ENUM ('COLD', 'WARM');

-- CreateEnum
CREATE TYPE "ListingPrivateServices" AS ENUM ('BANK', 'DAYCARE', 'FARMACY', 'HOSPITAL', 'SCHOOL', 'SUPERMARKET', 'UNIVERSITY', 'VETERINARY');

-- CreateEnum
CREATE TYPE "ListingPublicServices" AS ENUM ('DAYCARE', 'HOSPITAL', 'MARKET', 'SCHOOL', 'TRANSPORT', 'UNIVERSITY');

-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('DELETED', 'PENDING', 'PUBLISHED', 'UNAVAILABLE');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('APPARTMENT', 'HOUSE');

-- CreateEnum
CREATE TYPE "ListingType" AS ENUM ('FOR_RENT', 'FOR_SALE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'BROKER', 'SUPER_ADMIN', 'USER');

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_of_birth" TIMESTAMP(3),
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "gender" "Gender",
    "image" TEXT,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "surname_1" TEXT,
    "surname_2" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brokers" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,

    CONSTRAINT "brokers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listings" (
    "id" TEXT NOT NULL,
    "access_roads" TEXT[],
    "address" JSONB NOT NULL,
    "age" INTEGER,
    "ammenities" "ListingAmmenities"[],
    "bathrooms" DOUBLE PRECISION NOT NULL,
    "climate" "ListingClimate" NOT NULL,
    "condition" INTEGER NOT NULL,
    "construction_style" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data" JSONB,
    "description" VARCHAR(1000) NOT NULL,
    "development_buildings" INTEGER,
    "development_name" TEXT,
    "development_stories" INTEGER,
    "event_policy_strictness" INTEGER NOT NULL,
    "featured" BOOLEAN DEFAULT false,
    "floor" INTEGER,
    "furnished" BOOLEAN NOT NULL,
    "interior_bathroom_furniture" TEXT,
    "interior_ceiling_lignts" TEXT,
    "interior_electric_instalations" TEXT,
    "interior_floors" TEXT,
    "interior_walls" TEXT,
    "last_renovation" TIMESTAMP(3),
    "location_references" TEXT,
    "map" VARCHAR(2500) NOT NULL,
    "main_feature" TEXT,
    "maintenance_cost" INTEGER,
    "name" TEXT NOT NULL,
    "natural_lighting" INTEGER NOT NULL,
    "nearby_social_areas" TEXT[],
    "orientation" TEXT,
    "outside_finishes" TEXT,
    "parking_spots" INTEGER NOT NULL,
    "pet_friendly" BOOLEAN NOT NULL,
    "price" INTEGER NOT NULL,
    "private_services" "ListingPrivateServices"[],
    "property_type" "PropertyType" NOT NULL,
    "public_services" "ListingPublicServices"[],
    "rooms" INTEGER NOT NULL,
    "security" TEXT,
    "sq_m" INTEGER NOT NULL,
    "sq_m_extra" INTEGER,
    "sq_m_total" INTEGER NOT NULL,
    "status" "ListingStatus" NOT NULL,
    "storage" BOOLEAN,
    "stories" INTEGER,
    "style" TEXT,
    "type" "ListingType" NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "urban_equipment" TEXT[],
    "views" TEXT NOT NULL,
    "yearly_tax" INTEGER,
    "broker" TEXT NOT NULL,

    CONSTRAINT "listings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "brokers_user_key" ON "brokers"("user");

-- CreateIndex
CREATE UNIQUE INDEX "listings_broker_key" ON "listings"("broker");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brokers" ADD CONSTRAINT "brokers_user_fkey" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listings" ADD CONSTRAINT "listings_broker_fkey" FOREIGN KEY ("broker") REFERENCES "brokers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
