"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { PersonaTransition } from "@/components/scene/PersonaTransition";
import { SCENE_COMPONENTS } from "@/components/scene/registry";
import { SceneNavContext } from "@/components/scene/nav";
import { ACT_TITLE, SCENES } from "@/lib/scenes";

const CURTAIN_MS = 320;

export function SceneController() {
  const [index, setIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [transitionPhase, setTransitionPhase] = useState<"idle" | "in" | "out">("idle");
  // which act the curtain should announce (undefined = plain persona wipe)
  const [curtainAct, setCurtainAct] = useState<number | undefined>(undefined);
  const pendingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (next: number) => {
      if (next < 0 || next >= SCENES.length || transitionPhase !== "idle") return;
      const actChanged = SCENES[next].act !== SCENES[index].act;
      const personaChanged = SCENES[next].persona !== SCENES[index].persona;

      if (!actChanged && !personaChanged) {
        setIndex(next);
        setDisplayIndex(next);
        return;
      }

      // A new act gets the big plakativ act-title curtain; a mere persona
      // switch inside an act gets the smaller "now on screen" wipe.
      setCurtainAct(actChanged ? SCENES[next].act : undefined);
      setIndex(next);
      setTransitionPhase("in");
      pendingTimeout.current = setTimeout(
        () => {
          setDisplayIndex(next);
          setTransitionPhase("out");
          pendingTimeout.current = setTimeout(() => setTransitionPhase("idle"), CURTAIN_MS);
        },
        CURTAIN_MS + (actChanged ? 640 : 260),
      );
    },
    [index, transitionPhase],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

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
        goTo(index + 1);
      }
      if (e.key === "ArrowLeft") goTo(index - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, index]);

  const CurrentScene = SCENE_COMPONENTS[SCENES[displayIndex].id];
  const scene = SCENES[index];

  // The scroll container is never remounted between scenes, so its scroll
  // position must be reset by hand or the next scene opens mid-scroll.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [displayIndex]);

  return (
    <SceneNavContext.Provider value={{ next, prev }}>
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

        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
          <span className="rounded-full bg-card/90 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
            Akt {scene.act}/4 · {scene.title}
          </span>
          <Button
            variant="default"
            size="lg"
            onClick={() => goTo(index + 1)}
            disabled={index === SCENES.length - 1}
          >
            Weiter →
          </Button>
        </div>
      </div>
    </SceneNavContext.Provider>
  );
}
