-- DropForeignKey
ALTER TABLE "brand_addresses" DROP CONSTRAINT "brand_addresses_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "brand_addresses_responsibles" DROP CONSTRAINT "brand_addresses_responsibles_brand_address_id_fkey";

-- DropForeignKey
ALTER TABLE "brands" DROP CONSTRAINT "brands_workspace_id_fkey";

-- AddForeignKey
ALTER TABLE "brands" ADD CONSTRAINT "brands_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brand_addresses" ADD CONSTRAINT "brand_addresses_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brand_addresses_responsibles" ADD CONSTRAINT "brand_addresses_responsibles_brand_address_id_fkey" FOREIGN KEY ("brand_address_id") REFERENCES "brand_addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
