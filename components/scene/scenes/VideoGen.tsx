"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VideoPlaceholder } from "@/components/scene/VideoPlaceholder";

// Real names, locked in per docs/TECH-ROADMAP.md — text labels only, no
// photo/likeness (that needs sign-off from each before it ships for real).
const FIGHTERS = ["Sehouli", "Prelog", "Paula Cramer"];
const VIDEO_TOPIC = "Effect of Pizza on the Human Body";

type Mode = "live" | "avatar";
type Step = "select" | "creating" | "done";

export function VideoGen() {
  const [fighter, setFighter] = useState(FIGHTERS[0]);
  const [mode, setMode] = useState<Mode>("avatar");
  const [step, setStep] = useState<Step>("select");

  return (
    <div className="mx-auto flex h-full w-full max-w-4xl flex-col justify-center gap-6 px-6 py-10">
      <Card>
        <CardContent className="flex flex-col gap-6 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold">Pick your fighter</h2>
            <Badge variant="outline">Referent</Badge>
          </div>

          <div className="flex items-center gap-3">
            {FIGHTERS.map((f, i) => (
              <div key={f} className="flex flex-1 items-center gap-3">
                <button
                  onClick={() => setFighter(f)}
                  className={`flex flex-1 flex-col items-center gap-2 rounded-xl border-2 bg-[#1A2133] p-4 text-center transition ${
                    fighter === f ? "border-brand shadow-[0_0_0_3px_rgba(21,159,149,0.25)]" : "border-white/10 hover:border-brand/40"
                  }`}
                >
                  <span className="flex size-14 items-center justify-center rounded-full bg-brand text-lg font-bold text-brand-foreground">
                    {f[0]}
                  </span>
                  <span className="text-sm font-bold uppercase tracking-wide text-white">{f}</span>
                </button>
                {i < FIGHTERS.length - 1 && (
                  <span className="font-heading text-lg font-black italic text-muted-foreground">VS</span>
                )}
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-muted/40 px-4 py-2 text-center text-xs font-medium text-muted-foreground">
            Video topic: <span className="font-semibold text-foreground">{VIDEO_TOPIC}</span>
          </div>

          <div className="flex gap-2 rounded-full border border-border bg-muted/40 p-1">
            <button
              onClick={() => setMode("live")}
              className={`flex-1 rounded-full py-2 text-sm font-medium transition ${
                mode === "live" ? "bg-card shadow-sm" : "text-muted-foreground"
              }`}
            >
              Live Recording
            </button>
            <button
              onClick={() => setMode("avatar")}
              className={`flex-1 rounded-full py-2 text-sm font-medium transition ${
                mode === "avatar" ? "bg-brand text-brand-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              AI Avatar
            </button>
          </div>

          {step === "select" && (
            <div className="flex flex-col items-center gap-2">
              <button
                className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90"
                onClick={() => {
                  setStep("creating");
                  setTimeout(() => setStep("done"), 900);
                }}
              >
                Take My Job Away
              </button>
              <button
                className="rounded-full border border-brand/40 bg-brand/5 px-5 py-2 text-xs font-semibold text-brand hover:bg-brand/10"
                onClick={() => {
                  setStep("creating");
                  setTimeout(() => setStep("done"), 900);
                }}
              >
                Take My Job Away (but keep the paycheck) 💸
              </button>
            </div>
          )}

          {step === "creating" && (
            <p className="text-center text-sm text-muted-foreground">
              Generating video with {fighter} ({mode === "avatar" ? "AI Avatar" : "Live Recording"})…
            </p>
          )}

          {step === "done" && (
            <div className="flex flex-col items-center gap-3">
              <VideoPlaceholder label={`${fighter} — "${VIDEO_TOPIC}"`} />
              <p className="text-xs text-muted-foreground">
                Credited: builds on Moritz&apos;s avatar pipeline (transcript → avatar → animation).
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
