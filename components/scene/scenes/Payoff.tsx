"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import { DashboardShell } from "@/components/scene/DashboardShell";
import { useDemoState } from "@/lib/demo-state";

const STATS = [
  { label: "Views", target: 10_000_000 },
  { label: "CME Certificates", target: 1930 },
  { label: "Engagement", target: 64, prefix: "+", suffix: "%" },
];

// Counts up from 0 to target on mount — the numbers arriving is the payoff
// moment, so every stat animates (not just Views, which used to be the only
// one that moved before this slide had its own life separate from Publish).
function CountUp({
  target,
  prefix = "",
  suffix = "",
  duration = 1600,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    let raf: number;
    function tick(t: number) {
      if (startRef.current === null) startRef.current = t;
      const progress = Math.min(1, (t - startRef.current) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return (
    <>
      {prefix}
      {value.toLocaleString("en-US")}
      {suffix}
    </>
  );
}

// The Reporting slide, inside the Pharma dashboard (Reports tab) — reached when
// Pharma clicks through from the live project. Views live here only (Publish
// no longer shows a counter — showing it in both places doubled up the beat).
// No actor-direction subtext.
export function Payoff() {
  const { topic } = useDemoState();
  return (
    <DashboardShell active="reports">
      <div className="flex min-h-full flex-col gap-6 px-8 py-8">
        <div>
          <h1 className="text-2xl font-bold">Reporting</h1>
          <p className="text-sm text-muted-foreground">{topic.title}</p>
        </div>

        <div className="max-w-3xl rounded-3xl border border-border bg-card p-8">
          <div className="grid grid-cols-3 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-muted/30 p-5 text-center">
                <div className="font-heading text-3xl font-bold text-brand">
                  <CountUp target={s.target} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button className="animate-pulse rounded-md border-2 border-yellow-400 bg-yellow-300 px-4 py-3 text-sm font-black uppercase text-red-700 shadow-[0_0_0_3px_#fff,0_0_0_5px_#ef4444]">
              Shift Whole Business Unit to Doctorflix and Retire Me
            </button>
            <button className="rounded border border-border px-2 py-1 text-[10px] text-muted-foreground hover:text-foreground">
              Maybe Just a Vacation
            </button>
          </div>

          {/* WhatsApp-style share gag */}
          <button className="mx-auto mt-6 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:brightness-105">
            <MessageCircle className="size-4 fill-white" />
            Tell your pharma friends about it
          </button>
        </div>
      </div>
    </DashboardShell>
  );
}
