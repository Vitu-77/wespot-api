/*
  Warnings:

  - Made the column `slug` on table `workspaces` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "workspaces" ALTER COLUMN "slug" SET NOT NULL;
