import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SoundState {
  muted: boolean;
  toggle: () => void;
}

export const useSound = create<SoundState>()(
  persist(
    (set) => ({
      muted: false,
      toggle: () => set((s) => ({ muted: !s.muted })),
    }),
    { name: "hurofi-sound" }
  )
);
