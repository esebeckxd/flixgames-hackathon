# Technical roadmap — build tasks & assets

Engineering-facing companion to the storyboard: **what to actually build, per scene, and what raw
assets someone needs to go find/create for it.** The storyboard (narrative, cast, timing, jokes) lives
in **Notion as the SSOT** —
[FlixGames Hackathon — Pitch Storyboard](https://app.notion.com/p/doctorflix/FlixGames-Hackathon-Pitch-Storyboard-EN-3a525482863c818c9dc3d49cf9d062a5)
— this file stays in the repo and tracks the engineering side only. Keep this in sync by hand whenever
the Notion storyboard changes; it is not itself the source of truth for narrative content.

Status legend: ❌ not started · 🟡 in progress · ✅ done.

**Live MVP deployed:** https://flixgames-hackathon.vercel.app — click through with the bottom-right
"Weiter" control (or → / Space / ← keys). See `CHANGELOG.md` [0.5.0] for the full list of what's real vs.
placeholder.

**4-act framing (blend):** the 10 scenes are grouped into the play's 4 acts (`lib/scenes.ts` `act` field
+ `ACT_TITLE`); a big plakativ „AKT n" curtain drops at each act boundary. Akt 1 (`ColdOpen`) is the
plakativ billboard opener. A shared plakativ kit lives in `components/scene/plakativ.tsx` (`GagButton`,
`Confetti`, `MoneyRain`, `SlotCounter`, `FakeProgress`) + `app/globals.css`.

**Remaining plakativ pass (next):** the symbolic scenes still using the realistic/subtle styling —
`VideoGen`, `Publish`, `Payoff`, `DxReel`, `Stinger` — can be amped with the plakativ kit (bigger buttons/
type, confetti/money/slot animations) to match the Akt-1 opener. The three high-fidelity replicas
(`Shop`/`Checkout`/`Briefing`) stay realistic on purpose — that's the "best of both" contrast.

## Scene 2 — Shop → configure → checkout → book Referent

**Build:**
- ✅ Topic shop screen (`components/scene/scenes/Shop.tsx`, replica of
  `prebuilt-references/pharma-landing-page.html`) with a click-through to the cost configurator step.
- 🟡 Checkout screen (`Checkout.tsx`, replica of `dx-agents/apps/cost-configurator`): fake payment form,
  package cards, live-total summary — done. No real Stripe/PayPal branding used.
  - ❌ Joke-branded company credit card component showing a remaining budget/limit + 2–3 absurd fake
    expense line items — not built yet.
  - ✅ Two joke payment-method buttons: **"Pay with your Kidneys"** / **"Pay with your Firstborn"**
    (decorative — clicking either just proceeds, no real branching).
  - ✅ Doubled confirm button: `Projekt starten` + bonus sibling `Projekt starten und One-Way-Ticket an
    den Strand buchen`. No confetti/animation on click yet (see cross-cutting confetti utility below).
- ✅ Referent line-up beat: confirmed **not** built in-app, per this doc's own guidance — checkout just
  shows a clean "Checkout abgeschlossen" completion state as the transition point for the cast.

**Assets needed:**
- Fake payment "logos"/icons for the two joke payment buttons (simple icon or emoji-based is fine —
  no real Stripe/PayPal marks).
