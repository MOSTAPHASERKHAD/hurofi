export interface LetterContent {
  id: number;
  letter: string;
  name: string;
  phonemes: { sound: string; diacritic: string; audio?: string }[];
  forms: { isolated: string; initial: string; medial: string; final: string };
  words: {
    id: string;
    arabic: string;
    transliteration: string;
    english: string;
    position: string;
    syllables: string[];
    image?: string;
  }[];
  matchWords: {
    id: string;
    arabic: string;
    transliteration: string;
    english: string;
    position: string;
    syllables: string[];
    image?: string;
  }[];
  activities: { type: string; name: string; config: Record<string, unknown> }[];
  reviewGame: { type: string; name: string; config: { letters: string[] } };
  montessoriTip: string;
  audioUrls: { letter: string; words: string[]; encouragement: { correct: string; wrong: string; complete: string } };
}
