/*
  Warnings:

  - You are about to drop the column `date_of_birth` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `users` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Gender" ADD VALUE 'RATHER_NOT_SAY';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "date_of_birth",
DROP COLUMN "gender",
ADD COLUMN     "data" JSONB;

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "gender_other" TEXT,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_key" ON "profiles"("user");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_fkey" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
