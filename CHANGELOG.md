# Changelog

All notable changes to the FlixGames hackathon prototype are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); this project is a
pre-hackathon prototype, so versions are lightweight and dated.

## [Unreleased]

### Added

- **Pharma-flow reorder specified, documented, not built yet** — new "Planned reorder" section at the
  top of `docs/TECH-ROADMAP.md`: topic shop with "Read My Mind" → a new suggested-topic confirmation
  beat (doesn't exist yet; today "Read My Mind" skips straight to Checkout) → "Pick Your Fighter"
  referent select moved to happen *before* Checkout (today it's Checkout's third internal beat, after
  package config) → Briefing questionnaire self-fills via a single "KI befüllen" button rather than the
  pharma typing into the 2 real fields it has today → scene ends on the existing Act-boundary curtain,
  handing the stage to the Referent. Flagged one open question (where Checkout/payment now sits in the
  new order) to resolve before implementation starts.

- **"Leo's iPhone" rebuilt as a real chat-app UI replica**
  (`components/scene/scenes/LeosIphone.tsx`, `leosIphone.module.css` — deliberately unbranded, no
  logo/wordmark anywhere, same rule as the fake payment buttons). Full header (back chevron, avatar,
  contact name, "last seen", video/call icons), a scrollable message history with date dividers, sent
  (green) vs. received (white) bubbles, an emoji-only bubble, a voice-call log entry, a decorative input
  bar, and a status bar. Hans is saved in Leo's contacts as **"Hans (Best Co-Founder Ever) 🩷"** — shown
  in full in the header (widened the phone frame + shrank the header font specifically so the emoji
  doesn't get clipped by text-overflow ellipsis on a long contact name). Invented a full Gen-Z-casual
  texting history building up to the punchline (getting rich, buying a house, the private-jet joke,
  an 8-second voice call) with two easter eggs for anyone who's seen the rest of the show — a
  kidneys-joke callback and a nod to "the AI" doing the work. The final "do we need them anymore?"
  message reveals after a "typing…" beat, with `playNotification()` now firing exactly when it lands
  (moved from firing on mount). **Chat wallpaper is a solid placeholder colour** — swap for the real
  background image once supplied (see comment in `leosIphone.module.css`'s `.chatArea`).
- **YouTube-style watch pages reskinned closer to the real layout** (`components/scene/YouTubePage.tsx`):
  dropped the old top nav/search bar (not in the reference), added a decorative red progress bar + player
  control-icon row, a red circular channel avatar with a verified badge, a "Subscribed" pill + bell icon,
  and a like/dislike/share/save/more action row — matching a real watch page's info panel more closely.
  Fixed the player to a `56vh` fixed height (was `aspect-video`, which at full width filled the entire
  viewport and pushed the whole info panel below the fold with no visual cue to scroll).
- **DX reel and Stinger get Gen-Z titles + easter eggs** (`DxReel.tsx`, `Stinger.tsx`): "a day in my life
  (my job is literally AI now) 💸😭" / "we automated ourselves out of a job 💀 (not clickbait)", channel
  renamed to a lowercase handle `doctorflix.dx`, "Comments are off" gag, and a dislike-count easter egg
  ("1 dislike. hi bernd 👋" / "2 dislikes. it was us. we did that."). View counts/dates kept identical to
  preserve continuity with the live view-counter beat in `Publish.tsx`.
- **`skipToNextScene` added to the scene-nav context** (`components/scene/nav.ts`,
  `SceneController.tsx`) — lets a branch beat that isn't a scene's last one exit straight to the next
  scene, bypassing any remaining beats. Needed once Shop's "Read My Mind" branch moved earlier in the
  beat order (see Changed).

- **Checkout gets a "Pick Your Fighter" referent-selection beat** (`Checkout.tsx`, new `beat === 2`;
  `lib/scenes.ts` checkout `beats: 2 → 3`). Reverses the earlier "Referent line-up intentionally not
  built in-app" call from the 0.5.0 roadmap — per the 2026-07-22 follow-up call (Franz/David/Emma/
  Daniel), Pharma now gets an actual on-screen picker (same Sehouli/Prelog/Paula Cramer roster as
  `VideoGen.tsx`) after the package-pick zoom beat; picking a name is the live cue for that person to
  walk on stage, it doesn't replace the live staging. Logged in Notion's storyboard and
  `docs/TECH-ROADMAP.md`.

### Notes

- **Notion SSOT has moved ahead of the app.** The Notion storyboard was independently rewritten into a
  **5-act structure** with renamed cast (Pia Pharma, Prof. Dr. Ego von Whitecoat, Corporate Bernd,
  Narrator split from Kalle Feierabend, KAI cut) and **no pizza joke topic** — the app still reflects
  the old 4-act/pizza structure. Flagged in `docs/TECH-ROADMAP.md` under "Notion SSOT has moved ahead
  of the app — reconcile before the run-through"; this is a full narrative reconciliation, not a small
  diff, and deserves its own pass. Also logged a new "🆕 Additional story details" section directly on
  the Notion page capturing the rest of this call's decisions (cold-open framing device, slide-builder
  split editor, avatar outfit picker + real preview, publish polish, Leo's iPhone stretch goals) that
  aren't built yet — see `docs/TECH-ROADMAP.md`'s "Open items from the 2026-07-22 follow-up call".

### Changed

- **Shop's beat order swapped: "Read My Mind" now comes before manually picking a topic** — the default
  Next-Next sequence used to be overview → manual-pick zoom → Read My Mind (last, so its click could
  exit the scene); it now goes overview → Read My Mind zoom → manual-pick zoom, matching the story order
  the audience actually sees. Shop's small "Read My Mind." button on the overview now jumps to `beat 1`
  (was `beat 2`); the giant button now calls the new `skipToNextScene()` (see Added) instead of `next()`
  so it still exits straight to Checkout, bypassing the manual-pick beat entirely.
- **Fixed a leftover German string**: `VideoGen.tsx`'s bonus button read "Take My Job Away (aber Gehalt
  behalten)" — translated to "…(but keep the paycheck)", per the English-only rule.

- **Cold-open punchline retitled: "How We Became Unemployed and Our Founders Rich"** — the joke now
  correctly lands on the team going unemployed while the founders get rich (was previously just
  "...Unemployed and Rich", which read like the team got both). Updated in `ColdOpen.tsx`'s headline,
  `lib/scenes.ts`'s Act 4 curtain title, and `app/layout.tsx`'s page title.
- **`ColdOpen.tsx` simplified — Boss Bernd Bonus's dialogue line removed**, along with the "Normally:
  months of work..." line beneath it. The slide is now just the title card + Autopilot button; the
  moderator narrates the boss's hand-off and the "normally this takes months" beat live instead of
  reading it off-screen.

- **`/money-boy` main pane switched from dark to light** — the message list, header, and composer now
  use a white background with dark (`#1D1C1D`) text, matching real Slack's default light theme. The
  aubergine `#3F0E40` sidebar is kept exactly as-is, per instruction ("die lila Farbe in Slack aber
  beibehalten"). `/ops-dashboard` was already light (Doctorflix's default `:root` theme; no `.dark` class
  toggle exists anywhere in the app) — confirmed, no change needed there.

- **Money Boy renamed to "Money Boy (BOT)"** everywhere in `/money-boy` (message sender, sidebar DM
  list, member-count chip), and given a real avatar: `components/money-boy/MoneyBoyAvatar.tsx`, an
  original inline-SVG "bling rapper" icon (silhouette, sunglasses, flat-brim cap, gold chain + pendant)
  replacing the 🤑 emoji — no photo/likeness of a real person, no third-party logos/trademarks.

### Added

- **Pipeline Control dashboard — a second standalone animation** at `/ops-dashboard`
  (`components/ops-dashboard/`). Same spirit as `/money-boy`: not an app, a pure looping visual meant to
  run in its own browser window/tab alongside the pitch. Shows **8 example-customer projects
  simultaneously**, each running its own independent 5-stage pipeline (`Thema gewählt → Angebot
  konfiguriert → Bezahlt → Briefing erhalten → In Produktion`) on its own randomized timer
  (`ProjectCard.tsx`, a self-contained async loop per card — no shared clock, so cards never march in
  lockstep). On finishing, a card flips green ("✅ Fertig! Video live."), holds briefly, then flies out
  and is replaced by a freshly-started project flying in from the same side (new fly-in/out keyframes in
  `app/globals.css`). Each completion reports its deal value up to a live **Gesamtumsatz** counter that
  eases toward its new target every frame rather than snapping (`LiveNumber`, `OpsDashboard.tsx`) — reads
  as continuously climbing, never resets, runs forever. A small `Confetti` burst (reused from
  `components/scene/plakativ.tsx`) fires on every completion. 20-customer/10-format example pool in
  `data.ts` (same sponsor roster as Money Boy for continuity).

### Notes

- **Git identity fixed on this machine** per the root-cause note below: `git config --global user.email`
  set to a real, GitHub-linked address. This commit is the verifying one — if the Vercel deploy for it
  isn't `BLOCKED`, the fix confirmed working.
- **Vercel deploy blocking, root cause found.** Every deployment built from Daniel's commits was
  `BLOCKED` (confirmed via the Vercel API: `readyStateReason: "The Deployment was blocked because
  GitHub could not associate the committer with a GitHub user"`, `seatBlock.blockCode:
  COMMIT_AUTHOR_REQUIRED`). Cause: his local git `user.email` is set to the machine-default
  `danielglauert@Mac.fritz.box` (never configured), which GitHub can't match to any account. This
  blocks the deploy regardless of who triggers it or whether the repo is public/private — the check
  is on the commit's own author metadata. **Fix for Daniel:** run
  `git config --global user.email "<your real GitHub-linked email, or the noreply one from
  GitHub Settings → Emails>"` and `git config --global user.name "Daniel Glauert"`, then push a new
  commit — the block only affects deployments whose *latest* commit has unverifiable authorship, so
  one correctly-attributed commit clears it going forward. Also made the GitHub repo public (was
  private) since that's a related-but-separate restriction on Hobby-plan teams; didn't by itself fix
  this specific block.

### Added

- **Money Boy #general feed — a standalone Slack-clone animation** at `/money-boy`
  (`components/money-boy/MoneyBoyFeed.tsx` + `messages.ts`). Not an app — a pure, endlessly-looping
  visual: a Slack-styled UI (aubergine sidebar, channel list, decorative composer bar) where "Money Boy"
  posts a new 💰 MONEY MONEY MONEY 💰 deal-closed message every 2 seconds, forever. 20 hand-written
  message variations (sponsor/format/referent/funny-aside per template, e.g. Roche/Celltrion/MSD/Pfizer
  × Video on Demand/DUO-Vortrag/clickCase/etc. × Sehouli/Prelog/Paula Cramer/Prof. Dr. Ego von Kittel),
  picked at random each tick. Deal size escalates the longer the loop runs (`escalationMultiplier`) so
  the numbers get properly unhinged over time; MTD/YTD accumulate forever, never reset. Bonus/record-
  breaking templates and mega-deals (>300k) trigger a `Confetti`/`MoneyRain` burst (reused from
  `components/scene/plakativ.tsx`). Auto-scrolls to the newest message; message list capped at 200
  rendered rows to keep the DOM light while MTD/YTD keep growing unbounded. Not wired into the main
  pitch deck (`/`) — a separate route, meant to run on its own screen/tab during the DX-employee beat.

- **4-act play framing fused onto the 0.5.0 MVP ("verschmelzen").** The deployed 10-scene click-through
  is now grouped into the play's four acts (`lib/scenes.ts` gains an `act` field + `ACT_TITLE`):
  Akt 1 setup, Akt 2 shop+checkout+briefing, Akt 3 slide-builder+video-gen, Akt 4 publish+payoff+reel+
  stinger. At every **act boundary** the curtain now drops a big plakativ **„AKT n — <Titel>"** card
  (`PersonaTransition` extended; `SceneController` fires it on act change, not just persona change), so
  the audience feels four beats and the overarching arc stays in the foreground. The bottom chip shows
  „Akt n/4 · <Szene>"; the Next control is now „Weiter →" and also advances on Space.
- **Plakativ Akt-1 opener.** `ColdOpen` rebuilt as the billboard title card — huge „Wie wir arbeitslos
  und reich wurden", Bernd Bonus's line, and a giant „⚡ AUTOPILOT AN" button that powers up and advances
  the play (via a new `components/scene/nav.ts` context so scenes can drive navigation).
- **Plakativ motion kit** kept from the parallel build and merged into `app/globals.css`
  (`components/scene/plakativ.tsx`): huge `GagButton`, `Confetti`, `MoneyRain`, `SlotCounter`,
  `FakeProgress`, `Stage`, `Kicker` — available for amping the remaining symbolic scenes next.
- **Overview → zoom "beat" system.** `lib/scenes.ts`'s `SceneDef` gained an optional `beats` count;
  `SceneController` now steps `next()`/`prev()` through a scene's own beats (beat 0 = full dashboard
  view, beat 1+ = zoomed onto the one element the story needs the audience looking at) before advancing
  to the next scene, and exposes a new `goToBeat(n)` (via `components/scene/nav.ts`) so a scene can
  branch straight to one of its own beats. Applied to Shop (topic pick), Checkout (package pick), and
  the new Referent Upload scene (dropzone) — see `CLAUDE.md`'s interaction-model section for the
  standing rule this codifies.
