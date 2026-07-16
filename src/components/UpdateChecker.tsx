"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import packageJson from "../../package.json";
const CURRENT_VERSION = packageJson.version;
const VERSION_URL =
  "https://raw.githubusercontent.com/MOSTAPHASERKHAD/hurofi/main/public/version.json";

function compareVersions(v1: string, v2: string): number {
  const parts1 = v1.split(".").map(Number);
  const parts2 = v2.split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    if ((parts1[i] || 0) > (parts2[i] || 0)) return 1;
    if ((parts1[i] || 0) < (parts2[i] || 0)) return -1;
  }
  return 0;
}

export default function UpdateChecker() {
  const [update, setUpdate] = useState<{
    version: string;
    notes: string;
  } | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // فقط داخل Capacitor (التطبيق الأندرويد)
    const isCapacitor =
      typeof window !== "undefined" &&
      (window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } })
        .Capacitor?.isNativePlatform?.();

    if (!isCapacitor) return;

    const checkUpdate = async () => {
      try {
        const res = await fetch(VERSION_URL + "?t=" + Date.now());
        if (!res.ok) return;
        const data = await res.json();
        if (compareVersions(data.version, CURRENT_VERSION) > 0) {
          setUpdate({ version: data.version, notes: data.notes });
        }
      } catch {
        // لا يوجد إنترنت أو خطأ في الشبكة - نتجاهل بصمت
      }
    };

    // انتظر 3 ثواني بعد فتح التطبيق
    const timer = setTimeout(checkUpdate, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!update || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto"
        dir="rtl"
      >
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-indigo-200 dark:border-indigo-800 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 flex items-center gap-3">
            <span className="text-2xl">🚀</span>
            <div className="flex-1">
              <p className="text-white font-bold text-sm">تحديث جديد متاح!</p>
              <p className="text-indigo-200 text-xs">الإصدار {update.version}</p>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="text-white/70 hover:text-white text-xl leading-none"
              aria-label="إغلاق"
            >
              ×
            </button>
          </div>

          {/* Body */}
          <div className="px-4 py-3">
            <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-3">
              {update.notes}
            </p>
            <div className="flex gap-2">
              <a
                href="https://github.com/MOSTAPHASERKHAD/hurofi/releases/latest/download/app-release.apk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-center py-2 px-4 rounded-xl text-sm font-bold transition-colors"
                onClick={() => setDismissed(true)}
              >
                تحديث الآن
              </a>
              <button
                onClick={() => setDismissed(true)}
                className="px-4 py-2 rounded-xl text-sm text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-slate-700 transition-colors"
              >
                لاحقاً
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
