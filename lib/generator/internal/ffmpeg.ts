import { spawn } from 'child_process';
import { existsSync, readFileSync, unlinkSync } from 'fs';
import path from 'path';
import ffmpegStatic from 'ffmpeg-static';
import { backgroundSupabase } from '@/utils/supabase/background';
import { parseBuffer } from 'music-metadata';
import fetch from 'node-fetch';
import { Buffer } from 'buffer';
import { logger } from "@trigger.dev/sdk/v3";

// Determine FFmpeg binary path using original logic.
function resolveFfmpegPath(): string {
  const bundledFfmpegPath = ffmpegStatic as string;
  const envFfmpegPath = process.env.FFMPEG_PATH || '';
  logger.info("Resolving FFmpeg binary path");

  if (existsSync(bundledFfmpegPath)) {
    logger.info("Using bundled FFmpeg binary");
    return bundledFfmpegPath;
  } else if (envFfmpegPath && existsSync(envFfmpegPath)) {
    logger.info("Using FFmpeg binary from FFMPEG_PATH");
    return envFfmpegPath;
  } else {
    logger.error("FFmpeg binary not found in any configured location");
    throw new Error(
      `FFmpeg binary not found. Please ensure the FFmpeg binary is packaged in production or set the FFMPEG_PATH environment variable.`
    );
  }
}

const resolvedFfmpegPath = resolveFfmpegPath();

async function createSignedUrlWithRetry(fileName: string): Promise<string> {
  const MAX_ATTEMPTS = 3;
  let attempt = 0;
  let lastError: Error | null = null;

  while (attempt < MAX_ATTEMPTS) {
    try {
      // 1. Create signed URL
      const { data, error } = await backgroundSupabase.storage
        .from('temp-files')
        .createSignedUrl(fileName, 600);

      if (error) {
        throw new Error(error.message || 'Unknown error from createSignedUrl');
      }
      const url = data.signedUrl!; // non-null assertion since we threw on error

      // 2. Verify URL availability
      await verifyUrlAvailability(url);

      return url;
    } catch (err) {
      // Normalize to Error
      lastError = err instanceof Error ? err : new Error(String(err));
      attempt++;

      // Final attempt failed - log and re-throw
      if (attempt >= MAX_ATTEMPTS) {
        logger.error("Storage validation failed", {
          fileName,
          attempts: attempt,
          error: lastError.message
        });
        throw lastError;
      }

      // Exponential backoff with jitter
      const backoffMs = 500 * Math.pow(2, attempt) + Math.random() * 300;
      await new Promise(res => setTimeout(res, backoffMs));
    }
  }

  // Fallback (should never hit because we throw on last attempt)
  throw lastError ?? new Error(`Failed to create signed URL after ${MAX_ATTEMPTS} attempts`);
}

