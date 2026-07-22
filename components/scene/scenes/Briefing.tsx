"use client";

import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { useDemoState } from "@/lib/demo-state";
import { DashboardShell } from "@/components/scene/DashboardShell";

// Kick-off prep, inside the Pharma "Projects" dashboard tab. One card showing
// the booked project + a process stepper, and one AI-fill button. Per Daniel's
// 2026-07-22 call: no manual fields, and no "AI is reading your brain"
// processing animation — the fill just completes.
const STEPS = ["Booking", "Briefing", "Production", "Go Live", "Reporting"] as const;
const CURRENT_STEP = 1; // "Briefing"

function ProcessStepper() {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {STEPS.map((label, i) => {
        const done = i < CURRENT_STEP;
        const current = i === CURRENT_STEP;
        return (
          <div key={label} className="flex items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-2">
              <span
                className={`flex size-6 flex-none items-center justify-center rounded-full text-[11px] font-bold ${
                  done
                    ? "bg-brand text-brand-foreground"
                    : current
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/15"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {done ? <Check className="size-3.5" /> : i + 1}
              </span>
              <span
                className={`text-xs font-semibold ${
                  current ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span className={`h-px w-5 sm:w-8 ${done ? "bg-brand" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function Briefing() {
  const { topic, speaker } = useDemoState();
  const [done, setDone] = useState(false);

  return (
    <DashboardShell active="projects">
      <div className="flex min-h-full flex-col gap-6 px-8 py-8">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-muted-foreground">Everything about your booked project, in one place.</p>
        </div>

        <div className="rounded-2xl border border-border bg-card px-6 py-5">
          <ProcessStepper />
        </div>

        <div className="max-w-3xl rounded-3xl border border-border bg-card p-8">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Project Booked
            </span>
            <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">
              Confirmed
            </span>
          </div>
          <div className="mt-3 text-3xl font-bold leading-tight">{topic.title}</div>
          <div className="mt-2 text-base text-muted-foreground">
            Speaker: <span className="font-semibold text-foreground">{speaker ?? "TBD"}</span> · {topic.format}
          </div>

          <div className="mt-6 rounded-2xl bg-muted/40 p-5 text-base italic text-muted-foreground">
            &ldquo;Say less — I&rsquo;ll turn this into gold by Friday.&rdquo;
            <div className="mt-1 text-sm font-semibold not-italic text-foreground">
              — {speaker ?? "your speaker"}
            </div>
          </div>

          {!done ? (
            <button
              onClick={() => setDone(true)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-bold text-primary-foreground hover:bg-primary/90"
            >
              <Sparkles className="size-5" /> Fill Briefing with AI
            </button>
          ) : (
            <div className="mt-6 flex items-center justify-center gap-2 rounded-full bg-brand/10 px-6 py-4 text-base font-bold text-brand">
              <Check className="size-5" /> Briefing sent — {speaker ?? "the speaker"} is notified.
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
