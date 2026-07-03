"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LetterProgress {
  completedActivities: string[];
  reviewDone: boolean;
}

interface ProgressState {
  letters: Record<number, LetterProgress>;
  completeActivity: (letterId: number, activity: string) => void;
  completeReview: (letterId: number) => void;
  getLetterStars: (letterId: number) => number;
  isLetterComplete: (letterId: number) => boolean;
  totalCompletedLetters: () => number;
  totalStars: () => number;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      letters: {},

      completeActivity: (letterId, activity) =>
        set((state) => {
          const current = state.letters[letterId] || { completedActivities: [], reviewDone: false };
          if (current.completedActivities.includes(activity)) return state;
          return {
            letters: {
              ...state.letters,
              [letterId]: {
                ...current,
                completedActivities: [...current.completedActivities, activity],
              },
            },
          };
        }),

      completeReview: (letterId) =>
        set((state) => {
          const current = state.letters[letterId] || { completedActivities: [], reviewDone: false };
          return {
            letters: {
              ...state.letters,
              [letterId]: { ...current, reviewDone: true },
            },
          };
        }),

      getLetterStars: (letterId) => {
        const l = get().letters[letterId];
        if (!l) return 0;
        let count = l.completedActivities.length;
        if (l.reviewDone) count += 1;
        return count;
      },

      isLetterComplete: (letterId) => {
        const l = get().letters[letterId];
        if (!l) return false;
        return l.reviewDone;
      },

      totalCompletedLetters: () => {
        return Object.values(get().letters).filter((l) => l.reviewDone).length;
      },

      totalStars: () => {
        const state = get();
        return Object.keys(state.letters).reduce(
          (sum, id) => sum + state.getLetterStars(Number(id)),
          0
        );
      },
    }),
    { name: "hurofi-progress" }
  )
);