async function verifyUrlAvailability(url: string): Promise<void> {
  const MAX_VALIDATION_ATTEMPTS = 5;
  const INITIAL_DELAY = 500;
  
  for (let i = 0; i < MAX_VALIDATION_ATTEMPTS; i++) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      
      // Success cases
      if (response.ok) return;
      
      // Handle Supabase-specific error patterns
      if (response.status === 404) {
        throw new Error(`Storage propagation delay detected (404)`);
      }
      
      if (response.status === 403) {
        throw new Error(`Signed URL invalidated unexpectedly (403)`);
      }
    } catch (error) {
      if (i === MAX_VALIDATION_ATTEMPTS - 1) throw error;
      
      const delay = INITIAL_DELAY * Math.pow(2, i);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

/**
 * Uploads a buffer to the 'temp-files' bucket.
 * Returns a signed URL (valid for 60 seconds) of the uploaded file.
 */
export async function uploadTempBuffer(
  fileName: string,
  buffer: Uint8Array,
  contentType: string
): Promise<string> {
  // Upload the file first.
  const { error: uploadError } = await backgroundSupabase.storage
    .from('temp-files')
    .upload(fileName, buffer, { contentType, upsert: true });

  if (uploadError) {
    throw new Error(`Failed to upload temp file ${fileName}: ${uploadError.message}`);
  }

  // Generate signed URL using retry helper.
  try {
    return await createSignedUrlWithRetry(fileName);
  } catch (error) {
    logger.error("Final signed URL creation failure", {
      fileName,
      error: error instanceof Error ? error.message : 'Unknown error',
      bufferSize: buffer.length
    });
    throw error;
  }
}


/**
 * Runs FFmpeg with the given input URL and arguments,
 * piping the output to stdout and capturing it in-memory.
 */
export async function processWithFFmpeg(
  inputUrl: string,
  ffmpegArgs: string[]
): Promise<Uint8Array> {
  const baseArgs = inputUrl ? ['-y', '-i', inputUrl] : ['-y'];
  const args = [...baseArgs, ...ffmpegArgs];
  if (!args.some(arg => arg.startsWith('pipe:'))) {
    args.push('-f', 'mp3', 'pipe:1');
  }

  logger.info("FFmpeg process starting");

  return new Promise((resolve, reject) => {
    const ffmpeg = spawn(resolvedFfmpegPath, args);
    const chunks: Buffer[] = [];
    let stderr = '';

    ffmpeg.stdout.on('data', chunk => {
      chunks.push(chunk);
    });

    ffmpeg.stderr.on('data', data => {
      stderr += data.toString();
    });

    ffmpeg.on('error', err => {
      logger.error("FFmpeg process error", { error: err });
      reject(err);
    });

    ffmpeg.on('close', code => {
      logger.info("FFmpeg process closed", { exitCode: code });

      if (code === 0) {
        const resultBuffer = new Uint8Array(Buffer.concat(chunks));
        logger.info("FFmpeg process succeeded", { outputSize: resultBuffer.length });
        resolve(resultBuffer);
      } else {
        logger.error("FFmpeg process failed", { exitCode: code });
        reject(new Error(`ffmpeg exited with code ${code}. Stderr: ${stderr}`));
      }
    });
  });
}

/**
 * Returns FFmpeg’s output as a ReadableStream with full stderr logging.
 */
export function processWithFFmpegStream(inputUrl: string, ffmpegArgs: string[]): NodeJS.ReadableStream {
  const baseArgs = inputUrl ? ['-y', '-i', inputUrl] : ['-y'];
  const args = [...baseArgs, ...ffmpegArgs];
  if (!args.some(arg => arg.startsWith('pipe:'))) {
    args.push('-f', 'mp3', 'pipe:1');
  }
  const ffmpeg = spawn(resolvedFfmpegPath, args);
  return ffmpeg.stdout;
}

/**
 * Converts a NodeJS ReadableStream into a Buffer.
 */
export async function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on('data', (chunk) => {
      chunks.push(Buffer.from(chunk));
    });
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
}

/**
 * Uploads a Buffer to Supabase Storage using the official client.
 */
export async function uploadBufferToSupabase(
  bucket: string,
  path: string,
  buffer: Buffer
): Promise<void> {
  const { error } = await backgroundSupabase.storage
    .from(bucket)
    .upload(path, buffer, { contentType: 'audio/mp3', upsert: true });
  if (error) {
    throw new Error(`Buffer upload failed: ${error.message}`);
  }
}

/**
 * Trims an audio buffer to the specified duration using FFmpeg’s atrim filter.
 * Now uses unique filenames for parallel operations.
 */
export async function trimAudio(
  inputBuffer: Uint8Array,
  duration: number,
  folderPrefix?: string
): Promise<Uint8Array> {
  const uniqueId = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const fileName = folderPrefix ?
    `${folderPrefix}/input_trim_${uniqueId}.mp3` :
    `input_trim_${uniqueId}.mp3`;
  const inputUrl = await uploadTempBuffer(fileName, inputBuffer, 'audio/mpeg');
  const args = ['-ss', '0', '-t', duration.toString(), '-c:a', 'copy'];
  return await processWithFFmpeg(inputUrl, args);
}

/**
 * Applies a fade-out effect to an audio buffer using FFmpeg’s afade filter.
 */
export async function applyFadeOut(
  inputBuffer: Uint8Array,
  totalDuration: number,
  fadeDuration: number,
  folderPrefix?: string
): Promise<Uint8Array> {
  const fileName = folderPrefix ?
    `${folderPrefix}/input_fade_${Date.now()}.mp3` :
    `input_fade_${Date.now()}.mp3`;
  const inputUrl = await uploadTempBuffer(fileName, inputBuffer, 'audio/mpeg');
  const fadeStart = totalDuration - fadeDuration;
  const args = ['-vn', '-af', `afade=t=out:st=${fadeStart}:d=${fadeDuration}`, '-c:a', 'mp3'];
  return await processWithFFmpeg(inputUrl, args);
}

