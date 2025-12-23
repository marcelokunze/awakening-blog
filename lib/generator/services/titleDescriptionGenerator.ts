import { createOpenAI } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import { logger } from "@trigger.dev/sdk/v3";

export class TitleDescriptionGenerator {
  private openai;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set in environment variables');
    }
    // Initialize with strict compatibility and your API key
    this.openai = createOpenAI({
      apiKey,
      compatibility: 'strict'
    });
    logger.info("TitleDescriptionGenerator instantiated");
  }

  private buildPrompt(purpose: string, technique: string, language: string): string {
    return `
Generate a highly creative concise title (3–7 words) and a brief description (about 20 words) in ${language} for a guided deep rest session.
The title should creatively encapsulate the goal of the session based on its purpose and technique.
The description should succinctly explain what the user will achieve through this session in a creative way.

Inputs:
- Purpose: "${purpose}"
- Technique: "${technique}"

Return the output as valid JSON matching the following schema:
{
  "title": "your title",
  "description": "your description"
}
`;
  }

  async generateTitleDescription(params: { purpose: string; technique: string; language: string }): Promise<{ title: string; description: string }> {
    const prompt = this.buildPrompt(params.purpose, params.technique, params.language);
    
    try {
      logger.info("TitleDescriptionGenerator: sending prompt to OpenAI", { prompt });
      
      // Define a Zod schema that represents the expected JSON structure
      const zodSchema = z.object({
        title: z.string(),
        description: z.string()
      });
      
      // Use generateObject, which returns an object adhering to the Zod schema.
      const { object } = await generateObject({
        model: this.openai("gpt-4o-mini"),
        schema: zodSchema,
        prompt,
        temperature: 1.0,
      });
      
      logger.info("TitleDescriptionGenerator: parsed result", { result: object });
      return object;
    } catch (error) {
      logger.error("TitleDescriptionGenerator: generation failed", {
        error: error instanceof Error ? error.message : "Unknown error"
      });
      throw new Error(`Title/description generation failed: ${(error as Error).message}`);
    }
  }
}
