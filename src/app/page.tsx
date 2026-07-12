"use client";

import { useState } from "react";
import { useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { LETTER_COLORS } from "@/lib/letterColors";
import { useProgress } from "@/lib/useProgress";
import { useSound } from "@/lib/useSound";
import { playMainNasheed, stopNasheed } from "@/lib/nasheed";
import Mascot from "@/components/ui/Mascot";
import NightModeToggle from "@/components/ui/NightModeToggle";
import { usePremium } from "@/lib/usePremium";

/* ─── زر كتم الصوت ─────────────────────────────── */
function MuteButton() {
  const { muted, toggle } = useSound();
  const handleToggle = () => {
    toggle();
    if (!muted) stopNasheed();
  };
  return (
    <button
      onClick={handleToggle}
      className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/70 backdrop-blur shadow-md hover:scale-110 transition-transform text-xl"
      title={muted ? "تشغيل الصوت" : "كتم الصوت"}
    >
      {muted ? "🔇" : "🔊"}
    </button>
  );
}

/* ─── زر تشغيل النشيد ───────────────────────────── */
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
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handlePlay}
      disabled={muted}
      className="mt-4 px-6 py-2.5 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors font-inter text-sm disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-primary-200 flex items-center gap-2 mx-auto"
    >
      <span>{muted ? "🔇" : playing ? "⏸" : "🎵"}</span>
      <span>{muted ? "الصوت مكتوم" : playing ? "إيقاف النشيد" : "أنشودة الحروف"}</span>
    </motion.button>
  );
}

/* ─── بيانات الحروف ──────────────────────────────── */
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

/* ─── هوك Hydration ─────────────────────────────── */
function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

/* ─── بطاقة الحرف ───────────────────────────────── */
function LetterCard({ l, i, isLocked }: { l: (typeof LETTERS)[0]; i: number; isLocked: boolean }) {
  const { isLetterComplete, getLetterStars } = useProgress();
  const hydrated = useHydrated();
  const colors = LETTER_COLORS[l.id];
  const complete = hydrated && isLetterComplete(l.id);
  const stars = hydrated ? getLetterStars(l.id) : 0;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: i * 0.025, type: "spring", stiffness: 200 }}
      whileHover={!isLocked ? { scale: 1.08, y: -2 } : {}}
      whileTap={!isLocked ? { scale: 0.95 } : {}}
      className="relative"
    >
      <Link
        href={isLocked ? "/unlock" : `/letter/${l.id}`}
        className={`flex flex-col items-center gap-1 p-2 sm:p-3 rounded-2xl border-2 hover:shadow-xl transition-all duration-300 group ${isLocked ? "opacity-60 grayscale" : ""}`}
        style={{
          backgroundColor: complete ? "#D1FAE5" : colors.light,
          borderColor: complete ? "#10B981" : colors.primary + "40",
        }}
      >
        {isLocked && (
          <span className="absolute top-1 right-1 text-[10px] bg-white/80 rounded-full px-1">🔒</span>
        )}
        {complete && !isLocked && (
          <span className="absolute -top-1 -right-1 text-xs animate-bounce">⭐</span>
        )}
        <span
          className="text-2xl sm:text-3xl font-amiri font-bold transition-transform duration-300 group-hover:scale-110"
          style={{ color: complete ? "#059669" : colors.dark }}
        >
          {l.letter}
        </span>
        <span
          className="text-[9px] sm:text-[10px] font-inter transition-colors duration-300"
          style={{ color: complete ? "#10B981" : colors.primary + "90" }}
        >
          {l.name}
        </span>
        {stars > 0 && !isLocked && (
          <span className="text-[8px] opacity-70">{"⭐".repeat(Math.min(stars, 3))}</span>
        )}
      </Link>
    </motion.div>
  );
}

/* ─── شريط التقدم العلوي ─────────────────────────── */
function ProgressBar() {
  const { totalCompletedLetters } = useProgress();
  const hydrated = useHydrated();
  const completed = hydrated ? totalCompletedLetters() : 0;
  const pct = Math.round((completed / 28) * 100);

  if (!hydrated || completed === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mb-4 px-4"
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-inter text-neutral-500">تقدمك</span>
        <span className="text-xs font-inter font-bold text-primary-600">
          {completed}/28 حرفاً ✨
        </span>
      </div>
      <div className="w-full bg-primary-100 rounded-full h-2.5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-2.5 rounded-full bg-gradient-to-l from-primary-400 to-primary-600"
        />
      </div>
    </motion.div>
  );
}

/* ─── شبكة الحروف ────────────────────────────────── */
function LetterGrid() {
  const { isPremium } = usePremium();
  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2 sm:gap-3">
      {LETTERS.map((l, i) => (
        <LetterCard key={l.id} l={l} i={i} isLocked={!isPremium && l.id > 3} />
      ))}
    </div>
  );
}

