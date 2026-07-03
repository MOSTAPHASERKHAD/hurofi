"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import Confetti from "@/components/ui/Confetti";
import { playTone } from "@/lib/audio";

interface BubblePopProps {
  letters: string[];
  currentLetter: string;
  color?: string;
  onComplete: () => void;
}

function speakLetter(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  try {
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ar-SA";
    u.rate = 0.7;
    const ar = synth.getVoices().find((v) => v.lang.startsWith("ar"));
    if (ar) u.voice = ar;
    synth.speak(u);
  } catch { /* ignore */ }
}

function playCorrect() {
  playTone(523, 0.15, "sine");
  setTimeout(() => playTone(659, 0.2, "sine"), 100);
}

function playWrong() {
  playTone(200, 0.3, "square");
  setTimeout(() => playTone(160, 0.3, "square"), 150);
}

const BUBBLE_COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F"];

interface Bubble {
  id: number;
  letter: string;
  isTarget: boolean;
  color: string;
  size: number;
  left: number;
  top: number;
  floatX: number;
  floatY: number;
  floatDur: number;
}

function randomPos(minDist: number, used: { left: number; top: number }[]) {
  for (let attempt = 0; attempt < 100; attempt++) {
    const left = 5 + Math.random() * 75;
    const top = 5 + Math.random() * 70;
    const ok = used.every(
      (p) => Math.sqrt((p.left - left) ** 2 + (p.top - top) ** 2) > minDist
    );
    if (ok) return { left, top };
  }
  return { left: 5 + Math.random() * 75, top: 5 + Math.random() * 70 };
}

