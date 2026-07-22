"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* -----------------------------------------------------------------------------
 * GagButton — the star of the show. One or two of these per screen, huge, with
 * the funny line living ON the button. Not a shadcn button on purpose: we want
 * full control over size / wobble / blink for the pitch billboard.
 * -------------------------------------------------------------------------- */

type GagVariant = "primary" | "teal" | "banner" | "ghostbig" | "shy" | "pay";

const GAG_BASE =
  "relative inline-flex items-center justify-center gap-3 rounded-full font-bold " +
  "leading-tight text-center transition-all outline-none select-none " +
  "focus-visible:ring-8 focus-visible:ring-ring/40 active:translate-y-0.5 " +
  "disabled:pointer-events-none disabled:opacity-40";

const GAG_VARIANTS: Record<GagVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_18px_50px_-12px_rgba(26,33,51,0.6)]",
  teal: "bg-brand text-brand-foreground hover:brightness-105 shadow-[0_18px_50px_-12px_var(--brand)]",
  banner:
    "fg-blink border-4 border-[#1a2133] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] uppercase tracking-tight",
  ghostbig:
    "bg-card text-foreground border-2 border-border hover:border-brand hover:text-brand",
  shy: "bg-transparent text-muted-foreground underline underline-offset-4 hover:text-foreground",
  pay: "bg-card text-foreground border-2 border-border hover:border-brand hover:-translate-y-0.5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)]",
};

const GAG_SIZES = {
  hero: "px-10 py-7 text-2xl sm:text-3xl md:text-4xl min-h-[84px]",
  big: "px-8 py-6 text-xl sm:text-2xl md:text-3xl min-h-[72px]",
  pay: "px-6 py-6 text-lg sm:text-xl md:text-2xl min-h-[80px] w-full",
  shy: "px-4 py-2 text-sm sm:text-base",
} as const;

export function GagButton({
  variant = "primary",
  size = "big",
  wobble = true,
  className,
  children,
  ...props
}: React.ComponentProps<"button"> & {
  variant?: GagVariant;
  size?: keyof typeof GAG_SIZES;
  wobble?: boolean;
}) {
  return (
    <button
      className={cn(
        GAG_BASE,
        GAG_VARIANTS[variant],
        GAG_SIZES[size],
        wobble && variant !== "shy" && "fg-hover-wobble",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* -----------------------------------------------------------------------------
 * Confetti — a one-shot emoji/paper burst. Deterministic (seeded) so it can't
 * trip the "no Math.random at module scope" rules and renders identically.
 * -------------------------------------------------------------------------- */

const CONFETTI_EMOJI = ["🎉", "🎊", "✨", "💸", "🥳", "🏖️", "🍹"];

export function Confetti({ pieces = 40 }: { pieces?: number }) {
  const bits = React.useMemo(
    () =>
      Array.from({ length: pieces }, (_, i) => {
        // cheap deterministic pseudo-scatter based on index
        const left = (i * 37) % 100;
        const delay = (i % 10) * 0.06;
        const dur = 2.4 + ((i * 13) % 18) / 10;
        const emoji = CONFETTI_EMOJI[i % CONFETTI_EMOJI.length];
        const size = 18 + ((i * 7) % 22);
        return { left, delay, dur, emoji, size, i };
      }),
    [pieces],
  );
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      {bits.map((b) => (
        <span
          key={b.i}
          className="absolute top-0"
          style={{
            left: `${b.left}%`,
            fontSize: `${b.size}px`,
            animation: `fg-fall ${b.dur}s linear ${b.delay}s forwards`,
          }}
        >
          {b.emoji}
        </span>
      ))}
    </div>
  );
}

/* Money rain — same idea, all 💶, for the "rich" finale. */
export function MoneyRain({ pieces = 28 }: { pieces?: number }) {
  const bits = React.useMemo(
    () =>
      Array.from({ length: pieces }, (_, i) => ({
        left: (i * 53) % 100,
        delay: (i % 12) * 0.18,
        dur: 3 + ((i * 17) % 20) / 10,
        size: 24 + ((i * 11) % 26),
        i,
      })),
    [pieces],
  );
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {bits.map((b) => (
        <span
          key={b.i}
          className="absolute top-0"
          style={{
            left: `${b.left}%`,
            fontSize: `${b.size}px`,
            animation: `fg-fall ${b.dur}s linear ${b.delay}s infinite`,
          }}
        >
          💶
        </span>
      ))}
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * SlotCounter — a number that spins up like a slot machine and lands on target.
 * -------------------------------------------------------------------------- */

export function SlotCounter({
  target,
  durationMs = 2200,
  className,
}: {
  target: number;
  durationMs?: number;
  className?: string;
}) {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    let raf = 0;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / durationMs, 1);
      // ease-out so it decelerates into the final number
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return (
    <span className={cn("tabular-nums", className)}>
      {value.toLocaleString("en-US")}
    </span>
  );
}

/* -----------------------------------------------------------------------------
 * Fake progress bar with a funny label (e.g. "KI liest deine Gedanken… 87 %").
 * onDone fires when it fills, so a scene can reveal the result.
 * -------------------------------------------------------------------------- */

export function FakeProgress({
  label,
  durationMs = 2400,
  onDone,
}: {
  label: string;
  durationMs?: number;
  onDone?: () => void;
}) {
  const [pct, setPct] = React.useState(0);
  const doneRef = React.useRef(false);

  React.useEffect(() => {
    let raf = 0;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / durationMs, 1);
      setPct(Math.floor(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else if (!doneRef.current) {
        doneRef.current = true;
        onDone?.();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs, onDone]);

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-3 text-center text-xl font-bold sm:text-2xl">
        {label.replace("%", `${pct} %`)}
      </div>
      <div className="h-6 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-brand transition-[width] duration-100"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Layout helpers — a full-bleed centered stage + a small act "kicker".
 * -------------------------------------------------------------------------- */

export function Stage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-dvh w-full flex-col items-center justify-center px-6 pb-28 pt-16 text-center",
        className,
      )}
    >
      <div className="fg-stagger flex w-full max-w-4xl flex-col items-center gap-8">
        {children}
      </div>
    </div>
  );
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-brand/10 px-5 py-2 text-sm font-bold uppercase tracking-[0.2em] text-brand sm:text-base">
      {children}
    </span>
  );
}
