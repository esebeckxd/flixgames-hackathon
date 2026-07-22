# Changelog

All notable changes to the FlixGames hackathon prototype are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); this project is a
pre-hackathon prototype, so versions are lightweight and dated.

## [Unreleased]

_Work planned for / during the hackathon (Wednesday onward), per [`docs/STORYBOARD.md`](docs/STORYBOARD.md):_

- Topic shop → configure offer → checkout, with **Referent booking folded into checkout** (fully faked,
  joke-branded — never the real Stripe/PayPal marks).
- Pre-Kick-Off briefing screen: 2–3 real fields + grey placeholders (oversimplified per demo philosophy).
- Simple slide builder for the referent step (ours, minimal — not Moritz's kasuistik tool); optional
  "ugly input → AI cleans it up" Murphy's Law beat.
- Video generation step, credited to Moritz's avatar pipeline; "video published" platform page.
- One-month-later reporting beat for Pharma.
- DX-employee gag montage (gong, Slack money-spam, beer cutscenes), driven by the configurator's +
  handover's real Slack triggers where possible.
- "Absurd extra win" bonus buttons + playful completion animations, per screen, per the humor & motion
  direction rule.
- Optional stretch: voice input on the briefing screen; six-months-later stinger ending.

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

[Unreleased]: https://github.com/esebeckxd/flixgames-hackathon/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/esebeckxd/flixgames-hackathon/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/esebeckxd/flixgames-hackathon/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/esebeckxd/flixgames-hackathon/releases/tag/v0.1.0
