"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePremium } from "@/lib/usePremium";
import HomeButton from "@/components/ui/HomeButton";

export default function UnlockPage() {
  const { isPremium, activate } = usePremium();
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleActivate = () => {
    if (activate(code)) {
      setSuccess(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-indigo-950 flex flex-col items-center py-12 px-4 font-inter transition-colors duration-300">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-xl w-full card"
      >
        <div className="text-center mb-8">
          <span className="text-6xl block mb-4">👑</span>
          <h1 className="text-3xl font-amiri font-bold text-indigo-900 dark:text-indigo-100 mb-2">
            النسخة الكاملة (النسخة المدفوعة)
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300">
            افتح جميع الحروف الـ 28 واجعل طفلك يكمل رحلته التعليمية الممتعة!
          </p>
        </div>

        {isPremium || success ? (
          <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-2xl text-center mb-6 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300">
            <span className="text-4xl block mb-2">🎉</span>
            <h2 className="text-xl font-bold mb-2">تم تفعيل التطبيق بنجاح!</h2>
            <p>جميع الحروف مفتوحة الآن لطفلك. نتمنى لكم وقتاً ممتعاً ومفيداً.</p>
            <Link href="/" className="btn-primary mt-6 inline-block bg-green-600 hover:bg-green-700 border-none">
              العودة للرئيسية
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 p-6 mb-8 shadow-sm">
              <h2 className="text-xl font-bold text-indigo-800 dark:text-indigo-200 mb-4 border-b pb-2 dark:border-slate-700">
                كيف أحصل على كود التفعيل؟
              </h2>
              
              <ul className="space-y-4 text-neutral-700 dark:text-neutral-300 text-sm">
                <li className="flex gap-3">
                  <span className="text-indigo-500 font-bold">1.</span>
                  <div>
                    قم بدفع مبلغ <strong className="text-indigo-600 dark:text-indigo-400">4.99$</strong> (أو ما يعادله) عبر Binance Pay:
                    <div className="mt-3 flex flex-wrap gap-2">
                      <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-3 py-2 rounded-lg border border-yellow-200 dark:border-yellow-700/50 flex-1 min-w-[140px]">
                        <span className="font-bold block mb-1">🔶 رقم حساب Binance Pay:</span>
                        <code className="bg-white dark:bg-black/20 px-2 py-1 rounded text-xs select-all">1131323594</code>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-indigo-500 font-bold">2.</span>
                  <span>أرسل لقطة شاشة (Screenshot) لتأكيد الدفع إلى البريد الإلكتروني: <strong className="text-indigo-600 select-all">srkhadasmayl@gmail.com</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-indigo-500 font-bold">3.</span>
                  <span>سنقوم بالرد عليك فوراً وإرسال "كود التفعيل" لفتح جميع حروف التطبيق للأبد!</span>
                </li>
              </ul>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900">
              <label className="block text-sm font-bold text-indigo-900 dark:text-indigo-200 mb-2">
                أدخل كود التفعيل هنا:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="مثال: HUROFI-VIP-2026"
                  className="flex-1 px-4 py-3 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-900 text-left text-indigo-900 dark:text-indigo-100 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  dir="ltr"
                />
                <button
                  onClick={handleActivate}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-xl font-bold transition-colors shadow-md"
                >
                  تفعيل
                </button>
              </div>
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm mt-2"
                >
                  الكود غير صحيح، يرجى التأكد والمحاولة مرة أخرى.
                </motion.p>
              )}
            </div>
          </>
        )}
      </motion.div>
      <HomeButton color="#4F46E5" />
    </main>
  );
}
