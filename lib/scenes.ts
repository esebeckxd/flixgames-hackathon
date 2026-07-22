export type Persona = "pharma" | "referent" | "dx" | "narrator";

export type SceneDef = {
  id: string;
  persona: Persona;
  title: string;
};

// Order matches docs/STORYBOARD.md's 10-scene script. Shop/Checkout/Briefing
// are one contiguous storyboard beat (Pharma) split into three advanceable
// screens, since each is its own full-screen UI to click through.
export const SCENES: SceneDef[] = [
  { id: "cold-open", persona: "narrator", title: "Cold open" },
  { id: "shop", persona: "pharma", title: "Themenshop" },
  { id: "checkout", persona: "pharma", title: "Kostenkonfigurator & Checkout" },
  { id: "briefing", persona: "pharma", title: "Pre-Kick-Off Briefing" },
  { id: "slide-builder", persona: "referent", title: "Slide Builder" },
  { id: "video-gen", persona: "referent", title: "Video Generation" },
  { id: "publish", persona: "pharma", title: "Submit & Publish" },
  { id: "payoff", persona: "pharma", title: "One month later (optional)" },
  { id: "dx-reel", persona: "dx", title: "DX Highlight Reel" },
  { id: "stinger", persona: "narrator", title: "Six months later (optional)" },
];

export const PERSONA_LABEL: Record<Persona, string> = {
  pharma: "Pharma",
  referent: "Referent",
  dx: "DX Employee",
  narrator: "Narrator",
};
