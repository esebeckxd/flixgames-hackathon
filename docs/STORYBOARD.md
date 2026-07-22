# Pitch storyboard

The scene-by-scene script for the live demo. First drafted after the 2026-07-22 onboarding call, then
revised live with the team against this exact draft — see
[`meeting-notes/2026-07-22-onboarding-storyboard.md`](meeting-notes/2026-07-22-onboarding-storyboard.md)
and [`meeting-notes/2026-07-22-storyboard-feedback.md`](meeting-notes/2026-07-22-storyboard-feedback.md)
for the full reasoning behind each decision below. **This is the build target** — build to this
storyboard, not the other way around. Exact scope gets a final pass Wednesday morning; the format,
timing, and demo philosophy below are already decided.

## Format & timing — read this first, it changes everything else

- **Hard limit: 7 minutes**, total. Budget roughly **10–15 seconds per scene/interaction** — anything
  needing a longer setup (costume swaps, big scene changes) gets trimmed or cut.
- The **last ~60 seconds are reserved** for the pre-cut DX-employee highlight-reel video (Scene 9) — it's
  the planned closing beat, not squeezed in on top of everything else.
- **Cut-first priority if time runs short:** the six-month stinger (Scene 10) goes first, then the
  one-month payoff (Scene 8). The DX highlight reel (Scene 9) is the anchor ending and should not be cut.
- **Spoken pitch (Narrator lines, character dialogue) is in English.** On-screen product UI can stay
  German — that matches the real pre-built assets (landing page, cost configurator, briefing form are
  all German-market Doctorflix products) and reads as more believable. Confirm on Wednesday if anyone
  disagrees.

## Build format — a deterministic presentation, not a free-roam app

Decided on the call: this is **not** a normal multi-page app where the presenter has real navigation
choices — too risky live, and it's not what a 7-minute pitch needs anyway.

- Build **one fixed, linear sequence of full-screen scenes**, advanced by a persistent bottom-right
  **"Next" control** (and/or a keyboard shortcut) — same click every time, pre-planned order. *"The
  technology follows the storyline, not the other way around."*
