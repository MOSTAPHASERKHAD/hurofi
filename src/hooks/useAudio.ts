"use client";

import { useCallback, useRef, useState } from "react";

export function useAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = useCallback((src: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const audio = new Audio(src);
    audioRef.current = audio;

    audio.onended = () => {
      setIsPlaying(false);
      audioRef.current = null;
    };

    audio.onerror = () => {
      setIsPlaying(false);
      audioRef.current = null;
    };

    setIsPlaying(true);
    audio.play().catch(() => {
      setIsPlaying(false);
      audioRef.current = null;
    });
  }, []);

  const playFile = useCallback(
    (src: string) => {
      play(src);
    },
    [play]
  );

  return { play, playFile, isPlaying };
}
