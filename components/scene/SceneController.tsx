"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PersonaTransition } from "@/components/scene/PersonaTransition";
import { SCENE_COMPONENTS } from "@/components/scene/registry";
import { SceneNavContext } from "@/components/scene/nav";
import { ACT_TITLE, SCENES } from "@/lib/scenes";

const CURTAIN_MS = 320;

export function SceneController() {
  const [index, setIndex] = useState(0);
  const [beat, setBeat] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [displayBeat, setDisplayBeat] = useState(0);
  const [transitionPhase, setTransitionPhase] = useState<"idle" | "in" | "out">("idle");
  // which act the curtain should announce (undefined = plain persona wipe)
  const [curtainAct, setCurtainAct] = useState<number | undefined>(undefined);
  const pendingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const goToScene = useCallback(
    (nextIndex: number, entryBeat: number) => {
      if (nextIndex < 0 || nextIndex >= SCENES.length || transitionPhase !== "idle") return;
      const actChanged = SCENES[nextIndex].act !== SCENES[index].act;
      const personaChanged = SCENES[nextIndex].persona !== SCENES[index].persona;

      if (!actChanged && !personaChanged) {
        setIndex(nextIndex);
        setBeat(entryBeat);
        setDisplayIndex(nextIndex);
        setDisplayBeat(entryBeat);
        return;
      }

      // A new act gets the big plakativ act-title curtain; a mere persona
      // switch inside an act gets the smaller "now on screen" wipe.
      setCurtainAct(actChanged ? SCENES[nextIndex].act : undefined);
      setIndex(nextIndex);
      setBeat(entryBeat);
      setTransitionPhase("in");
      pendingTimeout.current = setTimeout(
        () => {
          setDisplayIndex(nextIndex);
          setDisplayBeat(entryBeat);
          setTransitionPhase("out");
          pendingTimeout.current = setTimeout(() => setTransitionPhase("idle"), CURTAIN_MS);
        },
        CURTAIN_MS + (actChanged ? 640 : 260),
      );
    },
    [index, transitionPhase],
  );

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

  useEffect(
    () => () => {
      if (pendingTimeout.current) clearTimeout(pendingTimeout.current);
    },
    [],
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

        {transitionPhase !== "idle" && (
          <PersonaTransition
            persona={scene.persona}
            phase={transitionPhase === "in" ? "in" : "out"}
            act={curtainAct}
            actTitle={curtainAct ? ACT_TITLE[curtainAct as 1 | 2 | 3 | 4] : undefined}
          />
        )}

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
