/*
  Warnings:

  - You are about to drop the column `access_roads` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `interior_bathroom_furniture` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `interior_ceiling_lignts` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `interior_electric_instalations` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `interior_floors` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `interior_walls` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `last_renovation` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `location_references` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `main_feature` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `nearby_social_areas` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `outside_finishes` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `security` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `sq_m` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `storage` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `style` on the `listings` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ListingParkingSpotSTyle" AS ENUM ('LINEAL', 'INDEPENDENT', 'OUTDOOR', 'WITH_ROOF');

-- CreateEnum
CREATE TYPE "ListingCondition" AS ENUM ('NEW', 'EXCELENT', 'GOOD', 'REGULAR', 'NEEDS_WORK', 'BAD');

-- CreateEnum
CREATE TYPE "ListingPriceCurrency" AS ENUM ('MXN', 'USD');

-- AlterEnum
ALTER TYPE "ListingClimate" ADD VALUE 'HOT';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PropertyType" ADD VALUE 'HOUSE_HORIZONTAL_CONDOMINIUM';
ALTER TYPE "PropertyType" ADD VALUE 'HOUSE_CLOSED_CONDOMINUIM';

-- AlterTable
ALTER TABLE "listings" DROP COLUMN "access_roads",
DROP COLUMN "interior_bathroom_furniture",
DROP COLUMN "interior_ceiling_lignts",
DROP COLUMN "interior_electric_instalations",
DROP COLUMN "interior_floors",
DROP COLUMN "interior_walls",
DROP COLUMN "last_renovation",
DROP COLUMN "location_references",
DROP COLUMN "main_feature",
DROP COLUMN "name",
DROP COLUMN "nearby_social_areas",
DROP COLUMN "outside_finishes",
DROP COLUMN "security",
DROP COLUMN "sq_m",
DROP COLUMN "storage",
DROP COLUMN "style",
ADD COLUMN     "development_units" INTEGER,
ADD COLUMN     "parking_spots_style" "ListingParkingSpotSTyle",
ADD COLUMN     "price_currency" "ListingPriceCurrency",
ADD COLUMN     "sq_m_back" INTEGER,
ADD COLUMN     "sq_m_constuction" INTEGER,
ADD COLUMN     "sq_m_front" INTEGER,
ADD COLUMN     "sq_m_living" INTEGER,
ADD COLUMN     "storage_units" INTEGER,
ALTER COLUMN "condition" SET DATA TYPE TEXT,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(2000),
ALTER COLUMN "sq_m_total" DROP NOT NULL;
