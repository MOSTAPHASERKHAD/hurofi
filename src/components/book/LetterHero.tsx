"use client";

import { motion } from "framer-motion";
import { useAudio } from "@/hooks/useAudio";

interface LetterHeroProps {
  letter: string;
  name: string;
  letterAudioUrl?: string;
  color?: string;
}

export default function LetterHero({
  letter,
  name,
  letterAudioUrl,
  color = "#7C3AED",
}: LetterHeroProps) {
  const { playFile, isPlaying } = useAudio();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4 pt-16 relative overflow-hidden">

      {/* decorative rings */}
      <motion.div
        className="absolute w-80 h-80 rounded-full border-2 pointer-events-none"
        style={{ borderColor: color + "20" }}
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-56 h-56 rounded-full border-2 pointer-events-none"
        style={{ borderColor: color + "15" }}
        animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* letter */}
      <motion.div
        initial={{ scale: 0, opacity: 0, rotate: -30 }}
        animate={{
          scale: 1,
          opacity: 1,
          rotate: [0, 5, -5, 0],
          y: [0, -15, 0],
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 12,
          rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
        className="letter-hero drop-shadow-lg select-none transition-colors duration-500 cursor-pointer relative z-10"
        style={{ color }}
        onClick={() => letterAudioUrl && playFile(letterAudioUrl)}
      >
        {letter}
      </motion.div>

      {/* floating dots */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full pointer-events-none"
          style={{ backgroundColor: color }}
          animate={{
            y: [
              Math.sin((i * 90 * Math.PI) / 180) * 60,
              Math.sin((i * 90 * Math.PI) / 180) * 60 - 40,
            ],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}

      {/* sound button */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="btn-primary flex items-center gap-2 relative z-10"
        style={{ backgroundColor: color }}
        onClick={() => letterAudioUrl && playFile(letterAudioUrl)}
        disabled={isPlaying}
      >
        <motion.span
          className="text-xl"
          animate={isPlaying ? { scale: [1, 1.4, 1] } : {}}
          transition={{ duration: 0.4, repeat: isPlaying ? Infinity : 0 }}
        >
          🔊
        </motion.span>
        <span>{isPlaying ? "جاري التشغيل..." : "اسمع النطق"}</span>
      </motion.button>

      {/* name */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-2xl font-inter text-neutral-600 relative z-10"
      >
        {name}
      </motion.p>

    </div>
  );
}
