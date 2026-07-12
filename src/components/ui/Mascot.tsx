"use client";

import { motion } from "framer-motion";

interface MascotProps {
  mood?: "happy" | "thinking" | "celebrating" | "talking";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Mascot({ mood = "happy", size = "md", className = "" }: MascotProps) {
  const sizeMap = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32"
  };

  const currentSize = sizeMap[size];

  // أنيميشن حسب الحالة المزاجية
  const animationProps = {
    happy: {
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const }
    },
    thinking: {
      y: [0, -5, 0],
      rotate: [0, 10, 10, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const }
    },
    celebrating: {
      y: [0, -20, 0],
      rotate: [0, 15, -15, 0],
      scale: [1, 1.1, 1],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }
    },
    talking: {
      scale: [1, 1.05, 1],
      transition: { duration: 0.5, repeat: Infinity, ease: "easeInOut" as const }
    }
  };

  return (
    <motion.div
      className={`relative inline-block ${currentSize} ${className}`}
      animate={animationProps[mood]}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        {/* الجسم - نجمة لطيفة */}
        <path
          d="M50 5 L62 35 L95 35 L68 55 L78 85 L50 68 L22 85 L32 55 L5 35 L38 35 Z"
          fill="#FDE047"
          stroke="#EAB308"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        
        {/* العيون */}
        <circle cx="38" cy="45" r="5" fill="#1F2937" />
        <circle cx="62" cy="45" r="5" fill="#1F2937" />
        
        {/* لمعة العيون */}
        <circle cx="36" cy="43" r="1.5" fill="white" />
        <circle cx="60" cy="43" r="1.5" fill="white" />

        {/* الخدود */}
        <ellipse cx="28" cy="52" rx="4" ry="2" fill="#FCA5A5" opacity="0.6" />
        <ellipse cx="72" cy="52" rx="4" ry="2" fill="#FCA5A5" opacity="0.6" />

        {/* الفم */}
        {mood === "happy" && (
          <path d="M42 55 Q50 65 58 55" fill="none" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
        )}
        {mood === "celebrating" && (
          <path d="M42 55 Q50 65 58 55 L50 62 Z" fill="#EF4444" stroke="#1F2937" strokeWidth="2" strokeLinejoin="round" />
        )}
        {mood === "thinking" && (
          <path d="M45 55 Q50 52 55 55" fill="none" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
        )}
        {mood === "talking" && (
          <ellipse cx="50" cy="58" rx="5" ry="4" fill="#1F2937" />
        )}
      </svg>
    </motion.div>
  );
}
