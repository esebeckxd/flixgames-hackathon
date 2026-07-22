# Pitch storyboard

The scene-by-scene script for the live demo, as fleshed out on the 2026-07-22 call (see
[`meeting-notes/2026-07-22-onboarding-storyboard.md`](meeting-notes/2026-07-22-onboarding-storyboard.md)
for the full reasoning). **This is the build target** — build to this storyboard, not the other way
around. Exact scope (what's fully clickable vs. symbolic) gets a final pass Wednesday morning, but the
demo philosophy below is already decided and should guide every screen.

## Demo philosophy — read this before building any screen

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

## Personas

- **Pharma** — young SME marketing assistant, ~mid-20s, ~€10k budget, self-serves without Sales.
- **Referent** — receives the booking, builds the presentation live, submits.
- **DX employee** — drinks a beer while automated Slack updates roll in; the running gag is that the
  team could be replaced by this one beer.

## Scene sequence

### 1. Pharma — topic shop → configure → checkout → book Referent
Pharma opens the dashboard, goes to the shop tab, picks a topic. Configures the offer (video + optional
add-ons, e.g. "Marketing Plus") via the cost configurator. Checks out with a **fully faked,
Stripe/PayPal-styled checkout using joke brand names** — never the real Stripe/PayPal logos/trademarks
(see Hard constraints in [`../CLAUDE.md`](../CLAUDE.md)). As part of checkout, **books a Referent
directly** (referent selection is itself part of the offer, not a separate later step).

*Prebuilt to reference:* [`prebuilt-references/pharma-landing-page.html`](prebuilt-references/pharma-landing-page.html)
(shop) and the `dx-agents` cost configurator (`apps/cost-configurator`) — see
[`PREBUILT-ASSETS.md`](PREBUILT-ASSETS.md).

### 2. Pharma — Pre-Kick-Off briefing
Right after payment, Pharma fills the Pre-Kick-Off briefing: what should the content focus on. Per the
demo philosophy, this is **2–3 real fields** (e.g. pick a focus area, pick a preferred speaker) with the
rest of the real form's fields shown greyed-out/symbolic. Voice input ("I'd like a 45-minute cardiology
video") is the stretch version of this screen.

*Prebuilt to reference:* the real Pre-Kick-Off Briefing form, `dx-agents` repo, `apps/handover`
(`survey.html`) — see [`PREBUILT-ASSETS.md`](PREBUILT-ASSETS.md).

Pharma is now "done" — the narrative sends them on vacation. Hand off to the next persona.

### 3. Referent — notified, sits down, builds
Cut to the **Referent**, watching a Doctorflix CME video (getting their own continuing-education
credits — a small reflexive joke). A notification appears: new booking. They sit down at the computer
and open the (to-be-built) **simple slide builder** — deliberately not Moritz's full kasuistik tool (see
[`PREBUILT-ASSETS.md`](PREBUILT-ASSETS.md#4-simple-slide-builder--referent-builds-the-presentation-to-build-ours)).

**Murphy's Law beat (optional, fun if time allows):** the Referent feeds in a deliberately ugly/trashy
input (e.g. a messy pasted outline) and the AI cleans it into something presentable — "turning shit into
gold," callback to the kickoff's original humor framing.

### 4. Video generation — credit Moritz's pipeline transparently
Video generation is **not reinvented** — it's credited on the pitch as building on Moritz's existing
avatar pipeline (recording → transcript → AI avatar → automated animation), which Franz NDA'd early.
Pitch framing to say out loud: *"a lot of this already existed — the innovation is that the whole
pipeline now runs end-to-end, on its own."*

Optional simplification for the demo: skip live recording entirely — the Referent just consents to
reusing their existing AI avatar, with an agentic step handling any real calendar/booking need in the
background.

### 5. Video publishes — Pharma notified
The video is live on the platform. Pharma gets a notification while, narratively, heading to the
airport — reinforcing "I barely had to do anything."

### 6. Time-skip — one month later, the payoff
Jump forward a month: Pharma pulls up strong numbers (views, engagement) and shows their boss. Punchline
beat: "that was so easy…" (the joke used on the call was Pharma half-joking about quitting because the
job got too easy — keep it light).

### 7. DX-employee interstitials / closing montage
Cut in between scenes, or as one closing montage: the beer-drinking DX employee, an over-the-top-edited
highlight reel of automated Slack notifications, a **sales gong** sound/animation firing on every closed
deal (a nod to the old in-office tradition), exaggerated "money money money" Slack spam, a teammate
character sliding in to celebrate. Lean into dramatic/over-the-top music — this is the comic relief beat
and can be as silly as the team wants.

### 8. Optional stinger — six months further out
If there's appetite for one more beat after the montage: an AI-generated clip of the two founders
realizing the whole team is now redundant — self-deprecating "we probably shouldn't have built this"
gag, played purely for laughs.

## Staging idea (optional)

Multiple teammates could physically play different "Referent" candidates on stage, swapping in and out
to visualize a live digital/human handoff, before one settles in and the screen takes over the story.
Fun flourish if the team wants to perform it; the demo works without it.

## Defending the pitch (Q&A prep)

FlixGames (the hackathon) is judged on **innovation & creativity**, not "does this compile in
production" — the pitch is allowed to lean into idea and narrative over polish. Expected pushback: *"this
isn't really how it'd work end-to-end."* Answer with the **autonomy ladder**: the real-world rollout
already has human review loops today; this demo shows the *target state* of full automation, reached by
gradually removing humans from the loop over time — not by skipping review from day one.
