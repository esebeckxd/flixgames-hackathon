// Pure decoration for /ops-dashboard — example customers/formats and the 5
// pipeline stages each fake project cycles through, forever, independently.

export const CUSTOMERS = [
  "Roche",
  "Celltrion",
  "MSD",
  "Pfizer",
  "Bayer",
  "Novartis",
  "AstraZeneca",
  "Sanofi",
  "Merck",
  "Bristol-Myers Squibb",
  "GSK",
  "Boehringer Ingelheim",
  "Novo Nordisk",
  "Eli Lilly",
  "Amgen",
  "Gilead",
  "Takeda",
  "Biogen",
  "Ipsen",
  "Servier",
];

export const FORMATS = [
  "Video on Demand",
  "Live-Webinar",
  "microCME",
  "DUO-Vortrag",
  "clickCase",
  "Remote Video-Podcast",
  "Journal Short",
  "CME-Mappe",
  "Multi-Sponsoring",
  "Premium-Sponsoring-Paket",
];

export type Stage = { label: string; icon: string; baseMs: number };

// 5 stages before a project is "done" — the 6th, green state is a distinct
// overlay, not part of this progression (see ProjectCard.tsx).
export const STAGES: Stage[] = [
  { label: "Thema gewählt", icon: "🔍", baseMs: 1300 },
  { label: "Angebot konfiguriert", icon: "🛒", baseMs: 1600 },
  { label: "Bezahlt", icon: "💳", baseMs: 1300 },
  { label: "Briefing erhalten", icon: "📋", baseMs: 1700 },
  { label: "In Produktion", icon: "🎬", baseMs: 2200 },
];

export type Project = {
  customer: string;
  format: string;
  dealK: number;
};

export function randomProject(): Project {
  const customer = CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)];
  const format = FORMATS[Math.floor(Math.random() * FORMATS.length)];
  const dealK = Math.round(8 + Math.random() * 87);
  return { customer, format, dealK };
}

/** +/- 35% jitter so parallel cards never march in lockstep. */
export function jitteredMs(baseMs: number) {
  return Math.round(baseMs * (0.65 + Math.random() * 0.7));
}
