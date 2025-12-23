/*
  Warnings:

  - You are about to drop the column `monthly_limit` on the `subscription_tiers` table. All the data in the column will be lost.
  - Added the required column `monthly_credits` to the `subscription_tiers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bgtracks" ADD COLUMN     "price_multiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.0;

-- 1) add the new column with a harmless default so it can be created in-place
ALTER TABLE "subscription_tiers"
  ADD COLUMN "monthly_credits" INTEGER NOT NULL DEFAULT 0;

-- 2) backfill the real minute-allowances based on tier name
UPDATE "subscription_tiers"
  SET "monthly_credits" = CASE name
    WHEN 'free'    THEN 10
    WHEN 'starter' THEN 100
    WHEN 'pro'     THEN 300
  END;

-- 3) drop the default (optional—only if you don’t want future inserts to auto-0)
ALTER TABLE "subscription_tiers"
  ALTER COLUMN "monthly_credits" DROP DEFAULT;

-- 4) finally, drop the old column
ALTER TABLE "subscription_tiers"
  DROP COLUMN "monthly_limit";


-- AlterTable
ALTER TABLE "voices" ADD COLUMN     "price_multiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.0;

-- captured post-deploy change: stripe_customer_id
ALTER TABLE "profiles" 
  ADD COLUMN IF NOT EXISTS "stripe_customer_id" text;
CREATE UNIQUE INDEX IF NOT EXISTS "profiles_stripe_customer_id_key"
  ON "profiles"("stripe_customer_id");
