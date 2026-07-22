"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SCENE_COMPONENTS } from "@/components/scene/registry";
import { SceneNavContext } from "@/components/scene/nav";
import { SCENES } from "@/lib/scenes";

export function SceneController() {
  const [index, setIndex] = useState(0);
  const [beat, setBeat] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [displayBeat, setDisplayBeat] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scenes cut straight to the next one — no animated act/persona curtain.
  // (Removed 2026-07-22: the transitions doubled up with the static title +
  // acting-backdrop slides. Pacing is fully moderator-driven via Next/Back.)
  const goToScene = useCallback((nextIndex: number, entryBeat: number) => {
    if (nextIndex < 0 || nextIndex >= SCENES.length) return;
    setIndex(nextIndex);
    setBeat(entryBeat);
    setDisplayIndex(nextIndex);
    setDisplayBeat(entryBeat);
  }, []);

  // Next/Back step through a scene's internal beats (0 = full overview,
  // 1+ = zoomed into a specific element) before moving to the next/previous
  // scene — see lib/scenes.ts `beats` field.
  const next = useCallback(() => {
    const totalBeats = SCENES[index].beats ?? 1;
    if (beat + 1 < totalBeats) {
      setBeat((b) => b + 1);
      setDisplayBeat((b) => b + 1);
      return;
    }
    goToScene(index + 1, 0);
  }, [index, beat, goToScene]);

  const prev = useCallback(() => {
    if (beat > 0) {
      setBeat((b) => b - 1);
      setDisplayBeat((b) => b - 1);
      return;
    }
    if (index > 0) {
      const prevTotalBeats = SCENES[index - 1].beats ?? 1;
      goToScene(index - 1, prevTotalBeats - 1);
    }
  }, [index, beat, goToScene]);

  // Lets a scene jump straight to one of its own beats (branching within a
  // scene) — e.g. Shop's "Read My Mind" button skips to its own zoomed beat
  // instead of the normal manual-browsing zoom beat.
  const goToBeat = useCallback(
    (n: number) => {
      const totalBeats = SCENES[index].beats ?? 1;
      const clamped = Math.max(0, Math.min(n, totalBeats - 1));
      setBeat(clamped);
      setDisplayBeat(clamped);
    },
    [index],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
      }
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const CurrentScene = SCENE_COMPONENTS[SCENES[displayIndex].id];
  const scene = SCENES[index];
  const isFirst = index === 0 && beat === 0;
  const isLast = index === SCENES.length - 1 && beat === (scene.beats ?? 1) - 1;

  // The scroll container is never remounted between scenes, so its scroll
  // position must be reset by hand or the next scene opens mid-scroll.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [displayIndex, displayBeat]);

  return (
    <SceneNavContext.Provider value={{ next, prev, goToBeat, beat: displayBeat }}>
      <div className="relative h-screen w-full overflow-hidden">
        <div ref={scrollRef} className="h-full w-full overflow-y-auto">
          <CurrentScene />
        </div>

        {/* Moderator-only controls — deliberately small and low-key, not part of the pitch. */}
        <div className="fixed bottom-3 right-3 z-40 flex items-center gap-1 opacity-40 transition-opacity hover:opacity-100">
          <button
            aria-label="Back"
            onClick={prev}
            disabled={isFirst}
            className="flex size-6 items-center justify-center rounded-full bg-card/80 text-muted-foreground shadow-sm backdrop-blur hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft className="size-3.5" />
          </button>
          <button
            aria-label="Next"
            onClick={next}
            disabled={isLast}
            className="flex size-6 items-center justify-center rounded-full bg-card/80 text-muted-foreground shadow-sm backdrop-blur hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>
    </SceneNavContext.Provider>
  );
}
