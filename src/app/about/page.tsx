"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import HomeButton from "@/components/ui/HomeButton";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className="py-6 px-4 border-b bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-inter text-sm text-green-600 hover:text-green-700">
            <span className="text-lg">🏠</span>
            <span>الرئيسية</span>
          </Link>
          <h1 className="text-2xl font-amiri font-bold text-green-800">
            حول التطبيق
          </h1>
          <div className="w-16" />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-3xl font-amiri font-bold text-green-800 mb-2">حروفي الأولى</h2>
          <p className="font-inter text-neutral-500">النسخة 1.0.0</p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 mb-6"
        >
          <h3 className="text-xl font-amiri font-bold mb-4 text-green-800">🎯 رؤيتنا</h3>
          <p className="font-inter text-neutral-600 leading-relaxed">
            تطبيق تعليمي تفاعلي مصمم خصيصاً للأطفال لتعلم الحروف العربية بطريقة ممتعة ومحفزة. نؤمن بأن التعلم يجب أن يكون ممتعاً وشاملاً.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 mb-6"
        >
          <h3 className="text-xl font-amiri font-bold mb-4 text-green-800">✨ المميزات</h3>
          <ul className="space-y-3 font-inter text-neutral-600">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>تعلم 28 حرف عربي بأشكاله المختلفة</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>أنشطة تفاعلية متنوعة (تتبع، تلوين، مطابقة)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>أنشيدة 교육ية لكل حرف</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>نظام تقدم ونجوم لتحفيز الطفل</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>لوحة تحكم لولي الأمر لمتابعة التقدم</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>يعمل بدون إنترنت</span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 mb-6"
        >
          <h3 className="text-xl font-amiri font-bold mb-4 text-green-800">👨‍👩‍👧‍👦 لولي الأمر</h3>
          <p className="font-inter text-neutral-600 leading-relaxed mb-4">
            هذا التطبيق مصمم ليكون أداة مساعدة لتعليم أطفالكم الحروف العربية. ننصح بـ:
          </p>
          <ul className="space-y-2 font-inter text-neutral-600">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">•</span>
              <span>الجلسات التعليمية القصيرة (15-20 دقيقة يومياً)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">•</span>
              <span>المشاركة مع الطفل أثناء التعلم</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">•</span>
              <span>استخدام لوحة التحكم لمتابعة التقدم</span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-green-100"
        >
          <h3 className="text-xl font-amiri font-bold mb-4 text-green-800">📞 تواصل معنا</h3>
          <p className="font-inter text-neutral-600">
            للuggestions والدعم الفني، يرجى التواصل معنا عبر البريد الإلكتروني.
          </p>
        </motion.div>
      </div>

      <HomeButton color="#10B981" />
    </main>
  );
}
