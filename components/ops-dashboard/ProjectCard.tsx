"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { STAGES, jitteredMs, randomProject, type Project } from "./data";

type Phase = "idle" | "entering" | "running" | "done" | "exiting";

const DONE_HOLD_MS = 1400;
const FLY_MS = 450;

export function ProjectCard({
  flyDir,
  onDone,
}: {
  /** alternates per slot so the grid doesn't fly in/out in perfect unison */
  flyDir: "left" | "right";
  onDone: (dealK: number) => void;
}) {
  const [project, setProject] = React.useState<Project | null>(null);
  const [stageIndex, setStageIndex] = React.useState(0);
  const [phase, setPhase] = React.useState<Phase>("idle");

  // Stable ref so the loop below (only ever created once) can call the
  // latest onDone without re-running the whole effect. Updated in an effect,
  // not during render, per react-hooks/refs.
  const onDoneRef = React.useRef(onDone);
  React.useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  // A single self-perpetuating loop per card, started once on mount. Never
  // depends on external state — each card is its own independent process.
  React.useEffect(() => {
    let cancelled = false;
    const timeouts: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const t = window.setTimeout(resolve, ms);
        timeouts.push(t);
      });

    async function loop() {
      // desync the very first cycle so 8 cards don't all start in lockstep
      await wait(Math.round(Math.random() * 3000));
      while (!cancelled) {
        const current = randomProject();
        setProject(current);
        setStageIndex(0);
        setPhase("entering");
        await wait(FLY_MS);
        if (cancelled) return;

        setPhase("running");
        for (let i = 0; i < STAGES.length; i++) {
          setStageIndex(i);
          await wait(jitteredMs(STAGES[i].baseMs));
          if (cancelled) return;
        }

        setPhase("done");
        setStageIndex(STAGES.length);
        // report revenue exactly once, right as the card turns green
        onDoneRef.current(current.dealK);
        await wait(DONE_HOLD_MS);
        if (cancelled) return;

        setPhase("exiting");
        await wait(FLY_MS);
        if (cancelled) return;
      }
    }

    loop();
    return () => {
      cancelled = true;
      timeouts.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const flyIn = flyDir === "left" ? "fg-fly-in-left" : "fg-fly-in-right";
  const flyOut = flyDir === "left" ? "fg-fly-out-left" : "fg-fly-out-right";
  const isDone = phase === "done";

  return (
    <div
      className={cn(
        "rounded-2xl border-2 bg-card p-5 shadow-sm transition-colors duration-300",
        isDone
          ? "border-emerald-500 bg-emerald-500/10"
          : "border-border",
        phase === "entering" && flyIn,
        phase === "exiting" && flyOut,
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate text-lg font-bold text-foreground">
            {project?.customer ?? "—"}
          </div>
          <div className="truncate text-sm text-muted-foreground">
            {project?.format ?? " "}
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-xs font-bold text-secondary-foreground">
          {project ? `${project.dealK}k` : "—"}
        </span>
      </div>

      {isDone ? (
        <div className="fg-pop flex items-center gap-2 rounded-lg bg-emerald-500/15 px-3 py-3 text-emerald-600 dark:text-emerald-400">
          <span className="text-xl">✅</span>
          <span className="font-bold">Fertig! Video live.</span>
        </div>
      ) : (
        <>
          <div className="mb-2 flex items-center gap-1.5">
            {STAGES.map((s, i) => (
              <span
                key={s.label}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors duration-300",
                  i <= stageIndex ? "bg-brand" : "bg-secondary",
                )}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <span>{STAGES[Math.min(stageIndex, STAGES.length - 1)]?.icon}</span>
            <span>{STAGES[Math.min(stageIndex, STAGES.length - 1)]?.label ?? " "}</span>
          </div>
        </>
      )}
    </div>
  );
}
