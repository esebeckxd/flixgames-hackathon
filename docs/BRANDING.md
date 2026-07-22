# Branding & visual choices — Doctorflix CI

Everything we build for FlixGames must look like Doctorflix. This page is the short version;
the definitive source is the **Doctorflix Brand Guide v1.0** (see [source](#source-of-truth)).

## The UI foundation: shadcn/ui, themed to Doctorflix

The FlixGames app is **Next.js + shadcn/ui + Tailwind v4**, and shadcn is the basis for all UI
(buttons, inputs, cards, dialogs…). The Doctorflix CI is already mapped onto the shadcn theme:

- **Theme tokens** live in [`../app/globals.css`](../app/globals.css) — `:root` (light = Doctorflix
  default, page bg `#F3F6FB`) and `.dark` (bg `#1A2133`). This is the **source of truth for the app**.
- **Build with the theme utilities**, not hex values: `bg-background`, `text-foreground`, `bg-card`,
  `bg-primary` (dark navy — the main CTA), `bg-brand` / `text-brand-foreground` (**MedTeal accent**),
  `border-border`, `ring-ring` (teal focus). Don't hardcode colors in components.
- **Buttons are pill-shaped** — the `Button` base is `rounded-full`, plus a custom `accent` variant
  (`variant="accent"`) that is MedTeal for in-app brand actions. Main CTA stays `default` (dark navy).
- **Font** is Be Vietnam Pro, wired via `next/font` in [`../app/layout.tsx`](../app/layout.tsx) and
  exposed as `font-sans` / `font-heading`.
- Add more components with `npx shadcn@latest add <name>` — they inherit the theme automatically.

> **[`design-tokens.css`](design-tokens.css)** remains the plain-CSS reference (raw hex values, and for
> any non-Next surface). For the app itself, the shadcn theme in `globals.css` is authoritative.

## The signatures (get these right and it reads as Doctorflix)

1. **MedTeal `#159F95`** is the brand color — accent / in-app actions. On dark backgrounds use `#0EC1B7`.
2. **Be Vietnam Pro** is the only typeface (weights 300/400/500/700).
3. **Page background is `#F3F6FB`**, never pure white. Cards are white `#FFFFFF`.
4. **Buttons & chips are always pill-shaped** (`border-radius: 100px`).
5. **Text is only** `#1A2133` (black), `#FFFFFF` (white), or their tints — plus MedTeal for a single
   accent word in a headline. **Never** use secondary/tertiary/orb colors as text.
6. **Primary CTA is dark `#1A2133`**, teal is the accent — not the other way around.

## Color model (order matters): Background → Surface → Text → Accent

- **Background** — a pastel tone, light grey, or MedTeal, often with a blurred **Orb**.
- **Surface** — boxes, labels, cards, the Arrow element.
- **Text** — black/white/tints (+ MedTeal accent word).
- **Accent** — MedTeal, or sparingly one neon/pastel from the orb palette for badges/highlights/orbs.

## Visual elements

- **Orbs** — blurred circular gradients from the secondary/tertiary palette; add depth to hero/card
  backgrounds, often masked with a photo. This is the characteristic Doctorflix signature element.
  The pharma landing page uses `orb1–4.svg` behind cards on hover (see reference below).
- **Arrow** — the twisted ribbon/arrow shape from the logo, for covers and low-content layouts.
- **Dotted pattern** — dot-grid texture for heroes and presentation backgrounds.

## Living references in this repo

- [`design-tokens.css`](design-tokens.css) — the tokens, ready to paste in.
- [`prebuilt-references/pharma-landing-page.html`](prebuilt-references/pharma-landing-page.html) —
  a **real, on-brand** page. Copy its patterns: nav, hero with stat row, TA-colored topic cards with
  orb-on-hover, pill filter buttons, `mailto:` CTAs. Note: it references `logo.svg`, `bg-hero.svg`,
  `orb1–4.svg` which are **not** in this repo yet (see [PREBUILT-ASSETS.md](PREBUILT-ASSETS.md)).
- **Cost configurator CSS** (in the `dx-agents` repo, not here) — the most complete live token set and
  component library: `apps/cost-configurator/css/styles.css`. See [PREBUILT-ASSETS.md](PREBUILT-ASSETS.md).

## Two token-set caveats (don't get tripped up)

- The **cost-configurator predates Brand Guide v1.0**: its CSS still defines `--df-secondary:#2F508B`
  and `--df-tertiary:#EE9214`. Those colors are **retired** in v1.0. For new FlixGames pages use the
  orb/accent palette in [`design-tokens.css`](design-tokens.css), not those two. Don't go "fix" the
  configurator during the hackathon — it's a separate, deployed app.
- The **DOCX letterhead** uses `Nunito`, not Be Vietnam Pro — that's a deliberate legacy exception for
  external letters only. Everything web/slide/app uses Be Vietnam Pro.

## Source of truth

- **Doctorflix Brand Guide v1.0** — Figma: https://www.figma.com/design/VxamzaKvNRfWT39mzZcGyk/Brand-Guide
- PDF export lives at `~/Documents/08 Design/Brand Guide/Brand Guide.pdf` on Franz's machine
  (**~120 MB / 1235 pages — intentionally *not* committed** to keep the repo lightweight; the tokens
  and rules that matter for building are distilled into this file + `design-tokens.css`).
- The `/doctorflix-stylebook` skill encodes these same rules for AI-assisted work.
