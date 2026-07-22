# FlixGames Onboarding & Storyboard Deep-Dive — 2026-07-22

Participants: Franz von Esebeck (recorded solo while walking the team through setup live)

## Team onboarding (GitHub + Claude Code)

Franz walked the team through getting set up on this repo with Claude Code:

- Everyone opens **Claude Code** on their machine, points it at a local `flixgames`-style folder, and
  gives it the repo's clone URL — Claude Code handles `git`/GitHub end-to-end (install Homebrew/Git if
  missing, clone, and later commit/push) without anyone needing to touch raw terminal commands or the
  GitHub UI directly.
- Everyone needs to **accept the GitHub repo invite** (sent by email, or check GitHub's own
  notifications) before Claude Code can clone it.
- **Model choice:** Sonnet is genuinely sufficient for this project, including agentic/orchestration
  work, and is much cheaper than Opus — Claude also scales its own effort to task complexity. No need
  to default to a bigger/pricier model "just in case."
- Practical tip: turn on **auto-accept** in Claude Code so it doesn't stop for confirmation on every
  small step.

## Storyboard deep-dive — the demo, scene by scene

This call fleshed out the pitch storyboard from the 2026-07-20 tactics call into a concrete scene
sequence and, critically, a **demo philosophy** for how much of each step to actually build. The full
scene-by-scene script now lives in [`../STORYBOARD.md`](../STORYBOARD.md) — this section captures the
reasoning behind it.

### Core principle: oversimplify, don't build full functionality

The single most important steering point from this call: **every screen should show the user-facing
idea in one glance, not a fully working form.** Concretely —

- Don't build a 20-field briefing form. Show **2–3 real, clickable fields** (e.g. "pick your favorite
  speaker") and leave the rest as **grey, non-functional placeholders** that just *suggest* more
  configuration exists.
- This is not a "we ran out of time" excuse — it's a deliberate choice, made explicitly *before*
  building, to keep every screen readable in a few seconds during a live pitch.
- Voice input (e.g. "I'd like a 45-minute cardiology video" auto-filling the form) is a nice-to-have
  **stretch idea**, not a v1 requirement — build the clickable core first, layer voice on only if time
  allows.

### Scene sequence (see [`STORYBOARD.md`](../STORYBOARD.md) for the full script)

1. Pharma browses the topic shop, picks a topic, configures the offer (video + add-ons), pays
   (simulated PayPal), and — new detail — **books the Referent directly** as part of checkout.
2. Pharma fills the Pre-Kick-Off briefing (2–3 real fields + grey placeholders, per the principle
   above), then is "done" — the demo narrative sends them on vacation.
3. Switch personas: the **Referent** gets notified of the new booking while watching a Doctorflix CME
   video (getting their own continuing-education credits — a nice reflexive gag), then sits down and
   builds the presentation in the (yet-to-be-built) simple slide builder.
4. Callback to the Murphy's Law gag from the kickoff: the Referent could feed in a deliberately ugly
   PowerPoint and have the AI turn it into something usable ("turning shit into gold").
5. Video generation is **credited transparently** to Moritz's existing avatar pipeline (upload a
   recording → transcript → AI avatar → automated animation) — Franz NDA'd this early and is folding it
   in rather than reinventing it. Pitch framing: *"a lot of this builds on work others already started —
   the innovation is that the whole thing now runs end-to-end, on its own."* Also floated: skip live
   recording entirely by having the Referent consent to reuse their AI avatar, with an agentic step
   handling calendar/booking if a real recording session is still needed.
6. Video publishes; Pharma gets notified while heading to the airport.
7. Time-skip: **one month later**, Pharma pulls up great numbers and shows their boss — "that was so
   easy, [almost quit joking about it]" gag.
8. **DX-employee interstitials**, cut in between scenes or as a closing montage: the beer-drinking DX
   employee watching an over-the-top-edited highlight reel of Slack notifications — a sales **gong**
   sound/animation firing on every closed deal (an old in-office sales tradition), exaggerated
   "money money money" Slack spam, a teammate ("Manni") sliding in to celebrate. Dramatic/over-the-top
   music encouraged.
9. **Optional stinger ending:** six months further into the future, an AI-generated clip of Hans and Leo
   (founders) realizing the whole team is now redundant — self-deprecating "we probably shouldn't have
   built FlixGames" gag, played for laughs, Rolls-Royce joke included.

### Staging idea (optional, gauge team appetite)

Multiple teammates could physically play different "Referent" candidates on stage, swapping in and out
to visualize a live digital/human handoff, before one of them "sits down" and the screen takes over.
Fun if the team is up for performing it; not required for the demo to land.

### Anticipated pitch pushback — how to defend it

Framing to have ready for Q&A: this is explicitly **not** a typical hackathon "working software" demo —
FlixGames (formerly "Hackathon") is judged on **innovation and creativity**, so the pitch leans into idea
and narrative over polished engineering. If challenged on "this isn't how it'd really work end to end,"
the defense is the **autonomy ladder**: today's real process already has human review loops; the pitch
shows the *target state* of full automation, reached by *gradually removing* humans from the loop step
by step — not by skipping review on day one.

## Proposed team split (build vs. pitch/story) — confirm Wednesday morning

Franz's proposal on the call, to be confirmed/adjusted once the full team is together Wednesday:

- **Build track — Franz + Daniel (Captain):** the actual click-dummy (this repo), stitching the
  pre-built assets into the storyboard, fake seams (checkout, slide builder, DX feed).
- **Pitch/story track — Emma, David, Carolina:** the narrative and "theater-play" blocking (who plays
  which persona, when the screen switches), the DX-employee gag montage/edit, virtual-background /
  avatar-filter polish for the Referent recording simulation (a look already tested live in the
  2026-07-20 call), and the ROI numbers + presentation format (live demo vs. demo+deck) for the pitch.

See [`../../CLAUDE.md`](../../CLAUDE.md) → *Team & roles* for the durable version of this split.
