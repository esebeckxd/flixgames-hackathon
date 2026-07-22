"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { useDemoState } from "@/lib/demo-state";
import { DashboardShell } from "@/components/scene/DashboardShell";

type Step = "card" | "processing" | "done";

// Collapsed to a single "Projects" dashboard slide per Daniel's 2026-07-22
// flow-reorder call (docs/TECH-ROADMAP.md): one card showing how the project
// is booked, plus one AI-fill button — no manual typed fields anymore.
export function Briefing() {
  const { topic, speaker } = useDemoState();
  const [step, setStep] = useState<Step>("card");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (step !== "processing") return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setStep("done"), 400);
          return 100;
        }
        return p + Math.ceil(Math.random() * 18);
      });
    }, 120);
    return () => clearInterval(interval);
  }, [step]);

  if (step === "processing" || step === "done") {
    return (
      <DashboardShell active="projects">
        <div className="flex min-h-full flex-col items-center justify-center gap-4 px-8 py-10 text-center">
          {step === "processing" ? (
            <>
              <div className="text-4xl">🤖</div>
              <h2 className="text-xl font-bold">AI is filling out the briefing…</h2>
              <p className="text-sm text-muted-foreground">{Math.min(progress, 100)} %</p>
              <div className="mt-2 h-2 w-64 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-brand transition-all duration-150"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="text-4xl">✓</div>
              <h2 className="text-xl font-bold">Briefing sent!</h2>
              <p className="max-w-sm text-sm text-muted-foreground">
                Doctorflix has everything it needs. {speaker ?? "The speaker"} has been notified.
              </p>
            </>
          )}
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell active="projects">
      <div className="flex min-h-full flex-col gap-6 px-8 py-8">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-muted-foreground">Everything about your booked project, in one place.</p>
        </div>

        <div className="max-w-xl rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Project Booked
            </span>
            <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">
              Confirmed
            </span>
          </div>
          <div className="mt-2 text-lg font-bold">{topic.title}</div>
          <div className="mt-1 text-sm text-muted-foreground">
            Speaker: <span className="font-semibold text-foreground">{speaker ?? "TBD"}</span>
          </div>

          <div className="mt-5 rounded-xl bg-muted/40 p-4 text-sm italic text-muted-foreground">
            &ldquo;Say less — I&rsquo;ll turn this into gold by Friday.&rdquo;
            <div className="mt-1 text-xs font-semibold not-italic text-foreground">
              — {speaker ?? "your speaker"}
            </div>
          </div>

          <button
            onClick={() => setStep("processing")}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90"
          >
            <Sparkles className="size-4" /> Fill Briefing with AI
          </button>
        </div>
      </div>
    </DashboardShell>
  );
}
