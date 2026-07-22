"use client";

import { useDemoState } from "@/lib/demo-state";
import { useSceneNav } from "@/components/scene/nav";
import { VideoPlaceholder } from "@/components/scene/VideoPlaceholder";

// Rebuilt per Daniel's 2026-07-22 flow-reorder call (docs/TECH-ROADMAP.md):
// slides+script → preview+submit → payout, replacing the old avatar/fighter
// picker (not part of the new spec).
const SLIDES = ["Title & Agenda", "Key Points", "Summary"];

export function VideoGen() {
  const { topic } = useDemoState();
  const { next, beat } = useSceneNav();

  const script = [
    `Hi, I'm Daniel — today we'll cover ${topic.title}.`,
    "Let's look at the three things that actually matter for your practice.",
    "That's it — simple, evidence-based, ready to use tomorrow.",
  ];

  if (beat === 1) {
    return (
      <div className="mx-auto flex h-full w-full max-w-2xl flex-col items-center justify-center gap-6 px-6 text-center">
        <span className="text-xs font-bold uppercase tracking-wide text-brand">Preview</span>
        <VideoPlaceholder label={`Daniel — "${topic.title}"`} />
        <button
          onClick={next}
          className="rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground hover:bg-primary/90"
        >
          Submit Video
        </button>
      </div>
    );
  }

  if (beat === 2) {
    return (
      <div className="mx-auto flex h-full w-full max-w-2xl flex-col items-center justify-center gap-4 px-6 text-center">
        <span className="text-6xl">💸</span>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Honorarium payout successful — €1,800
        </h1>
        <p className="text-sm text-muted-foreground">Your work here is done. Time to log off.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-5xl flex-col justify-center gap-6 px-6 py-10">
      <div className="text-center">
        <span className="text-xs font-bold uppercase tracking-wide text-brand">AI at work</span>
        <h1 className="mt-1 text-2xl font-bold">Slides + script, ready to go</h1>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-3">
          {SLIDES.map((slide) => (
            <div
              key={slide}
              className="flex items-center gap-3 rounded-2xl border-2 border-brand bg-brand/5 p-4"
            >
              <span className="text-xl">✅</span>
              <div>
                <div className="text-sm font-semibold">{slide}</div>
                <div className="text-xs text-muted-foreground">Speaker: Daniel</div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Script
          </div>
          <div className="flex flex-col gap-3 text-sm">
            {script.map((line, i) => (
              <div key={i} className="rounded-lg bg-muted/40 p-3">
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={next}
        className="fg-blink mx-auto flex items-center gap-3 rounded-full px-10 py-5 text-xl font-extrabold shadow-[0_20px_60px_-15px_rgba(21,159,149,0.5)] transition hover:-translate-y-0.5"
      >
        Generate Video Now
      </button>
    </div>
  );
}
