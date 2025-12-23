export interface SectionPlan {
  type: 'intro' | 'technique' | 'breathing' | 'outro';
  durationInSeconds: number;
  pauseAfterInSeconds: number;
  linesForLatin: number;
  linesForCJK: number;
}

export interface MeditationPlan {
  totalSeconds: number;
  sections: SectionPlan[];
}

// 5-minute plan
export const FIVE_MINUTE_PLAN: MeditationPlan = {
  totalSeconds: 300,
  sections: [
    { type: 'intro',     durationInSeconds: 60,  pauseAfterInSeconds: 10, linesForLatin: 4, linesForCJK: 5 },
    { type: 'breathing', durationInSeconds: 12,  pauseAfterInSeconds: 10, linesForLatin: 3, linesForCJK: 4 },
    { type: 'technique', durationInSeconds: 85,  pauseAfterInSeconds: 10, linesForLatin: 6, linesForCJK: 7 },
    { type: 'breathing', durationInSeconds: 12,  pauseAfterInSeconds: 10, linesForLatin: 3, linesForCJK: 4 },
    { type: 'outro',     durationInSeconds: 60,  pauseAfterInSeconds: 20, linesForLatin: 4, linesForCJK: 5 },
  ]
};

// 10-minute plan
export const TEN_MINUTE_PLAN: MeditationPlan = {
  totalSeconds: 600,
  sections: [
    { type: 'intro',     durationInSeconds: 75,  pauseAfterInSeconds: 10, linesForLatin: 5, linesForCJK: 7 },
    { type: 'breathing', durationInSeconds: 25,  pauseAfterInSeconds: 10, linesForLatin: 5, linesForCJK: 6 },
    { type: 'technique', durationInSeconds: 150, pauseAfterInSeconds: 10, linesForLatin: 10, linesForCJK: 12 },
    { type: 'breathing', durationInSeconds: 25,  pauseAfterInSeconds: 10, linesForLatin: 5, linesForCJK: 6 },
    { type: 'technique', durationInSeconds: 150, pauseAfterInSeconds: 10, linesForLatin: 10, linesForCJK: 12 },
    { type: 'outro',     durationInSeconds: 75,  pauseAfterInSeconds: 20, linesForLatin: 5, linesForCJK: 7 },
  ]
};

// 15-minute plan
export const FIFTEEN_MINUTE_PLAN: MeditationPlan = {
  totalSeconds: 900,
  sections: [
    // intro (90 s)
    { type: 'intro',     durationInSeconds: 90,  pauseAfterInSeconds: 10, linesForLatin: 6,  linesForCJK: 8 },
    { type: 'breathing', durationInSeconds: 30,  pauseAfterInSeconds: 10, linesForLatin: 7,  linesForCJK: 8 },
    { type: 'technique', durationInSeconds: 180, pauseAfterInSeconds: 10, linesForLatin: 12, linesForCJK: 14 },
    { type: 'breathing', durationInSeconds: 30,  pauseAfterInSeconds: 10, linesForLatin: 7,  linesForCJK: 8 },
    { type: 'technique', durationInSeconds: 180, pauseAfterInSeconds: 10, linesForLatin: 12, linesForCJK: 14 },
    { type: 'breathing', durationInSeconds: 30,  pauseAfterInSeconds: 10, linesForLatin: 7,  linesForCJK: 8 },
    { type: 'technique', durationInSeconds: 180, pauseAfterInSeconds: 10, linesForLatin: 12, linesForCJK: 14 },
    { type: 'outro',     durationInSeconds: 90,  pauseAfterInSeconds: 30, linesForLatin: 6,  linesForCJK: 8 },
  ]
};

// 20-minute plan
export const TWENTY_MINUTE_PLAN: MeditationPlan = {
  totalSeconds: 1200,
  sections: [
    { type: 'intro',     durationInSeconds: 105, pauseAfterInSeconds: 10, linesForLatin: 7,  linesForCJK: 9 },
    { type: 'breathing', durationInSeconds: 30,  pauseAfterInSeconds: 10, linesForLatin: 9,  linesForCJK: 10 },
    { type: 'technique', durationInSeconds: 180, pauseAfterInSeconds: 10, linesForLatin: 12, linesForCJK: 14 },
    { type: 'breathing', durationInSeconds: 30,  pauseAfterInSeconds: 10, linesForLatin: 9,  linesForCJK: 10 },
    { type: 'technique', durationInSeconds: 180, pauseAfterInSeconds: 10, linesForLatin: 12, linesForCJK: 14 },
    { type: 'breathing', durationInSeconds: 30,  pauseAfterInSeconds: 10, linesForLatin: 9,  linesForCJK: 10 },
    { type: 'technique', durationInSeconds: 180, pauseAfterInSeconds: 10, linesForLatin: 12, linesForCJK: 14 },
    { type: 'breathing', durationInSeconds: 30,  pauseAfterInSeconds: 10, linesForLatin: 9,  linesForCJK: 10 },
    { type: 'technique', durationInSeconds: 180, pauseAfterInSeconds: 10, linesForLatin: 12, linesForCJK: 14 },
    { type: 'outro',     durationInSeconds: 105, pauseAfterInSeconds: 30, linesForLatin: 7,  linesForCJK: 9 },
  ]
};

export function getMeditationPlan(minutes: number): MeditationPlan {
  switch (minutes) {
    case 5:  return FIVE_MINUTE_PLAN;
    case 10: return TEN_MINUTE_PLAN;
    case 15: return FIFTEEN_MINUTE_PLAN;
    case 20: return TWENTY_MINUTE_PLAN;
    default: throw new Error("Unsupported duration. Please choose 5, 10, 15, or 20 minutes.");
  }
}
