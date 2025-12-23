import { defineConfig } from "@trigger.dev/sdk/v3";
import { prismaExtension } from "@trigger.dev/build/extensions/prisma";
import { ffmpeg } from "@trigger.dev/build/extensions/core";
import { PrismaInstrumentation } from "@prisma/instrumentation";

export default defineConfig({
  project: "proj_bfqfrjuprztfrzpifleh",
  runtime: "node",
  logLevel: "log",
  maxDuration: 3600,
  build: {
    extensions: [
      prismaExtension({
        schema: "prisma/schema.prisma"
      }),
      ffmpeg(),
    ],
    external: ["fluent-ffmpeg"]
  },
  instrumentations: [new PrismaInstrumentation()],
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10000,
      factor: 2,
      randomize: true,
    },
  },
});