# Technical roadmap — build tasks & assets

Engineering-facing companion to the storyboard: **what to actually build, per scene, and what raw
assets someone needs to go find/create for it.** The storyboard (narrative, cast, timing, jokes) lives
in **Notion as the SSOT** —
[FlixGames Hackathon — Pitch Storyboard](https://app.notion.com/p/doctorflix/FlixGames-Hackathon-Pitch-Storyboard-EN-3a525482863c818c9dc3d49cf9d062a5)
— this file stays in the repo and tracks the engineering side only. Keep this in sync by hand whenever
the Notion storyboard changes; it is not itself the source of truth for narrative content.

Status legend: ❌ not started · 🟡 in progress · ✅ done.

> **Storyboard restructured (2026-07-22):** the Notion SSOT is now a tight **4-act play**
> („Wie wir arbeitslos und reich wurden"), not the old 10-scene list. The per-scene sections below are
> still useful as an **asset/task reference**, but map them onto the 4 acts (Akt 1 setup, Akt 2 shop+
> checkout, Akt 3 fighter+generate, Akt 4 live+finale+reel).

## ✅ Built — click-dummy v1 (deterministic deck)

The click-through app that backs the play is live in the repo (`npm run dev`, builds clean):

- ✅ **Deck shell** (`components/deck/Deck.tsx`): single `currentScene` state, persistent bottom
  "Weiter →" control + "Zurück", keyboard (→/Space/←), progress dots, theatrical curtain wipe on every
  transition. Deterministic, linear, never auto-advances.
- ✅ **Motion kit** (`app/globals.css` + `components/deck/primitives.tsx`): `GagButton` (huge, funny line
  on the button, hover-wobble; variants primary/teal/banner/pay/shy), one-shot `Confetti`, persistent
  `MoneyRain`, `SlotCounter` (slot-machine count-up), `FakeProgress` (e.g. „KI liest deine Gedanken… %").
- ✅ **9 scenes** (`components/deck/scenes.tsx`) covering all 4 acts: Titel, Autopilot-Schalter, Themen-
  shop, Checkout (Niere/Erstgeborenes + Strand-Ticket-Confirm), Pick-your-fighter, „Take My Job Away"-
  Generierung, Slot-Machine-Views, Finale (Renten-Banner + „vielleicht nur Urlaub" + Geldregen),
  Highlight-Reel-Abspann.

**Still open on the build side:** swap the two `[Video: …]` placeholder blocks (Akt 3 avatar video, Akt 4
highlight reel) for real clips; likeness sign-off for the fighter avatars; optional sound effects; final
copy polish. Asset needs per beat are listed below.

## Scene 2 — Shop → configure → checkout → book Referent

**Build:**
- ❌ Topic shop screen (reference `prebuilt-references/pharma-landing-page.html`) with a click-through to
  the cost configurator step.
- ❌ Checkout screen: fake Stripe/PayPal-styled payment form (no real branding/logos).
  - ❌ Joke-branded company credit card component showing a remaining budget/limit + 2–3 absurd fake
    expense line items.
  - ❌ Two joke payment-method buttons: **"Pay with your Kidneys"** / **"Pay with your Firstborn"**
    (decorative — clicking either just proceeds, no real branching).
  - ❌ Doubled confirm button: `Projekt starten` + bonus sibling `Projekt starten und One-Way-Ticket an
    den Strand buchen` (confetti/animation on click per the humor & motion rule).
- ❌ Referent line-up beat: this is staged **live by actors**, not built in the app — no engineering task
  here beyond a clean transition point in the scene sequence for the cast to step in.

**Assets needed:**
- Fake payment "logos"/icons for the two joke payment buttons (simple icon or emoji-based is fine —
  no real Stripe/PayPal marks).
- Fake company card art (a stylized card graphic, joke-branded, e.g. "AstraZeneca" placeholder card).
- Any missing landing-page assets per [`PREBUILT-ASSETS.md`](PREBUILT-ASSETS.md#1-pharma-landing-page--the-shop--topic-browser)
  (`logo.svg`, `bg-hero.svg`, `orb1–4.svg`).

## Scene 3 — Pre-Kick-Off briefing → automatic requirements definition

**Build:**
- ❌ Briefing form: 2–3 real fields (focus area, preferred speaker) + rest greyed-out/symbolic, per demo
  philosophy. Reference the real form in `dx-agents/apps/handover` (`survey.html`).
- ❌ Doubled submit button: `Briefing absenden` + bonus sibling `Briefing absenden und Autoantwort
  aktivieren bis Q4`.
- ❌ Post-submit processing animation: a progress bar labeled **"KI liest Ihre Gedanken... 87 %"**
  (fake progress, fixed duration, no real backend call) standing in for "automatic project
  steps/requirements definition."

**Assets needed:**
- None beyond existing shadcn components; progress bar can be a themed `Progress`/custom bar.

## Scene 4 — Referent notified, uploads old deck

**Build:**
- ❌ Notification toast component (visible on-screen, not just narrated) triggering the Referent scene.
- ❌ "Referent eating pizza" establishing visual — a still image/illustration or a short looping clip
  behind/around the notification moment.
- ❌ Simple slide builder shell (see [`PREBUILT-ASSETS.md`](PREBUILT-ASSETS.md#4-simple-slide-builder--referent-builds-the-presentation-to-build-ours)):
  file upload control that echoes back a fixed filename **`Vortrag_FINAL_FINAL_v3_wirklich_final.ppt`**
  regardless of what's actually selected (or pre-fill the picker with that name — no real file needs
  parsing).
- ❌ "AI cleans up the deck" transformation beat: before/after visual (grey blob deck → clean templated
  slides), animated.

**Assets needed:**
- A **pizza image/illustration** (Referent mid-bite) for the notification beat.
- A deliberately ugly placeholder "old deck" thumbnail/mockup (few slides, dated look) for the
  before/after transformation.
- ~8 slide template layouts per [`docs/PREBUILT-ASSETS.md`](PREBUILT-ASSETS.md) template-strategy note
  (can be simplified/mocked for the demo, don't need all 8 real).

## Scene 5 — Avatar select ("pick your fighter") → script → video generation

**Build:**
- ❌ **Street Fighter–style character-select screen**: portrait tiles in a versus-grid layout, hover/
  select highlight + sound cue, "VS"-style framing. Three selectable fighters.
- ❌ Script-generation step: auto-filled script preview + two stacked buttons —
  `Take My Job Away` (primary) and `Take My Job Away (aber Gehalt behalten)` (secondary, smaller).
- ❌ "Create Video" loading state + a preview player showing the avatar "speaking" (can be a static
  image + captioned text bubble if a real avatar video isn't ready in time).
- ❌ Video topic locked as **"Effect of Pizza on the Human Body"** — needs to show up as on-screen text
  (topic label / script preview) somewhere in this scene.

**Assets needed — the big one for this scene:**
- **Three character-select portraits**, Street-Fighter-poster style, for **Sehouli, Prelog, and Paula
  Cramer** (stylized illustration or treated photo — need source photos/likeness-approval from each
  before treating them as "fighters"; flag this as a to-confirm item, not just an asset-fetch task).
- A select-screen sound effect (short "confirm"/"whoosh") and background art/frame for the versus grid.
- Placeholder avatar-speaking preview asset (image or short clip) for the pizza-topic video, since the
  real AI-avatar pipeline output may not be ready to demo live.

## Scenes 6–7 — Submit → publish → Pharma notified

**Build:**
- ❌ Submit transition (existing curtain/black-screen pattern) back to Pharma.
- ❌ Published-video platform page.
- ❌ **View-counter slot-machine animation**: rolling/ticking digits that decelerate and land on the
  final count (e.g. a small custom hook/component — CSS transitions or a lightweight JS interval are
  enough, no library needed).

**Assets needed:**
- None beyond a numeric tick-up animation; optional short "cha-ching"/mechanical tick sound effect if
  audio is in scope.

## Scene 8 — One month later, the numbers payoff *(optional)*

**Build:**
- ❌ Dashboard numbers view showing an absurdly large view count (e.g. "10,000,000 views").
- ❌ Blinking/penetrant banner-ad-style button: **"Shift Whole Business Unit to Doctorflix and Retire
  Me"** (obvious ad-banner styling — bright color, blink/pulse animation, slightly obnoxious on purpose).
- ❌ Smaller, shy secondary button right next to it: **"Vielleicht nur Urlaub"** (deliberately
  understated/small in contrast).

**Assets needed:**
- None beyond CSS blink/pulse keyframes for the banner button; optionally a garish "ad banner" texture/
  border to sell the parody.

## Scene 9 — DX-employee highlight reel

**Build:**
- ❌ This scene is a **pre-cut highlight-reel video**, not a live-built screen — production/editing task,
  not app engineering. App just needs to play it full-screen at the right point in the scene sequence.

**Assets needed:**
- The edited highlight-reel video itself (Slack notification montage, beer, sales gong, "money money
  money" spam) — owned by the pitch/story track, not the build track.

## Cross-cutting engineering tasks

- ❌ Scene-sequence shell: ordered array of scene components + `currentScene` state + persistent
  bottom-right "Next" control (+ keyboard shortcut) — the foundation everything above plugs into.
- ❌ Reusable **transition component** (curtain-drop / black-screen / dimmed-lighting) used between every
  actor↔screen handoff and persona switch.
- ❌ Reusable **"bonus button" pattern** (primary action + over-the-top sibling) so each joke button
  above doesn't get hand-rolled per screen.
- ❌ Confetti/celebration micro-animation utility, reused across completion moments (checkout, briefing
  submit, video published).

## Open questions

- Likeness/approval check for using Sehouli, Prelog, and Paula Cramer as named "pick your fighter"
  avatars — confirm with them (or get sign-off) before finalizing the character-select art.
- Whether Scene 5's avatar-speaking preview uses a real AI-avatar output or a mocked static asset depends
  on how far Moritz's pipeline integration gets by Wednesday — track alongside the password-recovery
  item in [Notion storyboard](https://app.notion.com/p/doctorflix/FlixGames-Hackathon-Pitch-Storyboard-EN-3a525482863c818c9dc3d49cf9d062a5) / meeting notes.
