-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateEnum
CREATE TYPE "public"."SubscriptionTierType" AS ENUM ('free', 'starter', 'pro');

-- CreateTable
CREATE TABLE "public"."profiles" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "avatar_url" TEXT,
    "current_tier" "public"."SubscriptionTierType" NOT NULL DEFAULT 'free',
    "pending_tier" "public"."SubscriptionTierType",
    "last_reset" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meditation_credits_used" INTEGER NOT NULL DEFAULT 0,
    "tier_effective_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."meditations" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration_seconds" INTEGER NOT NULL,
    "language_code" TEXT NOT NULL,
    "is_beginner" BOOLEAN NOT NULL DEFAULT false,
    "technique" TEXT NOT NULL,
    "voice_id" TEXT NOT NULL,
    "background_track" TEXT,
    "script" JSONB NOT NULL,
    "storage_path" TEXT NOT NULL,
    "plays" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "meditations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."subscription_tiers" (
    "id" UUID NOT NULL,
    "name" "public"."SubscriptionTierType" NOT NULL,
    "monthly_limit" INTEGER NOT NULL,
    "max_duration" INTEGER NOT NULL,
    "monthly_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "subscription_tiers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_email_key" ON "public"."profiles"("email");

-- CreateIndex
CREATE INDEX "profiles_last_reset_idx" ON "public"."profiles"("last_reset");

-- CreateIndex
CREATE UNIQUE INDEX "meditations_storage_path_key" ON "public"."meditations"("storage_path");

-- CreateIndex
CREATE INDEX "meditations_user_id_created_at_idx" ON "public"."meditations"("user_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_tiers_name_key" ON "public"."subscription_tiers"("name");

-- AddForeignKey
ALTER TABLE "public"."meditations" ADD CONSTRAINT "meditations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
