// Purpose string
export type MeditationPurpose = string;

// Technique definition
export interface Technique {
  id: string;
  name: string;
  description: string;
  beginnerFriendly?: boolean;
}

// Configuration for meditation generation
export interface MeditationConfig {
  purpose: MeditationPurpose;
  duration: number;
  beginner: boolean;
  language: 'en' | 'es' | 'fr' | 'de' | 'pt' | 'ru' | 'hi' | 'zh' | 'ja' | 'ko';
  voiceId?: string;
  bgTrack?: string;
  userId: string;
}

// Output section type
export interface MeditationSection {
  type: 'intro' | 'breathing' | 'technique' | 'outro';
  techniqueName: string;
  content: string[];
}

// Final output structure
export interface MeditationOutput {
  sections: MeditationSection[];
  techniques: string[];
  purposeAlignment: string;
}