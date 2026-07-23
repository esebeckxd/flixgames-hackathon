export type Persona = "pharma" | "speaker" | "dx" | "narrator";

export type SceneDef = {
  id: string;
  persona: Persona;
  title: string;
  /** which of the 4 acts of the play this scene belongs to */
  act: 1 | 2 | 3 | 4;
  /**
   * Number of internal "beats" this scene has. Beat 0 is always the full
   * product/dashboard overview; beat 1+ zooms into the specific element
   * being interacted with. Pressing Next/Back steps through beats before
   * moving to the next/previous scene. Defaults to 1 (no zoom beat).
   */
  beats?: number;
};

// The play "How we became unemployed and rich" runs in 4 acts (Notion SSOT).
// The clickable screens below are grouped into those acts. Scenes cut
// straight into each other (no animated act/persona curtain) — the
// moderator/narrator carries the pacing and act hand-offs live, backed by
// the on-stage backdrop scenes below.
//
// Each act opens with an ActCard (act-N) — "ACT N" + the act's name really
// big, plus "Now on screen: X" when the act opens on a pure acting beat with
// no portal UI (re-added 2026-07-23; an earlier same-day-22nd "Act-intro"
// experiment was dropped for doubling up with the backdrops, but the actual
// act markers turned out to still be needed on their own).
//
// 2026-07-22 (Daniel's flow-reorder call, see docs/TECH-ROADMAP.md "Planned
// reorder" sections): Pharma flow is now Shop → SpeakerSelect → Checkout →
// Briefing (speaker-pick moved out of Checkout, ahead of it); Speaker flow is
// now ReferentUpload (combined single screen) → VideoGen (pick your style →
// slides+script → preview → payout, 4 beats).
export const SCENES: SceneDef[] = [
  { id: "act-1", persona: "narrator", title: "Act 1 Title Card", act: 1 },
  // beats: 0 curtain closed (no text), 1 curtain parts to reveal the title
  { id: "cold-open", persona: "narrator", title: "The Assignment", act: 1, beats: 2 },
  { id: "act-2", persona: "pharma", title: "Act 2 Title Card", act: 2 },
  // Live-acting backdrops (no portal UI) — the actors perform in front of these.
  { id: "pharma-backdrop", persona: "pharma", title: "On Stage · Pharma", act: 2 },
  // beats: 0 overview w/ prominent inline "Read My Mind" button + topic grid,
  // 1 suggested-topic confirmation (see Shop.tsx)
  { id: "shop", persona: "pharma", title: "Topic Shop", act: 2, beats: 2 },
  { id: "speaker-select", persona: "pharma", title: "Pick Your Speaker", act: 2 },
  { id: "checkout", persona: "pharma", title: "Cost Configurator & Checkout", act: 2 },
  { id: "briefing", persona: "pharma", title: "Kick-Off Prep", act: 2 },
  { id: "act-3", persona: "speaker", title: "Act 3 Title Card", act: 3 },
  { id: "speaker-backdrop", persona: "speaker", title: "On Stage · Speaker", act: 3 },
  { id: "slide-builder", persona: "speaker", title: "Slide Upload", act: 3 },
  // beats: 0 pick your style, 1 slides+script+generate, 2 preview+submit, 3 payout success
  { id: "video-gen", persona: "speaker", title: "Video Generation", act: 3, beats: 4 },
  { id: "act-4", persona: "pharma", title: "Act 4 Title Card", act: 4 },
  { id: "publish", persona: "pharma", title: "Submit & Publish", act: 4 },
  { id: "payoff", persona: "pharma", title: "Reporting", act: 4 },
  { id: "dx-backdrop", persona: "dx", title: "On Stage · DX", act: 4 },
  { id: "dx-reel", persona: "dx", title: "DX Highlight Reel", act: 4 },
  { id: "leos-iphone", persona: "narrator", title: "Leo's iPhone", act: 4 },
  { id: "stinger", persona: "narrator", title: "Six Months Later", act: 4 },
];

export const PERSONA_LABEL: Record<Persona, string> = {
  pharma: "Pharma",
  speaker: "Speaker",
  dx: "DX Employee",
  narrator: "Narrator",
};

// Act titles from the play — rendered on the act-N title cards above, and
// also useful as a reference for the moderator's narration.
export const ACT_TITLE: Record<1 | 2 | 3 | 4, string> = {
  1: "The Last Work Day",
  2: "Pia Buys In Three Clicks",
  3: "Chotto Becomes Gold",
  4: "Unemployed and Rich",
};
