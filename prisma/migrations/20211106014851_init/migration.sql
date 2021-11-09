-- CreateEnum
CREATE TYPE "AmounType" AS ENUM ('KG', 'TON');

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(80) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "doc" VARCHAR(25) NOT NULL,
    "about" VARCHAR(255) NOT NULL,
    "site" VARCHAR(80) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provider" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(80) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "doc" VARCHAR(25) NOT NULL,
    "about" VARCHAR(255) NOT NULL,
    "site" VARCHAR(80) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" SERIAL NOT NULL,
    "id_customer" INTEGER NOT NULL,
    "from" VARCHAR(80) NOT NULL,
    "to" VARCHAR(80) NOT NULL,
    "initial_value" DECIMAL(9,2) NOT NULL,
    "amount" DECIMAL(9,2) NOT NULL,
    "amount_type" "AmounType" NOT NULL DEFAULT E'KG',

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bid" (
    "id_provider" INTEGER NOT NULL,
    "id_offer" INTEGER NOT NULL,
    "value" DECIMAL(9,2) NOT NULL,
    "amount" DECIMAL(9,2) NOT NULL,

    CONSTRAINT "Bid_pkey" PRIMARY KEY ("id_provider","id_offer")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_doc_key" ON "Customer"("doc");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_email_key" ON "Provider"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_doc_key" ON "Provider"("doc");

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_id_customer_fkey" FOREIGN KEY ("id_customer") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_id_provider_fkey" FOREIGN KEY ("id_provider") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_id_offer_fkey" FOREIGN KEY ("id_offer") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
