"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useProgress } from "@/lib/useProgress";
import HomeButton from "@/components/ui/HomeButton";
import Mascot from "@/components/ui/Mascot";

export default function CertificatePage() {
  const { totalCompletedLetters } = useProgress();
  const completed = totalCompletedLetters();
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 print:bg-white print:p-0">
      
      {/* أدوات التحكم (تختفي عند الطباعة) */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center print:hidden">
        <Link href="/parent" className="text-blue-600 font-inter hover:underline">
          ◀ عودة للوحة التحكم
        </Link>
        <button
          onClick={handlePrint}
          className="px-6 py-2 bg-blue-600 text-white rounded-full font-inter font-bold hover:bg-blue-700 shadow-lg flex items-center gap-2"
        >
          <span>🖨️</span>
          <span>طباعة الشهادة</span>
        </button>
      </div>

      {/* منطقة الشهادة */}
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative bg-white rounded-[2rem] shadow-2xl p-2 sm:p-4 print:shadow-none print:p-0 border-[16px] border-double border-yellow-400 aspect-[1.414/1] flex flex-col items-center justify-center text-center overflow-hidden"
          ref={printRef}
        >
          {/* زخرفة الخلفية */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500 via-transparent to-transparent" />
          
          <Mascot mood="celebrating" size="lg" className="mb-4 drop-shadow-xl" />
          
          <h1 className="text-4xl sm:text-6xl font-amiri font-bold text-blue-800 mb-2 mt-4 text-shadow-sm">
            شَهَادَةُ إِتْمَامٍ وَتَفَوُّقٍ
          </h1>
          
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mb-8" />

          <p className="text-xl sm:text-2xl font-amiri text-neutral-700 mb-6 leading-relaxed max-w-2xl px-4">
            تُمنح هذه الشهادة للبطل المتميز لإتمامه بنجاح رحلة تعلم الحروف العربية في تطبيق
            <span className="font-bold text-primary-600 mx-2">&quot;حروفي الأولى&quot;</span>
          </p>

          <div className="text-2xl sm:text-3xl font-amiri font-bold text-neutral-800 mb-8 border-b-2 border-dashed border-neutral-300 pb-2 min-w-[300px]">
            ..................................................
          </div>

          <div className="grid grid-cols-3 w-full max-w-2xl mt-8 px-8 items-end">
            <div className="flex flex-col items-center">
              <span className="text-4xl mb-2">⭐</span>
              <p className="font-inter font-bold text-neutral-600 text-sm">تفوق وابداع</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg border-4 border-yellow-200">
                <span className="text-4xl">🏆</span>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-2xl font-inter font-bold text-neutral-800 border-b border-neutral-400 pb-1 w-full">
                {new Date().toLocaleDateString('ar-SA')}
              </span>
              <p className="font-inter text-neutral-500 text-sm mt-1">التاريخ</p>
            </div>
          </div>

          {/* إذا لم يكمل الطفل الحروف تظهر رسالة خفيفة */}
          {completed < 28 && (
            <div className="absolute top-4 right-4 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-inter print:hidden">
              للعرض فقط - أكمل {28 - completed} حروف متبقية
            </div>
          )}
        </motion.div>
      </div>

      <div className="print:hidden">
        <HomeButton color="#2563EB" />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background: white; }
          @page { size: landscape; margin: 0; }
        }
      `}} />
    </main>
  );
}
