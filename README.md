# FlixGames — Hackathon Project

**Team Captain:** Daniel Leon Glauert 🏴‍☠️
**Team:** Franz von Esebeck, Emma Sporn, David Cisar, Daniel Leon Glauert, Carolina Fromm
(see [Team & roles](#team--roles) for the proposed build/pitch split)

A hackathon prototype for DoctorFlix: an **end-to-end, mostly-automated pharma sales pipeline** — from a
pharma lead browsing a topic shop, to a paid offer, to a referent building content live, to a published
video. Minimal human input, maximum "wow, that's the win."

> This repo is the **Next.js + shadcn/ui foundation** for the prototype, plus the project context
> (what it is, how it should look, what's already built) — so that on Wednesday everyone (and their AI
> co-pilots) starts aligned. See [Status](#status).

## Stack & running it

**Next.js 16 (App Router) · React 19 · shadcn/ui · Tailwind v4.** shadcn is the basis for all UI, themed
to the Doctorflix CI (see [`docs/BRANDING.md`](docs/BRANDING.md)).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

- `app/` — routes (App Router). `components/ui/` — shadcn components (we own & extend them).
- Add a component: `npx shadcn@latest add <name>` — it inherits the Doctorflix theme automatically.
- Theme lives in [`app/globals.css`](app/globals.css); Be Vietnam Pro is wired in [`app/layout.tsx`](app/layout.tsx).

## The idea

> Sponsor picks a topic → books via a faked, joke-branded checkout → project steps/requirements get
> defined automatically → …(more steps land as meeting-transcript context comes in)… → Referent builds
> content live → lands on the platform.

A **full-circle project process**, mostly self-running and only human-supervised — real human input is
needed at just a handful of steps. Told by a small cast played by the team in costume: a **Narrator**, a
dismissive **Pharma Boss** (bookend character), the **Pharma/Marketing Assistant** (self-serve, ~€10k
budget), the **Referent(s)** (builds content live), and the **DX employee** (drinking a beer while
automated Slack updates roll in). Humor is a deliberate design tool, not garnish: over-the-top "bonus"
buttons (e.g. `Projekt starten und One-Way-Ticket an den Strand buchen`) and playful animations underline
*how easy the process has become* at every step — see [`CLAUDE.md`](CLAUDE.md) for the full brief.

**The full scene-by-scene demo script now lives in Notion — that's the single source of truth:**
[FlixGames Hackathon — Pitch Storyboard](https://app.notion.com/p/doctorflix/FlixGames-Hackathon-Pitch-Storyboard-EN-3a525482863c818c9dc3d49cf9d062a5).
Build to it, not the other way around. [`docs/STORYBOARD.md`](docs/STORYBOARD.md) is now just a pointer
to that page — kept for git history, not to be edited for narrative changes anymore. **Hard limit: a
7-minute pitch** — build breadth and timing accordingly. Single most important
build rule: **oversimplify every screen** — 2–3 real clickable fields, everything else greyed-out/
symbolic, no full-depth forms. Build-architecture decision: this is a **deterministic scene-by-scene
presentation** (one fixed path, a persistent "Next" control), not a free-roam multi-page app. Engineering
tasks and required assets per scene are tracked in [`docs/TECH-ROADMAP.md`](docs/TECH-ROADMAP.md).

Full context from all planning meetings: [`docs/meeting-notes/`](docs/meeting-notes/).

## Repo map

| Path | What it's for |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | **Start here.** Co-pilot brief — what we're building, the stack, constraints, demo philosophy, and team roles. |
| [FlixGames Storyboard (Notion)](https://app.notion.com/p/doctorflix/FlixGames-Hackathon-Pitch-Storyboard-EN-3a525482863c818c9dc3d49cf9d062a5) | **SSOT for the scene-by-scene pitch script** — build to this. |
| [`docs/STORYBOARD.md`](docs/STORYBOARD.md) | Pointer to the Notion storyboard — history only, don't edit for narrative changes. |
| [`docs/TECH-ROADMAP.md`](docs/TECH-ROADMAP.md) | Engineering build tasks + required assets, per storyboard scene. |
| [`CHANGELOG.md`](CHANGELOG.md) | What's changed, release by release. |
| [`app/`](app/) | Next.js App Router routes. Theme in [`app/globals.css`](app/globals.css), fonts in [`app/layout.tsx`](app/layout.tsx). |
| [`components/ui/`](components/ui/) | shadcn/ui components (we own the source), themed to Doctorflix. |
| [`docs/PREBUILT-ASSETS.md`](docs/PREBUILT-ASSETS.md) | Inventory of what already exists (landing page, cost configurator, briefing form) so we don't rebuild it. |
| [`docs/BRANDING.md`](docs/BRANDING.md) | Doctorflix CI — how every screen should look + how the shadcn theme maps to it. |
| [`docs/design-tokens.css`](docs/design-tokens.css) | Raw-hex `:root` reference (the app itself uses the shadcn theme in `globals.css`). |
| [`docs/prebuilt-references/`](docs/prebuilt-references/) | Real, on-brand reference files (the pharma landing page). |
| [`docs/meeting-notes/`](docs/meeting-notes/) | Notes from the kickoff (07-14), tactics call (07-20), and the two 07-22 calls (onboarding/storyboard, storyboard feedback). |

## What already exists (don't rebuild it)

The pipeline isn't starting from zero — see [`docs/PREBUILT-ASSETS.md`](docs/PREBUILT-ASSETS.md):

- **Pharma landing page / shop** — built, on-brand (reference saved in this repo).
- **Cost configurator** — built & deployed on Vercel; `dx-agents` repo at `apps/cost-configurator`
  (referenced, not forked). Live client-side pricing + Slack triggers.
- **Pre-Kick-Off Briefing form** — built & deployed; `dx-agents` repo at `apps/handover` (`survey.html`).
  The real post-booking pharma briefing.
- **Simple slide builder** (referent step) — **we build our own minimal one** here; we intentionally
  don't show Moritz's full kasuistik builder in the pitch.

The hackathon job is mostly **stitching these into one storyboard** and faking the seams (pay confirm,
slide builder, video-published page, DX Slack feed). Per screen we decide Wednesday whether to
embed/iframe the existing app or rebuild it as a shadcn page.

## How we build (constraints)

- **Oversimplify every screen** — 2–3 real, clickable fields/actions; everything else is a grey, inert
  placeholder. No full-depth forms, even where a real one exists.
- **shadcn/ui is the UI basis** — reach for shadcn primitives before hand-rolling markup; build with the
  themed utilities, don't hardcode hex. See [`docs/BRANDING.md`](docs/BRANDING.md).
- **No real backend / DB / payments for the demo** — state can be faked; checkout is simulated.
- **Build to the Notion pitch storyboard** (SSOT), not the other way around — final scope gets locked
  Wednesday morning, but the scene order and demo philosophy are set. Track engineering tasks/assets in
  [`docs/TECH-ROADMAP.md`](docs/TECH-ROADMAP.md).

## Team & roles

Proposed split from the 2026-07-22 call (confirm/adjust once everyone's in the room Wednesday):

- **Build track — Franz + Daniel:** this repo — stitching the pre-built assets into the storyboard,
  faking the seams (checkout, briefing hookup, slide builder, DX feed).
- **Pitch/story track — Emma, David, Carolina:** the narrative and "theater-play" blocking, the
  DX-employee gag montage/edit (gong, Slack money-spam, beer cutscenes), virtual-background/avatar
  polish for the Referent recording simulation, and the ROI numbers + presentation format for the pitch.

Both tracks build against the **Notion storyboard** as the shared source of truth for narrative; the
build track additionally tracks engineering tasks and required assets in
[`docs/TECH-ROADMAP.md`](docs/TECH-ROADMAP.md).

## Working together during the hackathon

- Everyone pulls/pushes from this one shared repo — no personal forks, one history.
- **No branches — work directly on `main`, commit and push immediately after every change.** No
  feature/topic branches, no PRs, no unpushed work sitting around. See "No branches" in
  [`CLAUDE.md`](CLAUDE.md) — this is enforced by a git hook (`npm install` sets it up automatically), not
  just a suggestion.
- Prefer separate routes/components so two people can work without merge conflicts.
- Pairing with Claude Code? Point it at [`CLAUDE.md`](CLAUDE.md) first — Sonnet is genuinely sufficient
  for this project (agentic/orchestration work included) and much cheaper than Opus; no need to default
  to a bigger model "just in case."
- **Changelog is mandatory, for humans and AI tools alike:** read [`CHANGELOG.md`](CHANGELOG.md)'s
  `[Unreleased]` section before starting, and add an entry there for every change before you stop — see
  "Changelog discipline" in [`CLAUDE.md`](CLAUDE.md) for the exact rules. It's how everyone (and every AI
  co-pilot, regardless of which tool) stays in sync on current status and functionality without a live
  handoff.

## Status

🚧 **Pre-hackathon setup.** The Next.js + shadcn foundation (Doctorflix theme, core components, starter
page) is in place, alongside project context, branding, and the pre-built-asset inventory. The actual
storyboard build starts Wednesday once scope is locked. Expect the docs and structure to evolve.
