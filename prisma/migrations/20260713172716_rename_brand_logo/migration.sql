/*
  Warnings:

  - You are about to drop the column `logo_url` on the `brands` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "brands" DROP COLUMN "logo_url",
ADD COLUMN     "logo_key" TEXT,
ADD COLUMN     "responsible" TEXT;

-- CreateTable
CREATE TABLE "brand_addresses_responsibles" (
    "id" TEXT NOT NULL,
    "role" TEXT,
    "name" TEXT NOT NULL,
    "brand_address_id" TEXT NOT NULL,

    CONSTRAINT "brand_addresses_responsibles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "brand_addresses_responsibles_brand_address_id_idx" ON "brand_addresses_responsibles"("brand_address_id");

-- AddForeignKey
ALTER TABLE "brand_addresses_responsibles" ADD CONSTRAINT "brand_addresses_responsibles_brand_address_id_fkey" FOREIGN KEY ("brand_address_id") REFERENCES "brand_addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
