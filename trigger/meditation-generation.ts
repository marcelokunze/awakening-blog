import { task } from "@trigger.dev/sdk/v3";
import { logger } from "@trigger.dev/sdk/v3";
import { MeditationGenerator } from "@/lib/generator/services/meditationGenerator";
import { AudioGenerator } from "@/lib/generator/services/audioGenerator";
import { TitleDescriptionGenerator } from "@/lib/generator/services/titleDescriptionGenerator";
import type { MeditationConfig, MeditationOutput } from "@/lib/generator/types/meditation";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type MeditationTask = {
  config: MeditationConfig;
};

export const meditationGenerationTask = task({
  id: "meditation-generation",
  run: async (params: MeditationTask) => {
    const { config } = params;
    const userId = config.userId;
    let meditationRecord;
    let audioGenerator: AudioGenerator | null = null;
    let titleDescGenerator: TitleDescriptionGenerator | null = null;

    // ─── 1) Create initial meditation record ──────────────────────────────
    try {
      logger.info("Inserting initial meditation record", { config });
      meditationRecord = await prisma.meditation.create({
        data: {
          user_id: userId,
          duration_seconds: config.duration * 60,
          language_code: config.language,
          is_beginner: config.beginner,
          purpose: config.purpose,
          voice_id: config.voiceId,
          background_track: config.bgTrack,
          status: "pending"
        }
      });
    } catch (error) {
      logger.error("Failed to create initial meditation record", {
        error: error instanceof Error ? error.message : "Unknown error"
      });
      throw error;
    }

    try {
      logger.info("Starting meditation generation", { config });

      const meditationGenerator = new MeditationGenerator();
      audioGenerator = new AudioGenerator(config);
      await audioGenerator.loadVoiceSettings();
      titleDescGenerator = new TitleDescriptionGenerator();

      // ─── 2) Generate meditation script ────────────────────────────────
      logger.info("Generating meditation script...");
      const meditationOutput: MeditationOutput = await meditationGenerator.generateMeditation(config);

      await prisma.meditation.update({
        where: { id: meditationRecord.id },
        data: {
          script: meditationOutput as unknown as Prisma.InputJsonValue,
          technique: meditationOutput.techniques[0],
          status: "script_generated"
        }
      });

      // ─── Generate title and description (non-blocking) ────────────────
      titleDescGenerator
        .generateTitleDescription({
          purpose: config.purpose,
          technique: meditationOutput.techniques[0],
          language: config.language
        })
        .then(async (result) => {
          logger.info("TitleDescriptionGenerator completed, updating meditation record");
          await prisma.meditation.update({
            where: { id: meditationRecord.id },
            data: {
              title: result.title,
              description: result.description
            } as any
          });
        })
        .catch((err) => {
          logger.error("Failed to generate title and description", {
            error: err instanceof Error ? err.message : "Unknown error"
          });
        });

      // ─── Generate audio content ──────────────────────────────────────
      logger.info("Generating audio content...");
      const audioPath = await audioGenerator.generateFromScript(meditationOutput);

      // ─── 3) On success: update record ────────────────────────────────
      await prisma.meditation.update({
        where: { id: meditationRecord.id },
        data: {
          storage_path: audioPath,
          completed_at: new Date(),
          status: "completed"
        }
      });

      // ─── Deduct minutes AFTER success ────────────────────────────────
      const minutes = config.duration;
      const voiceRec = await prisma.voice.findUniqueOrThrow({
        where: { voice_id: config.voiceId }
      });
      const bgRec = config.bgTrack
        ? await prisma.bgTrack.findUniqueOrThrow({
            where: { bgtrack_id: config.bgTrack }
          })
        : null;
      const cost = Math.ceil(minutes * voiceRec.price_multiplier * (bgRec?.price_multiplier ?? 1));

      await prisma.profile.update({
        where: { id: userId },
        data: { meditation_credits_used: { increment: cost } }
      });

      // ─── Cleanup & return ────────────────────────────────────────────
      await audioGenerator.cleanupTempFiles();
      logger.info("Meditation generation complete");

      return {
        success: true,
        meditationOutput,
        audioPath,
        generatedAt: new Date().toISOString()
      };

    } catch (error) {
      logger.error("Meditation generation failed", {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined
      });

      try {
        await prisma.meditation.update({
          where: { id: meditationRecord.id },
          data: {
            error_message: error instanceof Error ? error.message : "Unknown error",
            status: "failed"
          }
        });
      } catch (updateError) {
        logger.error("Failed to update meditation record with error", {
          error: updateError instanceof Error ? updateError.message : "Unknown error"
        });
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined
      };
    }
  }
});