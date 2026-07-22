"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Confetti, MoneyRain } from "./primitives";
import { SCENES, type BurstKind } from "./scenes";

export function Deck() {
  const [index, setIndex] = React.useState(0);
  const [phase, setPhase] = React.useState<"idle" | "closing" | "opening">("idle");
  const [burst, setBurst] = React.useState<{ kind: BurstKind; key: number }>({
    kind: null,
    key: 0,
  });
  const animating = React.useRef(false);

  const go = React.useCallback((delta: number) => {
    if (animating.current) return;
    setIndex((cur) => {
      const nextIdx = (cur + delta + SCENES.length) % SCENES.length;
      if (nextIdx === cur) return cur;
      animating.current = true;
      setPhase("closing");
      window.setTimeout(() => {
        setIndex(nextIdx);
        setPhase("opening");
        window.setTimeout(() => {
          setPhase("idle");
          animating.current = false;
        }, 320);
      }, 300);
      return cur; // real change happens inside the timeout
    });
  }, []);

  const next = React.useCallback(() => go(1), [go]);
  const prev = React.useCallback(() => go(-1), [go]);

  const fireBurst = React.useCallback((kind: BurstKind) => {
    setBurst((b) => ({ kind, key: b.key + 1 }));
  }, []);

  // confetti is one-shot; money rain persists until a scene clears it
  React.useEffect(() => {
    if (burst.kind !== "confetti") return;
    const k = burst.key;
    const t = window.setTimeout(() => {
      setBurst((b) => (b.key === k ? { kind: null, key: b.key } : b));
    }, 2800);
    return () => window.clearTimeout(t);
  }, [burst]);

  // keyboard: → / Space advance, ← back
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const scene = SCENES[index];

  return (
    <div className="relative min-h-dvh w-full overflow-hidden">
      {/* decorative plakativ background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60rem 60rem at 15% -10%, color-mix(in oklch, var(--brand) 14%, transparent), transparent), radial-gradient(50rem 50rem at 110% 120%, color-mix(in oklch, var(--primary) 12%, transparent), transparent)",
        }}
      />

      {/* the scene (keyed so it re-animates each change) */}
      <div key={scene.id} className={cn(phase === "opening" && "fg-pop")}>
        {scene.render({ next, burst: fireBurst })}
      </div>

      {/* burst effects */}
      {burst.kind === "confetti" && <Confetti key={`c-${burst.key}`} />}
      {burst.kind === "money" && <MoneyRain key={`m-${burst.key}`} />}

      {/* theatrical curtain wipe */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none fixed inset-0 z-[60] flex items-center justify-center bg-primary text-6xl transition-opacity duration-300",
          phase === "closing" ? "opacity-100" : "opacity-0",
        )}
      >
        🎭
      </div>

      {/* persistent presenter controls */}
      <div className="fixed inset-x-0 bottom-0 z-[55] flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            className="rounded-full bg-card/80 px-4 py-2 text-sm font-semibold text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
          >
            ← Zurück
          </button>
          <span className="hidden text-sm font-semibold text-muted-foreground sm:inline">
            {scene.act}
          </span>
        </div>

        {/* progress dots */}
        <div className="flex items-center gap-1.5">
          {SCENES.map((s, i) => (
            <span
              key={s.id}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index ? "w-7 bg-brand" : "w-2 bg-border",
              )}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="rounded-full bg-primary px-7 py-3 text-base font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95 sm:text-lg"
        >
          Weiter →
        </button>
      </div>
    </div>
  );
}
