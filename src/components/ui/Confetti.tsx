"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface ConfettiProps {
  letter: string;
  color: string;
  colorLight: string;
  trigger: number;
  count?: number;
}

const SHAPES = ["letter", "star", "heart", "circle"];

interface Particle {
  id: number;
  endX: number;
  endY: number;
  rotation: number;
  scale: number;
  shape: string;
  color: string;
  delay: number;
  duration: number;
}

function generateParticles(count: number, trigger: number, color: string, colorLight: string): Particle[] {
  const items: Particle[] = [];
  const colors = [color, colorLight, "#FFD700", "#FF6B6B", "#4ECDC4", "#FFFFFF"];

  for (let i = 0; i < count; i++) {
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const angle = Math.random() * 360;
    const distance = 30 + Math.random() * 70;
    const rad = (angle * Math.PI) / 180;
    items.push({
      id: i + trigger * count,
      endX: 50 + distance * Math.cos(rad),
      endY: 50 + distance * Math.sin(rad),
      rotation: Math.random() * 720,
      scale: 0.5 + Math.random() * 1.2,
      shape,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.2,
      duration: 0.8 + Math.random() * 0.6,
    });
  }

  return items;
}

export default function Confetti({ letter, color, colorLight, trigger, count = 30 }: ConfettiProps) {
  const prevTrigger = useRef(trigger);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (trigger !== prevTrigger.current) {
      prevTrigger.current = trigger;
      setParticles(generateParticles(count, trigger, color, colorLight));
    }
  }, [trigger, count, color, colorLight]);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-50" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          initial={{ x: "50%", y: "50%", rotate: 0, scale: p.scale, opacity: 1 }}
          animate={{
            x: `${p.endX}%`,
            y: `${p.endY}%`,
            rotate: p.rotation,
            scale: 0,
            opacity: 0,
          }}
          transition={{ delay: p.delay, duration: p.duration, ease: "easeOut" }}
        >
          {p.shape === "letter" && (
            <span className="font-amiri font-bold" style={{ fontSize: `${20 + p.scale * 16}px`, color: p.color }}>
              {letter}
            </span>
          )}
          {p.shape === "star" && <span style={{ fontSize: `${16 + p.scale * 14}px` }}>⭐</span>}
          {p.shape === "heart" && <span style={{ fontSize: `${16 + p.scale * 14}px` }}>❤️</span>}
          {p.shape === "circle" && (
            <span style={{
              display: "inline-block",
              width: `${10 + p.scale * 12}px`,
              height: `${10 + p.scale * 12}px`,
              borderRadius: "50%",
              backgroundColor: p.color,
            }} />
          )}
        </motion.div>
      ))}
    </div>
  );
}
