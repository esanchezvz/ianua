/*
  Warnings:

  - The `property_type` column on the `listings` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "listings" DROP COLUMN "property_type",
ADD COLUMN     "property_type" "PropertyType"[];
