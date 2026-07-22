"use client";

import { useState } from "react";
import { Loader2, Upload, Sparkles } from "lucide-react";
import { DashboardShell } from "@/components/scene/DashboardShell";
import { useDemoState } from "@/lib/demo-state";
import { useSceneNav } from "@/components/scene/nav";
import { Badge } from "@/components/ui/badge";

type UploadStep = "idle" | "uploading" | "uploaded" | "cleaning" | "cleaned";

const SLIDES = [
  { src: "/slides/slide-1-title.png", label: "Title" },
  { src: "/slides/slide-2-symptoms.png", label: "Symptoms & Findings" },
  { src: "/slides/slide-3-therapy.png", label: "Therapy Options" },
];

// Combined into one single screen per Daniel's 2026-07-22 flow-reorder call
// (docs/TECH-ROADMAP.md) — the overview and the upload used to be two
// separate beats (dashboard, then a zoomed-in upload); the real upload flow
// now lives inline where the decorative teaser used to be.
export function ReferentUpload() {
  const { topic } = useDemoState();
  const { next } = useSceneNav();
  const [step, setStep] = useState<UploadStep>("idle");

  return (
    <DashboardShell active="upload" variant="speaker">
      <div className="flex min-h-full flex-col gap-6 px-8 py-8">
        <div className="flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 shadow-sm">
          <span className="flex size-6 items-center justify-center rounded-full bg-brand text-xs font-bold text-brand-foreground">
            🔔
          </span>
          <span className="text-sm">
            🍕 New assignment: <span className="font-semibold">{topic.title}</span>
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Speaker Dashboard</h1>
            <p className="text-sm text-muted-foreground">Everything you need to build this talk.</p>
          </div>
          <Badge variant="outline">Speaker</Badge>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Assignment
            </div>
            <div className="mt-2 text-lg font-bold">{topic.title}</div>
            <div className="mt-1 text-sm text-muted-foreground">{topic.format}</div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Deadline
            </div>
            <div className="mt-2 text-lg font-bold">Whenever you feel like it</div>
            <div className="mt-1 text-sm text-muted-foreground">AI keeps things moving</div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Payout
            </div>
            <div className="mt-2 text-lg font-bold">1,800 €</div>
            <div className="mt-1 text-sm text-muted-foreground">On submission</div>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-6 rounded-2xl border-2 border-dashed border-border bg-muted/30 p-10 text-center">
          {step === "idle" && (
            <button
              onClick={() => {
                setStep("uploading");
                setTimeout(() => setStep("uploaded"), 900);
              }}
              className="flex w-full max-w-xl flex-col items-center gap-4 rounded-[28px] border-4 border-dashed border-brand/50 bg-brand/5 px-10 py-14 transition hover:border-brand hover:bg-brand/10"
            >
              <Upload className="size-14 text-brand" />
              <span className="text-lg font-bold">Click to upload old deck</span>
              <span className="text-sm text-muted-foreground">
                Any format works. Even the one from 1998.
              </span>
            </button>
          )}

          {step === "uploading" && (
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <Loader2 className="size-10 animate-spin text-brand" />
              <span className="text-sm font-medium">Uploading…</span>
            </div>
          )}

          {step === "uploaded" && (
            <div className="flex w-full max-w-xl flex-col items-center gap-5 rounded-[28px] border-4 border-brand bg-white px-10 py-12">
              <div className="rounded-xl border border-border bg-muted/40 px-6 py-4 font-mono text-sm text-muted-foreground shadow-sm">
                Presentation_FINAL_FINAL_v3_actually_final.ppt
              </div>
              <button
                onClick={() => {
                  setStep("cleaning");
                  setTimeout(() => setStep("cleaned"), 1100);
                }}
                className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground hover:bg-primary/90"
              >
                <Sparkles className="size-5" /> Clean up with AI
              </button>
            </div>
          )}

          {step === "cleaning" && (
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <Loader2 className="size-10 animate-spin text-brand" />
              <span className="text-sm font-medium">AI is cleaning up the deck…</span>
            </div>
          )}

          {step === "cleaned" && (
            <div className="flex w-full max-w-3xl flex-col items-center gap-5">
              <div className="grid w-full grid-cols-3 gap-4">
                {SLIDES.map((slide) => (
                  <div
                    key={slide.label}
                    className="flex flex-col items-center gap-2 overflow-hidden rounded-2xl border-2 border-brand bg-white p-2 text-center"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slide.src}
                      alt={slide.label}
                      className="aspect-video w-full rounded-lg object-cover"
                    />
                    <span className="pb-1 text-xs font-semibold">{slide.label}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={next}
                className="rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground hover:bg-primary/90"
              >
                Continue →
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
