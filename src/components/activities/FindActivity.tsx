"use client";

import { motion } from "framer-motion";
import { useState, useCallback, useMemo } from "react";
import { playSound } from "@/lib/audio";

interface FindActivityProps {
  letter: string;
  onComplete: () => void;
  color?: string;
}

const ALL_LETTERS = "أبتثجحخدذرزسشصضطظعغفقكلمنهوي";

function generateGrid(letter: string): { char: string; isTarget: boolean }[] {
  const cells: { char: string; isTarget: boolean }[] = [];

  for (let i = 0; i < 30; i++) {
    const char = i < 5 ? letter : ALL_LETTERS[Math.floor(Math.random() * ALL_LETTERS.length)];
    cells.push({ char, isTarget: char === letter });
  }

  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }

  return cells;
}

export default function FindActivity({
  letter,
  onComplete,
  color = "#7C3AED",
}: FindActivityProps) {
  const [gridState, setGridState] = useState(() => ({ key: 0, cells: generateGrid(letter) }));
  const [found, setFound] = useState<number[]>([]);
  const [wrongIdx, setWrongIdx] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  const targetCount = useMemo(() => gridState.cells.filter((c) => c.isTarget).length, [gridState.cells]);

  const handleReset = useCallback(() => {
    setFound([]);
    setWrongIdx(null);
    setCompleted(false);
    setGridState((prev) => ({ key: prev.key + 1, cells: generateGrid(letter) }));
  }, [letter]);

  const handleClick = useCallback(
    (index: number) => {
      if (found.includes(index) || completed) return;

      if (!gridState.cells[index].isTarget) {
        playSound("/audio/encouragement/wrong.mp3");
        setWrongIdx(index);
        setTimeout(() => setWrongIdx(null), 400);
        return;
      }

      const newFound = [...found, index];
      setFound(newFound);

      if (newFound.length === targetCount) {
        setCompleted(true);
        playSound("/audio/encouragement/complete.mp3");
        setTimeout(onComplete, 800);
      }
    },
    [found, completed, targetCount, gridState.cells, onComplete]
  );

  return (
    <div
      className="card flex flex-col items-center gap-6 p-8"
      style={{ backgroundColor: "#FFFFFF", borderColor: color + "30" }}
    >
      <h3 className="text-xl font-amiri font-bold transition-colors duration-500" style={{ color }}>
        🔍 ابحث عن حرف &quot;{letter}&quot;
      </h3>

      <p className="font-inter text-sm text-neutral-500">
        اضغط على كل &quot;{letter}&quot; في الشبكة
      </p>

      <div className="grid grid-cols-6 gap-2">
        {gridState.cells.map((cell, i) => {
          const isWrong = wrongIdx === i;
          return (
            <motion.button
              key={`${gridState.key}-${i}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={isWrong ? { x: [0, -6, 6, -6, 6, 0] } : {}}
              transition={{ duration: 0.3 }}
              onClick={() => handleClick(i)}
              className="w-12 h-12 rounded-xl font-amiri text-xl font-bold transition-all duration-300"
              style={{
                backgroundColor: found.includes(i) ? "#10B981" : isWrong ? "#FEE2E2" : "#FFFFFF",
                color: found.includes(i) ? "#FFFFFF" : isWrong ? "#EF4444" : color,
                border: `1px solid ${
                  found.includes(i) ? "#10B981" : isWrong ? "#EF4444" : color + "30"
                }`,
              }}
            >
              {cell.char}
            </motion.button>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <p className="font-inter text-sm text-neutral-500">
          {found.length} / {targetCount} تم العثور عليها
        </p>
        <button
          onClick={handleReset}
          className="text-xs font-inter px-3 py-1 rounded-full transition-all"
          style={{ backgroundColor: color + "20", color }}
        >
          🔄 إعادة
        </button>
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
