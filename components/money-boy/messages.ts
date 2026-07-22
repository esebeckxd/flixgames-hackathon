// Money Boy's #general spam — pure decoration, no backend, no state that
// matters beyond "look extremely bought-in". 20 hand-written message
// variations; MoneyBoyFeed.tsx randomizes which plays next and escalates
// the numbers the longer the loop runs, per "krank hohe Zahlen".

export type MoneyTemplate = {
  sponsor: string;
  format: string;
  referent: string;
  /** base deal size in k€ before the session escalation multiplier */
  baseK: number;
  /** funny aside line rendered under the deal, in Slack italics */
  funny: string;
  /** rare "record" bonus line, Slack-quoted, only on a few templates */
  bonusLine?: string;
};

export const TEMPLATES: MoneyTemplate[] = [
  {
    sponsor: "Roche",
    format: "Video on Demand",
    referent: "Sehouli",
    baseK: 15,
    funny: "Kalle bestellt sich Bier Nummer 7. Auf Firmenkosten. Natürlich.",
  },
  {
    sponsor: "Celltrion",
    format: "VOD-Paket (3er)",
    referent: "Prelog",
    baseK: 30,
    funny: "Praktikant Malte hat vor Freude den Kaffee verschüttet. Wieder.",
  },
  {
    sponsor: "MSD",
    format: "Multi-Sponsoring",
    referent: "Paula Cramer",
    baseK: 9,
    funny: "Bernd Bonus behauptet in der nächsten Mail, das sei seine Idee gewesen.",
    bonusLine: "→ Record-Sponsoring: 24k für EIN einziges Video 🏆",
  },
  {
    sponsor: "Pfizer",
    format: "Live-Webinar",
    referent: "Prof. Dr. Ego von Kittel",
    baseK: 42,
    funny: "Kittel isst währenddessen weiter Pizza. Ungerührt.",
  },
  {
    sponsor: "Bayer",
    format: "microCME",
    referent: "Sehouli",
    baseK: 21,
    funny: "Der Verkaufs-Gong ist jetzt offiziell kaputt. Wird durch eine Kirchenglocke ersetzt.",
  },
  {
    sponsor: "Novartis",
    format: "DUO-Vortrag",
    referent: "Prelog & Paula Cramer",
    baseK: 56,
    funny: "Kalle hat aus Prinzip Feierabend gemacht. Es ist 10:14 Uhr.",
  },
  {
    sponsor: "AstraZeneca",
    format: "clickCase",
    referent: "Paula Cramer",
    baseK: 18,
    funny: "Jemand hat einen Deal-Tracker in Excel angefangen. Excel ist bereits abgestürzt.",
  },
  {
    sponsor: "Sanofi",
    format: "Remote Video-Podcast",
    referent: "Prof. Dr. Ego von Kittel",
    baseK: 27,
    funny: "Die KI hat den Vertrag schneller unterschrieben als jemand ihn lesen konnte.",
  },
  {
    sponsor: "Merck",
    format: "Journal Short",
    referent: "Sehouli",
    baseK: 12,
    funny: "Bernd Bonus fragt zum dritten Mal diese Woche, ob er jetzt Vorstand wird.",
  },
  {
    sponsor: "Bristol-Myers Squibb",
    format: "Premium-Sponsoring-Paket",
    referent: "Prelog",
    baseK: 74,
    funny: "Jemand hat spontan ein Boot bestellt. Nur so, zur Sicherheit.",
    bonusLine: "→ Größter Einzeldeal des Quartals 🚀",
  },
  {
    sponsor: "GSK",
    format: "CME-Mappe",
    referent: "Paula Cramer",
    baseK: 19,
    funny: "Kalle hat jetzt zwei Biere gleichzeitig offen. Vorsorglich.",
  },
  {
    sponsor: "Boehringer Ingelheim",
    format: "Video on Demand",
    referent: "Prof. Dr. Ego von Kittel",
    baseK: 33,
    funny: "Kittel bestellt Nachschlag-Pizza. Für's ganze Team, behauptet er.",
  },
  {
    sponsor: "Novo Nordisk",
    format: "Live-Webinar (Serie)",
    referent: "Sehouli",
    baseK: 61,
    funny: "Die Slack-Notification hat einen eigenen Klingelton bekommen. Cha-Ching.",
  },
  {
    sponsor: "Eli Lilly",
    format: "microCME",
    referent: "Prelog",
    baseK: 24,
    funny: "Der Praktikant hat gekündigt. Aus Prinzip: es lief zu gut ohne ihn.",
  },
  {
    sponsor: "Amgen",
    format: "Multi-Sponsoring",
    referent: "Paula Cramer",
    baseK: 45,
    funny: "Bernd Bonus hat sich schon eine neue Visitenkarte drucken lassen: \"Senior Vice President\".",
  },
  {
    sponsor: "Gilead",
    format: "DUO-Vortrag",
    referent: "Sehouli & Prof. Dr. Ego von Kittel",
    baseK: 38,
    funny: "Kalle erwägt, in Rente zu gehen. Es ist erst Dienstag.",
  },
  {
    sponsor: "Takeda",
    format: "clickCase",
    referent: "Prelog",
    baseK: 16,
    funny: "Die KI hat nebenbei noch drei weitere Deals vorbereitet. Ungefragt.",
  },
  {
    sponsor: "Biogen",
    format: "VOD-Paket (5er)",
    referent: "Paula Cramer",
    baseK: 88,
    funny: "Jemand hat \"Champagner\" in den Teamkalender eingetragen. Für heute Abend.",
    bonusLine: "→ Bestes Sponsoring-Paket seit Firmengründung 🍾",
  },
  {
    sponsor: "Ipsen",
    format: "Journal Short",
    referent: "Sehouli",
    baseK: 11,
    funny: "Kittel hat die Pizza jetzt offiziell als Betriebsausgabe eingereicht.",
  },
  {
    sponsor: "Servier",
    format: "Premium-Sponsoring-Paket",
    referent: "Prof. Dr. Ego von Kittel",
    baseK: 67,
    funny: "Bernd Bonus fragt, ob man das Ganze nicht \"Bonus-Prinzip\" nennen kann.",
  },
];

// Every N messages, the "deal size" range escalates — the longer #general
// runs, the more unhinged the numbers get. Never caps: it's meant to run
// forever and get sillier, per "krank hohe Zahlen" + "läuft dauerhaft durch".
export function escalationMultiplier(messageCount: number) {
  return 1 + Math.pow(messageCount / 12, 1.6);
}

export function formatK(value: number) {
  // German thousands separators, no decimals — matches the brief's "164k" style.
  return Math.round(value).toLocaleString("de-DE");
}
