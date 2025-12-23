-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- CreateTable
CREATE TABLE "voices" (
    "id" UUID NOT NULL,
    "voice_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "speed" DOUBLE PRECISION NOT NULL,
    "tier" "SubscriptionTierType" NOT NULL,
    "languages" TEXT[],
    "gender" "Gender" NOT NULL,
    "labels" TEXT[],
    "accent" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "voices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "voices_voice_id_key" ON "voices"("voice_id");
