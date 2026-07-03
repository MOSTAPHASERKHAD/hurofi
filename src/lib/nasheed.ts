import { useSound } from "./useSound";

// Map letter ID to MP3 filename (Arabic letter names)
const LETTER_AUDIO_MAP: Record<number, string> = {
  1: "ا",
  2: "ب",
  3: "ت",
  4: "ث",
  5: "ج",
  6: "ح",
  7: "خ",
  8: "د",
  9: "ذ",
  10: "ر",
  11: "ز",
  12: "س",
  13: "ش",
  14: "ص",
  15: "ض",
  16: "ط",
  17: "ظ",
  18: "ع",
  19: "غ",
  20: "ف",
  21: "ق",
  22: "ك",
  23: "ل",
  24: "م",
  25: "ن",
  26: "ه",
  27: "و",
  28: "ي",
};

let currentAudio: HTMLAudioElement | null = null;

export async function playNasheed(letterId: number): Promise<boolean> {
  if (useSound.getState().muted) return false;

  const fileName = LETTER_AUDIO_MAP[letterId];
  if (!fileName) return false;

  // Stop any currently playing nasheed
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }

  try {
    const audio = new Audio(`/nasheeds/${fileName}.mp3`);
    currentAudio = audio;

    await new Promise<void>((resolve, reject) => {
      audio.onended = () => {
        currentAudio = null;
        resolve();
      };
      audio.onerror = () => {
        currentAudio = null;
        reject(new Error(`Failed to play ${fileName}.mp3`));
      };
      audio.play().catch(reject);
    });

    return true;
  } catch {
    currentAudio = null;
    return false;
  }
}

export function stopNasheed(): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

export async function playMainNasheed(): Promise<boolean> {
  if (useSound.getState().muted) return false;

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }

  try {
    const audio = new Audio("/nasheeds/أنشودة الحروف.mp3");
    currentAudio = audio;

    await new Promise<void>((resolve, reject) => {
      audio.onended = () => {
        currentAudio = null;
        resolve();
      };
      audio.onerror = () => {
        currentAudio = null;
        reject(new Error("Failed to play main nasheed"));
      };
      audio.play().catch(reject);
    });

    return true;
  } catch {
    currentAudio = null;
    return false;
  }
}

// Additional nasheeds are loaded dynamically from /api/nasheeds

export async function playAdditionalNasheed(file: string): Promise<boolean> {
  if (useSound.getState().muted) return false;

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }

  try {
    const audio = new Audio(`/nasheeds/${file}`);
    currentAudio = audio;

    await new Promise<void>((resolve, reject) => {
      audio.onended = () => {
        currentAudio = null;
        resolve();
      };
      audio.onerror = () => {
        currentAudio = null;
        reject(new Error(`Failed to play ${file}`));
      };
      audio.play().catch(reject);
    });

    return true;
  } catch {
    currentAudio = null;
    return false;
  }
}
