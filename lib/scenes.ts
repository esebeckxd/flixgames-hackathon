export type Persona = "pharma" | "referent" | "dx" | "narrator";

export type SceneDef = {
  id: string;
  persona: Persona;
  title: string;
  /** which of the 4 acts of the play this scene belongs to */
  act: 1 | 2 | 3 | 4;
};

// The play "Wie wir arbeitslos und reich wurden" runs in 4 acts (Notion SSOT).
// The 10 clickable screens below are grouped into those acts — the audience
// feels 4 beats, not 10 scenes, because a big plakativ act-title curtain drops
// at every act boundary. Shop/Checkout/Briefing stay as three advanceable
// full-screen UIs within Akt 2.
export const SCENES: SceneDef[] = [
  { id: "cold-open", persona: "narrator", title: "Der Auftrag", act: 1 },
  { id: "shop", persona: "pharma", title: "Themenshop", act: 2 },
  { id: "checkout", persona: "pharma", title: "Kostenkonfigurator & Checkout", act: 2 },
  { id: "briefing", persona: "pharma", title: "Pre-Kick-Off Briefing", act: 2 },
  { id: "slide-builder", persona: "referent", title: "Slide Builder", act: 3 },
  { id: "video-gen", persona: "referent", title: "Video Generation", act: 3 },
  { id: "publish", persona: "pharma", title: "Submit & Publish", act: 4 },
  { id: "payoff", persona: "pharma", title: "Einen Monat später", act: 4 },
  { id: "dx-reel", persona: "dx", title: "DX Highlight Reel", act: 4 },
  { id: "stinger", persona: "narrator", title: "Sechs Monate später", act: 4 },
];

export const PERSONA_LABEL: Record<Persona, string> = {
  pharma: "Pharma",
  referent: "Referent",
  dx: "DX Employee",
  narrator: "Narrator",
};

// Act titles from the play. The curtain shows "AKT n" + this line at each act
// boundary — the overarching storyline made visible on screen.
export const ACT_TITLE: Record<1 | 2 | 3 | 4, string> = {
  1: "Der letzte Arbeitstag",
  2: "Pia kauft in drei Klicks",
  3: "Aus Pizza wird Gold",
  4: "Arbeitslos und reich",
};
