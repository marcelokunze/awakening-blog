-- CreateEnum
CREATE TYPE "MeditationStatus" AS ENUM ('pending', 'processing', 'script_generated', 'completed', 'failed');

-- AlterTable
ALTER TABLE "meditations" ADD COLUMN     "completed_at" TIMESTAMPTZ,
ADD COLUMN     "error_message" TEXT,
ADD COLUMN     "status" "MeditationStatus" NOT NULL DEFAULT 'pending',
ALTER COLUMN "technique" DROP NOT NULL,
ALTER COLUMN "voice_id" DROP NOT NULL,
ALTER COLUMN "script" DROP NOT NULL,
ALTER COLUMN "storage_path" DROP NOT NULL;
