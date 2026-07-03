"use client";

import { motion } from "framer-motion";
import { useAudio } from "@/hooks/useAudio";

interface WordCardProps {
  arabic: string;
  transliteration: string;
  english: string;
  image?: string;
  audioUrl?: string;
  index: number;
  color?: string;
  colorLight?: string;
}

export default function WordCard({
  arabic,
  transliteration,
  english,
  image,
  audioUrl,
  index,
  color = "#7C3AED",
  colorLight = "#F3E8FF",
}: WordCardProps) {
  const { playFile, isPlaying } = useAudio();

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="card flex flex-col items-center gap-2 cursor-pointer hover:shadow-xl transition-all duration-300"
      style={{ backgroundColor: "#FFFFFF", borderColor: color + "30" }}
      onClick={() => audioUrl && playFile(audioUrl)}
    >
      <div
        className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl transition-colors duration-500"
        style={{ backgroundColor: colorLight }}
      >
        {image || "📝"}
      </div>
      <p className="text-xl font-amiri font-bold transition-colors duration-500" style={{ color }}>
        {arabic}
      </p>
      <p className="text-xs font-inter text-neutral-400">{transliteration}</p>
      <p className="text-sm font-inter text-neutral-600">{english}</p>
      <button
        className="text-xs font-inter flex items-center gap-1 transition-colors duration-500 hover:opacity-80"
        style={{ color }}
        onClick={(e) => {
          e.stopPropagation();
          if (audioUrl) playFile(audioUrl);
        }}
      >
        {isPlaying ? "🔊 جاري..." : "🔊 استمع"}
      </button>
    </motion.div>
  );
}