/* ─── شاشة الترحيب (تظهر للمرة الأولى فقط) ─────── */
function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-amber-400 via-orange-400 to-primary-500"
    >
      {/* نجوم متطايرة */}
      {[...Array(6)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-3xl select-none pointer-events-none"
          style={{
            top: `${10 + i * 14}%`,
            left: `${5 + i * 16}%`,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 20, -20, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
        >
          {["⭐", "🌙", "✨", "🌟", "⭐", "💫"][i]}
        </motion.span>
      ))}

      <div className="text-center px-8 max-w-sm mx-auto">
        {/* الماستكوت (النجمة) */}
        <Mascot mood="happy" size="lg" className="mb-4 drop-shadow-xl" />

        {/* العنوان */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-amiri font-bold text-white mb-3 drop-shadow-lg"
        >
          حروفي الأولى
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-white/90 font-inter text-base mb-2"
        >
          رحلة ممتعة في عالم الحروف العربية
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="text-white/70 font-inter text-sm mb-8"
        >
          للأطفال من ٣ إلى ٦ سنوات · بمنهج مونتيسوري
        </motion.p>

        {/* زر البداية */}
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="w-full py-4 bg-white text-primary-600 rounded-2xl font-amiri font-bold text-2xl shadow-2xl hover:shadow-white/30 transition-all"
        >
          🚀 ابدأ رحلتك!
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-white/50 font-inter text-xs mt-4"
        >
          اضغط للبدء من حرف الألف ✨
        </motion.p>
      </div>
    </motion.div>
  );
}

/* ─── الصفحة الرئيسية ────────────────────────────── */
export default function Home() {
  const hydrated = useHydrated();

  // أظهر شاشة الترحيب فقط في أول زيارة
  const [welcomed, setWelcomed] = useState(true);
  useSyncExternalStore(
    () => () => {},
    () => {
      const seen = localStorage.getItem("hurofi_welcomed");
      if (!seen) setWelcomed(false);
      return true;
    },
    () => true
  );

  const handleWelcomeStart = () => {
    localStorage.setItem("hurofi_welcomed", "1");
    setWelcomed(true);
    // انتقل مباشرة للحرف الأول
    window.location.href = "/letter/1";
  };

  return (
    <>
      {/* شاشة الترحيب */}
      <AnimatePresence>
        {hydrated && !welcomed && <WelcomeScreen onStart={handleWelcomeStart} />}
      </AnimatePresence>

      <main className="min-h-screen flex flex-col bg-gradient-to-b from-[var(--bg-page)] to-transparent transition-colors duration-300">
        {/* الرأس */}
        <header className="py-6 sm:py-8 text-center relative px-4">
          <MuteButton />
          <NightModeToggle />

          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-block"
          >
            <span className="text-4xl select-none">📖</span>
            <h1 className="text-4xl sm:text-5xl font-amiri font-bold text-primary-600 mt-1">
              حروفي الأولى
            </h1>
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base font-inter text-neutral-500 mt-2 mb-3"
          >
            رحلة ممتعة في عالم الحروف العربية 🌟
          </motion.p>

          <div className="flex justify-center">
            <MainNasheedButton />
          </div>
        </header>

        {/* شريط التقدم */}
        <ProgressBar />

        {/* زر "ابدأ من الأول" */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mb-4 px-4"
        >
          <Link
            href="/letter/1"
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-l from-primary-500 to-orange-400 text-white rounded-full font-amiri text-lg shadow-lg shadow-primary-200 hover:shadow-xl hover:scale-105 transition-all"
          >
            <span>✏️</span>
            <span>ابدأ التعلم من الألف</span>
            <span>←</span>
          </Link>
        </motion.div>

        {/* شبكة الحروف */}
        <section className="px-3 sm:px-4 pb-6">
          <div className="max-w-2xl mx-auto">
            <p className="font-inter text-xs text-neutral-400 text-center mb-3">
              أو اختر حرفاً تريد تعلمه
            </p>
            <LetterGrid />
          </div>
        </section>

        {/* الفوتر */}
        <footer className="mt-auto py-5 px-4 border-t border-primary-100 bg-white/60 backdrop-blur">
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-3">
              <Link
                href="/parent"
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors font-inter text-xs sm:text-sm shadow-md"
              >
                <span>👨‍👩‍👧</span>
                <span>لوحة ولي الأمر</span>
              </Link>
              <Link
                href="/nasheeds"
                className="flex items-center gap-1.5 px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors font-inter text-xs sm:text-sm shadow-md"
              >
                <span>🎵</span>
                <span>الأناشيد</span>
              </Link>
              <Link
                href="/about"
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors font-inter text-xs sm:text-sm shadow-md"
              >
                <span>ℹ️</span>
                <span>حول التطبيق</span>
              </Link>
            </div>
            <p className="font-inter text-[10px] text-neutral-400 text-center">
              حروفي الأولى · كتاب رقمي تفاعلي · بمنهج مونتيسوري
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
