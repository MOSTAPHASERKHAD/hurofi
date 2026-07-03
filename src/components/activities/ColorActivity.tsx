"use client";

import { motion } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { playSound } from "@/lib/audio";

interface ColorActivityProps {
  word: string;
  onComplete: () => void;
  color?: string;
}

const COLORS = [
  { name: "بني", hex: "#8B4513" },
  { name: "ذهبي", hex: "#DAA520" },
  { name: "برتقالي", hex: "#FF8C00" },
  { name: "أبيض", hex: "#FFFFFF" },
  { name: "أسود", hex: "#333333" },
  { name: "أحمر", hex: "#DC143C" },
  { name: "أخضر", hex: "#228B22" },
  { name: "أزرق", hex: "#4169E1" },
];

const CANVAS_SIZE = 320;

function floodFill(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  fillColor: string,
  outlineTolerance = 30
): number {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;
  const visited = new Uint8Array(w * h);

  const startIdx = (startY * w + startX) * 4;
  const startR = data[startIdx];
  const startG = data[startIdx + 1];
  const startB = data[startIdx + 2];
  const startA = data[startIdx + 3];

  if (startA < 5) return 0;

  const [fr, fg, fb] = hexToRgb(fillColor);
  const stack: [number, number][] = [[startX, startY]];
  let filled = 0;

  while (stack.length > 0) {
    const [x, y] = stack.pop()!;
    const i = y * w + x;
    if (x < 0 || x >= w || y < 0 || y >= h) continue;
    if (visited[i]) continue;
    visited[i] = 1;

    const pi = i * 4;
    const r = data[pi], g = data[pi + 1], b = data[pi + 2], a = data[pi + 3];
    if (a < 5) continue;
    if (Math.abs(r - startR) > outlineTolerance || Math.abs(g - startG) > outlineTolerance || Math.abs(b - startB) > outlineTolerance) continue;

    data[pi] = fr;
    data[pi + 1] = fg;
    data[pi + 2] = fb;
    data[pi + 3] = 255;
    filled++;

    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }

  ctx.putImageData(imageData, 0, 0);
  return filled;
}

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0, 0, 0];
  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
}

export default function ColorActivity({
  word,
  onComplete,
  color = "#7C3AED",
}: ColorActivityProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedColor, setSelectedColor] = useState(COLORS[0].hex);
  const [pixelsFilled, setPixelsFilled] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [totalPixels, setTotalPixels] = useState(0);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    const fontSize = CANVAS_SIZE * 0.45;
    ctx.font = `bold ${fontSize}px "Noto Naskh Arabic", "Traditional Arabic", "Scheherazade New", serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.strokeStyle = "#222222";
    ctx.lineWidth = 10;
    ctx.lineJoin = "round";
    ctx.strokeText(word, CANVAS_SIZE / 2, CANVAS_SIZE / 2);

    ctx.fillStyle = "#F5F5F5";
    ctx.lineWidth = 8;
    ctx.fillText(word, CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    ctx.strokeText(word, CANVAS_SIZE / 2, CANVAS_SIZE / 2);

    const id = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    const d = id.data;
    let nonWhite = 0;
    for (let i = 3; i < d.length; i += 4) {
      if (d[i] > 5) nonWhite++;
    }
    setTotalPixels(nonWhite);
  }, [word]);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  const handleCanvasDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (completed) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const x = Math.floor(e.clientX - rect.left);
      const y = Math.floor(e.clientY - rect.top);

      const id = ctx.getImageData(x, y, 1, 1);
      if (id.data[3] < 10) return;

      const count = floodFill(ctx, x, y, selectedColor, 40);
      if (count > 0) {
        const newFilled = pixelsFilled + count;
        setPixelsFilled(newFilled);
        if (newFilled >= totalPixels * 0.7) {
          setCompleted(true);
          playSound("/audio/encouragement/complete.mp3");
          setTimeout(onComplete, 800);
        }
      }
    },
    [completed, selectedColor, pixelsFilled, totalPixels, onComplete]
  );

  const resetCanvas = () => {
    setPixelsFilled(0);
    setCompleted(false);
    initCanvas();
  };

  const progress = totalPixels > 0 ? Math.min(Math.round((pixelsFilled / totalPixels) * 100), 100) : 0;

  return (
    <div
      className="card flex flex-col items-center gap-6 p-8"
      style={{ backgroundColor: "#FFFFFF", borderColor: color + "30" }}
    >
      <h3 className="text-xl font-amiri font-bold" style={{ color }}>
        🎨 تلوين الصورة
      </h3>

      <p className="font-inter text-sm text-neutral-500">
        اختر لوناً ثم اضغط على المساحة التي تريد تلوينها
      </p>

      <div
        className="rounded-3xl overflow-hidden"
        style={{ width: CANVAS_SIZE, height: CANVAS_SIZE, backgroundColor: "#FFFFFF", border: `3px solid ${color}30` }}
      >
        <canvas
          ref={canvasRef}
          className="cursor-pointer"
          style={{ touchAction: "none", width: CANVAS_SIZE, height: CANVAS_SIZE }}
          onPointerDown={handleCanvasDown}
        />
      </div>

      {progress > 0 && (
        <div className="flex items-center gap-2 w-full max-w-[200px]">
          <div className="flex-1 h-2 rounded-full bg-neutral-100 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%`, backgroundColor: color }}
            />
          </div>
          <span className="font-inter text-xs text-neutral-400">{progress}%</span>
        </div>
      )}

      <div className="flex gap-2 flex-wrap justify-center">
        {COLORS.map((c) => (
          <motion.button
            key={c.hex}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedColor(c.hex)}
            className="w-10 h-10 rounded-full border-2 transition-all duration-300"
            style={{
              backgroundColor: c.hex,
              borderColor: selectedColor === c.hex ? color : "#D4D4D4",
              transform: selectedColor === c.hex ? "scale(1.25)" : "scale(1)",
            }}
            title={c.name}
          />
        ))}
      </div>

      <p className="font-amiri text-lg" style={{ color }}>
        {word}
      </p>

      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setCompleted(true);
            playSound("/audio/encouragement/complete.mp3");
            setTimeout(onComplete, 500);
          }}
          className="btn-primary transition-colors duration-500"
          style={{ backgroundColor: color }}
        >
          ✅ تم التلوين
        </motion.button>
        <button
          onClick={resetCanvas}
          className="btn-secondary transition-colors duration-500"
          style={{ borderColor: color, color }}
        >
          🔄 إعادة
        </button>
      </div>

      {completed && (
        <motion.p
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="font-amiri text-xl font-bold text-emerald-500"
        >
          ✔ أحسنت!
        </motion.p>
      )}
    </div>
  );
}
