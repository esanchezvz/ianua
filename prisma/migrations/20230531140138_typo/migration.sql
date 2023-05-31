/*
  Warnings:

  - The `parking_spots_style` column on the `listings` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ListingParkingSpotStyle" AS ENUM ('LINEAL', 'INDEPENDENT', 'OUTDOOR', 'WITH_ROOF');

-- AlterTable
ALTER TABLE "listings" DROP COLUMN "parking_spots_style",
ADD COLUMN     "parking_spots_style" "ListingParkingSpotStyle";

-- DropEnum
DROP TYPE "ListingParkingSpotSTyle";
