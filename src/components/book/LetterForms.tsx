"use client";

import { motion } from "framer-motion";

interface LetterFormsProps {
  letter: string;
  forms: {
    isolated: string;
    initial: string;
    medial: string;
    final: string;
  };
  words: { arabic: string; position: string }[];
  color?: string;
  colorLight?: string;
}

const positions = [
  { key: "initial", label: "أول الكلمة" },
  { key: "medial", label: "وسط الكلمة" },
  { key: "final", label: "آخر الكلمة" },
];

function HighlightedWord({ text, target, color }: { text: string; target: string; color: string }) {
  const parts: { char: string; isTarget: boolean }[] = [];
  for (const ch of text) {
    parts.push({ char: ch, isTarget: ch === target });
  }
  return (
    <span className="font-amiri text-2xl" style={{ direction: "rtl" }}>
      {parts.map((p, i) => (
        <span
          key={i}
          style={{
            color: p.isTarget ? color : "#D4D4D4",
            fontWeight: p.isTarget ? 700 : 400,
            fontSize: p.isTarget ? "1.3em" : "1em",
          }}
        >
          {p.char}
        </span>
      ))}
    </span>
  );
}

export default function LetterForms({ letter, forms, words, color = "#7C3AED", colorLight = "#F3E8FF" }: LetterFormsProps) {
  return (
    <div className="flex flex-col gap-8 px-4 py-8">
      <h2 className="text-2xl font-amiri font-bold text-center transition-colors duration-500" style={{ color }}>
        أشكال الحرف
      </h2>
      <p className="text-center font-inter text-neutral-500">
        الحرف يتغير شكله حسب موقعه في الكلمة
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {positions.map((pos, i) => {
          const word = words.find((w) => w.position === pos.key);
          return (
            <motion.div
              key={pos.key}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.15 }}
              className="card flex flex-col items-center gap-4 p-6"
              style={{ backgroundColor: "#FFFFFF", borderColor: color + "30" }}
            >
              <span
                className="font-inter text-xs px-3 py-1 rounded-full transition-colors duration-500"
                style={{ backgroundColor: colorLight, color }}
              >
                {pos.label}
              </span>

              <div className="letter-form transition-colors duration-500" style={{ color }}>
                {forms[pos.key as keyof typeof forms]}
              </div>

              {word && (
                <div className="flex flex-col items-center gap-1">
                  <HighlightedWord text={word.arabic} target={letter} color={color} />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
