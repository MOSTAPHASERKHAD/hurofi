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

            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900 mb-8">
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

            <div className="text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">هل تحتاج إلى مساعدة أو لديك استفسار؟</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                إذا كنت ترغب في الحصول على كود التفعيل أو واجهت أي مشكلة، تواصل معنا مباشرة وسنقوم بالرد في أسرع وقت.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="https://wa.me/213557543177?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%2C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%AD%D8%B5%D9%88%D9%84%20%D8%B9%D9%84%D9%89%20%D9%83%D9%88%D8%AF%20%D8%A7%D9%84%D8%AA%D9%81%D8%B9%D9%8A%D9%84%20%D9%84%D8%AA%D8%B7%D8%A8%D9%8A%D9%82%20%D8%AD%D8%B1%D9%88%D9%81%D9%8A%20%D8%A7%D9%84%D8%A3%D9%88%D9%84%D9%89" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.005-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                  </svg>
                  واتساب
                </a>
                
                <a 
                  href="mailto:srkhadasmayl@gmail.com?subject=شراء كود تفعيل تطبيق حروفي الأولى"
                  className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                  </svg>
                  البريد
                </a>
              </div>
            </div>
          </>
        )}
      </motion.div>
      <HomeButton color="#4F46E5" />
    </main>
  );
}
