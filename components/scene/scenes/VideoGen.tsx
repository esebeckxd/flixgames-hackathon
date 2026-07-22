"use client";

import { useRef, useState } from "react";
import { useDemoState } from "@/lib/demo-state";
import { useSceneNav } from "@/components/scene/nav";

// Rebuilt per Daniel's 2026-07-22 flow-reorder call (docs/TECH-ROADMAP.md):
// pick your style → slides+script → preview+submit → payout. The style step
// was reinstated the same day once Daniel supplied real preview clips for it
// (business-punk/lederhosen/arzt) — it picks the Speaker's own on-screen
// look, not a specific named person, so it needs no likeness sign-off.
const STYLES = [
  { id: "business-punk", label: "Business Punk", src: "/videos/pick-your-style/business-punk.mp4" },
  { id: "lederhosen", label: "Lederhosen", src: "/videos/pick-your-style/lederhosen.mp4" },
  { id: "arzt", label: "The Doctor", src: "/videos/pick-your-style/arzt.mp4" },
];

const SLIDES = ["Title & Agenda", "Key Points", "Summary"];

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
      className={`flex flex-1 flex-col items-center gap-2 overflow-hidden rounded-xl border-2 bg-[#1A2133] p-2 text-center transition ${
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
  const { topic } = useDemoState();
  const { next, beat } = useSceneNav();
  const [styleId, setStyleId] = useState(STYLES[0].id);

  const selected = STYLES.find((s) => s.id === styleId) ?? STYLES[0];

  const script = [
    `Hi, I'm Daniel — today we'll cover ${topic.title}.`,
    "Let's look at the three things that actually matter for your practice.",
    "That's it — simple, evidence-based, ready to use tomorrow.",
  ];

  if (beat === 0) {
    return (
      <div className="mx-auto flex h-full w-full max-w-2xl flex-col items-center justify-center gap-6 px-6 text-center">
        <span className="text-xs font-bold uppercase tracking-wide text-brand">Before we generate</span>
        <h1 className="text-2xl font-bold">Pick your style</h1>

        <div className="flex w-full items-center gap-3">
          {STYLES.map((s) => (
            <StyleCard key={s.id} style={s} active={styleId === s.id} onSelect={() => setStyleId(s.id)} />
          ))}
        </div>

        <button
          onClick={next}
          className="rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground hover:bg-primary/90"
        >
          Continue as {selected.label}
        </button>
      </div>
    );
  }

  if (beat === 2) {
    return (
      <div className="mx-auto flex h-full w-full max-w-2xl flex-col items-center justify-center gap-6 px-6 text-center">
        <span className="text-xs font-bold uppercase tracking-wide text-brand">Preview</span>
        <div className="mx-auto aspect-video w-full overflow-hidden rounded-2xl border-2 border-brand bg-black">
          <video src={selected.src} className="h-full w-full object-cover" muted loop playsInline autoPlay controls />
        </div>
        <p className="text-sm font-semibold">
          {selected.label} — &ldquo;{topic.title}&rdquo;
        </p>
        <button
          onClick={next}
          className="rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground hover:bg-primary/90"
        >
          Submit Video
        </button>
      </div>
    );
  }

  if (beat === 3) {
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

  // beat === 1: slides + script + generate
  return (
    <div className="mx-auto flex h-full w-full max-w-5xl flex-col justify-center gap-6 px-6 py-10">
      <div className="text-center">
        <span className="text-xs font-bold uppercase tracking-wide text-brand">AI at work</span>
        <h1 className="mt-1 text-2xl font-bold">Slides + script, ready to go</h1>
        <p className="mt-1 text-xs text-muted-foreground">Style: {selected.label}</p>
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