function generateBubbles(letters: string[], currentLetter: string): Bubble[] {
  const TARGET_COUNT = 4;
  const TOTAL = 12;
  const pool = letters.filter((l) => l !== currentLetter).sort(() => Math.random() - 0.5);
  const result: Bubble[] = [];
  const used: { left: number; top: number }[] = [];

  for (let i = 0; i < TARGET_COUNT; i++) {
    const pos = randomPos(28, used);
    used.push(pos);
    result.push({
      id: i,
      letter: currentLetter,
      isTarget: true,
      color: BUBBLE_COLORS[i % BUBBLE_COLORS.length],
      size: 64 + Math.random() * 16,
      left: pos.left,
      top: pos.top,
      floatX: -20 + Math.random() * 40,
      floatY: -15 + Math.random() * 30,
      floatDur: 3 + Math.random() * 2,
    });
  }
  while (result.length < TOTAL) {
    const pick = pool[result.length % pool.length];
    const pos = randomPos(22, used);
    used.push(pos);
    result.push({
      id: result.length,
      letter: pick,
      isTarget: false,
      color: BUBBLE_COLORS[result.length % BUBBLE_COLORS.length],
      size: 58 + Math.random() * 20,
      left: pos.left,
      top: pos.top,
      floatX: -20 + Math.random() * 40,
      floatY: -15 + Math.random() * 30,
      floatDur: 3 + Math.random() * 2,
    });
  }
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function BubblePop({
  letters,
  currentLetter,
  color = "#7C3AED",
  onComplete,
}: BubblePopProps) {
  const TARGET_COUNT = 4;

  const [bubbles] = useState<Bubble[]>(() => generateBubbles(letters, currentLetter));
  const [popped, setPopped] = useState<Set<number>>(new Set());
  const [wrongId, setWrongId] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);
  const [confettiTrigger, setConfettiTrigger] = useState(0);

  const speakTarget = useCallback(() => {
    speakLetter(currentLetter);
  }, [currentLetter]);

  const handlePop = useCallback((bubble: Bubble) => {
    if (completed || popped.has(bubble.id)) return;
    if (bubble.isTarget) {
      const newPopped = new Set(popped);
      newPopped.add(bubble.id);
      setPopped(newPopped);
      playCorrect();
      if (newPopped.size === TARGET_COUNT) {
        setCompleted(true);
        setConfettiTrigger((c) => c + 1);
        setTimeout(() => { playCorrect(); setTimeout(playCorrect, 200); }, 100);
        setTimeout(onComplete, 1200);
      }
    } else {
      setWrongId(bubble.id);
      playWrong();
      setTimeout(() => setWrongId(null), 500);
    }
  }, [completed, popped, onComplete]);

  const targetPopped = [...popped].filter((id) => bubbles.find((b) => b.id === id)?.isTarget).length;

  return (
    <div
      className="card flex flex-col items-center gap-6 p-8 relative overflow-hidden min-h-[500px]"
      style={{ backgroundColor: "#FFFFFF", borderColor: color + "30" }}
    >
      <h3 className="text-xl font-amiri font-bold" style={{ color }}>
        🫧 فقاعات الحروف
      </h3>

      <div className="text-center">
        <p className="font-inter text-sm text-neutral-500 mb-2">اطلع على الفقاعة التي تحوي:</p>
        <div className="flex items-center justify-center gap-2">
          <motion.span
            key={currentLetter}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-5xl font-amiri font-bold inline-block cursor-pointer"
            style={{ color }}
            onClick={speakTarget}
          >
            {currentLetter}
          </motion.span>
          <motion.button whileHover={{ scale: 1.2 }} onClick={speakTarget} className="text-xl">
            🔊
          </motion.button>
        </div>
      </div>

      <div className="relative w-full h-80">
        <AnimatePresence>
          {bubbles
            .filter((b) => !popped.has(b.id))
            .map((bubble) => {
              const isWrong = wrongId === bubble.id;
              return (
                <motion.button
                  key={bubble.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    isWrong
                      ? { scale: [1, 1.1, 0.7], opacity: [1, 0.5, 0] }
                      : {
                          scale: 1,
                          opacity: 1,
                          x: [0, bubble.floatX, -bubble.floatX * 0.5, 0],
                          y: [0, bubble.floatY, -bubble.floatY * 0.5, 0],
                        }
                  }
                  transition={
                    isWrong
                      ? { duration: 0.5 }
                      : {
                          x: { duration: bubble.floatDur, repeat: Infinity, ease: "easeInOut" },
                          y: { duration: bubble.floatDur * 1.3, repeat: Infinity, ease: "easeInOut" },
                        }
                  }
                  onClick={() => handlePop(bubble)}
                  className="absolute rounded-full flex items-center justify-center shadow-lg cursor-pointer select-none"
                  style={{
                    width: bubble.size,
                    height: bubble.size,
                    left: bubble.left + "%",
                    top: bubble.top + "%",
                    marginLeft: -(bubble.size / 2),
                    marginTop: -(bubble.size / 2),
                    background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), ${bubble.color} 70%)`,
                    border: `3px solid ${bubble.color}`,
                  }}
                >
                  <span
                    className="font-amiri font-bold"
                    style={{
                      fontSize: bubble.size * 0.35,
                      color: "#333",
                      textShadow: "0 1px 2px rgba(255,255,255,0.5)",
                    }}
                  >
                    {bubble.letter}
                  </span>
                </motion.button>
              );
            })}
        </AnimatePresence>
      </div>

      <div className="flex gap-1">
        {[...Array(TARGET_COUNT)].map((_, i) => (
          <span
            key={i}
            className="w-6 h-6 rounded-full text-[10px] font-inter font-bold flex items-center justify-center transition-all"
            style={{
              backgroundColor: i < targetPopped ? "#10B981" : color + "20",
              color: i < targetPopped ? "#FFFFFF" : color,
              border: `1px solid ${color}40`,
            }}
          >
            {i < targetPopped ? "✓" : i + 1}
          </span>
        ))}
      </div>

      {completed && (
        <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="font-amiri text-2xl font-bold text-emerald-500">
          🎉 أحسنت! فقعت كل الفقاعات!
        </motion.p>
      )}

      <div className="absolute inset-0 pointer-events-none">
        <Confetti letter="" color={color} colorLight={color + "20"} trigger={confettiTrigger} count={60} />
      </div>
    </div>
  );
}
