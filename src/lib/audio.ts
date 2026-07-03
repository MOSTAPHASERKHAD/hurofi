import { useSound } from "./useSound";

export function playTone(freq: number, duration: number, type: OscillatorType = "sine") {
  if (useSound.getState().muted) return;
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch { /* ignore */ }
}

export function playSound(path: string) {
  if (useSound.getState().muted) return;
  try { new Audio(path).play(); } catch { /* ignore */ }
}
