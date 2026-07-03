"use client";

import { motion } from "framer-motion";

interface StarRewardProps {
  count: number;
  maxCount: number;
}

export default function StarReward({ count, maxCount }: StarRewardProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxCount }, (_, i) => (
        <motion.span
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: i < count ? 1 : 0.5 }}
          transition={{ delay: i * 0.1, type: "spring" }}
          className="text-2xl transition-all duration-300"
          style={{
            opacity: i < count ? 1 : 0.3,
            filter: i < count ? "none" : "grayscale(100%)",
          }}
        >
          ⭐
        </motion.span>
      ))}
    </div>
  );
}
