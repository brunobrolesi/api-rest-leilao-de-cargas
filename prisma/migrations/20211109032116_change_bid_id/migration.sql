/*
  Warnings:

  - The primary key for the `Bid` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Bid" DROP CONSTRAINT "Bid_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Bid_pkey" PRIMARY KEY ("id");
