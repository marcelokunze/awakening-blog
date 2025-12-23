"use server";

import { meditationGenerationTask } from "@/trigger/meditation-generation";
import { tasks } from "@trigger.dev/sdk/v3";
import { createClient } from "@/utils/supabase/server";
import type { MeditationConfig } from "@/lib/generator/types/meditation";

// Omit the userId—we'll inject that from auth
export async function meditationTask(
  params: Omit<MeditationConfig, "userId">
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  try {
    // Spread in all config fields, then add userId
    const handle = await tasks.trigger<typeof meditationGenerationTask>(
      "meditation-generation",
      {
        config: {
          ...params,
          userId: user.id,
        },
      }
    );

    return { handle };
  } catch (error) {
    console.error(error);
    return {
      error: "something went wrong",
    };
  }
}
