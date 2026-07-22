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

## ✅ Current scene sequence (as of 2026-07-22, end of day)

After two rounds of same-day revisions, here's what's actually built, top to bottom
(`lib/scenes.ts` is the source of truth for exact ordering/beats):

1. `cold-open` — Act 1 billboard opener.
2. `act-intro-2` — new: Act-title page, narrator cue, "Begin →" (see "Act-intro pages" below).
3. `shop` — beat 0: topic grid + prominent inline "Read My Mind" button. Beat 1: "Confirm your
   topic" (shows format + a slide preview image for the joke topic).
4. `speaker-select` — standalone scene (moved out of Checkout), 4 candidates with real photos incl.
   Daniel; picking one threads the name into `useDemoState()`'s `speaker` field.
5. `checkout` — single beat (the old "Choose a Package" zoom was removed as redundant — package pick
   already happens inline here). "Video on demand" is now a real empty/clickable checkbox.
6. `briefing` — the **original detailed form** (hero, deal card, disclaimer, focus chips, notes
   textarea, 3 disabled sections) — restored from git history after a same-day detour through a
   single-card "Projects dashboard" version. Now has a "Fill in with AI" button that visibly
   auto-fills a chip + types notes before the moderator submits normally.
7. `act-intro-3` — new.
8. `slide-builder` (`ReferentUpload.tsx`) — single combined overview+upload screen, real slide images,
   "Continue →" button, loading spinners on upload/clean-up.
9. `video-gen` (`VideoGen.tsx`) — 4 beats: **pick your style** (real video previews: Business Punk /
   Lederhosen / The Doctor, Daniel's own footage) → **slides + script + Generate Video Now** (real
   slide images, generate has a loading spinner) → **preview + Submit Video** (plays the actual chosen
   style clip) → **payout** ("Honorarium payout successful — €1,800").
10. `act-intro-4` — new.
11. `publish` — back in the Pharma `DashboardShell` (Projects tab): video overview + "Publish Video" →
    reveals the live view counter *and* the "Shift Whole Business Unit..." gag button together.
12. `payoff`, `dx-reel`, `leos-iphone`, `stinger` — unchanged.

### Act-intro pages (new)

