-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('GOOGLE', 'EMAIL');

-- CreateEnum
CREATE TYPE "BusinessSegment" AS ENUM ('SUPERMARKET', 'EVENTS', 'STORE', 'PHARMACY', 'CLINIC', 'RESTAURANT', 'REAL_ESTATE', 'AUTOMOTIVE', 'RADIO', 'OTHER');

-- CreateEnum
CREATE TYPE "BrazilianState" AS ENUM ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO');

-- CreateEnum
CREATE TYPE "SpotStatus" AS ENUM ('DRAFT', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "SpotTone" AS ENUM ('ENERGETIC', 'URGENT', 'PROFESSIONAL', 'EMOTIONAL', 'CASUAL', 'PREMIUM');

-- CreateEnum
CREATE TYPE "SpotType" AS ENUM ('PROMOTION', 'PRODUCT_LAUNCH', 'EVENT', 'INSTITUTIONAL', 'BRANDING', 'ANNOUNCEMENT', 'INVITATION', 'COMMEMORATIVE', 'SEASONAL', 'CLEARANCE_SALE', 'GRAND_OPENING', 'REOPENING', 'RECRUITMENT', 'SERVICE_PROMOTION', 'PUBLIC_NOTICE', 'TESTIMONIAL');

-- CreateEnum
CREATE TYPE "CostService" AS ENUM ('LLM', 'TTS', 'STORAGE', 'MUSIC', 'PROCESSING');

-- CreateEnum
CREATE TYPE "CostProvider" AS ENUM ('ELEVEN_LABS', 'OPEN_AI');

-- CreateEnum
CREATE TYPE "WorkspaceType" AS ENUM ('INDIVIDUAL', 'COMPANY', 'AGENCY');

-- CreateEnum
CREATE TYPE "WorkspaceRole" AS ENUM ('OWNER', 'ADMIN', 'MEMBER');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "avatar_url" TEXT,
    "role" "WorkspaceRole" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "workspace_id" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_accounts" (
    "id" TEXT NOT NULL,
    "provider" "AuthProvider" NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "access_token" TEXT,
    "refresh_token" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "auth_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brands" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "segment" "BusinessSegment" NOT NULL,
    "logo_url" TEXT,
    "slogan" TEXT,
    "phone_number" TEXT,
    "whatsapp" TEXT,
    "instagram" TEXT,
    "tiktok" TEXT,
    "facebook" TEXT,
    "website" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "workspace_id" TEXT NOT NULL,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brand_addresses" (
    "id" TEXT NOT NULL,
    "state" "BrazilianState" NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "brand_id" TEXT NOT NULL,

    CONSTRAINT "brand_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spots" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "SpotStatus" NOT NULL,
    "script" TEXT NOT NULL,
    "voice_id" TEXT,
    "audio_url" TEXT,
    "starred" BOOLEAN NOT NULL,
    "expected_duration" INTEGER NOT NULL,
    "audio_duration" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "brand_id" TEXT NOT NULL,
    "input_id" TEXT NOT NULL,

    CONSTRAINT "spots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spot_inputs" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "spot_id" TEXT NOT NULL,

    CONSTRAINT "spot_inputs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spot_costs" (
    "id" TEXT NOT NULL,
    "provider" "CostProvider" NOT NULL,
    "service" "CostService" NOT NULL,
    "cost_cents" INTEGER NOT NULL,
    "metadata" JSONB,
    "spot_id" TEXT NOT NULL,

    CONSTRAINT "spot_costs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspaces" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "WorkspaceType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workspaces_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_name_email_idx" ON "users"("name", "email");

-- CreateIndex
CREATE INDEX "auth_accounts_user_id_idx" ON "auth_accounts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "auth_accounts_provider_provider_account_id_key" ON "auth_accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE INDEX "brands_workspace_id_idx" ON "brands"("workspace_id");

-- CreateIndex
CREATE INDEX "brand_addresses_brand_id_idx" ON "brand_addresses"("brand_id");

-- CreateIndex
CREATE UNIQUE INDEX "spots_input_id_key" ON "spots"("input_id");

-- CreateIndex
CREATE INDEX "spots_brand_id_status_title_idx" ON "spots"("brand_id", "status", "title");

-- CreateIndex
CREATE UNIQUE INDEX "spot_inputs_spot_id_key" ON "spot_inputs"("spot_id");

-- CreateIndex
CREATE UNIQUE INDEX "spot_costs_spot_id_key" ON "spot_costs"("spot_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_accounts" ADD CONSTRAINT "auth_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brands" ADD CONSTRAINT "brands_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brand_addresses" ADD CONSTRAINT "brand_addresses_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spots" ADD CONSTRAINT "spots_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spot_inputs" ADD CONSTRAINT "spot_inputs_spot_id_fkey" FOREIGN KEY ("spot_id") REFERENCES "spots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spot_costs" ADD CONSTRAINT "spot_costs_spot_id_fkey" FOREIGN KEY ("spot_id") REFERENCES "spots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
