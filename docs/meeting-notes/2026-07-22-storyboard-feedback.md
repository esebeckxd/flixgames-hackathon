# FlixGames Storyboard Review — 2026-07-22 (afternoon)

Participants: Franz von Esebeck (recorded live with Daniel and the team while reviewing the
AI-generated [`../STORYBOARD.md`](../STORYBOARD.md) draft)

The team read through the first storyboard draft together and gave line-by-line feedback. This session
is a **revision pass**, not a new concept — it tightens timing, casts named characters, and makes a
concrete decision on how the demo is technically assembled. The resulting rewrite lives in
[`../STORYBOARD.md`](../STORYBOARD.md); this note captures the reasoning.

## Hard constraint that changes everything: 7-minute pitch slot

The pitch has a **7-minute time limit** — confirmed on the call, and it reframes the whole plan:

- Budget roughly **10–15 seconds per scene/interaction** — anything requiring a longer setup (big scene
  changes, costume swaps) needs to be trimmed or cut.
- The **last ~60 seconds are reserved** for the pre-cut DX-employee highlight-reel video — that's the
  planned closing beat, not squeezed in alongside everything else.
- Given the time pressure, some beats are explicitly **optional / cut first**: the one-month payoff
  (Pharma showing numbers to their boss) and the six-month stinger ending are both "if time allows," in
  that priority order (stinger goes first if something has to give).
- The **spoken pitch (narrator lines, character dialogue) should be in English**; the on-screen product
  UI can stay German — that matches the existing pre-built assets (landing page, cost configurator,
  briefing form are all German-market Doctorflix products) and is more believable. Confirm this split on
  Wednesday if anyone disagrees.

## Persona-focused rewrite: name the cast, don't just describe roles

Core note from the room: **the storyboard needs to be persona-focused with recognizable characters**,
not steps described abstractly. The goal: someone should recognize *who* a character is and *what they
want* from their name and costume alone, without an introduction.

- **New character: a Narrator.** Guides the audience through the pitch, fills in context between
  screens ("on a cold winter night, the Referent lay on the couch scrolling…"), and can be handed
  deliberately silly scripted lines to read aloud at transitions.
- **New character: an old-school Pharma boss/chef.** Dismissive at the start ("we've always done it this
  way," sends the marketing assistant off with something like "just make a TV video, come back in six
  months") — then reappears at the end, throws his hands up in amazed disbelief at the results, and
  claims the win as his own success to *his* boss (gets "promoted to Senior Vice President" — an
  old-white-guy-takes-the-credit gag).
- **Confirmed:** all personas are **played by the team themselves**, in costumes assembled from whatever
  people have at home (lab coat for the doctor/referent look, a cycling helmet as a stand-in "referent
  hat," handwritten signs if needed). Costumes get decided the night before.
- **Open item for the story track:** actual funny names for each character — recognizable-by-name is the
  goal, nothing landed yet. Also open: the line-by-line script (what each character actually says at
  each beat) — the team wants this drafted as a **separate planning document** (a Notion page was
  floated) so the narrative can be reviewed independently of the code build. Claude currently has no
  Notion access in this session (would need the Notion connector authorized) — a first-draft skeleton
  (cast list + numbered scenes) now lives directly in [`../STORYBOARD.md`](../STORYBOARD.md) as a
  starting point; move/expand it into Notion if the team wants a separate live doc.

## Build format decision: a deterministic "presentation," not a free-roam app

Explicitly decided on the call: this should **not** be built as a normal multi-page app where the
presenter has real navigation choices — too risky live. Instead:

- Build it as **one fixed, linear sequence of full-screen scenes**, advanced with a persistent
  bottom-right **"Next" control** (and/or a keyboard shortcut) — the same click/key every time, in a
  pre-planned order. "The technology follows the storyline, not the other way around."
- Each scene should still *look* like a real platform/browser UI (so it's convincing), but there's no
  real navigation happening underneath — it's a deterministic path, closer to a slide deck than a
  multi-route app.
- Between an "actor" beat (a teammate physically on stage) and an "on-screen UI" beat, insert a clear
  transition cue — a black screen, a curtain-drop animation, or dimmed lighting — so the audience knows
  where to look.
- Staged idea, confirmed as wanted: when Pharma picks a Referent, **three teammates physically appear
  on stage** as candidate referents (with joke titles — Doktor, Professor, etc.), Pharma "picks" one, the
  other two leave, and the chosen one sits down at the computer — the screen then takes over the story.

## New comedy beats to fold into the script

- **Checkout — company card / budget gag:** alongside (or instead of) the faked PayPal flow, show a
  joke-branded company credit card (e.g. a fake "AstraZeneca" card) with a visible remaining budget/limit
  (e.g. "€15,000 left of your €50,000 limit") and a few **absurd fake expense line items** for comic
  effect (e.g. "medications," a wink-wink "bribery trip to Ibiza").
- **Slide builder — the ugly-deck mechanism, made concrete:** the Referent's secretary/assistant digs an
  ancient deck out of the archive ("the deck from 1995"), scans/faxes/emails it over; the Referent
  uploads that trashy deck into the AI slide builder, which cleans it up automatically — a concrete
  version of the "turning shit into gold" Murphy's Law beat.
- **Video generation — "pick your fighter":** the Referent picks an avatar/outfit from a character-select
  style screen, explicitly chooses **AI Avatar over Live Recording**, gets an auto-generated script for
  the slides (edited by nobody — just click through), then clicks "Create Video," a loading state, and a
  preview of the avatar saying something funny.
- **Closing DX-employee highlight reel (the last ~60 seconds):** beer, an over-the-top-edited montage of
  automated Slack notifications, the sales gong firing on every closed deal, exaggerated "money money
  money" Slack spam, a teammate character sliding in to celebrate (an in-joke about a teammate who keeps
  dropping meme soundtracks into the group chat).
- **Six-month stinger, scripted out further:** a WhatsApp text on a founder's phone — "I don't think we
  need any of them anymore" — cut to the team sitting outside like they've been let go, branded T-shirts
  as their only remaining possession, one turns to the other: "we probably shouldn't have presented that
  at FlixGames." A morning-after beat (someone treats themselves to an ironic little luxury) and an
  optional cameo of whoever's blamed for inventing FlixGames in the first place, played for laughs.

## Not actioned in this pass

- Costumes — decided at home the night before, not a repo decision.
- Character names + full line-by-line dialogue — open for the story track (Emma/David/Carolina) to draft;
  a skeleton now exists in [`../STORYBOARD.md`](../STORYBOARD.md) to build on.
- A separate Notion planning page — floated as an idea, not set up (no Notion connector authorized in
  this session).
