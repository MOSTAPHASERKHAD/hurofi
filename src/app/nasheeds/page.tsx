"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { playAdditionalNasheed, stopNasheed } from "@/lib/nasheed";
import HomeButton from "@/components/ui/HomeButton";

interface Nasheed {
  name: string;
  file: string;
}

export default function NasheedsPage() {
  const [playing, setPlaying] = useState<string | null>(null);
  const [nasheeds, setNasheeds] = useState<Record<string, Nasheed>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/extra-nasheeds.json")
      .then((res) => res.json())
      .then(data => {
        setNasheeds(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handlePlay = async (id: string, file: string) => {
    if (playing === id) {
      stopNasheed();
      setPlaying(null);
    } else {
      setPlaying(id);
      await playAdditionalNasheed(file);
      setPlaying(null);
    }
  };

  const nasheedEntries = Object.entries(nasheeds);

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <header className="py-6 px-4 border-b bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-inter text-sm text-purple-600 hover:text-purple-700">
            <span className="text-lg">🏠</span>
            <span>الرئيسية</span>
          </Link>
          <h1 className="text-2xl font-amiri font-bold text-purple-800">
            أناشيد إضافية
          </h1>
          <div className="w-16" />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="font-inter text-neutral-500">جاري تحميل الأناشيد...</p>
          </div>
        ) : nasheedEntries.length === 0 ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🎵</div>
            <h2 className="text-xl font-amiri font-bold text-neutral-700 mb-2">لا توجد أناشيد إضافية</h2>
            <p className="font-inter text-neutral-500">أضف ملفات MP3 في مجلد public/nasheeds/</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nasheedEntries.map(([id, nasheed], i) => (
              <motion.div
                key={id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-amiri font-bold text-purple-800">{nasheed.name}</h3>
                    <p className="text-sm text-neutral-500 font-inter mt-1">أنشودة</p>
                  </div>
                  <button
                    onClick={() => handlePlay(id, nasheed.file)}
                    className="w-14 h-14 rounded-full bg-purple-500 text-white flex items-center justify-center hover:bg-purple-600 transition-colors text-2xl"
                  >
                    {playing === id ? "⏸" : "▶"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <HomeButton color="#9333EA" />
    </main>
  );
}
