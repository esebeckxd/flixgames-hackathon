# Co-pilot brief — FlixGames Hackathon

Read this first. It tells you what the project is, how to make visual choices, and what already exists
so you don't rebuild it. Deeper detail is linked; don't start building pages from this file alone.

## What we're building

A **click-dummy of a full-circle Doctorflix project process**, hosted on **Vercel** (Franz's deploy) with
a **Cloudflare Pages mirror** as a parallel backup host (see `docs/TECH-ROADMAP.md`), for a two-day
internal hackathon (FlixGames). Not a shipping product — built to sell a pitch. Optimize for "looks
convincing, tells the story, and gets a laugh," not architectural correctness.

**The point of the demo:** the whole project lifecycle — sponsor picks a topic through to finished,
published content — runs **mostly on its own**, supervised by humans rather than driven by them. Real
human input is only required at a **handful of specific steps**; everything else is automated hand-offs
between AI agents. The over-the-top humor exists specifically to sell *how little the stakeholder has to
do anymore*.

**Pipeline (full 10-scene script + cast — SSOT is the
[Notion storyboard](https://app.notion.com/p/doctorflix/FlixGames-Hackathon-Pitch-Storyboard-EN-3a525482863c818c9dc3d49cf9d062a5);
[`docs/STORYBOARD.md`](docs/STORYBOARD.md) is just a pointer to it now, do not edit that file for
narrative changes):**
1. Cold open: a dismissive **Pharma Boss** hands the project off ("just make a TV video, come back in
   six months") — sets up the ending's payoff.
2. **Pharma picks a topic** from the shop, configures the offer (video + add-ons), and **books a
   Referent directly as part of checkout** — **Stripe/PayPal-styled but fully faked**, using joke brand
   names instead of the real payment logos (never the real Stripe/PayPal marks — see Hard constraints).
   Referent booking is staged live: three teammates appear as candidate Referents, Pharma picks one.
3. **Project requirements are captured, not drafted** — the Pre-Kick-Off briefing screen (oversimplified
   to 2–3 real fields + grey placeholders, see Demo philosophy) stands in for a human writing a scope
   doc. Pharma is now "done" — narratively they head to the airport.
4. **Referent gets notified** of the booking and builds the presentation in our own **simple slide
   builder** — not Moritz's full kasuistik tool. Murphy's-Law beat: an ugly old deck gets dug out of the
   archive and the AI cleans it up ("turning shit into gold").
5. **Video generation** — "pick your fighter" avatar select, AI Avatar chosen over Live Recording;
   credited transparently to Moritz's existing pipeline (recording → transcript → AI avatar →
   automated animation); we build the pipeline UI, not this piece.
6–7. **Referent submits, video publishes**; Pharma is notified on the way to vacation.
8. *(Optional, cut first if tight)* **One month later:** Pharma shows numbers to the Boss, who claims
   credit for it.
9. **DX-employee highlight-reel** — the closing ~60 seconds, do not cut (beer, Slack notifications, a
   sales gong on every closed deal).
10. *(Optional stinger)* Six months later: the founders realize the team is redundant.

**Told from a small cast** — Narrator, Pharma Boss, Pharma/Marketing Assistant, Referent(s), DX
employee — all played by the team in costume. Full cast + character notes:
[Notion storyboard](https://app.notion.com/p/doctorflix/FlixGames-Hackathon-Pitch-Storyboard-EN-3a525482863c818c9dc3d49cf9d062a5).

Full context: [`docs/meeting-notes/`](docs/meeting-notes/) (all planning meetings).

## Pitch format & timing

**Hard limit: 7 minutes.** Budget ~10–15 seconds per scene/interaction. The last ~60 seconds are
reserved for the DX-employee highlight reel (scene 9) — build to that, don't squeeze it in on top.
Cut-first order if time is tight: the six-month stinger (scene 10), then the one-month payoff (scene 8).
**Everything is in English — spoken pitch and on-screen product UI both** (decided 2026-07-22, overrides
the original plan to leave on-screen UI in German to match the pre-built assets; the international
FlixGames audience made that not worth the authenticity trade-off). New copy on any screen should be
written in English from the start, not left in German to "match the real app."

## Demo philosophy — the most important rule for building any screen

**Oversimplify. Show the idea in one glance, not a working form.** Every screen is the user-facing view
only. Pick 2–3 fields/actions per screen that are genuinely clickable; render everything else as grey,
inert placeholders that just suggest more configuration exists. Do **not** build a real 20-field form —
that's already too much for a pitch, even if it'd be "more realistic." Voice input (speak → form fills
itself) is an explicit stretch goal, not a v1 requirement. Full reasoning + scene script:
[Notion storyboard](https://app.notion.com/p/doctorflix/FlixGames-Hackathon-Pitch-Storyboard-EN-3a525482863c818c9dc3d49cf9d062a5).

## Humor & motion direction

The comedy is a **deliberate design tool**, not garnish — it exists to underline how absurdly easy each
step has become for the stakeholder. Rules for every screen:

- **Murphy's Law angle:** whatever the human fumbles, the AI fixes gracefully ("turning shit into
  gold") — keep this thread running throughout (see the Referent's messy-input beat in the pipeline
  above).
- **"Absurd extra win" buttons:** wherever a step becomes trivially easy for the stakeholder, offer the
  normal action **plus** an over-the-top bonus option that spells out the time/effort saved as a joke —
  e.g. instead of just `Projekt starten`, also show `Projekt starten und One-Way-Ticket an den Strand
  buchen`. Propose a fitting joke like this **at every step**, tailored to what that step's win actually
  is (e.g. auto-generated requirements → "Anforderungen automatisch generiert und Kaffeepause einlegen";
  auto-published video → "Video live und Feierabend machen"). The joke should always point at the
  *user's* payoff, not just be random silliness.
- **Fun, playful animations are wanted throughout** — confetti/checkmarks on completions, cheeky
  micro-interactions on hover, celebratory transitions between pipeline steps. Lean into shadcn +
  Tailwind transitions/keyframes; favor something over nothing, but keep it snappy, not laggy.

When proposing copy or interactions for a new screen, always suggest at least one "absurd extra win"
option and one small delightful animation alongside the straightforward version — don't wait to be asked.
This pairs with the DX-employee gag interstitials (gong, Slack money-spam) from
[Notion storyboard](https://app.notion.com/p/doctorflix/FlixGames-Hackathon-Pitch-Storyboard-EN-3a525482863c818c9dc3d49cf9d062a5) — same comedic thread, different surface.

## Stack

**Next.js 16 (App Router) + React 19 + shadcn/ui + Tailwind v4.** shadcn is the basis for all UI —
buttons, inputs, cards, dialogs. Run `npm run dev` (port 3000) / `npm run build`.
- `app/` — routes. `components/ui/` — shadcn components (we own the source; extend freely).
- Add components: `npx shadcn@latest add <name>`. They inherit the Doctorflix theme automatically.
- The three pre-built assets are plain HTML/Vercel apps (below); this FlixGames app is the new Next.js
  shell that stitches the storyboard together. Per screen, decide Wednesday: embed/iframe the existing
  app, or rebuild the screen as a shadcn page.

## Interaction model — one deterministic click-through module

**Build it as a deterministic presentation, not a free-roam app** — decided on the 2026-07-22 call, too
risky to navigate live otherwise. One fixed, linear sequence of full-screen scenes driven by a single
`currentScene` piece of state, advanced by a persistent bottom-right "Next" control (+ keyboard
shortcut) — not separate routes the presenter navigates freely. This **is** the moderator hold-point
mechanism: the module must never auto-advance on a timer — a live human stands in front of the screen
and narrates, and pacing stays entirely in their hands via that "Next" control. Each scene can still
contain its own realistic-looking mini-flow (e.g. checkout has a few clicks inside it), but scene-to-scene
order is fixed. Full reasoning: [Notion storyboard](https://app.notion.com/p/doctorflix/FlixGames-Hackathon-Pitch-Storyboard-EN-3a525482863c818c9dc3d49cf9d062a5).

- **Persona-grouped scenes.** Group scenes by whose screen they represent — **Pharma/Sponsor**,
  **Referent**, **DX employee** — per [Notion storyboard](https://app.notion.com/p/doctorflix/FlixGames-Hackathon-Pitch-Storyboard-EN-3a525482863c818c9dc3d49cf9d062a5); keep
  each persona's scenes a clear, contiguous block in the scene sequence/components.
- **Persona/actor switch = a themed transition, not a cut.** [Notion storyboard](https://app.notion.com/p/doctorflix/FlixGames-Hackathon-Pitch-Storyboard-EN-3a525482863c818c9dc3d49cf9d062a5)
  already calls for a black screen / curtain-drop / dimmed lighting between an actor beat and the next
  on-screen UI beat — build that as a real animated transition component (not a bare loading spinner).
  A **GTA-style character-switch swoop/zoom** is a good alternate/additional treatment for persona-to-
  persona cuts specifically — use whichever reads better once it's built, or vary it scene to scene.
- **Overview-then-zoom beats within a scene (decided 2026-07-22).** Any scene that represents a real
  dashboard should open on a full-screen "beat 0" showing the whole product — sidebar, nav, surrounding
  chrome — so the audience gets the "this is a real tool" establishing shot. Advancing "Next" from
  there doesn't cut to a new scene; it zooms into a "beat 1+" view of that *same* scene, stripped of
  chrome, with the one element that matters to the story (the button, the field, the dropzone) blown up
  large enough to be the obvious focal point. Implemented as a per-scene `beats` count in
  [`lib/scenes.ts`](lib/scenes.ts): `SceneController` steps `next()`/`prev()` through a scene's own
  beats before moving to the next scene, and a scene can call `goToBeat(n)` to branch straight to one of
  its own beats (e.g. Shop's "Read My Mind." button skips past the normal zoom beat into its own joke
  beat). Applied so far to Shop (topic pick), Checkout (package pick), and Referent Upload (dropzone) —
  apply the same overview→zoom shape to any future dashboard-style scene rather than a flat single view.
- **Video placeholders.** Several scenes (e.g. Scene 5's AI-avatar video, Scene 9's DX highlight reel)
  point at a real video that doesn't exist yet. Render those as clearly labeled placeholder blocks (a
  bordered box with `[Video: <what it'll show>]`) that are trivial to swap for a real `<video>`/embed
  later — don't build real playback logic now, and don't leave them unlabeled either.

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
- **No real payments** — checkout is fully simulated. Never wire up real payment processing, and never
  use the actual Stripe/PayPal logos or trademarks — invent joke-branded fake payment options instead
  (fitting the humor direction above).
- **Nothing needs to be deeply functional.** Every screen just needs to have the *clicks, animations,
  and reactivity* that sell that specific beat of the pitch story — no real validation, no real state
  machine, no edge-case handling. If a click doesn't visibly move the story forward, don't build the
  logic behind it; if it does, fake whatever's needed to make the click/animation feel real and stop
  there. Depth of implementation is not a goal anywhere in this app.
- Favor **breadth** (whole flow clickable, shallow) over **depth** (one perfect step, others missing).
  A Western-movie set: ten doors, one opens.

## No branches — work on `main`, commit and push immediately

**Branches are forbidden.** Every human and every AI agent works **directly on `main`** — no
feature/topic branches, no long-lived local work, no PRs. **Commit and push immediately** after every
change; don't batch multiple changes into one commit "for later," don't leave work uncommitted at the
end of a turn/session. With several people and several AI tools building in parallel on the same repo
(see Changelog discipline below), a branch is just unmerged work nobody else can see or build on top of
— the opposite of what this hackathon needs.

- If `git pull`/`push` rejects because someone else pushed first, **merge** (don't rebase away their
  history, don't force-push) and push again — same pattern already used earlier in this repo's history.
- This is **technically enforced**, not just a guideline: `.githooks/pre-commit` blocks any commit made
  on a branch other than `main`, and `.githooks/pre-push` blocks pushing any ref other than `main`. Hooks
  install automatically via `npm install` (`"prepare"` script in `package.json` sets `core.hooksPath`).
  If a hook blocks you, switch to `main` and merge your work there — do **not** bypass it with
  `git commit --no-verify` / `--no-verify` on push.

## When in doubt

Ask: "does this help the pitch story land, or is it gold-plating a step nobody lingers on?" Favor the
former — including on the engineering side: a convincing click + animation beats correct, robust logic
every time here. Exact demo scope (built-in-full vs. faked, storyboard order) gets locked Wednesday
morning — keep things flexible until then.

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

## Team & roles

Daniel Leon Glauert (Captain 🏴‍☠️), Franz von Esebeck, Emma Sporn, David Cisar, Carolina Fromm.

Proposed split (2026-07-22 call; confirm/adjust Wednesday morning once everyone's in the room):

- **Build track — Franz + Daniel:** this repo — stitching pre-built assets into the storyboard, faking
  the seams (checkout, briefing hookup, slide builder, DX feed).
- **Pitch/story track — Emma, David, Carolina:** the narrative and "theater-play" blocking (who plays
  which persona, when the screen switches), the DX-employee gag montage/edit (gong, Slack-money-spam,
  beer cutscenes), virtual-background/avatar polish for the Referent recording simulation, and the ROI
  numbers + presentation format (live demo vs. demo+deck) for the pitch.

Both tracks build against the **Notion storyboard** as the shared source of truth for narrative; the
build track additionally tracks engineering tasks and required assets in
[`docs/TECH-ROADMAP.md`](docs/TECH-ROADMAP.md) — keep it updated as Notion scenes get locked/changed.
