"use client";

import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// "Pick your style" — the Referent's own on-screen look for the AI avatar,
// not a specific named person, so unlike the earlier real-referent-name
// roster this replaces, it needs no likeness sign-off (see TECH-ROADMAP.md).
const STYLES = [
  { id: "business-punk", label: "Business Punk", src: "/videos/pick-your-style/business-punk.mp4" },
  { id: "lederhosen", label: "Lederhosen", src: "/videos/pick-your-style/lederhosen.mp4" },
  { id: "arzt", label: "The Doctor", src: "/videos/pick-your-style/arzt.mp4" },
];

const VIDEO_TOPIC = "Effect of Pizza on the Human Body";

type Mode = "live" | "avatar";
type Step = "select" | "creating" | "done";

function StyleCard({
  style,
  active,
  onSelect,
}: {
  style: (typeof STYLES)[number];
  active: boolean;
  onSelect: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => videoRef.current?.play()}
      className={`group flex flex-1 flex-col items-center gap-2 overflow-hidden rounded-xl border-2 bg-[#1A2133] p-2 text-center transition ${
        active
          ? "border-brand shadow-[0_0_0_3px_rgba(21,159,149,0.25)]"
          : "border-white/10 hover:border-brand/40"
      }`}
    >
      <div className="aspect-[9/16] w-full max-w-[110px] overflow-hidden rounded-lg bg-black">
        <video
          ref={videoRef}
          src={style.src}
          className="h-full w-full object-cover"
          muted
          loop
          playsInline
          autoPlay
        />
      </div>
      <span className="text-sm font-bold uppercase tracking-wide text-white">{style.label}</span>
    </button>
  );
}

export function VideoGen() {
  const [styleId, setStyleId] = useState(STYLES[0].id);
  const [mode, setMode] = useState<Mode>("avatar");
  const [step, setStep] = useState<Step>("select");

  const selected = STYLES.find((s) => s.id === styleId) ?? STYLES[0];

  return (
    <div className="mx-auto flex h-full w-full max-w-4xl flex-col justify-center gap-6 px-6 py-10">
      <Card>
        <CardContent className="flex flex-col gap-6 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold">Pick your style</h2>
            <Badge variant="outline">Referent</Badge>
          </div>

          <div className="flex items-center gap-3">
            {STYLES.map((s, i) => (
              <div key={s.id} className="flex flex-1 items-center gap-3">
                <StyleCard style={s} active={styleId === s.id} onSelect={() => setStyleId(s.id)} />
                {i < STYLES.length - 1 && (
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
              Generating video in {selected.label} style ({mode === "avatar" ? "AI Avatar" : "Live Recording"})…
            </p>
          )}

          {step === "done" && (
            <div className="flex flex-col items-center gap-3">
              <div className="mx-auto aspect-video w-full max-w-md overflow-hidden rounded-2xl border-2 border-brand bg-black">
                <video
                  src={selected.src}
                  className="h-full w-full object-cover"
                  muted
                  loop
                  playsInline
                  autoPlay
                  controls
                />
              </div>
              <p className="text-sm font-semibold">
                {selected.label} — &ldquo;{VIDEO_TOPIC}&rdquo;
              </p>
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
