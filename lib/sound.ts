// Lightweight Web Audio sound effects — synthesized, not sampled, so there's
// no licensing concern (e.g. we deliberately do NOT play Apple's actual
// notification tone, just a generic "phone buzzed" two-note chime).
// Browsers block audio until the user has interacted with the page at least
// once; since this whole app is click-driven (the Next control), that gesture
// requirement is satisfied from the very first click onward.

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    ctx = new AudioCtx();
  }
  return ctx;
}

function tone(freq: number, startTime: number, duration: number, gain = 0.15) {
  const audioCtx = getCtx();
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  gainNode.gain.setValueAtTime(0, audioCtx.currentTime + startTime);
  gainNode.gain.linearRampToValueAtTime(gain, audioCtx.currentTime + startTime + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + startTime + duration);
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  osc.start(audioCtx.currentTime + startTime);
  osc.stop(audioCtx.currentTime + startTime + duration + 0.05);
}

/** Generic two-note "phone notification" chime (not Apple's real tone). */
export function playNotification() {
  tone(1050, 0, 0.14);
  tone(1500, 0.12, 0.18);
}

/** Low "gong" hit for the DX-employee closed-deal gag. */
export function playGong() {
  tone(180, 0, 1.1, 0.2);
  tone(360, 0, 0.9, 0.08);
}

/** Quick rising "whoosh" for playful confirmations. */
export function playConfirm() {
  tone(600, 0, 0.08, 0.12);
  tone(900, 0.06, 0.1, 0.12);
}
