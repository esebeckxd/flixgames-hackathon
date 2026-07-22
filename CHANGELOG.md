# Changelog

All notable changes to the FlixGames hackathon prototype are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); this project is a
pre-hackathon prototype, so versions are lightweight and dated.

## [Unreleased]

### Added

- **Changelog discipline policy** (`CLAUDE.md`, `AGENTS.md`, `README.md`): explicit instructions for all
  human and AI contributors to read `[Unreleased]` before starting work and log every change here
  (what changed, current functional status, what's faked/stubbed) before stopping — so the repo stays
  legible across multiple people and multiple AI tools working in parallel without a live handoff.

_Work planned for / during the hackathon (Wednesday onward):_

- Topic-click handoff from the pharma landing page into the cost configurator.
- Faked PayPal checkout / pay-confirmation on top of the cost configurator.
- Wire the Pre-Kick-Off Briefing form (`dx-agents/apps/handover`) into the flow after checkout.
- Simple slide builder for the referent step (ours, minimal — not Moritz's kasuistik tool).
- "Video published" platform page.
- DX-employee Slack-style feed (driven by the configurator's + handover's real Slack triggers).
- Pitch storyboard tying the three personas (Pharma, Referent, DX employee) together.

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

[Unreleased]: https://github.com/esebeckxd/flixgames-hackathon/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/esebeckxd/flixgames-hackathon/releases/tag/v0.1.0
