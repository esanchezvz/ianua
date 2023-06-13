/*
  Warnings:

  - You are about to drop the column `age` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `bathrooms` on the `listings` table. All the data in the column will be lost.
  - The `construction_style` column on the `listings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `property_type` column on the `listings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `views` column on the `listings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `parking_spots_style` column on the `listings` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ListingConstructionStyle" AS ENUM ('MEXICAN', 'CLASSIC', 'CONTEMPORARY', 'INDUSTRIAL');

-- CreateEnum
CREATE TYPE "ListingViews" AS ENUM ('OPEN', 'CLOSED');

-- CreateEnum
CREATE TYPE "ListingLegalStatus" AS ENUM ('SETTLED_MORTGAGE', 'UNSETTLED_MORTGAGE', 'IN_LITIGATION', 'ASSESMENT_OR_LITIGATION_FREE');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ListingAmmenities" ADD VALUE 'GAME_ROOM';
ALTER TYPE "ListingAmmenities" ADD VALUE 'GARDEN';
ALTER TYPE "ListingAmmenities" ADD VALUE 'STUDIO';
ALTER TYPE "ListingAmmenities" ADD VALUE 'BAR';

-- AlterEnum
ALTER TYPE "PropertyType" ADD VALUE 'CLOSED_STREET';

-- AlterTable
ALTER TABLE "listings" DROP COLUMN "age",
DROP COLUMN "bathrooms",
ADD COLUMN     "construction_year" INTEGER,
ADD COLUMN     "full_bathrooms" INTEGER,
ADD COLUMN     "half_bathrooms" INTEGER,
ADD COLUMN     "legal_status" "ListingLegalStatus",
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Listing Name',
ADD COLUMN     "servcie_rooms" INTEGER,
DROP COLUMN "construction_style",
ADD COLUMN     "construction_style" "ListingConstructionStyle",
ALTER COLUMN "description" SET DATA TYPE VARCHAR(10000),
DROP COLUMN "property_type",
ADD COLUMN     "property_type" TEXT,
DROP COLUMN "views",
ADD COLUMN     "views" "ListingViews",
DROP COLUMN "parking_spots_style",
ADD COLUMN     "parking_spots_style" TEXT;
