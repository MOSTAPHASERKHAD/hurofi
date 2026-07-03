"use client";

import { motion } from "framer-motion";
import { useState, useCallback, useId } from "react";
import { useAudio } from "@/hooks/useAudio";
import Confetti from "@/components/ui/Confetti";
import { LETTER_COLORS } from "@/lib/letterColors";

interface PhonicsWheelProps {
  letter: string;
  phonemes: { sound: string; diacritic: string; audio?: string }[];
  letterId: number;
  color?: string;
}

function speakFallback(text: string, onEnd?: () => void) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    onEnd?.();
    return;
  }
  try {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA";
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    const ar = synth.getVoices().find((v) => v.lang.startsWith("ar"));
    if (ar) utterance.voice = ar;
    utterance.onend = () => onEnd?.();
    utterance.onerror = () => onEnd?.();
    synth.speak(utterance);
  } catch {
    onEnd?.();
  }
}

export default function PhonicsWheel({
  letter,
  phonemes,
  letterId,
  color = "#7C3AED",
}: PhonicsWheelProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const uid = useId();
  const { play } = useAudio();

  const handlePhonemeClick = useCallback(
    (index: number) => {
      setActiveIndex(index);
      setRotation((r) => r + 360);
      setTimeout(() => setConfettiTrigger((c) => c + 1), 200);
      setIsSpeaking(true);

      const p = phonemes[index];
      if (p.audio) {
        play(p.audio);
        setTimeout(() => setIsSpeaking(false), 1200);
      } else {
        speakFallback(p.sound, () => setIsSpeaking(false));
      }
    },
    [phonemes, play]
  );

  const colors = LETTER_COLORS[letterId] || { primary: color, light: color + "20", dark: color };

  return (
    <div
      className="card flex flex-col items-center gap-6 p-8 relative overflow-hidden"
      style={{ backgroundColor: "#FFFFFF", borderColor: colors.primary + "30" }}
    >
      <h3 className="text-xl font-amiri font-bold" style={{ color: colors.dark }}>
        🎡 عجلة الصوتيات
      </h3>

      <div className="relative w-64 h-64">
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: rotation }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div
            className="absolute inset-0 rounded-full border-4"
            style={{ backgroundColor: colors.light, borderColor: colors.primary + "50" }}
          />

          {phonemes.map((p, i) => {
            const angle = i * (360 / phonemes.length) - 90;
            const radian = (angle * Math.PI) / 180;
            const radius = 36;
            const x = 50 + radius * Math.cos(radian);
            const y = 50 + radius * Math.sin(radian);

            return (
              <button
                key={i}
                onClick={() => handlePhonemeClick(i)}
                className="absolute w-16 h-16 -ml-8 -mt-8 rounded-full flex flex-col items-center justify-center shadow-lg cursor-pointer"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  backgroundColor: activeIndex === i ? colors.primary : "#FFFFFF",
                  color: activeIndex === i ? "#FFFFFF" : colors.dark,
                  border: `3px solid ${
                    activeIndex === i ? colors.primary : colors.primary + "40"
                  }`,
                  boxShadow:
                    activeIndex === i
                      ? `0 6px 20px ${colors.primary}60`
                      : `0 4px 12px ${colors.primary}20`,
                  transform: `rotate(-${rotation}deg)`,
                  transition: "transform 1s ease-in-out",
                }}
              >
                <span className="text-xl font-amiri font-bold">{p.sound}</span>
                <span className="text-[9px] font-inter font-medium">{p.diacritic}</span>
              </button>
            );
          })}

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.span
              key={uid + "-letter-" + rotation}
              className="text-6xl font-amiri font-bold z-10"
              style={{ color: colors.dark }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {letter}
            </motion.span>
          </div>
        </motion.div>

        <div className="absolute inset-0 pointer-events-none z-20">
          <Confetti
            letter={letter}
            color={colors.primary}
            colorLight={colors.light}
            trigger={confettiTrigger}
            count={40}
          />
        </div>
      </div>

      {activeIndex !== null && (
        <motion.div
          initial={{ y: 20, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="text-center relative py-4"
        >
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl"
            style={{ backgroundColor: colors.light, border: `2px solid ${colors.primary}40` }}
          >
            <motion.span
              key={uid + "-sound-" + activeIndex}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="font-amiri text-4xl"
              style={{ color: colors.dark }}
            >
              {phonemes[activeIndex].sound}
            </motion.span>
            <div className="flex items-center gap-1">
              <span className="text-lg">🔊</span>
              <span className="font-inter text-sm font-medium" style={{ color: colors.primary }}>
                {isSpeaking ? "جاري النطق..." : "تم النطق"}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {activeIndex === null && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="font-inter text-sm text-neutral-400 text-center"
        >
          اضغط على أي حركة للاستماع لنطقها 👆
        </motion.p>
      )}
    </div>
  );
}
