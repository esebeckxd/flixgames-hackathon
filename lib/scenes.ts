export type Persona = "pharma" | "referent" | "dx" | "narrator";

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
// The 10 clickable screens below are grouped into those acts — the audience
// feels 4 beats, not 10 scenes, because a big plakativ act-title curtain drops
// at every act boundary. Shop/Checkout/Briefing stay as three advanceable
// full-screen UIs within Act 2.
export const SCENES: SceneDef[] = [
  { id: "cold-open", persona: "narrator", title: "The Assignment", act: 1 },
  // beats: 0 overview, 1 manual-browsing zoom, 2 "Read My Mind" zoom (branch — see Shop.tsx)
  { id: "shop", persona: "pharma", title: "Topic Shop", act: 2, beats: 3 },
  // beats: 0 overview, 1 package-pick zoom, 2 "Pick Your Fighter" referent select
  { id: "checkout", persona: "pharma", title: "Cost Configurator & Checkout", act: 2, beats: 3 },
  { id: "briefing", persona: "pharma", title: "Pre-Kick-Off Briefing", act: 2 },
  { id: "slide-builder", persona: "referent", title: "Slide Upload", act: 3, beats: 2 },
  { id: "video-gen", persona: "referent", title: "Video Generation", act: 3 },
  { id: "publish", persona: "pharma", title: "Submit & Publish", act: 4 },
  { id: "payoff", persona: "pharma", title: "One Month Later", act: 4 },
  { id: "dx-reel", persona: "dx", title: "DX Highlight Reel", act: 4 },
  { id: "leos-iphone", persona: "narrator", title: "Leo's iPhone", act: 4 },
  { id: "stinger", persona: "narrator", title: "Six Months Later", act: 4 },
];

export const PERSONA_LABEL: Record<Persona, string> = {
  pharma: "Pharma",
  referent: "Referent",
  dx: "DX Employee",
  narrator: "Narrator",
};

// Act titles from the play. The curtain shows "ACT n" + this line at each act
// boundary — the overarching storyline made visible on screen.
export const ACT_TITLE: Record<1 | 2 | 3 | 4, string> = {
  1: "The Last Work Day",
  2: "Pia Buys In Three Clicks",
  3: "Pizza Becomes Gold",
  4: "Unemployed, Founders Rich",
};
