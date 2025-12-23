-- CreateTable
CREATE TABLE "bgtracks" (
    "id" UUID NOT NULL,
    "bgtrack_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tier" "SubscriptionTierType" NOT NULL,
    "labels" TEXT[],
    "preview_path" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "bgtracks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bgtracks_bgtrack_id_key" ON "bgtracks"("bgtrack_id");
