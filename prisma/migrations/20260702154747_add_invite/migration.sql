-- CreateEnum
CREATE TYPE "InviteStatus" AS ENUM ('PENDING', 'ACCEPTED');

-- CreateTable
CREATE TABLE "invites" (
    "id" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userRole" "WorkspaceRole" NOT NULL,
    "status" "InviteStatus" NOT NULL,
    "workspace_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invites_pkey" PRIMARY KEY ("id")
);