- **Shared dashboard shell** (`components/scene/DashboardShell.tsx`, new): a left sidebar + topbar
  wrapper with `variant: "pharma" | "referent"` nav item sets, used by Shop, Checkout, and the new
  Referent Upload scene so all three read as one coherent product family. **This is a v1 placeholder**
  — built from description only, not yet matched against the real pharma-dashboard video/screenshots
  the user is going to supply; expect a visual pass once those land.
- **Generic "Tubely" video-platform layout** (`components/scene/YouTubePage.tsx`, new): a fake
  YouTube-style watch page (title/channel/views/description around a labeled video placeholder) —
  deliberately not the real YouTube UI/branding. Used for the DX highlight reel ("One Day in Our Work
  Life") and the stinger ("The End"), both full-bleed instead of the old boxed layouts.
- **"Read My Mind." joke branch on Shop.** A small button on the Shop overview (`goToBeat(2)`) jumps to
  a dedicated giant-button beat; clicking it assigns a joke placeholder topic ("Why Pizza Cures
  Everything: A Comprehensive Review", `lib/demo-state.tsx`'s new `JOKE_TOPIC` — **content itself is a
  placeholder pending the user's final joke topic**) and skips straight into Checkout with it. The real
  landing-page topics (`TOPICS`) are untouched/serious; only this explicit branch is a joke.
- **"Leo's iPhone" interstitial scene** (`components/scene/scenes/LeosIphone.tsx`, new; registered as
  `leos-iphone` between the DX reel and the stinger): a CSS phone-frame mockup on a gradient background,
  showing a text from "Hans" — "Do we need them anymore?" — as the visual beat between "One Day in Our
  Work Life" and "The End."
- **Synthesized notification sound** (`lib/sound.ts`, new): a small Web Audio API chime built from
  oscillator tones (`playNotification`, `playGong`, `playConfirm` — only `playNotification` wired so
  far, into `LeosIphone`). Deliberately synthesized rather than a sampled/licensed sound effect — avoids
  reproducing Apple's actual iPhone tone or any copyrighted SFX, and needs no audio file to ship. Works
  reliably here because the whole app is click/keypress-driven, so it's always inside a user gesture —
  no browser autoplay restrictions apply.

### Changed

- **Storyboard rebuilt as a tight 4-act play in Notion (SSOT).** Replaced the 10-scene structure with
  **„Wie wir arbeitslos und reich wurden"** — a short, easy-to-play stage play (Kalle Feierabend, Pia
  Pharma, Prof. Dr. Ego von Kittel, Bernd Bonus, KAI) whose one-line spine ("the human keeps winning by
  doing less") is foregrounded, with explicit actor-leads-screen-reacts staging. Fewer scenes, clearer
  arc. `app/layout.tsx` metadata + `docs/TECH-ROADMAP.md` updated to match.

- **"No branches" policy, technically enforced.** Documented in `CLAUDE.md`, `AGENTS.md`, and
  `README.md`: all work (human and AI) happens directly on `main`, committed and pushed immediately —
  no feature/topic branches, no PRs. Backed by new `.githooks/pre-commit` (blocks commits on any branch
  but `main`) and `.githooks/pre-push` (blocks pushing any ref but `main`); `package.json` gained a
  `"prepare"` script that runs `git config core.hooksPath .githooks` automatically on `npm install`, so
  every clone picks up the enforcement without a manual setup step.

- **Everything translated to English, on-screen UI included.** Overrides the earlier "on-screen UI can
  stay German" call in `CLAUDE.md` (updated to match) — every scene's copy, all topic/package/product
  data (`lib/demo-state.tsx`'s `TOPICS`, checkout packages), `ACT_TITLE`, and `app/layout.tsx` metadata
  are now English. `SlotCounter`'s number formatting switched `"de-DE"` → `"en-US"` to match.
- **Moderator nav controls shrunk and de-emphasized.** The old persistent "Akt n/4 · Szene" chip +
  "Weiter →" button are gone; `SceneController` now renders two small (24px) low-opacity icon-only
  back/forward buttons bottom-right (`opacity-40`, full opacity on hover) — a moderator affordance, not
  something meant to read as part of the pitch. The big plakativ Act-title curtain on act changes is
  kept as-is.
- **Referent's `slide-builder` scene replaced with a DX-style upload interface**
  (`components/scene/scenes/ReferentUpload.tsx`, replaces the deleted `SlideBuilder.tsx`): opens on a
  full Referent Dashboard overview (booking-notification banner, assignment/deadline/payout cards, using
  the new `DashboardShell` in its `referent` variant) before zooming into a huge dropzone for the
  upload → AI-cleanup beat. Cursed filename gag carried over and re-anglicized:
  `Presentation_FINAL_FINAL_v3_actually_final.ppt`.
- **`eslint.config.mjs`** ignores `.vercel/**` — the `.vercel/output/**` prebuilt-build artifacts from
  `vercel build` were being linted as source and threw ~1,900 false-positive problems.

_Still open after the 0.5.0 MVP below — see [`docs/TECH-ROADMAP.md`](docs/TECH-ROADMAP.md) for the full
per-scene breakdown:_

- Real assets: `logo.svg`/`bg-hero.svg`/`orb1–4.svg` for the shop (currently CSS-gradient substitutes —
  see [`PREBUILT-ASSETS.md`](docs/PREBUILT-ASSETS.md)), fighter portraits for Scene 5 (**blocked on
  likeness approval from Sehouli, Prelog, and Paula Cramer** — text-only names ship until then), a pizza
  image/illustration for Scene 4's establishing beat, joke company-card art, fake payment-method icons.
- Scene 1 (cold open) and Scene 10 (stinger) are still narrator/text-card placeholders — no live-acted
  staging, no real footage.
- Scene 9's DX-employee highlight reel is a labeled video placeholder — the actual edit (Slack montage,
  gong, beer, money-spam) is a pitch/story-track production task, not app engineering.
- Scene 5's avatar-speaking preview is a labeled placeholder — depends on how far Moritz's pipeline
  integration gets by Wednesday.
- **`DashboardShell` (Shop/Checkout/Referent Upload sidebar) is a v1 placeholder**, built from
  description only — waiting on the real pharma-dashboard screenshots/video the user is going to supply
  for a pixel-accurate pass.
- **"Read My Mind." joke topic content is a placeholder** ("Why Pizza Cures Everything") — user said
  final content is still TBD.
- Referent Upload's "DX style" character/avatar assets are pending from the user (different characters
  per persona) — currently text/icon-only.
- `lib/sound.ts` only has `playNotification()` wired in (Leo's iPhone scene); `playGong`/`playConfirm`
  exist but aren't triggered anywhere yet.
- Reusable "bonus button" component (primary + over-the-top sibling) — currently hand-rolled per screen,
  works fine for the MVP but duplicated.
- Referent line-up beat (Scene 2) is intentionally **not** built in-app — per `TECH-ROADMAP.md` it's
  staged live by actors during the scene transition; checkout just shows a clean completion state.
- Optional stretch: voice input on the briefing screen.
- Story-track open items: full line-by-line dialogue script, costumes.

## [0.5.0] — 2026-07-22

**First clickable MVP**, deployed and live. Ten scenes, one deterministic click-through, three of them
high-fidelity replicas of the real pre-built tools.

### Added

- **Scene-controller shell** (`components/scene/SceneController.tsx`, `lib/scenes.ts`,
  `components/scene/registry.tsx`): one `currentScene` state machine driving a fixed 10-scene sequence,
  advanced by a persistent bottom-right "Next" control + arrow keys (arrow keys ignored while a text
  field has focus). Never auto-advances — fully moderator-driven, per `CLAUDE.md`'s interaction model.
- **Persona-switch transition** (`components/scene/PersonaTransition.tsx`): a curtain-wipe overlay plays
  only when the scene's persona changes (Pharma → Referent → DX → Narrator), not on every scene change.
- **Shared demo state** (`lib/demo-state.tsx`): one topic, picked in the Shop scene, flows through
  Checkout and Briefing so the whole click-through tells one consistent story. Default/demo topic:
  "Epilepsie – Grundlagen bis aktuelle Therapiekonzepte."
- **High-fidelity replicas**, built from the real source (not guessed from screenshots) — CSS Modules
  per scene mirroring the actual `dx-agents` stylesheets, real Doctorflix logo copied into `public/brand/`:
  - `Shop.tsx` — replica of `docs/prebuilt-references/pharma-landing-page.html`: nav, dotted-pattern
    hero, filter chips, TA-colored topic cards with orb-on-hover (CSS-gradient orbs, no `orb*.svg` yet).
  - `Checkout.tsx` — replica of `dx-agents/apps/cost-configurator`: sticky topbar with live total, dark
    hero, package cards (Basic/Plus/Premium), an add-on with a working quantity stepper, sticky summary
    card with a real running total. Checkout gags added per `TECH-ROADMAP.md`: joke payment-method
    buttons ("Pay with your Kidneys" / "Pay with your Firstborn"), doubled confirm button (`Projekt
    starten` + `…und One-Way-Ticket an den Strand buchen`). No in-app Referent picker — that beat is
    live-acted, per the roadmap.
  - `Briefing.tsx` — replica of `dx-agents/apps/handover/survey.html`: hero, deal card, disclaimer, 2
    real fields (focus chips + notes) + 3 greyed-out placeholder sections, matching thank-you state.
    Added the fake "KI liest Ihre Gedanken… 87 %" processing animation and the doubled submit button
    (`…und Autoantwort aktivieren bis Q4`).
- **Symbolic scenes** (on-brand shadcn, not high-fidelity replicas since there's no real tool to match):
  Cold Open, Slide Builder (upload → AI-cleanup reveal, cursed filename
  `Vortrag_FINAL_FINAL_v3_wirklich_final.ppt`), Video Gen ("pick your fighter" VS-style select — Sehouli
  / Prelog / Paula Cramer by name only, no photos pending likeness approval; locked video topic "Effect
  of Pizza on the Human Body"; `Take My Job Away` buttons), Publish (slot-machine view-counter animation),
  Payoff (10,000,000-view stat, blinking `Shift Whole Business Unit to Doctorflix and Retire Me` banner
  button next to a shy `Vielleicht nur Urlaub`), DX Reel (animated Slack money-spam feed + labeled video
  placeholder for the real highlight-reel edit), Stinger.
- **Reusable `VideoPlaceholder`** (`components/scene/VideoPlaceholder.tsx`): a clearly labeled `[ Video:
  … ]` block for beats that need real footage later (Scene 5's avatar preview, Scene 9's highlight reel).
- **Deployed to Vercel**: https://flixgames-hackathon.vercel.app (production).

### Fixed

- `SceneController`'s scroll container wasn't remounted between scenes, so it kept its previous
  `scrollTop` — the next scene could open already scrolled past its own hero. Now resets to top on every
  scene change.
- `Briefing`'s fixed bottom submit bar overlapped the SceneController's fixed bottom-right Next
  control/counter pill — added clearance padding so both stay independently legible and clickable.

### Notes

- **Nothing here is a real backend call** — checkout, briefing submission, video generation, and
  publishing are all local component state with setTimeout-based fake latency. No real payment, no real
  file upload/parsing, no real AI avatar generation.
- The three "high-fidelity" scenes are visual/interaction replicas built from the real HTML/CSS in
  `docs/prebuilt-references/` and the `dx-agents` repo — they do not call those apps' actual APIs
  (Slack webhooks, Notion sync, Upstash rate-limiting) and never will for this demo.
- Real referent names (Sehouli, Prelog, Paula Cramer) are used as **text labels only** in Scene 5 — no
  photos or AI-generated likenesses were created, pending the approval `docs/TECH-ROADMAP.md` flags as
  still needed.

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
- **Storyboard fully migrated to Notion — the real SSOT, live now.** Wrote the complete, current
  storyboard (concept, format & timing, build format, demo philosophy, cast, all 10 scenes with every
  locked gag above, staging & transitions, Q&A prep) into
  [FlixGames Hackathon — Pitch Storyboard](https://app.notion.com/p/doctorflix/FlixGames-Hackathon-Pitch-Storyboard-EN-3a525482863c818c9dc3d49cf9d062a5)
  (replacing its stale pre-hackathon draft). `docs/STORYBOARD.md` is now a **short pointer stub only** —
  full narrative content removed from the repo, linking to Notion instead. All links across `CLAUDE.md`,
  `README.md`, and `docs/TECH-ROADMAP.md` that used to point at the old `docs/STORYBOARD.md` sections
  now point at the real Notion URL.
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

[Unreleased]: https://github.com/esebeckxd/flixgames-hackathon/compare/v0.5.0...HEAD
[0.5.0]: https://github.com/esebeckxd/flixgames-hackathon/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/esebeckxd/flixgames-hackathon/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/esebeckxd/flixgames-hackathon/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/esebeckxd/flixgames-hackathon/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/esebeckxd/flixgames-hackathon/releases/tag/v0.1.0
