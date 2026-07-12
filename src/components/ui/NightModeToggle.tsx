"use client";

import { useSyncExternalStore, useCallback } from "react";
import { motion } from "framer-motion";

function useIsDark() {
  return useSyncExternalStore(
    () => () => {},
    () => {
      if (typeof document === "undefined") return false;
      return document.documentElement.classList.contains("dark");
    },
    () => false
  );
}

export default function NightModeToggle() {
  const isDark = useIsDark();

  const toggle = useCallback(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, [isDark]);

  return (
    <button
      onClick={toggle}
      className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/70 dark:bg-slate-800/70 backdrop-blur shadow-md hover:scale-110 transition-all text-xl z-50 border border-neutral-200 dark:border-neutral-600"
      title={isDark ? "الوضع النهاري" : "الوضع الليلي"}
    >
      <motion.span
        key={isDark ? "dark" : "light"}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        {isDark ? "☀️" : "🌙"}
      </motion.span>
    </button>
  );
}