`components/scene/scenes/ActIntro.tsx` — a dedicated full-screen beat at the start of Acts 2/3/4 (Act 1
doesn't need one; `ColdOpen` already is that moment). Gives the moderator/narrator room to describe the
scene out loud and control pacing, on top of (not instead of) the existing curtain animation between
scenes. No act-intro was added between `dx-reel`/`leos-iphone`/`stinger` — they're all Act 4 already, and
Franz asked explicitly for that stretch to stay a plain walkthrough.

### Reconciled open questions from the two 2026-07-22 flow-reorder rounds

- Checkout stays in the sequence, immediately after speaker-select (Daniel's spec just hadn't
  mentioned it).
- The avatar/style picker is back (Daniel supplied real video clips for it same-day) as `VideoGen`'s
  first beat — a costume/style choice (Business Punk/Lederhosen/The Doctor), not a named-person avatar
  picker, so no likeness sign-off needed. Distinct from `SpeakerSelect.tsx`'s real-name booking picker.
- The "Shift Whole Business Unit" gag button now fires twice — once right after Publish, once again in
  `Payoff.tsx` one month later. Left both in place rather than guessing which one to cut.

**Renamed throughout the app**: "Referent" → "**Speaker**" (persona type, `DashboardShell` variant,
nav labels, badges, headings). Component/file names (`ReferentUpload.tsx`) were left as-is — internal,
not user-visible — to limit unnecessary churn.

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
- ✅ **Speaker select moved out of Checkout into its own scene** (`SpeakerSelect.tsx`, between `shop`
  and `checkout` in `lib/scenes.ts`) per Daniel's 2026-07-22 flow-reorder call — see "Reorder built —
  Pharma flow" above. Clicking a name is the live cue for that person to walk on stage; doesn't replace
  the live staging, it triggers it.

**Assets needed:**
- Fake payment "logos"/icons for the two joke payment buttons (simple icon or emoji-based is fine —
  no real Stripe/PayPal marks).
- Fake company card art (a stylized card graphic, joke-branded, e.g. "AstraZeneca" placeholder card).
- Any missing landing-page assets per [`PREBUILT-ASSETS.md`](PREBUILT-ASSETS.md#1-pharma-landing-page--the-shop--topic-browser)
  (`logo.svg`, `bg-hero.svg`, `orb1–4.svg`).

## Scene 3 — Projects dashboard → automatic requirements definition

**Build (rebuilt 2026-07-22, see "Reorder built — Pharma flow" above):**
- ✅ `Briefing.tsx` collapsed to a single `DashboardShell active="projects"` slide: one card (topic,
  speaker name, a quote from the speaker) + one **"Fill Briefing with AI"** button → processing
  animation → "Briefing sent!" done state. No more manual focus-chip/notes fields.
- ✅ Real photos exist for Sehouli/Prelog/Paula Cramer now (see Scene 2 assets) — the old
  `briefing.module.css` high-fidelity-replica version of this screen was removed (file deleted) since
  the screen it replicated no longer matches what's on screen.

**Assets needed:**
- None.

## Scene 4 — Speaker notified, uploads old deck

**Build (rebuilt 2026-07-22 — combined into one screen, see "Reorder built — Speaker/Referent flow"):**
- ✅ `ReferentUpload.tsx` is now a single screen: notification banner + 3 stat cards + the real
  interactive upload flow (idle → uploaded → cleaned) all together, no separate zoomed beat.
- 🟡 "Speaker eating pizza" establishing visual — still just a 🍕 emoji in the notification text, no
  real image/illustration yet.
- ✅ Upload control still echoes back the fixed filename
  **`Presentation_FINAL_FINAL_v3_actually_final.ppt`** regardless of what's selected.

**Assets needed:**
- A **pizza image/illustration** (Speaker mid-bite) for the notification beat.
- A deliberately ugly placeholder "old deck" thumbnail/mockup (few slides, dated look) for the
  before/after transformation.

## Scene 5 — Pick your style → slides + script → video generation

**✅ Reconciled same-day merge:** Franz's `VideoGen.tsx` rebuild (slides+script → preview+submit → payout)
had dropped the old avatar/fighter picker entirely, treating it as "not part of Daniel's new spec" — it
also matches the separate outfit/style-picker open item from the 2026-07-22 follow-up call (framed there
as "which car do you want to drive today?"). Daniel then supplied 3 real clips explicitly for that
style-pick step, so **it's reinstated as its own new beat 0**, ahead of slides+script — this resolves
that follow-up-call open item at the same time. Style is **costume-based, not a named person**
(Business Punk / Lederhosen / The Doctor), so unlike the old fighter-picker it needs no likeness
sign-off — distinct from `SpeakerSelect.tsx`'s separate real-name *booking* picker (Sehouli/Prelog/Paula
Cramer), which is unaffected.

**Build:**
- ✅ Beat 0 (new) — **pick your style**: Daniel's 3 supplied clips (`Business–Punk.mp4`, `Lederhosn.mp4`,
  `Arzt.mp4`, ~0.7–1.9 MB each, 720p) hosted as plain static assets in `public/videos/pick-your-style/`
  (`business-punk.mp4`, `lederhosen.mp4`, `arzt.mp4`) — no CDN/Blob needed, ~3.4 MB total is trivial for
  git/Vercel. `StyleCard` autoplays each clip on loop (muted, `playsInline`), 9:16 crop; a "Continue as
  {style}" button advances. Chosen style is kept in local component state across the scene's beats.
- ✅ Beat 1 (was beat 0): `VideoGen.tsx`'s 3 processed slides (left, labeled "Speaker: Daniel") + generated
  script (right, driven by whichever topic Pharma picked in Shop — no more locked video topic) + the big
  green blinking **"Generate Video Now"** button (`.fg-blink`); now also shows the picked style's label.
