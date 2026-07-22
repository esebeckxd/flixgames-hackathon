"use client";

import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { DashboardShell } from "@/components/scene/DashboardShell";
import { useDemoState } from "@/lib/demo-state";

const FINAL_VIEWS = 48213;

function ViewCounter() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 40;
    const id = setInterval(() => {
      frame++;
      // ease-out: fast at first, decelerating into the final number — the "slot machine" feel.
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
      setValue(Math.round(FINAL_VIEWS * progress));
      if (frame >= totalFrames) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="font-heading text-4xl font-black tabular-nums text-brand">
      {value.toLocaleString("en-US")}
    </div>
  );
}

// Rebuilt 2026-07-22: back in the Pharma dashboard (Projects tab) instead of
// a standalone centered card, so Pharma sees the new video land in the same
// place the project was booked. Publishing reveals the "Shift Whole Business
// Unit" gag button (also in Payoff.tsx, one month later) right on the side —
// the payoff doesn't wait for the follow-up scene to land the first time.
export function Publish() {
  const { topic, speaker } = useDemoState();
  const [published, setPublished] = useState(false);

  return (
    <DashboardShell active="projects">
      <div className="flex min-h-full flex-col gap-6 px-8 py-8">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-muted-foreground">
            {speaker ?? "Your speaker"} submitted the video — ready when you are.
          </p>
        </div>

        <div className="flex max-w-3xl items-start gap-6">
          <div className="flex-1 rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-4">
              <span className="flex size-16 flex-none items-center justify-center rounded-xl bg-[#0f0f0f]">
                <Play className="size-6 fill-white text-white" />
              </span>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {published ? "Live" : "Ready to publish"}
                </div>
                <div className="text-lg font-bold">{topic.title}</div>
                <div className="text-sm text-muted-foreground">Speaker: {speaker ?? "TBD"}</div>
              </div>
            </div>

            {!published ? (
              <button
                onClick={() => setPublished(true)}
                className="mt-6 rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90"
              >
                Publish Video
              </button>
            ) : (
              <div className="mt-6 flex flex-col items-start gap-1">
                <ViewCounter />
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Views · live</p>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Pharma gets the notification on the way to the airport — &ldquo;video live, time
                  to clock out.&rdquo;
                </p>
              </div>
            )}
          </div>

          {published && (
            <div className="flex flex-none flex-col items-center gap-2 pt-1">
              <button className="animate-pulse rounded-md border-2 border-yellow-400 bg-yellow-300 px-4 py-3 text-sm font-black uppercase text-red-700 shadow-[0_0_0_3px_#fff,0_0_0_5px_#ef4444]">
                Shift Whole Business Unit to Doctorflix and Retire Me
              </button>
              <button className="rounded border border-border px-2 py-1 text-[10px] text-muted-foreground hover:text-foreground">
                Maybe Just a Vacation
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
