/*
  Warnings:

  - You are about to drop the column `servcie_rooms` on the `listings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "listings" DROP COLUMN "servcie_rooms",
ADD COLUMN     "service_rooms" INTEGER;
