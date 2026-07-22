"use client";

import { GagButton, Kicker, Stage } from "@/components/scene/plakativ";
import { useSceneNav } from "@/components/scene/nav";

// A dedicated, moderator-paced page at the start of each act (2026-07-22) —
// gives the narrator a beat to describe the upcoming scene out loud before
// diving into specifics, separate from the curtain animation that still
// plays between this page and the previous/next one. Act 1 doesn't get one:
// ColdOpen already is that billboard moment.
function ActIntroPage({ act, title, cue }: { act: number; title: string; cue: string }) {
  const { next } = useSceneNav();
  return (
    <Stage className="bg-[#1A2133] text-white">
      <Kicker>Act {act}</Kicker>
      <h1 className="text-balance text-4xl font-bold leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
        {title}
      </h1>
      <p className="max-w-xl text-lg italic text-white/60">{cue}</p>
      <GagButton variant="teal" size="big" onClick={next}>
        Begin →
      </GagButton>
    </Stage>
  );
}

export function ActIntro2() {
  return (
    <ActIntroPage
      act={2}
      title="Pia Buys In Three Clicks"
      cue="Narrator: introduce Pia — young, impatient, allergic to sales calls. She's about to book a whole CME campaign herself."
    />
  );
}

export function ActIntro3() {
  return (
    <ActIntroPage
      act={3}
      title="Chotto Becomes Gold"
      cue="Narrator: hand off to the Speaker — buried in doomscrolling, about to turn an ancient deck into something real."
    />
  );
}

export function ActIntro4() {
  return (
    <ActIntroPage
      act={4}
      title="Unemployed and Rich"
      cue="Narrator: the video's about to go live — and so is the ending nobody saw coming."
    />
  );
}
