"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import { playSound } from "@/lib/audio";

interface TraceActivityProps {
  letter: string;
  onComplete: () => void;
  color?: string;
}

const CANVAS_SIZE = 320;

export default function TraceActivity({
  letter,
  onComplete,
  color = "#7C3AED",
}: TraceActivityProps) {
  const guideRef = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const [traced, setTraced] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const canvas = guideRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = CANVAS_SIZE;
    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);

    const fontSize = size * 0.7;
    ctx.font = `bold ${fontSize}px "Noto Naskh Arabic", "Traditional Arabic", "Scheherazade New", serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = color + "20";
    ctx.fillText(letter, size / 2, size / 2);

    ctx.strokeStyle = color + "35";
    ctx.lineWidth = 12;
    ctx.lineJoin = "round";
    ctx.strokeText(letter, size / 2, size / 2);

    const drawCanvas = drawRef.current;
    if (drawCanvas) {
      drawCanvas.width = size;
      drawCanvas.height = size;
      const dctx = drawCanvas.getContext("2d");
      if (dctx) {
        dctx.clearRect(0, 0, size, size);
      }
    }
  }, [letter, color]);

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = drawRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (completed) return;
    const canvas = drawRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    isDrawingRef.current = true;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }, [completed]);

  const draw = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || completed) return;
    const canvas = drawRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  }, [color, completed]);

  const stopDrawing = useCallback(() => {
    isDrawingRef.current = false;
  }, []);

  const checkTrace = () => {
    const drawCanvas = drawRef.current;
    const guideCanvas = guideRef.current;
    if (!drawCanvas || !guideCanvas) return;

    const dctx = drawCanvas.getContext("2d");
    const gctx = guideCanvas.getContext("2d");
    if (!dctx || !gctx) return;

    const drawData = dctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    const guideData = gctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    let drawnPixels = 0;
    let coveredPixels = 0;

    for (let i = 3; i < drawData.data.length; i += 4) {
      if (drawData.data[i] > 50) {
        drawnPixels++;
        if (guideData.data[i] > 30) {
          coveredPixels++;
        }
      }
    }

    const coverage = drawnPixels > 0 ? coveredPixels / drawnPixels : 0;
    if (coverage > 0.3) {
      setTraced(true);
      setCompleted(true);
      playSound("/audio/encouragement/complete.mp3");
      setTimeout(onComplete, 800);
    }
  };

  return (
    <div
      className="card flex flex-col items-center gap-6 p-8"
      style={{ backgroundColor: "#FFFFFF", borderColor: color + "30" }}
    >
      <h3 className="text-xl font-amiri font-bold" style={{ color }}>
        ✏️ تتبع الحرف
      </h3>

      <p className="font-inter text-sm text-neutral-500">
        اسحب إصبعك على الحرف لتتبعه
      </p>

      <div
        className="relative rounded-3xl overflow-hidden"
        style={{ width: CANVAS_SIZE, height: CANVAS_SIZE, backgroundColor: color + "20" }}
      >
        <canvas
          ref={guideRef}
          className="absolute inset-0"
          style={{ touchAction: "none", width: CANVAS_SIZE, height: CANVAS_SIZE }}
        />
        <canvas
          ref={drawRef}
          className="absolute inset-0 cursor-crosshair"
          style={{ touchAction: "none", width: CANVAS_SIZE, height: CANVAS_SIZE }}
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerLeave={stopDrawing}
        />
      </div>

      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={checkTrace}
          className="btn-primary transition-colors duration-500"
          style={{ backgroundColor: color }}
        >
          {traced ? "✅ تم!" : "تحقق"}
        </motion.button>
        <button
          onClick={() => {
            const canvas = drawRef.current;
            if (canvas) {
              const ctx = canvas.getContext("2d");
              if (ctx) {
                ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
              }
            }
            setTraced(false);
            setCompleted(false);
            isDrawingRef.current = false;
          }}
          className="btn-secondary transition-colors duration-500"
          style={{ borderColor: color, color }}
        >
          🔄 إعادة
        </button>
      </div>

      {traced && (
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
