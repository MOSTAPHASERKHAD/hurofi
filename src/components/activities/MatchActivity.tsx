"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { playSound } from "@/lib/audio";

interface MatchActivityProps {
  letter: string;
  forms: {
    isolated: string;
    initial: string;
    medial: string;
    final: string;
  };
  matchWords: {
    arabic: string;
    english: string;
    position: string;
  }[];
  onComplete: () => void;
  color?: string;
}

const POSITIONS = [
  { key: "initial" as const, label: "أول الكلمة" },
  { key: "medial" as const, label: "وسط الكلمة" },
  { key: "final" as const, label: "آخر الكلمة" },
];

function letterPositionsInWord(arabic: string, targetLetter: string): Set<string> {
  const positions = new Set<string>();
  for (let i = 0; i < arabic.length; i++) {
    if (arabic[i] === targetLetter) {
      if (i === 0) positions.add("initial");
      else if (i === arabic.length - 1) positions.add("final");
      else positions.add("medial");
    }
  }
  return positions;
}

export default function MatchActivity({
  letter,
  forms,
  matchWords,
  onComplete,
  color = "#7C3AED",
}: MatchActivityProps) {
  const [selectedForm, setSelectedForm] = useState<number | null>(null);
  const [usedWords, setUsedWords] = useState<Set<number>>(new Set());
  const [matchedForms, setMatchedForms] = useState<Set<number>>(new Set());
  const [wrongFlash, setWrongFlash] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  const wordPositions = useMemo(() => {
    return matchWords.map((w) => ({
      ...w,
      positions: letterPositionsInWord(w.arabic, letter),
    }));
  }, [matchWords, letter]);

  const handleFormClick = (formIdx: number) => {
    if (matchedForms.has(formIdx) || completed) return;
    if (selectedForm === formIdx) {
      setSelectedForm(null);
      return;
    }
    setSelectedForm(formIdx);
  };

  const handleWordClick = (wordIdx: number) => {
    if (selectedForm === null || usedWords.has(wordIdx) || completed) return;

    const posKey = POSITIONS[selectedForm].key;
    const word = wordPositions[wordIdx];

    if (word.positions.has(posKey)) {
      playSound("/audio/encouragement/correct.mp3");
      const newUsed = new Set(usedWords);
      newUsed.add(wordIdx);
      setUsedWords(newUsed);

      const newMatched = new Set(matchedForms);
      newMatched.add(selectedForm);
      setMatchedForms(newMatched);
      setSelectedForm(null);

      if (newMatched.size === POSITIONS.length) {
        setCompleted(true);
        playSound("/audio/encouragement/complete.mp3");
        setTimeout(onComplete, 800);
      }
    } else {
      playSound("/audio/encouragement/wrong.mp3");
      setWrongFlash(wordIdx);
      setSelectedForm(null);
      setTimeout(() => setWrongFlash(null), 400);
    }
  };

  return (
    <div
      className="card flex flex-col items-center gap-6 p-8"
      style={{ backgroundColor: "#FFFFFF", borderColor: color + "30" }}
    >
      <h3 className="text-xl font-amiri font-bold" style={{ color }}>
        🔗 اربط شكل الحرف بالكلمة
      </h3>

      <p className="font-inter text-sm text-neutral-500">
        اختر شكلاً للحرف ثم اختر كلمة تحتوي عليه بنفس الشكل
      </p>

      <div className="flex gap-10 flex-wrap justify-center items-start">
        <div className="flex flex-col gap-3 items-center">
          <span className="font-inter text-xs text-neutral-400">شكل الحرف</span>
          {POSITIONS.map((pos, i) => {
            const isMatched = matchedForms.has(i);
            const isSelected = selectedForm === i;
            return (
              <motion.button
                key={`form-${i}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFormClick(i)}
                className="w-28 h-24 rounded-xl font-amiri font-bold transition-all duration-300 flex flex-col items-center justify-center gap-1"
                style={{
                  backgroundColor: isMatched ? "#10B98120" : isSelected ? color : color + "20",
                  color: isMatched ? "#10B981" : isSelected ? "#FFFFFF" : color,
                  border: `2px solid ${
                    isMatched ? "#10B981" : isSelected ? color : color + "40"
                  }`,
                  opacity: isMatched ? 0.7 : 1,
                }}
              >
                <span className="text-3xl">{forms[pos.key]}</span>
                <span className="text-[9px] font-inter">{pos.label}</span>
              </motion.button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 items-center">
          <span className="font-inter text-xs text-neutral-400">الكلمات</span>
          {wordPositions.map((word, i) => {
            const isUsed = usedWords.has(i);
            const isWrong = wrongFlash === i;
            return (
              <motion.button
                key={`word-${i}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={isWrong ? { x: [0, -8, 8, -8, 8, 0] } : {}}
                transition={{ duration: 0.3 }}
                onClick={() => handleWordClick(i)}
                className="h-24 px-5 rounded-xl font-amiri text-lg transition-all duration-300 flex flex-col items-start justify-center gap-0.5"
                style={{
                  backgroundColor: isUsed ? "#D1FAE5" : "#FFFFFF",
                  color: isUsed ? "#10B981" : "#404040",
                  border: `2px solid ${
                    isWrong ? "#EF4444" : isUsed ? "#10B981" : color + "30"
                  }`,
                  cursor: isUsed || selectedForm === null ? "default" : "pointer",
                  opacity: isUsed ? 0.7 : 1,
                }}
              >
                <span className="text-xl">{word.arabic}</span>
                <span className="text-xs font-inter opacity-60">{word.english}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="flex gap-2">
        {POSITIONS.map((pos, i) => (
          <span
            key={`indicator-${i}`}
            className="w-6 h-6 rounded-full text-[10px] font-inter font-bold flex items-center justify-center transition-all duration-300"
            style={{
              backgroundColor: matchedForms.has(i) ? "#10B981" : color + "20",
              color: matchedForms.has(i) ? "#FFFFFF" : color,
              border: `1px solid ${color}40`,
            }}
          >
            {matchedForms.has(i) ? "✓" : i + 1}
          </span>
        ))}
      </div>

      {completed && (
        <motion.p
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="font-amiri text-xl font-bold text-emerald-500"
        >
          ✔ أحسنت!
        </motion.p>
      )}
    </div>
  );
}
