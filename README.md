# FlixGames — Hackathon Project

**Team Captain:** Daniel Leon Glauert 🏴‍☠️
**Team:** Franz von Esebeck, Emma Sporn, David Cisar, Daniel Leon Glauert, Carolina Fromm

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

> Pharma browses topic shop → configures offer → pays (PayPal, faked for the demo) → fills briefing
> form → Referent builds content live → lands on the platform.

Told from three personas: **Pharma** (self-serve SME marketing assistant), **Referent** (builds content
live), and the **DX employee** (drinking a beer while automated Slack updates roll in). Humor angle:
Murphy's Law — whatever gets fumbled, the AI fixes gracefully.

Full context from both planning meetings: [`docs/meeting-notes/`](docs/meeting-notes/).

## Repo map

| Path | What it's for |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | **Start here.** Co-pilot brief — what we're building, the stack, constraints, and how to make visual/technical choices. |
| [`app/`](app/) | Next.js App Router routes. Theme in [`app/globals.css`](app/globals.css), fonts in [`app/layout.tsx`](app/layout.tsx). |
| [`components/ui/`](components/ui/) | shadcn/ui components (we own the source), themed to Doctorflix. |
| [`docs/PREBUILT-ASSETS.md`](docs/PREBUILT-ASSETS.md) | Inventory of what already exists (landing page, cost configurator, briefing form) so we don't rebuild it. |
| [`docs/BRANDING.md`](docs/BRANDING.md) | Doctorflix CI — how every screen should look + how the shadcn theme maps to it. |
| [`docs/design-tokens.css`](docs/design-tokens.css) | Raw-hex `:root` reference (the app itself uses the shadcn theme in `globals.css`). |
| [`docs/prebuilt-references/`](docs/prebuilt-references/) | Real, on-brand reference files (the pharma landing page). |
| [`docs/meeting-notes/`](docs/meeting-notes/) | Notes from the kickoff (2026-07-14) and tactics call (2026-07-20). |

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

- **shadcn/ui is the UI basis** — reach for shadcn primitives before hand-rolling markup; build with the
  themed utilities, don't hardcode hex. See [`docs/BRANDING.md`](docs/BRANDING.md).
- **No real backend / DB / payments for the demo** — state can be faked; PayPal checkout is simulated.
- **Build to the pitch storyboard**, not the other way around — decide Wednesday morning what's shown in
  full vs. glossed over, then build only that.

## Working together during the hackathon

- Everyone pulls/pushes from this one shared repo — no personal forks, one history.
- Prefer separate routes/components so two people can work without merge conflicts.
- Pairing with Claude Code? Point it at [`CLAUDE.md`](CLAUDE.md) first.

## Status

🚧 **Pre-hackathon setup.** The Next.js + shadcn foundation (Doctorflix theme, core components, starter
page) is in place, alongside project context, branding, and the pre-built-asset inventory. The actual
storyboard build starts Wednesday once scope is locked. Expect the docs and structure to evolve.