/**
 * Overlays (mixes) the voice audio on top of background audio.
 * Now with parallel HEAD requests.
 */
export async function overlayAudioSimple(
  backgroundBuffer: Uint8Array,
  voiceBuffer: Uint8Array,
  duration: number,
  folderPrefix?: string
): Promise<Uint8Array> {
  const bgFileName = folderPrefix ? `${folderPrefix}/bg.mp3` : `bg.mp3`;
  const voiceFileName = folderPrefix ? `${folderPrefix}/voice.mp3` : `voice.mp3`;
  const bgUrl = await uploadTempBuffer(bgFileName, backgroundBuffer, 'audio/mpeg');
  const voiceUrl = await uploadTempBuffer(voiceFileName, voiceBuffer, 'audio/mpeg');

  // Parallel HEAD requests
  await Promise.all([
    fetch(bgUrl, { method: 'HEAD' })
      .then(response => console.info('HEAD request for background URL', { url: bgUrl, status: response.status }))
      .catch(err => console.error('HEAD request failed for background URL', { url: bgUrl, error: err })),
    fetch(voiceUrl, { method: 'HEAD' })
      .then(response => console.info('HEAD request for voice URL', { url: voiceUrl, status: response.status }))
      .catch(err => console.error('HEAD request failed for voice URL', { url: voiceUrl, error: err }))
  ]);

  const args = [
    '-vn',
    '-i', bgUrl,
    '-i', voiceUrl,
    '-filter_complex', '[0:a][1:a]amix=inputs=2:duration=first',
    '-t', duration.toString(),
    '-c:a', 'mp3',
    '-f', 'mp3',
    'pipe:1'
  ];

  return new Promise((resolve, reject) => {
    logger.info("Overlay audio process starting");
    const ffmpeg = spawn(resolvedFfmpegPath, args);
    const chunks: Buffer[] = [];
    ffmpeg.stdout.on('data', chunk => {
      chunks.push(chunk);
    });
    ffmpeg.on('error', err => {
      logger.error("Overlay audio error", { error: err });
      reject(err);
    });
    ffmpeg.on('close', code => {
      logger.info("Overlay audio process closed", { exitCode: code });
      if (code === 0) {
        logger.info("Overlay audio process succeeded");
        resolve(new Uint8Array(Buffer.concat(chunks)));
      } else {
        logger.error("Overlay audio process failed", { exitCode: code });
        reject(new Error(`ffmpeg exited with code ${code}`));
      }
    });
    setTimeout(() => {
      console.error('FFmpeg overlay process timed out', { args });
      ffmpeg.kill();
      reject(new Error('FFmpeg overlay process timed out'));
    }, 240000);
  });
}

/**
 * Concatenates multiple audio buffers using FFmpeg’s concat filter.
 * Now with parallel uploads.
 */
export async function concatAudio(
  buffers: Uint8Array[],
  folderPrefix?: string
): Promise<Uint8Array> {
  const MAX_PARALLEL_UPLOADS = 6;
  const urls: string[] = [];
  logger.info("Starting concatAudio", { bufferCount: buffers.length, folderPrefix });

  // Process uploads in batches to avoid too many parallel uploads
  for (let i = 0; i < buffers.length; i += MAX_PARALLEL_UPLOADS) {
    const batch = buffers.slice(i, i + MAX_PARALLEL_UPLOADS);
    logger.info("Uploading batch of audio buffers", { batchStart: i, batchSize: batch.length });
    const batchUrls = await Promise.all(
      batch.map((buffer, batchIndex) => {
        const fileName = folderPrefix
          ? `${folderPrefix}/input${i + batchIndex}.mp3`
          : `input${i + batchIndex}.mp3`;
        logger.info("Uploading temp buffer", { fileName });
        return uploadTempBuffer(fileName, buffer, 'audio/mpeg');
      })
    );
    logger.info("Uploaded batch successfully", { batchUrls });
    urls.push(...batchUrls);
  }

  // Build FFmpeg arguments for concatenation
  const ffmpegArgs: string[] = [];
  urls.forEach(url => {
    ffmpegArgs.push('-i', url);
  });
  const filterComplex = `concat=n=${urls.length}:v=0:a=1`;
  ffmpegArgs.push('-filter_complex', filterComplex, '-c:a', 'mp3', '-f', 'mp3', 'pipe:1');

  logger.info("Starting FFmpeg concat process using streaming", { ffmpegArgs });

  // Spawn FFmpeg using the streaming function. 
  // Pass an empty inputUrl so that only our custom ffmpegArgs are used.
  const stream = processWithFFmpegStream('', ffmpegArgs);

  // Convert the stream output to a Buffer.
  let resultBuffer: Buffer;
  try {
    resultBuffer = await streamToBuffer(stream);
    logger.info("FFmpeg concat stream completed", { outputSize: resultBuffer.length });
  } catch (error) {
    logger.error("Error during streaming concat process", { error });
    throw error;
  }

  return new Uint8Array(resultBuffer);
}

