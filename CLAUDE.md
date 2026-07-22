# Co-pilot brief — FlixGames Hackathon

Read this first. It tells you what the project is, how to make visual choices, and what already exists
so you don't rebuild it. Deeper detail is linked; don't start building pages from this file alone.

## What we're building

A demo of an **end-to-end, mostly-automated pharma sales pipeline** for a two-day internal DoctorFlix
hackathon (FlixGames). Not a shipping product — a **click-dummy built to sell a pitch**. Optimize for
"looks convincing and tells the story," not architectural correctness.

**The flow:** Pharma browses a topic shop → configures an offer → pays (PayPal, faked) → fills a
briefing form → Referent builds the presentation live → video is published to the platform. AI agents
nudge stalled steps via email/Slack in the background.

**Told from three personas** in the pitch:
- **Pharma** — young SME marketing assistant, ~mid-20s, ~€10k budget, wants to self-serve fast without Sales.
- **Referent** — receives the briefing, builds content live, submits, video publishes.
- **DX employee** — sits drinking a beer while automated Slack updates roll in (the gag: the team could
  be replaced by this one beer). The cost configurator's real Slack triggers can drive this feed.

Humor angle: Murphy's Law — whatever the referent fumbles, the AI fixes gracefully.

Full context: [`docs/meeting-notes/`](docs/meeting-notes/2026-07-14-kickoff.md) (both planning meetings).

## Stack

**Next.js 16 (App Router) + React 19 + shadcn/ui + Tailwind v4.** shadcn is the basis for all UI —
buttons, inputs, cards, dialogs. Run `npm run dev` (port 3000) / `npm run build`.
- `app/` — routes. `components/ui/` — shadcn components (we own the source; extend freely).
- Add components: `npx shadcn@latest add <name>`. They inherit the Doctorflix theme automatically.
- The three pre-built assets are plain HTML/Vercel apps (below); this FlixGames app is the new Next.js
  shell that stitches the storyboard together. Per screen, decide Wednesday: embed/iframe the existing
  app, or rebuild the screen as a shadcn page.

## Don't rebuild what exists → [`docs/PREBUILT-ASSETS.md`](docs/PREBUILT-ASSETS.md)

- **Pharma landing page / shop** — already built, on-brand. Reference:
  [`docs/prebuilt-references/pharma-landing-page.html`](docs/prebuilt-references/pharma-landing-page.html).
- **Cost configurator** (configure offer + live price + Slack triggers) — built & deployed; `dx-agents`
  repo at `apps/cost-configurator`. Reference it, don't fork it.
- **Pre-Kick-Off Briefing form** (Pharma's post-booking briefing) — built & deployed; `dx-agents` repo
  at `apps/handover` (`survey.html`). Reference it.
- **Simple slide builder** (referent step) — **build our own minimal one** in this app. We deliberately
  do *not* show Moritz's full kasuistik builder in the pitch.

The hackathon work is mostly **stitching these into one storyboard** + faking the seams (pay confirm,
slide builder, video-published page, DX feed).

## Visual choices → [`docs/BRANDING.md`](docs/BRANDING.md)

Every screen must look like Doctorflix. The CI is **already mapped onto the shadcn theme** in
[`app/globals.css`](app/globals.css) — build with theme utilities, don't hardcode hex:
- `bg-background` (page `#F3F6FB`, never pure white) · `bg-card` · `text-foreground` (`#1A2133`) ·
  `text-muted-foreground` · `border-border` · `ring-ring` (teal focus).
- **Main CTA** = `<Button>` default (dark navy `#1A2133`). **Brand accent CTA** = `<Button variant="accent">`
  (MedTeal `#159F95`). Buttons are **pill-shaped** already.
- **Be Vietnam Pro** only (wired in `app/layout.tsx`; use `font-sans`/`font-heading`).
- Text only in black/white/tints (+ MedTeal accent word); never use orb/secondary colors as text.
- [`docs/design-tokens.css`](docs/design-tokens.css) is the raw-hex reference. For AI-assisted design,
  the `/doctorflix-stylebook` skill has the same rules.

## Hard constraints — don't violate

- **shadcn/ui is the UI basis** — reach for shadcn primitives before hand-rolling `div`/`button`. Don't
  fight the theme with ad-hoc hex.
- **No real backend/DB for the demo, no live Notion writes.** Cross-screen state can be local/faked.
- **No real payments** — the PayPal checkout is simulated. Never wire up real payment processing.
- Favor **breadth** (whole flow clickable, shallow) over **depth** (one perfect step, others missing).
  A Western-movie set: ten doors, one opens.

## When in doubt

Ask: "does this help the pitch story land, or is it gold-plating a step nobody lingers on?" Favor the
former. Exact demo scope (built-in-full vs. faked, storyboard order) gets locked Wednesday morning —
keep things flexible until then.

## Changelog discipline — read before you touch code, update before you stop

Several people and several AI tools (Claude Code, Cursor, Codex, ChatGPT, …) work on this repo in
parallel, often without seeing each other's sessions live. **`CHANGELOG.md` is the shared source of
truth for "what exists and works right now."** Treat it as part of the deliverable, not an afterthought.

**Before starting work:** read the `[Unreleased]` section of [`CHANGELOG.md`](CHANGELOG.md) first — it's
the fastest way to learn what the last person/agent left in place, half-built, or intentionally faked.

**Before you stop / hand off / end a session:** add an entry to `[Unreleased]` for every change you made
— feature, fix, refactor, doc, or asset. This applies equally to human contributors and AI agents, no
exceptions, no matter how small the change feels.

Rules for entries:
- **Same commit/PR as the change** — never batch changelog writing for later; it gets forgotten.
- **Categorize** using Keep a Changelog headers: `Added`, `Changed`, `Fixed`, `Removed`, `Notes`.
- **Describe status, not just the diff.** Don't write "updated pricing page" — write what now works,
  what's still faked/stubbed, and what's known-broken or left for later. Someone who wasn't in the
  session (human or AI) should be able to read the entry and know exactly what they can rely on.
- **Name the surface area**: which route/component/doc changed (e.g. `app/checkout/page.tsx`, not just
  "checkout").
- **Call out fakes explicitly** — this project deliberately fakes payments/backend/DB; every time you
  fake or stub something, say so in the entry so nobody later assumes it's real.
- If you're an AI agent, write the entry in the same voice/format as existing entries — not "Claude did
  X," just what changed, like a human teammate would log it.
- When a batch of `[Unreleased]` work reaches a demo-able checkpoint, cut a new dated version section
  (`## [x.y.z] — YYYY-MM-DD`) above it, following the existing `[0.1.0]` entry as the template.

Goal: at any moment, anyone — new teammate or a fresh AI session with zero prior context — can read
`CHANGELOG.md` top to bottom and know the current state of the build without reading the diff or asking
around.

## Team

Daniel Leon Glauert (Captain 🏴‍☠️), Franz von Esebeck, Emma Sporn, David Cisar, Carolina Fromm.
