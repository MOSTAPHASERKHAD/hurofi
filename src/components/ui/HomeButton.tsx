"use client";

import Link from "next/link";

interface HomeButtonProps {
  color?: string;
}

export default function HomeButton({ color = "#6366f1" }: HomeButtonProps) {
  return (
    <Link
      href="/"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-neutral-200"
      style={{ color }}
    >
      <span className="text-lg">🏠</span>
      <span className="font-inter text-sm font-medium">الرئيسية</span>
    </Link>
  );
}