/**
 * Parallel processing utility for phrase generation.
 */
export async function processPhrasesInParallel(
  phrases: Uint8Array[],
  processor: (buffer: Uint8Array) => Promise<Uint8Array>,
  concurrency = 4
): Promise<Uint8Array[]> {
  const pool: Promise<void>[] = [];
  const results: Uint8Array[] = new Array(phrases.length);

  for (const [index, phrase] of phrases.entries()) {
    const task = processor(phrase)
      .then(result => {
        results[index] = result;
      })
      .finally(() => {
        pool.splice(pool.indexOf(task), 1);
      });

    pool.push(task);

    if (pool.length >= concurrency) {
      await Promise.race(pool);
    }
  }

  await Promise.all(pool);
  return results;
}

/**
 * Returns the duration (in seconds) of an audio buffer using music-metadata.
 */
export async function getAudioDuration(
  inputBuffer: Uint8Array
): Promise<number> {
  try {
    const buffer = Buffer.from(inputBuffer);
    console.info('Parsing audio duration from in-memory buffer using music-metadata');
    const metadata = await parseBuffer(buffer, 'audio/mpeg');
    const duration = metadata.format.duration;
    if (!duration) {
      console.error('Duration not found in metadata', { metadata: metadata.format });
      throw new Error('Duration not found in metadata');
    }
    console.info('Successfully parsed duration from in-memory buffer', { duration });
    return duration;
  } catch (err) {
    console.error('Failed to extract duration using music-metadata', { error: err });
    if (err instanceof Error) {
      throw new Error(`Failed to extract duration: ${err.message}`);
    } else {
      throw new Error('Failed to extract duration: unknown error');
    }
  }
}

/**
 * Overlays (mixes) the voice audio on top of background audio using ephemeral storage
 * for the final output. This approach writes the finalized file to the local /tmp folder,
 * ensuring a seekable output so that FFmpeg can properly finalize the container.
 */