- Fake company card art (a stylized card graphic, joke-branded, e.g. "AstraZeneca" placeholder card).
- Any missing landing-page assets per [`PREBUILT-ASSETS.md`](PREBUILT-ASSETS.md#1-pharma-landing-page--the-shop--topic-browser)
  (`logo.svg`, `bg-hero.svg`, `orb1–4.svg`).

## Scene 3 — Pre-Kick-Off briefing → automatic requirements definition

**Build:**
- ✅ Briefing form (`Briefing.tsx`, replica of `dx-agents/apps/handover/survey.html`): 2 real fields
  (focus chips + notes) + 3 greyed-out/symbolic sections, per demo philosophy.
- ✅ Doubled submit button: `An Doctorflix übermitteln` + bonus sibling `Briefing absenden und
  Autoantwort aktivieren bis Q4`.
- ✅ Post-submit processing animation: a progress bar labeled **"KI liest Ihre Gedanken… 87 %"** (fake
  progress, `setInterval`-driven, no real backend call).

**Assets needed:**
- None beyond existing shadcn components; progress bar can be a themed `Progress`/custom bar.

## Scene 4 — Referent notified, uploads old deck

**Build:**
- ✅ Notification banner component (visible on-screen, not just narrated) triggering the Referent scene
  (`SlideBuilder.tsx`) — a static inline banner rather than a floating toast, close enough for the beat.
- 🟡 "Referent eating pizza" establishing visual — currently just a 🍕 emoji in the notification text, no
  real image/illustration yet.
- ✅ Simple slide builder shell: upload control echoes back the fixed filename
  **`Vortrag_FINAL_FINAL_v3_wirklich_final.ppt`** regardless of what's selected.
- ✅ "AI cleans up the deck" transformation beat: before/after visual (upload placeholder → 3 clean
  slide tiles + 3 greyed-out ones), click-triggered, no animation library.

**Assets needed:**
- A **pizza image/illustration** (Referent mid-bite) for the notification beat.
- A deliberately ugly placeholder "old deck" thumbnail/mockup (few slides, dated look) for the
  before/after transformation.
- ~8 slide template layouts per [`docs/PREBUILT-ASSETS.md`](PREBUILT-ASSETS.md) template-strategy note
  (can be simplified/mocked for the demo, don't need all 8 real).

## Scene 5 — Avatar select ("pick your fighter") → script → video generation

**Build:**
- 🟡 **Street Fighter–style character-select screen**: VS-framed grid with hover/select highlight is
  built (`VideoGen.tsx`); tiles are initial-circle placeholders (Sehouli/Prelog/Paula Cramer by name),
  not portrait art, and there's no select-confirm sound cue yet — both blocked on/pending real assets.
- 🟡 Two stacked buttons `Take My Job Away` / `Take My Job Away (aber Gehalt behalten)` are built; no
  separate auto-filled script preview text before them yet.
- ✅ "Create Video" loading state + a preview via the reusable `VideoPlaceholder` (labeled placeholder,
  not a real avatar video).
- ✅ Video topic locked as **"Effect of Pizza on the Human Body"** — shown as on-screen text in the scene.

**Assets needed — the big one for this scene:**
- **Three character-select portraits**, Street-Fighter-poster style, for **Sehouli, Prelog, and Paula
  Cramer** (stylized illustration or treated photo — need source photos/likeness-approval from each
  before treating them as "fighters"; flag this as a to-confirm item, not just an asset-fetch task).
- A select-screen sound effect (short "confirm"/"whoosh") and background art/frame for the versus grid.
- Placeholder avatar-speaking preview asset (image or short clip) for the pizza-topic video, since the
  real AI-avatar pipeline output may not be ready to demo live.

## Scenes 6–7 — Submit → publish → Pharma notified

**Build:**
- ✅ Submit → publish flow (`Publish.tsx`), combined into one scene (both beats are quick hand-offs).
- 🟡 Published-video "platform page" is a simple confirmation view, not a dashboard-style listing page —
  covers the beat, could be built out further.
- ✅ **View-counter slot-machine animation**: `setInterval`-driven ease-out digit tick-up, no library.

**Assets needed:**
- None beyond a numeric tick-up animation; optional short "cha-ching"/mechanical tick sound effect if
  audio is in scope.

## Scene 8 — One month later, the numbers payoff *(optional)*

**Build:**
- ✅ Dashboard numbers view (`Payoff.tsx`) showing an absurdly large view count ("10.000.000").
- ✅ Blinking/penetrant banner-ad-style button: **"Shift Whole Business Unit to Doctorflix and Retire
  Me"** (bright yellow, `animate-pulse`, deliberately obnoxious ad-banner framing).
- ✅ Smaller, shy secondary button right next to it: **"Vielleicht nur Urlaub"**.

**Assets needed:**
- None beyond CSS blink/pulse keyframes for the banner button; optionally a garish "ad banner" texture/
  border to sell the parody.

## Scene 9 — DX-employee highlight reel

**Build:**
- 🟡 This scene is a **pre-cut highlight-reel video**, not a live-built screen — production/editing task,
  not app engineering. App-side (`DxReel.tsx`) has an animated Slack money-spam feed + a labeled
  `VideoPlaceholder` standing in for the real edit; swap the placeholder for a real `<video>` once the
  edit exists.

**Assets needed:**
- The edited highlight-reel video itself (Slack notification montage, beer, sales gong, "money money
  money" spam) — owned by the pitch/story track, not the build track.

**Related, separate:** `/money-boy` (`components/money-boy/`) is a **standalone** full-screen Slack-clone
animation — not part of the deck/scene sequence — that loops "Money Boy" deal-closed messages forever
with escalating numbers. It's a candidate **live second-screen/background-monitor feed** for this beat
(real-time and endless, vs. `DxReel.tsx`'s baked-in mini feed) — pick one or run both if there's a second
screen available; they're not meant to be merged.

## Cross-cutting engineering tasks

- ✅ Scene-sequence shell (`SceneController.tsx`, `lib/scenes.ts`): ordered array of scene components +
  `currentScene` state + persistent bottom-right "Next" control + arrow-key shortcut.
- ✅ Reusable **transition component** (`PersonaTransition.tsx`): curtain-wipe, fires only on persona
  switch. GTA-style swoop alternate not built — curtain covers the requirement for now.
- ❌ Reusable **"bonus button" pattern** — still hand-rolled per screen (Checkout, Briefing, Video Gen
  each duplicate the primary+sibling markup). Works for the MVP; worth extracting if more screens need it.
- ❌ Confetti/celebration micro-animation utility — not built yet; completion moments currently use
  simple state-swap reveals, no confetti.

## Open questions

- Likeness/approval check for using Sehouli, Prelog, and Paula Cramer as named "pick your fighter"
  avatars — confirm with them (or get sign-off) before finalizing the character-select art.
- Whether Scene 5's avatar-speaking preview uses a real AI-avatar output or a mocked static asset depends
  on how far Moritz's pipeline integration gets by Wednesday — track alongside the password-recovery
  item in [Notion storyboard](https://app.notion.com/p/doctorflix/FlixGames-Hackathon-Pitch-Storyboard-EN-3a525482863c818c9dc3d49cf9d062a5) / meeting notes.
