/*
  Warnings:

  - The `amount_type` column on the `Offer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AmountType" AS ENUM ('KG', 'TON');

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "amount_type",
ADD COLUMN     "amount_type" "AmountType" NOT NULL DEFAULT E'KG';

-- DropEnum
DROP TYPE "AmounType";
