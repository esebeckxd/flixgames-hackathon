"use client";

import * as React from "react";
import { Confetti } from "@/components/scene/plakativ";
import { ProjectCard } from "./ProjectCard";

const SLOT_COUNT = 8;
const BASE_TOTAL_K = 428; // deterministic seed, safe for SSR — no Math.random() here
const BASE_DONE_COUNT = 12;

/** Displayed number eases toward `target` instead of snapping — reads as a live, climbing total. */
function LiveNumber({ target, className }: { target: number; className?: string }) {
  const [shown, setShown] = React.useState(target);
  const shownRef = React.useRef(target);

  React.useEffect(() => {
    let raf = 0;
    const tick = () => {
      const cur = shownRef.current;
      const diff = target - cur;
      if (Math.abs(diff) < 0.5) {
        shownRef.current = target;
        setShown(target);
        return;
      }
      shownRef.current = cur + diff * 0.08;
      setShown(shownRef.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return <span className={className}>{Math.round(shown).toLocaleString("de-DE")}</span>;
}

export function OpsDashboard() {
  const [totalK, setTotalK] = React.useState(BASE_TOTAL_K);
  const [doneCount, setDoneCount] = React.useState(BASE_DONE_COUNT);
  const [burst, setBurst] = React.useState<{ active: boolean; key: number }>({
    active: false,
    key: 0,
  });

  const handleDone = React.useCallback((dealK: number) => {
    setTotalK((t) => t + dealK);
    setDoneCount((c) => c + 1);
    setBurst((b) => ({ active: true, key: b.key + 1 }));
    window.setTimeout(() => setBurst((b) => ({ ...b, active: false })), 2200);
  }, []);

  return (
    <div className="min-h-dvh w-full bg-background px-6 py-8 sm:px-10">
      {burst.active && <Confetti key={burst.key} pieces={14} />}

      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-brand">
              Doctorflix
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-bold text-red-500">
              <span className="size-1.5 animate-pulse rounded-full bg-red-500" />
              LIVE
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Pipeline Control
          </h1>
          <p className="mt-1 text-muted-foreground">
            {SLOT_COUNT} Kundenprojekte laufen parallel — automatisch, ohne Zutun.
          </p>
        </div>

        <div className="flex gap-8">
          <div className="text-right">
            <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Gesamtumsatz
            </div>
            <div className="text-4xl font-bold text-brand sm:text-5xl">
              <LiveNumber target={totalK} />
              <span className="text-2xl sm:text-3xl">k €</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Abgeschlossen
            </div>
            <div className="text-4xl font-bold text-foreground sm:text-5xl">
              <LiveNumber target={doneCount} />
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: SLOT_COUNT }, (_, i) => (
          <ProjectCard key={i} flyDir={i % 2 === 0 ? "left" : "right"} onDone={handleDone} />
        ))}
      </div>
    </div>
  );
}
