"use client";

import { useState, useRef, useCallback, useSyncExternalStore } from "react";

function getStorageKey(letterId: number) {
  return `hurofi-nasheed-${letterId}`;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export default function NasheedRecorder({ letterId, color }: { letterId: number; color: string }) {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const audioUrl = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(getStorageKey(letterId)),
    () => null
  );

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      chunksRef.current = [];
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        localStorage.setItem(getStorageKey(letterId), url);
        window.dispatchEvent(new Event("storage"));
        stream.getTracks().forEach((t) => t.stop());
      };
      mr.start();
      setRecording(true);
    } catch { /* mic denied */ }
  }, [letterId]);

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  }, []);

  return (
    <div className="flex items-center gap-2" style={{ color }}>
      {audioUrl ? (
        <>
          <span className="text-xs font-inter">نشيدك</span>
          <button onClick={() => new Audio(audioUrl).play()} className="text-sm hover:scale-110 transition-transform">▶️</button>
        </>
      ) : (
        <button
          onClick={recording ? stopRecording : startRecording}
          className="text-xs font-inter px-2 py-1 rounded-full transition-all"
          style={{
            backgroundColor: recording ? "#FEE2E2" : color + "20",
            color: recording ? "#EF4444" : color,
          }}
        >
          {recording ? "⏹ إيقاف" : "🎙 سجل نشيدك"}
        </button>
      )}
    </div>
  );
}
