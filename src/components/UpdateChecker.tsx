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

type Phase = "idle" | "downloading" | "installing" | "error";

export default function UpdateChecker() {
  const [update, setUpdate] = useState<{
    version: string;
    notes: string;
    apkUrl: string;
  } | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

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
          setUpdate({
            version: data.version,
            notes: data.notes,
            apkUrl: data.apkUrl || `https://github.com/MOSTAPHASERKHAD/hurofi/releases/download/v${data.version}/hurofi-v${data.version}.apk`,
          });
        }
      } catch {
        // لا يوجد إنترنت أو خطأ في الشبكة
      }
    };

    const timer = setTimeout(checkUpdate, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleUpdate = async () => {
    setPhase("downloading");
    setProgress(0);
    setErrorMsg("");

    try {
      // تحميل ملف APK مع متابعة التقدم
      const response = await fetch(update.apkUrl);
      if (!response.ok || !response.body) {
        throw new Error("فشل تحميل الملف");
      }

      const contentLength = Number(response.headers.get("content-length") || 0);
      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];
      let received = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        received += value.length;
        if (contentLength > 0) {
          setProgress(Math.round((received / contentLength) * 100));
        }
      }

      // تحويل البيانات إلى base64
      setPhase("installing");
      const blob = new Blob(chunks as unknown as BlobPart[], { type: "application/vnd.android.package-archive" });
      const arrayBuffer = await blob.arrayBuffer();
      const uint8 = new Uint8Array(arrayBuffer);
      let binary = "";
      const chunkSize = 8192;
      for (let i = 0; i < uint8.length; i += chunkSize) {
        binary += String.fromCharCode(...uint8.subarray(i, i + chunkSize));
      }
      const base64 = btoa(binary);

      // حفظ الملف في ذاكرة الجهاز عبر Capacitor Filesystem
      const { Filesystem, Directory } = await import("@capacitor/filesystem");
      await Filesystem.writeFile({
        path: "hurofi-update.apk",
        data: base64,
        directory: Directory.Cache,
      });

      // الحصول على مسار الملف
      const fileUri = await Filesystem.getUri({
        path: "hurofi-update.apk",
        directory: Directory.Cache,
      });

      // فتح ملف APK مباشرة عبر نظام التثبيت الأندرويد (بدون متصفح)
      const { FileOpener } = await import("@capacitor-community/file-opener");
      await FileOpener.open({
        filePath: fileUri.uri,
        contentType: "application/vnd.android.package-archive",
        openWithDefault: true,
      });

      setDismissed(true);
      setPhase("idle");

    } catch (e) {
      console.error("خطأ في التحديث:", e);
      setErrorMsg("حدث خطأ أثناء التحميل. تحقق من الاتصال وحاول مجدداً.");
      setPhase("error");
    }
  };

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
            <span className="text-2xl">
              {phase === "downloading" ? "⬇️" : phase === "installing" ? "📦" : "🚀"}
            </span>
            <div className="flex-1">
              <p className="text-white font-bold text-sm">
                {phase === "downloading"
                  ? `جاري التحميل... ${progress}%`
                  : phase === "installing"
                  ? "جاري تجهيز التثبيت..."
                  : "تحديث جديد متاح!"}
              </p>
              <p className="text-indigo-200 text-xs">الإصدار {update.version}</p>
            </div>
            {phase === "idle" || phase === "error" ? (
              <button
                onClick={() => setDismissed(true)}
                className="text-white/70 hover:text-white text-xl leading-none"
                aria-label="إغلاق"
              >
                ×
              </button>
            ) : null}
          </div>

          {/* شريط التقدم */}
          {phase === "downloading" && (
            <div className="h-1.5 bg-indigo-100">
              <motion.div
                className="h-full bg-indigo-500"
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          )}

          {/* Body */}
          <div className="px-4 py-3">
            {phase === "error" ? (
              <p className="text-red-500 text-sm mb-3">{errorMsg}</p>
            ) : (
              <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-3">
                {phase === "idle" ? update.notes : phase === "downloading" ? "لا تغلق التطبيق أثناء التحميل..." : "سيظهر لك مربع التثبيت خلال ثوانٍ..."}
              </p>
            )}

            <div className="flex gap-2">
              {(phase === "idle" || phase === "error") && (
                <button
                  onClick={handleUpdate}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-center py-2 px-4 rounded-xl text-sm font-bold transition-colors"
                >
                  {phase === "error" ? "إعادة المحاولة" : "تحديث الآن"}
                </button>
              )}

              {phase === "downloading" || phase === "installing" ? (
                <div className="flex-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-center py-2 px-4 rounded-xl text-sm font-bold">
                  {phase === "downloading" ? `${progress}% - جاري التحميل` : "جاري التجهيز..."}
                </div>
              ) : (
                <button
                  onClick={() => setDismissed(true)}
                  className="px-4 py-2 rounded-xl text-sm text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-slate-700 transition-colors"
                >
                  لاحقاً
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
