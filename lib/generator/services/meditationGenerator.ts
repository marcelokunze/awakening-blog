import { createOpenAI } from '@ai-sdk/openai';
import { generateObject, NoObjectGeneratedError } from 'ai';
import { z } from 'zod';
import type { MeditationConfig, MeditationOutput, Technique } from '../types/meditation';
import { getTechniques, selectRandomTechniques, SUB_FOCI } from '../constants/techniques';
import { getMeditationPlan, type SectionPlan, type MeditationPlan } from '../constants/meditationPlans';
import { logger } from '@trigger.dev/sdk/v3';

// Zod schema for a single meditation section
const MeditationSectionSchema = z.object({
  type: z.enum(["intro", "breathing", "technique", "outro"]),
  techniqueName: z.string(),
  content: z.array(z.string()),
});

// Full output schema
const MeditationOutputSchema = z.object({
  sections: z.array(MeditationSectionSchema),
  techniques: z.array(z.string()),
  purposeAlignment: z.string(),
});

export class MeditationGenerator {
  private openai;
  private readonly languageNames: Record<string, string> = {
    en: 'English', es: 'Spanish', fr: 'French', de: 'German', pt: 'Portuguese',
    ru: 'Russian', hi: 'Hindi', zh: 'Chinese', ja: 'Japanese', ko: 'Korean',
  };

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error('OPENAI_API_KEY is not set in environment variables');
    this.openai = createOpenAI({ apiKey, compatibility: 'strict' });
    logger.info('MeditationGenerator instantiated');
  }

  private buildPrompt(config: MeditationConfig, technique: Technique, subFoci: string[]): string {
    const plan: MeditationPlan = getMeditationPlan(config.duration);
    const isCJK = ['zh', 'ja', 'ko'].includes(config.language);
    const lineTargets = plan.sections.map(sec => isCJK ? sec.linesForCJK : sec.linesForLatin);

    // Shuffle sub-foci for non-repetition
    const foci = [...subFoci];
    for (let i = foci.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [foci[i], foci[j]] = [foci[j], foci[i]];
    }

    // Chunk into pairs of two senses/parameters
    const pairs: string[][] = [];
    for (let i = 0; i < foci.length; i += 2) {
      pairs.push(foci.slice(i, i + 2));
    }
    // Ensure enough pairs for each technique section
    const techCount = plan.sections.filter(sec => sec.type === 'technique').length;
    let idxPair = 0;
    while (pairs.length < techCount && pairs.length > 0) {
      pairs.push(pairs[idxPair++ % pairs.length]);
    }
    pairs.length = techCount;

    let pairIndex = 0;
    const sectionsPrompt = plan.sections.map((sec, idx) => {
      let prompt = this.formatSectionPrompt(sec, idx, lineTargets[idx], config.purpose, technique.name);
      if (sec.type === 'technique' && pairs.length > 0) {
        const group = pairs[pairIndex++];
        prompt += `\n   • In this section, focus on **${group.join(' and ')}** and tie it back to: "${config.purpose}".`;
      }
      return prompt;
    }).join('\n\n');

    return `
    You are a script writer for a non-spiritual guided meditation session, that uses techniques backed by neuroscience.
    Your tone should always be inviting, cordial, non-spiritual and non-cryptic language (easy to understand and follow).
Your current task is to generate a ${this.languageNames[config.language]} meditation session to aid with this purpose: **${config.purpose}**
This is the selected technique: ${technique.name} — ${technique.description}

## Line Structure Guidelines

* Each line = 1 complete thought/phrase (1-2 sentences)
* Each section should flow like a cohesive paragraph
* Keep transitions smooth between sections
* Maintain connection between consecutive lines (e.g., "Next,", "Then,", "As you...") for continuity. If it is a long guidance it is ok to break it into 2 lines.

## Section Requirements:

${sectionsPrompt}

## Important Guidelines:

* Maintain a gentle, flowing tone and use invitational language
* Always be cordial and polite
* Never make affirmations or be spiritual
* Never use cryptic or difficult to understand language

## JSON Output Format

  Please return **only** a JSON object matching the Zod schema above.  
  Each element of "content" must be exactly one line (1–2 sentences).

 **Example** (for a 3-line breathing section):
 \`\`\`json
{
  "type": "breathing",
  "techniqueName": "<technique name in English>",
  "content": [
    "<Line 1 content>",
    "<Line 2 content>",
    "<Line 3 content>"
  ]
}
\`\`\`
`.trim();
  }

  private formatSectionPrompt(
    sec: SectionPlan,
    idx: number,
    lines: number,
    purpose: string,
    techniqueName: string
  ): string {
    const base = `${idx + 1}. ${sec.type.toUpperCase()} (${lines} lines):\n   • Write exactly ${lines} lines`;

    switch (sec.type) {
      case 'intro':
        return `
${base}
   • Welcome and tie into the purpose: "${purpose}"
   • Include position setup (seated or lying down - if sleep related only lying down) and eyes-closed cue`.trim();

      case 'breathing':
        return `
${base}
   • Begin with a transitional phrase linking to the previous section (e.g., how the breath feels in the area you just explored).
   • Remind the listener they should breathe normally unless instructed otherwise.
   • Induce the user to take 3 deep breaths through the nose and slowly fully release them through pursed lips (as if through a small straw).
   • Do not guide through the breaths`.trim();

      case 'technique':
        return `
${base}
   • Begin with a transitional phrase linking to the previous section.
   • Guide the person into the technique without mentioning its name.
   • Use the technique ${techniqueName} to aid the user in reaching: "${purpose}". Explain sparingly how it helps.
   • Be detailed and specific. Use progression cues.
   • Be slow and calm.
   • Describe what the person might be feeling, but only sparingly.
   • Never repeat instructions; creatively deepen the practice`.trim();


      case 'outro':
        return `
${base}
   • Begin with a transitional phrase linking to the previous section.
   • Reflect on the experience and reinforce the purpose: "${purpose}".
   • If the purpose is sleep-related, guide toward sleep.
   • Otherwise, slowly induce movement back into the body`.trim();

      default:
        return base;
    }
  }

  async generateMeditation(config: MeditationConfig): Promise<MeditationOutput> {
    const pool = config.beginner ? getTechniques(true) : getTechniques();
    const selected = selectRandomTechniques(pool, 1)[0];

    // Prepare sub-foci for this technique (falls back to empty array if none)
    const subFoci = SUB_FOCI[selected.id] || [];

    const prompt = this.buildPrompt(config, selected, subFoci);

    try {
      logger.info('MeditationGenerator: sending prompt', { prompt });

      const { object } = await generateObject({
        model: this.openai('gpt-4.1-2025-04-14'),
        schema: MeditationOutputSchema,
        prompt,
        temperature: 0.7,
      });

      logger.info('MeditationGenerator: received structured output', { object });

      this.validateLineCounts(object, config.duration, config.language);
      return object;
    } catch (err) {
      if (NoObjectGeneratedError.isInstance(err)) {
        console.error('Raw model output:', err.text);
        console.error('Parsed response body:', err.response);
        console.error('Validation errors:', err.cause);
      }
      throw err;
    }
  }

  private validateLineCounts(
    output: MeditationOutput,
    duration: number,
    language: string
  ) {
    const plan = getMeditationPlan(duration);
    const isCJK = ['zh', 'ja', 'ko'].includes(language);

    output.sections.forEach((sec, idx) => {
      const planSec = plan.sections[idx];
      if (!planSec) {
        console.warn(
          `Extra section ${idx + 1} (${sec.type}) not in plan; skipping line-count validation`
        );
        return;
      }

      const expected = isCJK ? planSec.linesForCJK : planSec.linesForLatin;
      if (sec.content.length !== expected) {
        console.warn(
          `Section ${idx + 1} (${sec.type}): Expected ${expected} lines, got ${sec.content.length}`
        );
      }
    });

    if (output.sections.length < plan.sections.length) {
      console.warn(
        `Fewer sections than plan: got ${output.sections.length}, expected ${plan.sections.length}`
      );
    }
  }
}
