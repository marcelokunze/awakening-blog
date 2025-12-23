import type { Technique } from '../types/meditation';

export const TECHNIQUES: Technique[] = [
  {
    id: 'sequential-zone-mapping',
    name: 'Sequential Zone Mapping',
    description: `Move awareness through body areas in sequence. This can be done by scanning from extremities to the center (or other way around), tracing the outline of the body, or gently shifting attention between specific zones. For 5–10 minute sessions, choose one or two of these approaches. For 15–20 minutes, combine all three, spending time with each before moving on. Vary the speed, imagery, or points of focus to keep the practice engaging. Use macro-mapping (big zones) and micro-mapping (small interfaces and details). Vary the dimension of awareness.`,
    beginnerFriendly: true,
  },
  {
    id: 'orb-convergence-flow',
    name: 'Orb Convergence Flow',
    description: `Visualize a gently glowing orb at each hand, each foot, and the crown of the head. Guide each orb, one at a time, along a smooth path toward the heart—first one hand, then one foot, then the other hand and foot, and finally the head—pausing to notice any warmth, tingling, or movement sensations. Instruct to move the orb according to the breath, when breathing in guide the orb inwards towards the heart, and when breathing out, outwards, where it came from. After moving each orb individually, imagine all five orbs converging into a single luminous point in the chest, aligned with the breath. For 5 minute sessions do only the first part, without the orbs converging. For 10 minute sessions, do the entire flow. For 15–20 minutes, move slowly between the technique sections spending more time on each orb, before moving on. The final technique section should be used only for the five orbs converging.`,
    beginnerFriendly: true,
  },
  {
    id: 'sensory-parameter-mapping',
    name: 'Sensory Parameter Mapping',
    description: `Focus on different ways the body senses information. Notice changes in temperature on the skin, how weight spreads where the body meets a surface, or tiny movements that happen with each breath. For a 5–10 minute session, pick one or two of these focuses. For a 15–20 minute session, work through all three in any order, moving slowly. Start by noticing broad areas, then turn attention to finer details, shifting awareness as you go. Use macro-mapping (big zones) and micro-mapping (small interfaces and details). Vary the dimension of awareness and never repeat the same guidance twice in the same session.`,
    beginnerFriendly: true,
  },
  {
    id: 'spatial-geometry-and-space-mapping',
    name: 'Spatial & Space Mapping',
    description: `Pay attention to the space and shapes around the body. Sense the angles and distance between limbs, and notice the gaps between parts like fingers or toes. In a short 5–10 minute practice, focus on either the angles or the spaces. In a longer 15–20 minute session, alternate between both and move slowly. Begin with a general sense of space, then explore smaller details as the practice continues. Use macro-mapping (big zones) and micro-mapping (small interfaces and details). Vary the dimension of awareness and never repeat the same guidance twice in the same session.`,
    beginnerFriendly: true,
  },
  {
    id: 'internal-external-alternation',
    name: 'Internal-External Alternation',
    description: `Alternate awareness between external sensations (sound, temperature, surface contact) and internal cues (heartbeat, breath, muscle tension) in a steady rhythm. Use macro-mapping (big zones) and micro-mapping (small interfaces and details). In a short 5–10 minute practice, focus on one internal and one external. In a longer 15–20 minute session, alternate between both and move slowly. Vary the dimension of awareness and never repeat the same guidance twice in the same session.`,
    beginnerFriendly: true,
  },
  {
    id: 'progressive-muscle-relaxation',
    name: 'Progressive Muscle Relaxation',
    description: `Systematically tense and then release major muscle groups like feet, legs, abdomen, chest, arms, shoulders, and face. After each release, notice the difference between tension and ease. Coordinate awareness throughout. Use macro-mapping (big zones) and micro-mapping (small interfaces and details) to vary the dimension of awareness. For 5–10 minute sessions, choose one or two major muscle groups. For 15–20 minutes, move slowly through as many as possible. NEVER repeat the same muscle groups twice in the same session.`,
    beginnerFriendly: true,
  },
  {
    id: 'empty-bowl-meditation',
    name: 'Empty Bowl Meditation',
    description: `Visualize the mind as an empty bowl. Observe thoughts, emotions, and sensations as objects entering and leaving the bowl without judgment, creating space and calm. Be creative on what can be perceived, never repeat the same guidance twice in the same session.`,
    beginnerFriendly: true,
  },
  {
    id: 'senses-practice',
    name: 'Senses Practice',
    description: `Cycle attention through the five senses: sight (with eyes closed), sound, touch, taste, and smell. Spend a few breaths on each, fully experiencing raw sensory input before moving on. Be creative on what can be perceived, never repeat the same guidance twice in the same session.`,
    beginnerFriendly: false,
  },
  {
    id: 'parameter-of-sensation',
    name: 'Parameter of Sensation',
    description: `Locate boundaries where sensation changes—such as the edge of a garment against skin or the transition from air to arm. Track these sensory thresholds, moving along them to observe subtle shifts. Use macro-mapping (big zones) and micro-mapping (small interfaces and details). Be creative on what can be perceived and vary the dimension of awareness, never repeating the same guidance twice in the same session.`,
    beginnerFriendly: true,
  },
];

/**
 * Sub-focus slots for each technique to enforce non-repetition.
 * We will chunk these into pairs per “technique” section.
 */
export const SUB_FOCI: Record<string, string[]> = {
  'senses-practice': ['sight', 'sound', 'touch', 'taste', 'smell'],
  'sequential-zone-mapping': ['toes', 'feet', 'calves', 'thighs', 'torso', 'arms', 'hands', 'head'],
  'orb-convergence-flow': ['left hand', 'right hand', 'left foot', 'right foot', 'crown of head', 'convergence'],
  'sensory-parameter-mapping': ['temperature', 'pressure', 'movement', 'texture'],
  'spatial-geometry-and-space-mapping': ['angles', 'distances', 'gaps', 'shapes'],
  'internal-external-alternation': ['sound ⇄ heartbeat', 'temperature ⇄ muscle tension', 'surface contact ⇄ breath'],
  'progressive-muscle-relaxation': ['feet', 'calves', 'thighs', 'abdomen', 'chest', 'arms', 'shoulders', 'face'],
  'empty-bowl-meditation': ['thoughts', 'emotions', 'sensations', 'memories'],
  'parameter-of-sensation': ['garment edge', 'air-skin', 'fabric seams', 'joint folds'],
};

export function getTechniques(beginner?: boolean): Technique[] {
  return TECHNIQUES.filter(
    t => beginner === undefined || t.beginnerFriendly === beginner
  );
}

export function selectRandomTechniques(
  techniques: Technique[],
  count: number
): Technique[] {
  const selected: Technique[] = [];
  const used = new Set<number>();
  while (selected.length < count && used.size < techniques.length) {
    const idx = Math.floor(Math.random() * techniques.length);
    if (used.has(idx)) continue;
    used.add(idx);
    selected.push(techniques[idx]);
  }
  return selected;
}
