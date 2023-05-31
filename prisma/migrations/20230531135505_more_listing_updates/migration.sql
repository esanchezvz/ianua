/*
  Warnings:

  - You are about to drop the column `sq_m_back` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `sq_m_constuction` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `sq_m_extra` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `sq_m_front` on the `listings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "listings" DROP COLUMN "sq_m_back",
DROP COLUMN "sq_m_constuction",
DROP COLUMN "sq_m_extra",
DROP COLUMN "sq_m_front",
ADD COLUMN     "dimension_depth" INTEGER,
ADD COLUMN     "dimension_front" INTEGER,
ADD COLUMN     "sq_m_balcony" INTEGER,
ADD COLUMN     "sq_m_construction" INTEGER,
ADD COLUMN     "sq_m_garden" INTEGER,
ADD COLUMN     "sq_m_terrace" INTEGER;
