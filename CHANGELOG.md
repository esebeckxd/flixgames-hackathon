# Changelog

All notable changes to the FlixGames hackathon prototype are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); this project is a
pre-hackathon prototype, so versions are lightweight and dated.

## [Unreleased]

_Work planned for / during the hackathon (Wednesday onward), per [`docs/STORYBOARD.md`](docs/STORYBOARD.md)'s 10-scene script — build as a deterministic scene sequence (see Build format), not a free-roam app:_

- Scene 1 (optional cold open): dismissive Pharma Boss hand-off.
- Scene 2: topic shop → configure offer → checkout with a checkout budget/company-card gag, **Referent
  booking staged live** (three candidate Referents, Pharma picks one) — checkout fully faked,
  joke-branded, never the real Stripe/PayPal marks.
- Scene 3: Pre-Kick-Off briefing — 2–3 real fields + grey placeholders (oversimplified per demo philosophy).
- Scene 4: simple slide builder (ours, minimal — not Moritz's kasuistik tool); the ugly-archived-deck →
  AI-cleans-it-up Murphy's Law mechanism.
- Scene 5: video generation — "pick your fighter" avatar select (AI Avatar over Live Recording),
  credited to Moritz's avatar pipeline.
- Scenes 6–7: submit → publish → Pharma notified.
- Scene 8 (optional, cut first after the stinger): one-month-later payoff, Pharma Boss claims credit.
- Scene 9 (do not cut): DX-employee highlight-reel montage as the closing ~60 seconds (gong, Slack
  money-spam, beer cutscenes), driven by the configurator's + handover's real Slack triggers where possible.
- Scene 10 (optional stinger, cut first if tight): six-months-later founders-realize-they're-redundant ending.
- "Absurd extra win" bonus buttons + playful completion animations, per screen, per the humor & motion
  direction rule.
- Optional stretch: voice input on the briefing screen.
- Story-track open items: character names, full line-by-line dialogue script, costumes.

### Added (docs)

- **Twelve concrete bonus-button/prop gags locked into `docs/STORYBOARD.md`** (last full mirror before
  the Notion move, below):
  - Scene 2 checkout: **"Pay with your Kidneys"** + **"Pay with your Firstborn"** fake-payment buttons;
    flagship bonus button **"Projekt starten und One-Way-Ticket an den Strand buchen"** on confirm.
  - Scene 3 briefing: bonus button **"Briefing absenden und Autoantwort aktivieren bis Q4"**; fake
    processing-bar label **"KI liest Ihre Gedanken... 87 %"**.
  - Scene 4: Referent introduced **eating pizza** when notified (payoff for Scene 5's topic); upload
    dialog shows the cursed filename **`Vortrag_FINAL_FINAL_v3_wirklich_final.ppt`**.
  - Scene 5: video topic locked as **"Effect of Pizza on the Human Body"**; avatar picker rebuilt as a
    literal **Street Fighter–style "pick your fighter" select screen** with **Sehouli, Prelog, and Paula
    Cramer** as the three fighters (⚠️ needs likeness/approval confirmation — flagged in
    `docs/TECH-ROADMAP.md`); script step gets a second, smaller sibling button **"Take My Job Away (aber
    Gehalt behalten)"** next to the original.
  - Scene 7: platform view-counter **ticks up like a slot machine** instead of a static number.
  - Scene 8: blinking **"Shift Whole Business Unit to Doctorflix and Retire Me"** banner button, plus a
    small, shy second button **"Vielleicht nur Urlaub"** right next to it.
- **`docs/STORYBOARD.md` is now a frozen mirror, not the live doc.** The storyboard's SSOT moved to
  Notion (2026-07-22) — a banner at the top of the file says so and flags the repo docs that still need
  their links swapped to the Notion URL once shared (`CLAUDE.md`, `README.md`, `PREBUILT-ASSETS.md`).
  `CLAUDE.md`/`README.md` pipeline/storyboard references updated to point at Notion as the SSOT, with
  `docs/STORYBOARD.md` explicitly called out as history-only.
- **New `docs/TECH-ROADMAP.md`**: engineering build-task breakdown and required-asset list per storyboard
  scene (checkout, briefing, slide builder, avatar select, publish, payoff), plus cross-cutting tasks
  (scene-sequence shell, transition component, bonus-button pattern, confetti utility) and open questions
  (fighter-avatar likeness approval, real vs. mocked AI-avatar preview). Linked from `CLAUDE.md` and
  `README.md`'s repo map and team-roles sections.

## [0.4.0] — 2026-07-22

Storyboard revised live against the 0.3.0 draft: hard 7-minute pitch timing, a named/costumed cast
(Narrator + Pharma Boss added), a concrete build-format decision (deterministic scene sequence, not a
free-roam app), and several new comedy beats.

### Added

- `docs/meeting-notes/2026-07-22-storyboard-feedback.md` — the review session notes.
- **"Format & timing"** section in `docs/STORYBOARD.md`: 7-minute hard limit, ~10–15s per scene, last
  ~60s reserved for the DX highlight reel, cut-first order for optional beats (stinger, then payoff),
  spoken pitch in English / on-screen UI stays German.
- **"Build format"** section in `docs/STORYBOARD.md` + `CLAUDE.md` (Stack): build as one deterministic,
  linear sequence of full-screen scenes driven by a single `currentScene` state and a persistent
  bottom-right "Next" control — not separate routes the presenter navigates freely.
- **"Cast & characters"** section in `docs/STORYBOARD.md`: adds a **Narrator** and a bookend **Pharma
  Boss/Chef** character (dismissive at the start, claims credit at the end) to the existing Pharma/
  Referent/DX-employee cast; confirms all personas are played by the team in costume. Character names
  and full dialogue are flagged as open items for the story track.
- New comedy beats folded into the scene script: a checkout company-card/budget gag with fake absurd
  expense line items; a concrete "ugly deck dug out of the archive" mechanism for the Murphy's Law beat;
  a "pick your fighter" avatar-select screen for video generation (AI Avatar chosen over Live Recording);
  a staged live Referent-candidate line-up (three teammates, Pharma picks one); a fuller six-month
  stinger script.

### Changed

- `docs/STORYBOARD.md` renumbered into a 10-scene sequence with explicit optional/cut-first flags (the
  one-month payoff and six-month stinger are both optional; the DX highlight reel is the fixed closer).
- `CLAUDE.md`: pipeline summary rewritten to match the 10-scene structure and cast; new "Pitch format &
  timing" section; Stack section now states the deterministic-presentation build decision.
- `README.md`: "The idea" section reflects the expanded cast and the 7-minute/deterministic-build notes.

### Notes

- No Notion connector is authorized in this Claude session, so the "separate planning doc" the team
  floated for line-by-line dialogue lives as a markdown skeleton directly in `docs/STORYBOARD.md` for
  now — move it into Notion if the team still wants a standalone live doc.
- No UI/code changes in this pass — docs-only, ahead of scene-controller implementation.

## [0.3.0] — 2026-07-22

Detailed pitch storyboard, demo philosophy, and proposed team-role split, from the onboarding/storyboard
call — fills in the pipeline steps 3+ left as placeholders in 0.2.0.

### Added

- [`docs/STORYBOARD.md`](docs/STORYBOARD.md) — the scene-by-scene demo script (topic shop → checkout with
  Referent booking → Pre-Kick-Off briefing → Referent notified & builds → video generation (credited to
  Moritz's pipeline) → publish → one-month-later payoff → DX-employee gag montage → optional stinger),
  plus the **demo philosophy**: oversimplify every screen to 2–3 real fields with the rest greyed out,
  voice input as a stretch goal, and a Q&A defense ("autonomy ladder") for the pitch.
- `docs/meeting-notes/2026-07-22-onboarding-storyboard.md` — team GitHub/Claude Code onboarding notes +
  the reasoning behind the storyboard.
- **Team & roles** section in `CLAUDE.md`/`README.md`: proposed build track (Franz, Daniel) vs.
  pitch/story track (Emma, David, Carolina), to confirm Wednesday morning.

### Changed

- `CLAUDE.md`: pipeline steps 3+ (previously placeholders) now spelled out from the fuller storyboard;
  "Humor & motion direction" (0.2.0) and "Demo philosophy" now sit side by side as complementary rules,
  not competing ones.
- `CLAUDE.md`/`README.md` now link `docs/STORYBOARD.md` as the build target.

## [0.2.0] — 2026-07-22

Project reframed as a full-circle, mostly human-*supervised* (not human-*driven*) process; changelog
discipline made mandatory; humor/motion codified as a design tool, not garnish.

### Added

- **Changelog discipline policy** (`CLAUDE.md`, `AGENTS.md`, `README.md`): read `[Unreleased]` before
  starting work, log every change there before stopping — so the repo stays legible across multiple
  people and multiple AI tools working in parallel without a live handoff.
- **"Humor & motion direction"** section in `CLAUDE.md`: codifies the "absurd extra win" button pattern
  (e.g. `Projekt starten und One-Way-Ticket an den Strand buchen`) and requires proposing a fitting joke
  + a small delightful animation at every step, not just where explicitly asked.

### Changed

- **Project concept reframed** in `CLAUDE.md`/`README.md`: full-circle project process, human-supervised
  rather than human-driven — real input needed at only a handful of steps. (Pipeline steps 3+ were left
  as placeholders here pending more transcript context — filled in by 0.3.0.)
- **Hard constraint tightened**: fake checkout must never use the real Stripe/PayPal logos/trademarks —
  invent joke-branded fake payment options instead.
- **`CLAUDE.md` hard constraints**: added an explicit "nothing needs to be deeply functional" rule —
  every screen only needs the clicks/animation/reactivity that sells its specific pitch-story beat, not
  real logic, validation, or state handling. Depth of implementation is explicitly a non-goal anywhere
  in this app.
- **New "Interaction model" section in `CLAUDE.md`** defines the app's actual shape: **one deterministic,
  linear click-through module** (no real routing/state) containing persona-grouped mockup screens
  (Sponsor/Pharma, Referent, DX employee). Persona switches must play a **full-screen transition
  animation** (curtain close/reopen, or a GTA-style character-switch swoop) rather than a plain cut.
  The flow must **not auto-advance on a timer** — build explicit moderator "advance" placeholders since a
  live human narrates in front of the screen during the pitch. Storyboard beats needing a video that
  doesn't exist yet get a clearly labeled placeholder block, not real playback logic.

### Notes

- No UI/code changes in this pass — docs-only update to realign the shared context ahead of
  implementing the humor/animation pattern and the checkout step.

## [0.1.0] — 2026-07-22

Pre-hackathon foundation: project context + a themed Next.js/shadcn shell to build the storyboard on.

### Added

- **Next.js 16 (App Router) + React 19 + shadcn/ui + Tailwind v4** app as the UI foundation.
- **Doctorflix CI mapped onto the shadcn theme** (`app/globals.css`): MedTeal `#159F95` brand accent,
  navy `#1A2133` primary CTA, `#F3F6FB` page background, teal focus ring, and a dark mode on the
  `#1A2133` dark background.
- **Be Vietnam Pro** as the house font, wired via `next/font` in `app/layout.tsx`.
- **Pill-shaped buttons** plus a custom teal `accent` button variant (`components/ui/button.tsx`).
- Core shadcn components: button, card, input, label, textarea, select, badge, separator, tabs, dialog.
- Starter home page (`app/page.tsx`) rendering the 5-step pipeline in the Doctorflix theme.
- **Docs:**
  - `CLAUDE.md` — co-pilot brief (goal, personas, stack, constraints, prebuilt-asset inventory, CI rules).
  - `docs/BRANDING.md` + `docs/design-tokens.css` — Doctorflix CI and how the shadcn theme maps to it.
  - `docs/PREBUILT-ASSETS.md` — inventory of existing pieces: pharma landing page, cost configurator
    (`dx-agents/apps/cost-configurator`), Pre-Kick-Off Briefing form (`dx-agents/apps/handover`), and
    the simple slide builder to build.
  - `docs/meeting-notes/` — kickoff (2026-07-14) and tactics call (2026-07-20).
  - `docs/prebuilt-references/pharma-landing-page.html` — real on-brand landing page as a reference.
  - `README.md` — project overview, stack, and repo map.

### Notes

- The pre-built assets (landing page, cost configurator, briefing form) are **referenced, not forked** —
  the cost configurator and briefing form remain separate deployed apps in the `dx-agents` repo.
- The Brand Guide PDF (~120 MB) is intentionally **not committed**; its rules are distilled into
  `docs/BRANDING.md` + `docs/design-tokens.css`.
- The cost configurator's CSS predates Brand Guide v1.0 (uses the retired `#2F508B`/`#EE9214`) — left
  untouched; new FlixGames screens use the v1.0 token set.

## [0.0.0] — 2026-07-22

- Initial commit (empty repository with placeholder README).

[Unreleased]: https://github.com/esebeckxd/flixgames-hackathon/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/esebeckxd/flixgames-hackathon/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/esebeckxd/flixgames-hackathon/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/esebeckxd/flixgames-hackathon/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/esebeckxd/flixgames-hackathon/releases/tag/v0.1.0
