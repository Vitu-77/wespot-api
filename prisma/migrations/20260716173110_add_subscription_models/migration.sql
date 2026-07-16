-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('TRIAL', 'ACTIVE', 'DELINQUENT', 'INACTIVE');

-- CreateEnum
CREATE TYPE "ChargeStatus" AS ENUM ('PAID', 'DELINQUENT');

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "overdue_at" TIMESTAMP(3),
    "status" "SubscriptionStatus" NOT NULL,
    "credit_card_token" TEXT NOT NULL,
    "credit_card_mask" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "workspace_id" TEXT NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices_summaries" (
    "id" TEXT NOT NULL,
    "from_at" TIMESTAMP(3) NOT NULL,
    "to_at" TIMESTAMP(3) NOT NULL,
    "available_spots" INTEGER NOT NULL,
    "generated_spots" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "subscription_id" TEXT NOT NULL,

    CONSTRAINT "invoices_summaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "charges" (
    "id" TEXT NOT NULL,
    "status" "ChargeStatus" NOT NULL,
    "value" BIGINT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "invoice_summary_id" TEXT NOT NULL,

    CONSTRAINT "charges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_workspace_id_key" ON "subscriptions"("workspace_id");

-- CreateIndex
CREATE INDEX "subscriptions_workspace_id_idx" ON "subscriptions"("workspace_id");

-- CreateIndex
CREATE INDEX "invoices_summaries_subscription_id_idx" ON "invoices_summaries"("subscription_id");

-- CreateIndex
CREATE INDEX "charges_invoice_summary_id_idx" ON "charges"("invoice_summary_id");

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices_summaries" ADD CONSTRAINT "invoices_summaries_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "charges" ADD CONSTRAINT "charges_invoice_summary_id_fkey" FOREIGN KEY ("invoice_summary_id") REFERENCES "invoices_summaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
