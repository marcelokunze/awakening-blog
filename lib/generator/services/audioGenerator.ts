import {
  overlayAudioWithEphemeralOutput,
  concatAudio,
  trimAudio,
  getAudioDuration,
  applyFadeOut,
} from '../internal/ffmpeg';
import type { MeditationOutput } from '../types/meditation';
import { backgroundSupabase } from '@/utils/supabase/background';
import { logger } from "@trigger.dev/sdk/v3";
import { prisma } from '@/lib/prisma';
import type { MeditationConfig } from '../types/meditation';

export class AudioGenerator {
  private readonly userId: string;
  private readonly apiKey: string;
  private voiceId: string;
  private readonly bgTrack: string;
  private readonly modelId: string = "eleven_multilingual_v2";
  private voiceSettings!: {
    stability: number;
    similarity_boost: number;
    style: number;
    speed: number;
    use_speaker_boost: boolean;
  };

  private readonly supabase;
  private readonly assetsBucket = 'meditation-assets';
  private readonly tempBucket = 'temp-files';
  public readonly invocationId: string;

  constructor(config?: MeditationConfig) {
    if (!config?.userId) {
      throw new Error('userId is required in MeditationConfig');
    }
    this.userId = config.userId;

    if (!process.env.ELEVEN_LABS_API_KEY) {
      throw new Error('ELEVEN_LABS_API_KEY environment variable is required');
    }
    this.apiKey = process.env.ELEVEN_LABS_API_KEY;

    const requestedVoiceId = config?.voiceId;
    const fallbackVoiceId = "XB0fDUnXU5powFXDhCwa"; // Charlotte's ID

    this.voiceId = requestedVoiceId ?? fallbackVoiceId;
    this.bgTrack = config?.bgTrack ?? "gentle";

    this.supabase = Promise.resolve(backgroundSupabase);
    this.invocationId = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  }

  public async loadVoiceSettings() {
    const voice = await prisma.voice.findUnique({
      where: { voice_id: this.voiceId },
    });

    if (!voice) {
      logger.warn("Invalid voice ID detected, falling back to Charlotte", {
        requestedVoiceId: this.voiceId,
        fallbackVoiceId: "XB0fDUnXU5powFXDhCwa"
      });

      const fallbackVoice = await prisma.voice.findUnique({
        where: { voice_id: "XB0fDUnXU5powFXDhCwa" },
      });

      if (!fallbackVoice) {
        throw new Error("Fallback voice not found in database.");
      }

      this.voiceId = fallbackVoice.voice_id;
      this.voiceSettings = {
        stability: 0.35,
        similarity_boost: 0.85,
        style: 0.5,
        speed: fallbackVoice.speed,
        use_speaker_boost: true,
      };
    } else {
      this.voiceSettings = {
        stability: 0.35,
        similarity_boost: 0.85,
        style: 0.5,
        speed: voice.speed,
        use_speaker_boost: true,
      };
    }

    logger.info("Voice configuration", {
      finalVoiceId: this.voiceId,
    });
  }

  async generateFromScript(output: MeditationOutput): Promise<string> {
    logger.info("Starting audio generation process");
    const voiceBuffers: Uint8Array[] = [];
    let fileName = '';

    try {
      for (let sectionIndex = 0; sectionIndex < output.sections.length; sectionIndex++) {
        const section = output.sections[sectionIndex];
        logger.info("Processing section", {
          index: sectionIndex + 1,
          type: section.type,
          totalSections: output.sections.length
        });

        const phrases = this.splitContent(section.content);
        const sectionBuffers: Uint8Array[] = [];
        const gapBetweenPhrases = section.type === 'breathing' ? 10 : 4;
        const isLastSection = sectionIndex === output.sections.length - 1;

        const CONCURRENCY = 4;
        for (let batchStart = 0; batchStart < phrases.length; batchStart += CONCURRENCY) {
          const batchEnd = batchStart + CONCURRENCY;
          const currentBatch = phrases.slice(batchStart, batchEnd);

          const batchResults = await Promise.all(
            currentBatch.map(async (phrase, batchIndex) => {
              const originalIndex = batchStart + batchIndex;
              logger.info("Generating phrase audio", {
                section: sectionIndex + 1,
                phrase: originalIndex + 1,
                totalPhrases: phrases.length
              });

              const phraseAudio = await this.generatePhrase(phrase);
              return { audio: phraseAudio, index: originalIndex };
            })
          );

          batchResults.sort((a, b) => a.index - b.index);
          for (const result of batchResults) {
            sectionBuffers.push(result.audio);
            const isLastPhraseOverall = result.index === phrases.length - 1;

            if (!isLastPhraseOverall) {
              logger.info("Adding inter-phrase silence", {
                duration: gapBetweenPhrases,
                afterPhrase: result.index + 1
              });
              sectionBuffers.push(await this.createExactSilence(gapBetweenPhrases));
            } else {
              const finalSilence = section.type === 'breathing' ? 20 : (isLastSection ? 20 : 10);
              logger.info("Adding post-section silence", { duration: finalSilence });
              sectionBuffers.push(await this.createExactSilence(finalSilence));
            }
          }
        }

        logger.info("Concatenating section audio", { section: sectionIndex + 1 });
        const sectionVoice = await concatAudio(sectionBuffers, this.invocationId);
        voiceBuffers.push(sectionVoice);
      }

      logger.info("Concatenating full voice track");
      const openingSilence = await this.createExactSilence(3);
      const fullVoiceBuffer = await concatAudio([openingSilence, ...voiceBuffers], this.invocationId);

      const voiceDuration = await getAudioDuration(fullVoiceBuffer);
      logger.info("Voice duration calculated", { duration: voiceDuration });

      let fullBackgroundBuffer = await this.createFullBackground(voiceDuration);
      fullBackgroundBuffer = await applyFadeOut(fullBackgroundBuffer, voiceDuration, 5, this.invocationId);
      logger.info("Background processing complete");

      logger.info("Mixing voice and background tracks using ephemeral storage for final output");
      fileName = await overlayAudioWithEphemeralOutput(
        fullBackgroundBuffer,
        fullVoiceBuffer,
        voiceDuration,
        this.invocationId,
        this.userId
      );

      logger.info("Audio streaming pipeline completed successfully", { fileName });
      return fileName;

    } catch (error) {
      logger.error("Audio generation failed", {
        error: error instanceof Error ? error.stack : "Unknown error",
        fileName
      });
      throw error;
    }
  }

