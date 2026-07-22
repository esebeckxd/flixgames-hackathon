"use client";

import { useState } from "react";
import { Upload, Sparkles } from "lucide-react";
import { DashboardShell } from "@/components/scene/DashboardShell";
import { useSceneNav } from "@/components/scene/nav";
import { useDemoState } from "@/lib/demo-state";
import { Badge } from "@/components/ui/badge";

type UploadStep = "idle" | "uploaded" | "cleaned";

export function ReferentUpload() {
  const { topic } = useDemoState();
  const { beat } = useSceneNav();
  const [step, setStep] = useState<UploadStep>("idle");

  if (beat === 1) {
    // Zoomed beat: drop all chrome, one huge upload dropzone — this is the
    // click the pitch wants the audience's eyes on.
    return (
      <DashboardShell active="upload" variant="referent">
        <div className="flex min-h-full flex-col items-center justify-center gap-8 px-8 py-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-brand">
            Upload your materials
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Drop it here. AI does the rest.
          </h1>

          {step === "idle" && (
            <button
              onClick={() => setStep("uploaded")}
              className="flex w-full max-w-xl flex-col items-center gap-4 rounded-[32px] border-4 border-dashed border-brand/50 bg-brand/5 px-10 py-16 transition hover:border-brand hover:bg-brand/10"
            >
              <Upload className="size-16 text-brand" />
              <span className="text-xl font-bold">Click to upload old deck</span>
              <span className="text-sm text-muted-foreground">
                Any format works. Even the one from 1998.
              </span>
            </button>
          )}

          {step === "uploaded" && (
            <div className="flex w-full max-w-xl flex-col items-center gap-5 rounded-[32px] border-4 border-brand bg-white px-10 py-14">
              <div className="rounded-xl border border-border bg-muted/40 px-6 py-4 font-mono text-sm text-muted-foreground shadow-sm">
                Presentation_FINAL_FINAL_v3_actually_final.ppt
              </div>
              <button
                onClick={() => setStep("cleaned")}
                className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground hover:bg-primary/90"
              >
                <Sparkles className="size-5" /> Clean up with AI
              </button>
            </div>
          )}

          {step === "cleaned" && (
            <div className="grid w-full max-w-2xl grid-cols-3 gap-4">
              {["Title & Agenda", "Key Points", "Summary"].map((slide) => (
                <div
                  key={slide}
                  className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-brand bg-brand/5 p-4 text-center"
                >
                  <span className="text-2xl">✅</span>
                  <span className="text-sm font-semibold">{slide}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell active="upload" variant="referent">
      <div className="flex min-h-full flex-col gap-6 px-8 py-8">
        <div className="flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 shadow-sm">
          <span className="flex size-6 items-center justify-center rounded-full bg-brand text-xs font-bold text-brand-foreground">
            🔔
          </span>
          <span className="text-sm">
            🍕 New assignment: <span className="font-semibold">{topic.title}</span> — mid-slice,
            while you were earning your own CME credits.
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Referent Dashboard</h1>
            <p className="text-sm text-muted-foreground">Everything you need to build this talk.</p>
          </div>
          <Badge variant="outline">Referent</Badge>
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

        <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-border bg-muted/30 p-10 text-center">
          <Upload className="size-10 text-brand" />
          <div className="text-lg font-semibold">Upload your materials</div>
          <div className="max-w-sm text-sm text-muted-foreground">
            Old slides, notes, a napkin sketch — drop whatever you have. AI turns it into a clean
            presentation.
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
