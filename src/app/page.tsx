"use client";

import { useState } from "react";
import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LETTER_COLORS } from "@/lib/letterColors";
import { useProgress } from "@/lib/useProgress";
import { useSound } from "@/lib/useSound";
import { playMainNasheed, stopNasheed } from "@/lib/nasheed";

function MuteButton() {
  const { muted, toggle } = useSound();
  const handleToggle = () => {
    toggle();
    if (!muted) stopNasheed();
  };
  return (
    <button
      onClick={handleToggle}
      className="absolute top-4 right-4 text-2xl hover:scale-110 transition-transform"
      title={muted ? "تشغيل الصوت" : "كتم الصوت"}
    >
      {muted ? "🔇" : "🔊"}
    </button>
  );
}

function MainNasheedButton() {
  const [playing, setPlaying] = useState(false);
  const { muted } = useSound();

  const handlePlay = async () => {
    if (playing) {
      stopNasheed();
      setPlaying(false);
    } else {
      setPlaying(true);
      await playMainNasheed();
      setPlaying(false);
    }
  };

  return (
    <button
      onClick={handlePlay}
      disabled={muted}
      className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors font-inter text-sm disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {muted ? "🔇 الصوت مكتوم" : playing ? "⏸ إيقاف النشيد" : "🎵 تشغيل أنشودة الحروف"}
    </button>
  );
}

const LETTERS = [
  { id: 1, letter: "أ", name: "ألف" },
  { id: 2, letter: "ب", name: "باء" },
  { id: 3, letter: "ت", name: "تاء" },
  { id: 4, letter: "ث", name: "ثاء" },
  { id: 5, letter: "ج", name: "جيم" },
  { id: 6, letter: "ح", name: "حاء" },
  { id: 7, letter: "خ", name: "خاء" },
  { id: 8, letter: "د", name: "دال" },
  { id: 9, letter: "ذ", name: "ذال" },
  { id: 10, letter: "ر", name: "راء" },
  { id: 11, letter: "ز", name: "زاي" },
  { id: 12, letter: "س", name: "سين" },
  { id: 13, letter: "ش", name: "شين" },
  { id: 14, letter: "ص", name: "صاد" },
  { id: 15, letter: "ض", name: "ضاد" },
  { id: 16, letter: "ط", name: "طاء" },
  { id: 17, letter: "ظ", name: "ظاء" },
  { id: 18, letter: "ع", name: "عين" },
  { id: 19, letter: "غ", name: "غين" },
  { id: 20, letter: "ف", name: "فاء" },
  { id: 21, letter: "ق", name: "قاف" },
  { id: 22, letter: "ك", name: "كاف" },
  { id: 23, letter: "ل", name: "لام" },
  { id: 24, letter: "م", name: "ميم" },
  { id: 25, letter: "ن", name: "نون" },
  { id: 26, letter: "ه", name: "هاء" },
  { id: 27, letter: "و", name: "واو" },
  { id: 28, letter: "ي", name: "ياء" },
];

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

function LetterCard({ l, i }: { l: typeof LETTERS[0]; i: number }) {
  const { isLetterComplete, getLetterStars } = useProgress();
  const hydrated = useHydrated();
  const colors = LETTER_COLORS[l.id];
  const complete = hydrated && isLetterComplete(l.id);
  const stars = hydrated ? getLetterStars(l.id) : 0;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: i * 0.03, type: "spring" }}
    >
      <Link
        href={`/letter/${l.id}`}
        className="flex flex-col items-center gap-1 p-3 rounded-2xl border-2 hover:shadow-lg transition-all duration-300 group relative"
        style={{
          backgroundColor: complete ? "#D1FAE5" : colors.light,
          borderColor: complete ? "#10B981" : colors.primary + "30",
        }}
      >
        {complete && (
          <span className="absolute -top-1 -right-1 text-xs">⭐</span>
        )}
        <span
          className="text-3xl font-amiri font-bold transition-colors duration-300"
          style={{ color: complete ? "#059669" : colors.dark }}
        >
          {l.letter}
        </span>
        <span
          className="text-[10px] font-inter transition-colors duration-300"
          style={{ color: complete ? "#10B981" : colors.primary + "80" }}
        >
          {l.name}
        </span>
        {stars > 0 && (
          <span className="text-[9px] font-inter opacity-60">
            {"⭐".repeat(stars)}
          </span>
        )}
      </Link>
    </motion.div>
  );
}

function LetterGrid() {
  return (
    <div className="grid grid-cols-7 gap-3">
      {LETTERS.map((l, i) => (
        <LetterCard key={l.id} l={l} i={i} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-primary-50 to-white">
      <header className="py-8 text-center relative">
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl font-amiri font-bold text-primary-600"
        >
          حروفي الأولى
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg font-inter text-neutral-500 mt-2"
        >
          رحلة ممتعة في عالم الحروف العربية
        </motion.p>
        <MainNasheedButton />
        <MuteButton />
      </header>

      <section className="px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <LetterGrid />
        </div>
      </section>

      <footer className="py-6 px-4 border-t border-primary-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            <Link
              href="/parent"
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors font-inter text-sm shadow-lg"
            >
              <span>👨‍👩‍👧</span>
              <span>لوحة تحكم ولي الأمر</span>
            </Link>
            <Link
              href="/nasheeds"
              className="flex items-center gap-2 px-5 py-2.5 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors font-inter text-sm shadow-lg"
            >
              <span>🎵</span>
              <span>أناشيد إضافية</span>
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors font-inter text-sm shadow-lg"
            >
              <span>ℹ️</span>
              <span>حول التطبيق</span>
            </Link>
          </div>
          <p className="font-inter text-xs text-neutral-400 text-center">
            حروفي الأولى - كتاب رقمي تفاعلي لتعليم الحروف العربية
          </p>
        </div>
      </footer>
    </main>
  );
}