- ✅ Beat 2 (was beat 1) — preview: **the selected style's own clip plays back** (with controls) as the
  "generated video," replacing the generic `VideoPlaceholder` that was here — + **"Submit Video"** button.
  Verified working in-browser (Business Punk clip correctly played after picking it and clicking through).
- ✅ Beat 3 (was beat 2): **"Honorarium payout successful — €1,800"** feedback, then advances to `Publish.tsx`.
- `lib/scenes.ts`'s `video-gen` beat count bumped 3 → 4 to fit the reinstated beat.

**Open/nice-to-have:**
- No select-confirm sound cue yet on hover/click for the style cards.
- These 3 clips are stand-ins, not final production assets — swap the files in
  `public/videos/pick-your-style/` if/when real ones are ready; filenames/paths can stay the same.
- The Street-Fighter character-select *portraits* for Sehouli/Prelog/Paula Cramer are obsolete for this
  scene (that roster lives on only as real photos in `SpeakerSelect.tsx`, a different beat).

## Scenes 6–7 — Submit → publish → Pharma notified

**Build:**
- ✅ Submit → publish flow (`Publish.tsx`), combined into one scene (both beats are quick hand-offs).
- 🟡 Published-video "platform page" is a simple confirmation view, not a dashboard-style listing page —
  covers the beat, could be built out further.
- ✅ **View-counter slot-machine animation**: `setInterval`-driven ease-out digit tick-up, no library.