  private async generatePhrase(text: string): Promise<Uint8Array> {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${this.voiceId}`;
    logger.info("Generating phrase audio", { phrasePreview: `${text.slice(0, 50)}...` });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'xi-api-key': this.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: this.modelId,
        voice_settings: this.voiceSettings,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      logger.error("ElevenLabs API error", {
        status: response.status,
        error: errorText
      });
      throw new Error(`HTTP error ${response.status}: ${errorText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  }

  private splitContent(content: string | string[]): string[] {
    if (Array.isArray(content)) {
      // Already an array of lines — return as-is after trimming
      return content.map(line => line.trim()).filter(line => line.length > 0);
    }
  
    // Legacy fallback: split a single string by line breaks first
    const lines = content.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length > 1) {
      return lines;
    }
  
    // Fallback: split on punctuation boundaries
    return content
      .split(/(?<=[.?!。！？।॥…．])\s*/)
      .map(phrase => phrase.trim())
      .filter(phrase => phrase.length > 0);
  }  

  private async createExactSilence(seconds: number): Promise<Uint8Array> {
    let assetName: string;
    switch (seconds) {
      case 3:
        assetName = 'silence_3seconds.mp3';
        break;
      case 4:
        assetName = 'silence_4seconds.mp3';
        break;
      case 10:
        assetName = 'silence_10seconds.mp3';
        break;
      case 20:
        assetName = 'silence_20seconds.mp3';
        break;
      default:
        assetName = 'silence_5minutes.mp3';
        const buffer = await this.fetchAsset(assetName);
        return trimAudio(buffer, seconds, this.invocationId);
    }
    return this.fetchAsset(assetName);
  }

  private async createFullBackground(duration: number): Promise<Uint8Array> {
    const assetName = this.bgTrack === 'silence'
      ? 'silence_5minutes.mp3'
      : `${this.bgTrack}.mp3`;
    const buffer = await this.fetchAsset(assetName);
    return trimAudio(buffer, duration, this.invocationId);
  }

  private async fetchAsset(assetName: string): Promise<Uint8Array> {
    const supabase = await this.supabase;
    const { data, error } = await supabase.storage
      .from(this.assetsBucket)
      .download(assetName);

    if (error || !data) {
      logger.error("Asset fetch failed", {
        bucket: this.assetsBucket,
        asset: assetName,
        error: error?.message
      });
      throw new Error(`Asset fetch failed: ${error?.message || 'Unknown error'}`);
    }

    return new Uint8Array(await data.arrayBuffer());
  }

  public async cleanupTempFiles(): Promise<void> {
    const supabase = await this.supabase;
    logger.info("Starting invocation temp cleanup", {
      bucket: this.tempBucket,
      invocationId: this.invocationId
    });

    try {
      const { data: files, error: listError } = await supabase.storage
        .from(this.tempBucket)
        .list(this.invocationId);

      if (listError) throw listError;
      if (!files || files.length === 0) return;

      const filePaths = files.map(f => `${this.invocationId}/${f.name}`);
      const { error: deleteError } = await supabase.storage
        .from(this.tempBucket)
        .remove(filePaths);

      if (deleteError) {
        logger.error("Temp deletion failed", { error: deleteError });
      } else {
        logger.info("Temp cleanup complete", {
          deletedCount: filePaths.length,
          invocationId: this.invocationId
        });
      }
    } catch (error) {
      logger.error("Temp cleanup failed", {
        error: error instanceof Error ? error.stack : "Unknown error"
      });
    }
  }
}
