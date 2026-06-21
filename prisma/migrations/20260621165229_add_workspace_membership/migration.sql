/*
  Warnings:

  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `workspace_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `auth_accounts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `auth_provider` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "auth_accounts" DROP CONSTRAINT "auth_accounts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "spot_costs" DROP CONSTRAINT "spot_costs_spot_id_fkey";

-- DropForeignKey
ALTER TABLE "spot_inputs" DROP CONSTRAINT "spot_inputs_spot_id_fkey";

-- DropForeignKey
ALTER TABLE "spots" DROP CONSTRAINT "spots_workspace_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_workspace_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
DROP COLUMN "workspace_id",
ADD COLUMN     "auth_provider" "AuthProvider" NOT NULL,
ADD COLUMN     "auth_provider_id" TEXT,
ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "auth_accounts";

-- CreateTable
CREATE TABLE "workspaces_members" (
    "role" "WorkspaceRole" NOT NULL DEFAULT 'MEMBER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "workspace_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "workspaces_members_pkey" PRIMARY KEY ("workspace_id","user_id")
);

-- CreateIndex
CREATE INDEX "workspaces_members_user_id_idx" ON "workspaces_members"("user_id");

-- CreateIndex
CREATE INDEX "workspaces_members_workspace_id_idx" ON "workspaces_members"("workspace_id");

-- AddForeignKey
ALTER TABLE "spots" ADD CONSTRAINT "spots_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spot_inputs" ADD CONSTRAINT "spot_inputs_spot_id_fkey" FOREIGN KEY ("spot_id") REFERENCES "spots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spot_costs" ADD CONSTRAINT "spot_costs_spot_id_fkey" FOREIGN KEY ("spot_id") REFERENCES "spots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspaces_members" ADD CONSTRAINT "workspaces_members_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspaces_members" ADD CONSTRAINT "workspaces_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