- Each scene should still **look like a real platform/browser UI** (so it's convincing), but there's no
  real navigation happening underneath it — closer to a slide deck than a multi-route app.
- Between an **actor beat** (a teammate physically on stage) and an **on-screen UI beat**, insert a clear
  transition cue — a black screen, a curtain-drop animation, or dimmed lighting — so the audience knows
  where to look next.
- Practical implication for whoever builds this: structure the app as an ordered array of scene
  components driven by one piece of state (`currentScene`), not as separate routed pages the user
  navigates freely. A scene can still *contain* a realistic-looking mini-flow (e.g. the checkout has its
  own few clicks inside it) — but scene-to-scene order is fixed.

## Demo philosophy — the most important rule for building any single screen

> **Oversimplify. Show the idea in one glance, not a working form.**

- Every screen is the **user-facing view only** — no admin/backend views, no "what's technically behind
  this" detail.
- Pick **2–3 fields/actions per screen that are genuinely clickable**; render everything else as
  **grey, inert placeholders** that just suggest more configuration exists. Do not build a real 20-field
  form — that's already too much for a pitch, even if a full form would be "more realistic." Being too
  accurate here reads as bloat, not thoroughness.
- Prefer a funny, symbolic representation of a step over a technically deeper one. If a step doesn't
  visibly move the story forward in the pitch, it's a candidate to cut or fake.
- **Voice input** (speak requirements → form fills itself) is an explicit stretch goal — build the
  clickable core of a screen first; add voice only if time remains afterward.
- This mirrors two other rules in [`../CLAUDE.md`](../CLAUDE.md): **nothing needs to be deeply
  functional** (clicks/animation that sell the beat, not real logic) and **humor & motion direction**
  (propose an "absurd extra win" bonus button + a small delightful animation on every screen, not just
  where asked). Same "breadth over depth, ten doors and one opens" spirit throughout.

## Cast & characters

All personas are **played by the team themselves**, in costumes assembled from whatever's on hand
(lab coat, a cycling helmet as a stand-in "referent hat," handwritten signs if needed — decided the
night before, not a repo decision). Goal: recognizable by name + costume alone, no introduction needed.

- **Narrator** — guides the audience through the pitch, fills in context between screens ("on a cold
  winter night, the Referent lay on the couch, scrolling…"), reads deliberately silly scripted lines at
  transitions.
- **Pharma Boss / Chef** *(bookend character — appears briefly at the start and the end)* — old-school,
  dismissive: sends the marketing assistant off at the start with something like "just make a TV video,
  come back in six months." Reappears at the end, throws his hands up in amazed disbelief at the
  results, and claims the win as his own success to *his* boss — gets "promoted to Senior Vice
  President" (an old-white-guy-takes-the-credit gag).
- **Pharma / Marketing Assistant** — young SME marketing assistant, ~mid-20s, ~€10k budget, self-serves
  fast without Sales. The persona actually driving the checkout/briefing scenes.
- **Referent(s)** — three teammates physically appear as candidate Referents when Pharma books one
  (joke titles: Doktor, Professor, etc.); Pharma picks one, the other two leave the stage, the chosen one
  sits down and the screen takes over. That one Referent then builds/submits the content.
- **DX employee** — drinks a beer while automated Slack updates roll in; the running gag is that the
  team could be replaced by this one beer.

**Open item for the story track:** actual funny, recognizable names for each character haven't landed
yet — that's Emma/David/Carolina's call. Also open: the full line-by-line script (what each character
says at each beat). The team floated drafting that as a **separate Notion page** so the narrative can be
reviewed independently of the code; no Notion connector is authorized in this Claude session, so a
first-draft skeleton lives directly in this file (the scene list below) — move/expand it into Notion if
the team wants a standalone live doc.

## Scene sequence

### 1. Cold open — Pharma Boss, dismissive
The old-school Pharma Boss, unimpressed, hands the project off: *"just make a TV video, come back in six
months."* Sets up the contrast for the ending. ~10s, cuttable if time is very tight.

### 2. Pharma — topic shop → configure → checkout → book Referent
Pharma opens the dashboard, goes to the shop tab, picks a topic. Configures the offer (video + optional
add-ons, e.g. "Marketing Plus") via the cost configurator. Checks out with a **fully faked,
Stripe/PayPal-styled checkout using joke brand names** — never the real Stripe/PayPal logos/trademarks
(see Hard constraints in [`../CLAUDE.md`](../CLAUDE.md)).

**Checkout gag:** alongside (or instead of) the faked PayPal flow, show a joke-branded company credit
card (e.g. a fake "AstraZeneca" card) with a visible remaining budget/limit ("€15,000 left of your
€50,000 limit") and a couple of absurd fake expense line items for comic effect (e.g. "medications," a
wink-wink "bribery trip to Ibiza").

As part of checkout, **books a Referent directly** — staged live: three teammates appear on stage as
candidate Referents, Pharma picks one, the other two leave, the chosen one sits down at the computer.

*Prebuilt to reference:* [`prebuilt-references/pharma-landing-page.html`](prebuilt-references/pharma-landing-page.html)
(shop) and the `dx-agents` cost configurator (`apps/cost-configurator`) — see
[`PREBUILT-ASSETS.md`](PREBUILT-ASSETS.md).

### 3. Pharma — Pre-Kick-Off briefing
Right after payment, Pharma fills the Pre-Kick-Off briefing: what should the content focus on. Per the
demo philosophy, this is **2–3 real fields** (e.g. pick a focus area, pick a preferred speaker) with the
rest of the real form's fields shown greyed-out/symbolic. Voice input ("I'd like a 45-minute cardiology
video") is the stretch version of this screen.

*Prebuilt to reference:* the real Pre-Kick-Off Briefing form, `dx-agents` repo, `apps/handover`
(`survey.html`) — see [`PREBUILT-ASSETS.md`](PREBUILT-ASSETS.md).

Pharma is now "done" — the narrative sends them on vacation/to the airport. Hand off to the Referent.

### 4. Referent — notified, sits down, builds
Cut to the **Referent** (the one picked in Scene 2), on the couch scrolling, or watching a Doctorflix
CME video (getting their own continuing-education credits — a small reflexive joke). A notification
appears — both narrated *and* visible on-screen as a UI toast/pop-up: new booking. They sit down at the
computer and open the (to-be-built) **simple slide builder** — deliberately not Moritz's full kasuistik
tool (see [`PREBUILT-ASSETS.md`](PREBUILT-ASSETS.md#4-simple-slide-builder--referent-builds-the-presentation-to-build-ours)).

**The ugly-deck mechanism (Murphy's Law beat):** the Referent's secretary/assistant digs an ancient deck
out of the archive ("the deck from 1995"), scans/faxes/emails it over. The Referent uploads that trashy
deck into the AI slide builder, which cleans it up automatically — "turning shit into gold."

### 5. Video generation — "pick your fighter," credit Moritz's pipeline transparently
The Referent picks an avatar/outfit from a character-select style screen ("pick your fighter"),
explicitly choosing **AI Avatar over Live Recording** — no real recording needed. An auto-generated
script appears for the slides (edited by nobody — just click through), then the Referent clicks "Create
Video," a loading state runs, and a preview shows the avatar saying something funny.

Video generation itself is **not reinvented** — credited on the pitch as building on Moritz's existing
avatar pipeline (recording → transcript → AI avatar → automated animation), which Franz NDA'd early.
Pitch framing to say out loud: *"a lot of this already existed — the innovation is that the whole
pipeline now runs end-to-end, on its own."*

### 6. Referent submits — cut back to Pharma
The Referent submits. Scene transitions (black screen / curtain / narrator line) back to Pharma, now
heading to the airport, glancing at their phone: *"Video is live!"*

### 7. Video publishes — Pharma notified
The video is live on the platform. Pharma gets a notification while, narratively, on the way to
vacation — reinforcing "I barely had to do anything."

### 8. Optional — one month later, the payoff *(cut first if time is tight after the stinger)*
Jump forward a month: Pharma pulls up strong numbers (views, engagement) on their dashboard and shows
their Boss. Punchline: the Pharma Boss (Scene 1's dismissive character) throws his hands up in amazed
disbelief and claims the win as his own to *his* boss — gets "promoted to Senior Vice President."

### 9. DX-employee highlight reel — the closing ~60 seconds (do not cut)
Hard cut into the pre-cut highlight-reel video: the beer-drinking DX employee, an over-the-top-edited
montage of automated Slack notifications, the **sales gong** firing on every closed deal (a nod to the
old in-office tradition), exaggerated "money money money" Slack spam, a teammate character sliding in to
celebrate (in-joke: a teammate who keeps dropping meme soundtracks into the group chat). Lean into
dramatic/over-the-top music — this is the comic relief beat and can be as silly as the team wants.

### 10. Optional stinger — six months further out *(cut first if time is tight)*
A WhatsApp text on a founder's phone: *"I don't think we need any of them anymore."* Cut to the team
sitting outside like they've been let go, branded T-shirts as their only remaining possession, one turns
to the other: *"we probably shouldn't have presented that at FlixGames."* A morning-after beat (someone
treats themselves to an ironic little luxury) and an optional cameo of whoever gets blamed for inventing
FlixGames in the first place, played purely for laughs.

## Staging & transitions

- **Actor ↔ screen handoff:** black screen, curtain-drop animation, or dimmed lighting between a
  physical-actor beat and an on-screen UI beat, so the audience always knows where to look.
- **Referent line-up (Scene 2):** three teammates on stage as candidate Referents with joke titles;
  Pharma picks one, the other two exit, the chosen one sits at the computer.
- **Background monitor:** where practical, keep a visible screen in the background reflecting the live
  on-screen action (e.g. the checkout happening) while an actor is in front of camera.
- **On-screen notifications should be visible, not just narrated** — a real toast/pop-up in the UI, not
  only a spoken line.

## Open items for the story track

- Funny, recognizable character names (none landed yet).
- Full line-by-line dialogue per scene — first-draft skeleton is the scene list above; expand it (in this
  file or a Notion page, team's call).
- Costumes — decide the night before.
- Final call on cutting Scene 1 (cold open) and/or Scenes 8/10 (optional beats) once real run-throughs
  reveal actual timing.

## Defending the pitch (Q&A prep)

FlixGames (the hackathon) is judged on **innovation & creativity**, not "does this compile in
production" — the pitch is allowed to lean into idea and narrative over polish. Expected pushback: *"this
isn't really how it'd work end-to-end."* Answer with the **autonomy ladder**: the real-world rollout
already has human review loops today; this demo shows the *target state* of full automation, reached by
gradually removing humans from the loop over time — not by skipping review from day one.
