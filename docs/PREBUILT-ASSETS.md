# Pre-built assets — what already exists

The FlixGames demo does **not** start from zero. Several pieces of the pipeline are already built and,
in some cases, deployed. The hackathon job is mostly to **stitch these into one storyboard**, fill the
gaps, and fake the seams — not to rebuild what exists.

Pipeline: **Shop → Configure offer → Pay → Briefing → Referent builds → Video published**

| Pipeline step | Asset | Status | Lives where |
|---|---|---|---|
| Shop / topic browsing | Pharma landing page | ✅ Built (standalone HTML) | [`prebuilt-references/pharma-landing-page.html`](prebuilt-references/pharma-landing-page.html) |
| Configure offer + checkout | **Cost Configurator** | 🟡 Built & deployed (Vercel) | `dx-agents` repo → `apps/cost-configurator` |
| Briefing after booking | **Pre-Kick-Off Briefing form** (part of the Handover app) | 🟡 Built & deployed (Vercel) | `dx-agents` repo → `apps/handover` |
| Referent builds presentation | **Simple Slide Builder** | ❌ To build (lightweight, ours) | To build during hackathon |
| Everything else (pay confirm, video-published page, DX Slack feed) | — | ❌ Not built | To build during hackathon |

---

## 1. Pharma landing page — the shop / topic browser

- **What:** on-brand pharma-facing page listing available sponsoring topics, filterable by
  therapeutic area (TA), with a hero + stat row and `mailto:` "Anfragen" CTAs.
- **In this repo:** [`prebuilt-references/pharma-landing-page.html`](prebuilt-references/pharma-landing-page.html)
  (saved as a reference / starting point).
- **Stack:** single static HTML file, inline `<style>`, Be Vietnam Pro, a tiny filter script. No build.
- **Missing assets it references:** `logo.svg`, `bg-hero.svg`, `orb1.svg`–`orb4.svg`. Grab these from
  the Doctorflix brand assets / the cost-configurator's `assets/` before it renders fully.
- **Hackathon role:** this is the entry point of the pipeline (Pharma browses topics). It's where the
  "click a topic → configure an offer" jump into the cost configurator should happen.

## 2. Cost Configurator — configure offer + live price + checkout

- **What:** interactive CME cost configurator for sales. Pharma picks package + formats + add-ons +
  newsletters and sees a live total. Usable live in a call or shareable by link.
- **Lives in:** the **`dx-agents`** repo (`github.com/doctorflix/dx-agents`) under
  `apps/cost-configurator` — **not** copied into this repo (it's a separate, deployed Vercel app; we
  reference it rather than fork it).
  - Local path on Franz's machine: `~/Documents/01 Automation & AI/dx-agents/apps/cost-configurator`
- **Stack:** static HTML/CSS/JS, **no build step**, + two small Vercel Functions (`api/track.js`,
  `api/submit.js`) that post to Slack. Price math is 100% client-side (`js/app.js → calc()`).
- **Where the data lives:** all prices/products in `js/data.js` (`PACKAGES`, `FORMATS`, `HONORAR`,
  `FEATURES`, `DISCOUNTS`, `ADDONS`, `NEWSLETTERS`) — edit there, never touch the logic.
- **Slack triggers:** opening the configurator → `POST /api/track` ("👀 viewed by …", deduped
  1×/email/day); submitting → `POST /api/submit` ("📩 offer: package · items · total"). These feed the
  DX-employee "beer while Slack fills up" gag directly.
- **Note:** its CSS predates Brand Guide v1.0 (uses retired `--df-secondary`/`--df-tertiary`) — see
  [BRANDING.md](BRANDING.md#two-token-set-caveats-dont-get-tripped-up). Password for the deployed
  instance needs recovering (per the 2026-07-20 tactics call).
- **Hackathon role:** the "configure offer → pay" step. The PayPal-checkout / pay-confirmation is the
  bit to fake on top of this.

## 3. Pre-Kick-Off Briefing form — Pharma fills the briefing after booking

- **What:** the standardized briefing form a pharma customer fills out **after booking**, so the
  project kicks off with the right expectations. Part of the **Handover** app
  ("Doctorflix Handover — Pipedrive Panel + Pharma Briefing Survey + Notion Sync").
  - `survey.html` — the pharma-facing "Pre Kick-Off Briefing" form.
  - `panel.html` — an internal Pipedrive sidebar panel; submissions sync to Notion.
- **Lives in:** the **`dx-agents`** repo under `apps/handover` — **not** copied into this repo.
  - Local path: `~/Documents/01 Automation & AI/dx-agents/apps/handover`
- **Stack:** static HTML + Vercel Functions (`api/submit.js`, `api/draft.js`, `api/deal.js`,
  `api/upload.js`, OAuth). Deps include `@notionhq/client`, `@anthropic-ai/sdk`, `@vercel/blob`,
  `@upstash/redis`. Deployed on Vercel.
- **Hackathon role:** the "pays → fills briefing form" step, right after checkout. This is the real
  briefing form — reuse/reference it rather than inventing a new one.

## 4. Simple Slide Builder — referent builds the presentation *(to build, ours)*

- **What:** a **lightweight** slide/presentation builder for the referent step — pick a template,
  drop in the key points, submit. Deliberately simple.
- **Why not Moritz's tool:** Moritz has a full kasuistik builder, but for the pitch we **don't want to
  show too much of his tool** — so we build our own minimal slide builder for the demo instead.
- **Status:** ❌ to build during the hackathon (as a page in this Next.js app).
- **Hackathon role:** the "Referent builds content live → submits → video" step.

---

## What's still to build (hackathon)

The connective tissue between the pre-built pieces (see [../CLAUDE.md](../CLAUDE.md) for constraints):

- Topic-click handoff from the landing page into the cost configurator.
- Pay / PayPal checkout confirmation (faked — no real payment).
- Wiring the Pre-Kick-Off Briefing form into the flow after checkout.
- The **simple slide builder** (referent step) — ours, minimal.
- "Video published" page on the platform.
- DX-employee Slack-style feed (can be driven by the configurator's + handover's real Slack triggers).
- The pitch storyboard tying the three personas together.