**❌ Planned redesign (Captain's call, 2026-07-22 — not yet built):** after clicking Submit/Publish
Video, the stats should **never stop climbing** — a genuinely endless live counter, not today's
`ViewCounter`, which eases up once from 0 to a fixed `FINAL_VIEWS = 48213` over 40 frames and then
simply stops. Visual bar: **reuse the `/ops-dashboard` look** (`components/ops-dashboard/OpsDashboard.tsx`'s
`LiveNumber` — eases toward an ever-rising target every frame instead of snapping, plus that dashboard's
card/stat-tile visual language and "LIVE" badge) as the base, rather than inventing a new visual style
here. On top of that: **a slot-machine-style graphic** — a bit cooler/more complex than the current plain
digit tick-up (individual reel-like digit columns, not just one easing number), while staying **very
clean/tidy**, not busy. Concretely: likely several stat tiles (views, CME certificates, engagement — see
`Payoff.tsx`'s `STATS` for the existing numbers this could absorb/supersede) each driven by their own
never-ending `LiveNumber`-style counter, laid out like `OpsDashboard.tsx`'s header stats row.

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
  not app engineering. App-side (`DxReel.tsx` + `Stinger.tsx`) render as a reskinned YouTube-style watch
  page (`components/scene/YouTubePage.tsx`, `56vh`-capped player + a labeled placeholder standing in for
  the real edit) with Gen-Z titles/easter eggs; swap the player placeholder for a real `<video>` once the
  edit exists.

**Assets needed:**
- The edited highlight-reel video itself (Slack notification montage, beer, sales gong, "money money
  money" spam) — owned by the pitch/story track, not the build track.

**Related, separate:** `/money-boy` (`components/money-boy/`) is a **standalone** full-screen Slack-clone
animation — not part of the deck/scene sequence — that loops "Money Boy" deal-closed messages forever
with escalating numbers. It's a candidate **live second-screen/background-monitor feed** for this beat
(real-time and endless, vs. `DxReel.tsx`'s baked-in mini feed) — pick one or run both if there's a second
screen available; they're not meant to be merged.

**Also related, separate:** `/ops-dashboard` (`components/ops-dashboard/`) is a **second** standalone
animation — 8 parallel example-customer projects auto-progressing through a 5-stage pipeline, a live-
climbing total-revenue counter, cards flying out/in on completion. Same "own browser window, runs
forever, no backend" pattern as `/money-boy`. Good as a second monitor next to Money Boy's Slack feed, or
on its own during the checkout/briefing beats to sell "meanwhile, elsewhere, more deals are closing."

## Cross-cutting engineering tasks

- ✅ Scene-sequence shell (`SceneController.tsx`, `lib/scenes.ts`): ordered array of scene components +
  `currentScene` state + persistent bottom-right "Next" control + arrow-key shortcut.
- ✅ Reusable **transition component** (`PersonaTransition.tsx`): curtain-wipe, fires only on persona
  switch. GTA-style swoop alternate not built — curtain covers the requirement for now.
- ❌ Reusable **"bonus button" pattern** — still hand-rolled per screen (Checkout, Briefing, Video Gen
  each duplicate the primary+sibling markup). Works for the MVP; worth extracting if more screens need it.
- ❌ Confetti/celebration micro-animation utility — not built yet; completion moments currently use
  simple state-swap reveals, no confetti.

## ⚠️ Notion SSOT has moved ahead of the app — reconcile before the run-through

The Notion storyboard was rewritten (independently of this file) into a **5-act structure** with
renamed characters (Narrator separated from Kalle Feierabend, Pia Pharma, Prof. Dr. Ego von Whitecoat,
Corporate Bernd, KAI cut entirely), **no pizza joke topic**, and a new Act 4 ("Meanwhile, on a Beach").
The app (`lib/scenes.ts`, `ColdOpen.tsx`, `lib/demo-state.tsx`'s `JOKE_TOPIC`, etc.) still reflects the
**old 4-act structure**. This is flagged directly on the Notion page's own "Open items" list too — it's
not a small diff, it's a full narrative reconciliation (scene count, character names, the joke topic,
a brand-new beach interstitial scene) and deserves its own pass rather than being folded into an
unrelated change. Tracking here so it isn't lost.

## Open items from the 2026-07-22 follow-up call (not yet built)

Logged in Notion's "Additional story details" section in full; engineering-relevant subset:

- ❌ Slide-builder split editor: generated slides left / generated transcript right / one big
  "Generate Your Video" button beneath, with an immediate cash-out gag ("$1,800 paid out") on click.
  Currently `ReferentUpload.tsx` only has the upload → AI-cleanup beat; this is a further step past that.
- ❌ Avatar step: an outfit/style picker framed as "which car do you want to drive today?" (joke option:
  "Lederhosen"), plus a real ~5s preview clip after generation instead of the static `VideoPlaceholder`
  done-state. Depends on what's feasible with HiggsField (or similar) by Wednesday.
- ❌ Publish polish: a cash icon/number popping in top-right the moment the Referent submits; a nicer
  button treatment for "Publish Video" than the current default `Button`.
- 🟡 Leo's iPhone: rebuilt as a real chat-app UI replica with a full invented Gen-Z conversation history
  (`LeosIphone.tsx` — see CHANGELOG). Still-open stretch goals: a real background photo (Leo's own
  LinkedIn/Instagram) instead of the current solid-colour wallpaper placeholder, a voice-cloned line
  instead of/alongside the text bubble, a mood-shifting music cue.
- ❌ Cold-open framing device: homeless-person-on-the-ground hook before the title card, narrator
  picking up with "It was July 22nd, the first FlixGames had just begun…" — pure staging/narration, no
  code needed unless the team wants it echoed on-screen too.

## Open questions

- Likeness/approval check for using Sehouli, Prelog, and Paula Cramer as named "pick your fighter"
  avatars — confirm with them (or get sign-off) before finalizing the character-select art.
- Whether Scene 5's avatar-speaking preview uses a real AI-avatar output or a mocked static asset depends
  on how far Moritz's pipeline integration gets by Wednesday — track alongside the password-recovery
  item in [Notion storyboard](https://app.notion.com/p/doctorflix/FlixGames-Hackathon-Pitch-Storyboard-EN-3a525482863c818c9dc3d49cf9d062a5) / meeting notes.
