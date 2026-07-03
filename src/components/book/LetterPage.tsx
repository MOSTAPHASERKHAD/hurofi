"use client";

import { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { LETTER_COLORS } from "@/lib/letterColors";
import { useProgress } from "@/lib/useProgress";
import LetterHero from "./LetterHero";
import LetterForms from "./LetterForms";
import WordCard from "./WordCard";
import StarReward from "./StarReward";
import NasheedRecorder from "./NasheedRecorder";
import HomeButton from "../ui/HomeButton";
import { useSound } from "@/lib/useSound";
import { playNasheed, stopNasheed } from "@/lib/nasheed";

const TraceActivity = lazy(() => import("../activities/TraceActivity"));
const MatchActivity = lazy(() => import("../activities/MatchActivity"));
const FindActivity = lazy(() => import("../activities/FindActivity"));
const PhonicsWheel = lazy(() => import("../activities/PhonicsWheel"));
const ColorActivity = lazy(() => import("../activities/ColorActivity"));
const BingoGame = lazy(() => import("../activities/BubblePop"));

interface LetterPageProps {
  data: {
    letter: string;
    name: string;
    phonemes: { sound: string; diacritic: string; audio?: string }[];
    forms: { isolated: string; initial: string; medial: string; final: string };
    words: {
      id: string;
      arabic: string;
      transliteration: string;
      english: string;
      position: string;
      image?: string;
    }[];
    matchWords: {
      id: string;
      arabic: string;
      transliteration: string;
      english: string;
      position: string;
      image?: string;
    }[];
    reviewGame: {
      type: string;
      name: string;
      config: { letters: string[] };
    };
    montessoriTip: string;
    audioUrls: {
      letter: string;
      words: string[];
      encouragement: { correct: string; wrong: string; complete: string };
    };
  };
  letterId: number;
}

const TABS = [
  { id: "meet", label: "لقاء الحرف", icon: "👋" },
  { id: "forms", label: "أشكال الحرف", icon: "🔤" },
  { id: "activities", label: "أنشطة تفاعلية", icon: "🎮" },
  { id: "words", label: "كلمات بالحرف", icon: "📝" },
  { id: "review", label: "مراجعة ممتعة", icon: "⭐" },
];

export default function LetterPage({ data, letterId }: LetterPageProps) {
  const [activeTab, setActiveTab] = useState("meet");
  const [completedTabs, setCompletedTabs] = useState<string[]>([]);

  const colors = LETTER_COLORS[letterId] || LETTER_COLORS[1];
  const { completeActivity, completeReview } = useProgress();
  const { muted, toggle: toggleMute } = useSound();

  const handleToggleMute = () => {
    toggleMute();
    if (!muted) stopNasheed();
  };

  const completeTab = (tab: string) => {
    if (!completedTabs.includes(tab)) {
      setCompletedTabs([...completedTabs, tab]);
      if (tab.startsWith("activities-")) {
        completeActivity(letterId, tab.replace("activities-", ""));
      }
      if (tab === "review") {
        completeReview(letterId);
      }
    }
  };

  const prevLetter = letterId > 1 ? letterId - 1 : null;
  const nextLetter = letterId < 28 ? letterId + 1 : null;

  return (
    <main
      className="min-h-screen flex flex-col transition-colors duration-500"
      style={{ backgroundColor: colors.light }}
    >
      <header
        className="py-4 px-4 border-b bg-white/80 backdrop-blur sticky top-0 z-50"
        style={{ borderColor: colors.primary + "30" }}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link
            href={prevLetter ? `/letter/${prevLetter}` : "/"}
            className="font-inter text-sm"
            style={{ color: colors.primary }}
          >
            {prevLetter ? `◀ حرف ${prevLetter}` : "◀ الرئيسية"}
          </Link>
          <h1 className="text-xl font-amiri font-bold flex items-center gap-2" style={{ color: colors.dark }}>
            حرف {data.letter} - {data.name}
            <button onClick={handleToggleMute} className="text-lg" style={{ color: colors.primary }}>
              {muted ? "🔇" : "🔊"}
            </button>
            <button
              onClick={() => playNasheed(letterId)}
              className="text-lg hover:scale-110 transition-transform"
              style={{ color: colors.primary }}
              title="أنشودة الحرف"
            >
              🎵
            </button>
            <NasheedRecorder key={`nasheed-${letterId}`} letterId={letterId} color={colors.primary} />
          </h1>
          <Link
            href={nextLetter ? `/letter/${nextLetter}` : "/"}
            className="font-inter text-sm"
            style={{ color: colors.primary }}
          >
            {nextLetter ? `حرف ${nextLetter} ▶` : "النهاية ▶"}
          </Link>
        </div>
      </header>

      <nav className="px-4 py-3 border-b bg-white/50" style={{ borderColor: colors.primary + "20" }}>
        <div className="max-w-2xl mx-auto flex gap-2 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-1 px-4 py-2 rounded-xl font-inter text-sm whitespace-nowrap transition-all"
              style={{
                backgroundColor: activeTab === tab.id ? colors.primary : colors.light,
                color: activeTab === tab.id ? "#FFFFFF" : colors.dark,
                boxShadow: activeTab === tab.id ? `0 4px 12px ${colors.primary}40` : "none",
                border: `1px solid ${activeTab === tab.id ? colors.primary : colors.primary + "30"}`,
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {completedTabs.includes(tab.id) && <span>✓</span>}
            </button>
          ))}
        </div>
      </nav>

      <div className="max-w-2xl mx-auto w-full px-4 py-8 pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "meet" && (
              <LetterHero
                letter={data.letter}
                name={data.name}
                letterAudioUrl={data.audioUrls.letter}
                color={colors.primary}
              />
            )}

            {activeTab === "forms" && (
              <LetterForms
                letter={data.letter}
                forms={data.forms}
                words={data.matchWords.map((w) => ({
                  arabic: w.arabic,
                  position: w.position,
                }))}
                color={colors.primary}
                colorLight={colors.light}
              />
            )}

            {activeTab === "activities" && (
              <Suspense fallback={
                <div className="flex flex-col items-center gap-4 py-12">
                  <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
                  <p className="font-inter text-neutral-500">جاري تحميل الأنشطة...</p>
                </div>
              }>
                <div className="flex flex-col gap-8">
                  <TraceActivity
                    key={`trace-${letterId}`}
                    letter={data.letter}
                    color={colors.primary}
                    onComplete={() => completeTab("activities-trace")}
                  />
                  <PhonicsWheel
                    key={`phonics-${letterId}`}
                    letter={data.letter}
                    phonemes={data.phonemes}
                    letterId={letterId}
                    color={colors.primary}
                  />
                  <MatchActivity
                    key={`match-${letterId}`}
                    letter={data.letter}
                    forms={data.forms}
                    matchWords={data.matchWords.map((w) => ({
                      arabic: w.arabic,
                      english: w.english,
                      position: w.position,
                    }))}
                    color={colors.primary}
                    onComplete={() => completeTab("activities-match")}
                  />
                  <FindActivity
                    key={`find-${letterId}`}
                    letter={data.letter}
                    color={colors.primary}
                    onComplete={() => completeTab("activities-find")}
                  />
                  <ColorActivity
                    key={`color-${letterId}`}
                    word={data.words[0].arabic}
                    color={colors.primary}
                    onComplete={() => completeTab("activities-color")}
                  />
                </div>
              </Suspense>
            )}

            {activeTab === "words" && (
              <div className="flex flex-col gap-6">
                <h2
                  className="text-2xl font-amiri font-bold text-center"
                  style={{ color: colors.dark }}
                >
                  كلمات تحتوي على حرف {data.letter}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {data.words.map((w, i) => (
                    <WordCard
                      key={w.id}
                      arabic={w.arabic}
                      transliteration={w.transliteration}
                      english={w.english}
                      image={w.image}
                      audioUrl={data.audioUrls.words[i]}
                      index={i}
                      color={colors.primary}
                      colorLight={colors.light}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === "review" && (
              <Suspense fallback={
                <div className="flex flex-col items-center gap-4 py-12">
                  <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
                  <p className="font-inter text-neutral-500">جاري تحميل المراجعة...</p>
                </div>
              }>
                <div className="flex flex-col items-center gap-8">
                  <BingoGame
                    key={`review-${letterId}`}
                    letters={data.reviewGame.config.letters}
                    currentLetter={data.letter}
                    color={colors.primary}
                    onComplete={() => completeTab("review")}
                  />
                  <div
                    className="card w-full"
                    style={{ backgroundColor: "#FFFFFF", borderColor: colors.primary + "30" }}
                  >
                    <h3
                      className="font-amiri text-lg font-bold mb-4"
                      style={{ color: colors.dark }}
                    >
                      💡 نصيحة مونتي سوري
                    </h3>
                    <p className="font-inter text-neutral-600 leading-relaxed">
                      {data.montessoriTip}
                    </p>
                  </div>
                  <StarReward count={completedTabs.length} maxCount={5} />
                  <div className="flex gap-4">
                    {prevLetter && (
                      <Link
                        href={`/letter/${prevLetter}`}
                        className="btn-secondary"
                        style={{ borderColor: colors.primary, color: colors.primary }}
                      >
                        ◀ حرف {prevLetter}
                      </Link>
                    )}
                    <Link href="/" className="btn-secondary" style={{ borderColor: colors.primary, color: colors.primary }}>
                      🏠 الرئيسية
                    </Link>
                    {nextLetter && (
                      <Link
                        href={`/letter/${nextLetter}`}
                        className="btn-primary"
                        style={{ backgroundColor: colors.primary }}
                      >
                        حرف {nextLetter} ▶
                      </Link>
                    )}
                  </div>
                </div>
              </Suspense>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <HomeButton color={colors.primary} />
    </main>
  );
}
