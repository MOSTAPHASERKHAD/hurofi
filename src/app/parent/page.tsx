"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LETTER_COLORS } from "@/lib/letterColors";
import { useProgress } from "@/lib/useProgress";
import HomeButton from "@/components/ui/HomeButton";

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
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

export default function ParentDashboard() {
  const hydrated = useHydrated();
  const { letters, totalCompletedLetters, totalStars } = useProgress();

  const completedCount = hydrated ? totalCompletedLetters() : 0;
  const starsCount = hydrated ? totalStars() : 0;
  const percentage = Math.round((completedCount / 28) * 100);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="py-6 px-4 border-b bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-inter text-sm text-blue-600">
            ◀ الرئيسية
          </Link>
          <h1 className="text-2xl font-amiri font-bold text-blue-800">
            لوحة تحكم ولي الأمر
          </h1>
          <div className="w-16" />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
            <div className="text-4xl mb-2">📚</div>
            <div className="text-3xl font-bold text-blue-600">{completedCount}/28</div>
            <div className="text-sm text-neutral-500">الحرف المكتملة</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-yellow-100">
            <div className="text-4xl mb-2">⭐</div>
            <div className="text-3xl font-bold text-yellow-500">{starsCount}</div>
            <div className="text-sm text-neutral-500">إجمالي النجوم</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
            <div className="text-4xl mb-2">📊</div>
            <div className="text-3xl font-bold text-green-600">{percentage}%</div>
            <div className="text-sm text-neutral-500">نسبة الإنجاز</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-100 mb-8"
        >
          <h2 className="text-xl font-amiri font-bold mb-4 text-neutral-800">تقدم الحروف</h2>
          <div className="w-full bg-neutral-100 rounded-full h-4 mb-4">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="grid grid-cols-7 gap-2">
            {LETTERS.map((l) => {
              const isComplete = hydrated && letters[l.id]?.reviewDone;
              const colors = LETTER_COLORS[l.id];
              return (
                <Link
                  key={l.id}
                  href={`/letter/${l.id}`}
                  className="flex flex-col items-center p-2 rounded-lg transition-all hover:scale-105"
                  style={{
                    backgroundColor: isComplete ? "#D1FAE5" : colors.light,
                    borderColor: isComplete ? "#10B981" : colors.primary + "30",
                    border: "1px solid",
                  }}
                >
                  <span className="text-lg font-amiri font-bold" style={{ color: isComplete ? "#059669" : colors.dark }}>
                    {l.letter}
                  </span>
                  {isComplete && <span className="text-xs">✓</span>}
                </Link>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-100"
        >
          <h2 className="text-xl font-amiri font-bold mb-4 text-neutral-800">نصائح للولي</h2>
          <ul className="space-y-3 font-inter text-neutral-600">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>شجع الطفل على التعلم يومياً لمدة 15-20 دقيقة</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>استخدم الأنشطة التفاعلية لتثبيت المعلومة</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>استمع مع الطفل إلى الأنشيدة لتحسين النطق</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>احتفل بالإنجازات وامنح الطفل نجوماً%</span>
            </li>
          </ul>
        </motion.div>
      </div>
      <HomeButton color="#3B82F6" />
    </main>
  );
}