export async function overlayAudioWithEphemeralOutput(
  backgroundBuffer: Uint8Array,
  voiceBuffer: Uint8Array,
  duration: number,
  folderPrefix: string,
  userId: string
): Promise<string> {
  // Define file names for background and voice assets.
  const bgFileName = folderPrefix ? `${folderPrefix}/bg.mp3` : `bg.mp3`;
  const voiceFileName = folderPrefix ? `${folderPrefix}/voice.mp3` : `voice.mp3`;

  // Upload the background and voice buffers to the temp-files bucket.
  const bgUrl = await uploadTempBuffer(bgFileName, backgroundBuffer, 'audio/mpeg');
  const voiceUrl = await uploadTempBuffer(voiceFileName, voiceBuffer, 'audio/mpeg');

  // Updated asset check that throws an error if the asset isn’t accessible.
  const checkAsset = async (url: string, label: string) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (!response.ok) {
        throw new Error(`${label} asset check failed with status ${response.status}`);
      }
      logger.info(`[Overlay Ephemeral] ${label} asset available`, { url, status: response.status });
    } catch (err) {
      logger.error(`[Overlay Ephemeral] ${label} HEAD request failed`, { url, error: err });
      throw new Error(`${label} HEAD request failed: ${err}`);
    }
  };

  // Verify that both assets are available.
  await Promise.all([
    checkAsset(bgUrl, 'Background'),
    checkAsset(voiceUrl, 'Voice')
  ]);

  // Use ephemeral storage (/tmp) for a seekable, finalized output.
  const tmpFolder = '/tmp';
  const outputFile = path.join(tmpFolder, `meditation-${Date.now()}.m4a`);

  // Build FFmpeg arguments to mix the two audio streams.
  const ffmpegArgs = [
    '-protocol_whitelist', 'file,http,https,tcp,tls',
    '-vn',
    '-i', bgUrl,
    '-i', voiceUrl,
    '-filter_complex', 
      '[0:a]volume=0.6[bg]; ' +      // Reduce background to 60%
      '[bg][1:a]amix=inputs=2:duration=first[mixed]; ' +  // Mix tracks
      '[mixed]volume=1.2[final]',    // Boost final output by 20%
    '-map', '[final]',               // Use the volume-boosted stream
    '-t', duration.toString(),
    '-c:a', 'aac',
    '-b:a', '96k',
    '-movflags', '+faststart',
    outputFile
  ];

  logger.info("[Overlay Ephemeral] Starting FFmpeg process for final output to ephemeral storage", {
    args: ffmpegArgs,
    outputFile
  });

  // Introduce a retry mechanism with exponential backoff.
  const MAX_RETRIES = 1;
  let attempt = 0;
  let lastError = '';

  while (attempt < MAX_RETRIES) {
    try {
      // Re-verify that both assets are available before each attempt.
      await Promise.all([
        checkAsset(bgUrl, 'Background'),
        checkAsset(voiceUrl, 'Voice')
      ]);

      await new Promise<void>((resolve, reject) => {
        const ffmpeg = spawn(resolvedFfmpegPath, ffmpegArgs);
        let stderr = '';

        ffmpeg.stderr.on('data', (data) => {
          stderr += data.toString();
        });

        // Add a timeout to guard against hanging FFmpeg processes.
        const timeoutMs = 240000; // 240 seconds timeout.
        const timeout = setTimeout(() => {
          logger.error("[Overlay Ephemeral] FFmpeg process timed out", { args: ffmpegArgs });
          ffmpeg.kill();
          reject(new Error("FFmpeg overlay process timed out"));
        }, timeoutMs);

        ffmpeg.on('error', (err) => {
          clearTimeout(timeout);
          logger.error("[Overlay Ephemeral] FFmpeg process error", { error: err });
          reject(err);
        });

        ffmpeg.on('close', (code) => {
          clearTimeout(timeout);
          logger.info("[Overlay Ephemeral] FFmpeg process closed", {
            exitCode: code,
            stderr: stderr.substring(0, 200)
          });
          if (code === 0) {
            resolve();
          } else {
            reject(new Error(`ffmpeg exited with code ${code}. Stderr: ${stderr}`));
          }
        });
      });
      // If we reach here, the FFmpeg process succeeded.
      break;
    } catch (err) {
      attempt++;
      lastError = err instanceof Error ? err.message : 'Unknown error';
      logger.error(`[Overlay Ephemeral] FFmpeg process failed on attempt ${attempt}`, { error: lastError });
      if (attempt < MAX_RETRIES) {
        const waitTime = 2000 * Math.pow(2, attempt - 1); // Exponential backoff: 2000ms, 4000ms, etc.
        logger.info(`[Overlay Ephemeral] Retrying FFmpeg process in ${waitTime}ms`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      } else {
        throw new Error(`FFmpeg overlay process failed after ${MAX_RETRIES} attempts. Last error: ${lastError}`);
      }
    }
  }

  // Read the finalized file from ephemeral storage.
  const finalizedBuffer: Buffer = readFileSync(outputFile);
  logger.info("[Overlay Ephemeral] Finalized file read from ephemeral storage", { size: finalizedBuffer.length });

  // Upload the finalized file to the final storage bucket.
  const finalFileName = `meditation-${Date.now()}.m4a`;
  const userFolderPath = `${userId}/${finalFileName}`;
  await uploadBufferToSupabase('meditation-output', userFolderPath, finalizedBuffer);
  logger.info("[Overlay Ephemeral] Finalized audio uploaded successfully", {
    path: `meditation-output/${finalFileName}`
  });

  // Clean up: delete the ephemeral file.
  try {
    unlinkSync(outputFile);
    logger.info("[Overlay Ephemeral] Ephemeral file deleted", { file: outputFile });
  } catch (err) {
    logger.error("[Overlay Ephemeral] Failed to delete ephemeral file", { file: outputFile, error: err });
  }

  return finalFileName;
}