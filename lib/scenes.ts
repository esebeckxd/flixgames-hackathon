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
// The cold-open (curtain closed → curtain opens on the title) is a prologue,
// not its own act — the real Act 1 begins right after it, with Pharma.
// Each act opens with an ActCard (act-N) — "ACT N" + the act's name really
// big, plus "Now on screen: X" when the act opens on a pure acting beat with
// no portal UI (Act 1: Pharma, Act 2: Speaker, Act 4: DX Employee; Act 3
// opens straight on the Publish dashboard, so no "now on screen" line). Per
// Franz's 2026-07-23 note, the narrator is never named on an act card.
//
// 2026-07-22 (Daniel's flow-reorder call, see docs/TECH-ROADMAP.md "Planned
// reorder" sections): Pharma flow is now Shop → SpeakerSelect → Checkout →
// Briefing (speaker-pick moved out of Checkout, ahead of it); Speaker flow is
// now ReferentUpload (combined single screen) → VideoGen (pick your style →
// slides+script → preview → payout, 4 beats).
export const SCENES: SceneDef[] = [
  // beats: 0 curtain closed (no text), 1 curtain parts to reveal the title
  { id: "cold-open", persona: "narrator", title: "The Assignment", act: 1, beats: 2 },
  { id: "act-1", persona: "pharma", title: "Act 1 Title Card", act: 1 },
  // Live-acting backdrops (no portal UI) — the actors perform in front of these.
  { id: "pharma-backdrop", persona: "pharma", title: "On Stage · Pharma", act: 1 },
  // beats: 0 overview w/ prominent inline "Read My Mind" button + topic grid,
  // 1 suggested-topic confirmation (see Shop.tsx)
  { id: "shop", persona: "pharma", title: "Topic Shop", act: 1, beats: 2 },
  { id: "speaker-select", persona: "pharma", title: "Pick Your Speaker", act: 1 },
  { id: "checkout", persona: "pharma", title: "Cost Configurator & Checkout", act: 1 },
  { id: "briefing", persona: "pharma", title: "Kick-Off Prep", act: 1 },
  { id: "act-2", persona: "speaker", title: "Act 2 Title Card", act: 2 },
  { id: "speaker-backdrop", persona: "speaker", title: "On Stage · Speaker", act: 2 },
  { id: "slide-builder", persona: "speaker", title: "Slide Upload", act: 2 },
  // beats: 0 pick your style, 1 slides+script+generate, 2 preview+submit, 3 payout success
  { id: "video-gen", persona: "speaker", title: "Video Generation", act: 2, beats: 4 },
  { id: "act-3", persona: "pharma", title: "Act 3 Title Card", act: 3 },
  { id: "publish", persona: "pharma", title: "Submit & Publish", act: 3 },
  { id: "payoff", persona: "pharma", title: "Reporting", act: 3 },
  { id: "act-4", persona: "dx", title: "Act 4 Title Card", act: 4 },
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
  1: "Every Day Life in the Pharma Office",
  2: "At Dr. Danny G.'s Home",
  3: "Back with Pharma",
  4: "Unemployed and Rich",
};
