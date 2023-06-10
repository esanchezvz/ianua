/*
  Warnings:

  - The `parking_spots_style` column on the `listings` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "listings" ALTER COLUMN "name" DROP DEFAULT,
DROP COLUMN "parking_spots_style",
ADD COLUMN     "parking_spots_style" "ListingParkingSpotStyle"[];
