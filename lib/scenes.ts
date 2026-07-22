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
// The clickable screens below are grouped into those acts — the audience
// feels 4 beats, not N scenes, because a big plakativ act-title curtain drops
// at every act boundary.
//
// 2026-07-22 (Daniel's flow-reorder call, see docs/TECH-ROADMAP.md "Planned
// reorder" sections): Pharma flow is now Shop → SpeakerSelect → Checkout →
// Briefing (speaker-pick moved out of Checkout, ahead of it); Speaker flow is
// now ReferentUpload (combined single screen) → VideoGen (slides+script →
// preview → payout, 3 beats).
export const SCENES: SceneDef[] = [
  { id: "cold-open", persona: "narrator", title: "The Assignment", act: 1 },
  // beats: 0 overview w/ prominent inline "Read My Mind" button + topic grid,
  // 1 suggested-topic confirmation (see Shop.tsx)
  { id: "shop", persona: "pharma", title: "Topic Shop", act: 2, beats: 2 },
  { id: "speaker-select", persona: "pharma", title: "Pick Your Speaker", act: 2 },
  // beats: 0 overview + form, 1 package-pick zoom
  { id: "checkout", persona: "pharma", title: "Cost Configurator & Checkout", act: 2, beats: 2 },
  { id: "briefing", persona: "pharma", title: "Projects Dashboard", act: 2 },
  { id: "slide-builder", persona: "speaker", title: "Slide Upload", act: 3 },
  // beats: 0 pick your style, 1 slides+script+generate, 2 preview+submit, 3 payout success
  { id: "video-gen", persona: "speaker", title: "Video Generation", act: 3, beats: 4 },
  { id: "publish", persona: "pharma", title: "Submit & Publish", act: 4 },
  { id: "payoff", persona: "pharma", title: "One Month Later", act: 4 },
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

// Act titles from the play. The curtain shows "ACT n" + this line at each act
// boundary — the overarching storyline made visible on screen.
export const ACT_TITLE: Record<1 | 2 | 3 | 4, string> = {
  1: "The Last Work Day",
  2: "Pia Buys In Three Clicks",
  3: "Pizza Becomes Gold",
  4: "Unemployed and Rich",
};
