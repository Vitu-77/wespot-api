/*
  Warnings:

  - Added the required column `workspace_id` to the `spots` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "spots" DROP CONSTRAINT "spots_brand_id_fkey";

-- AlterTable
ALTER TABLE "spots" ADD COLUMN     "workspace_id" TEXT NOT NULL,
ALTER COLUMN "brand_id" DROP NOT NULL,
ALTER COLUMN "input_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "spots" ADD CONSTRAINT "spots_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spots" ADD CONSTRAINT "spots_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;
