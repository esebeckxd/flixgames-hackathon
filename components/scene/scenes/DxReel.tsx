"use client";

import { useEffect, useState } from "react";
import { VideoPlaceholder } from "@/components/scene/VideoPlaceholder";

const MESSAGES = [
  "💰 Neues Angebot: Epilepsie CME · 8.400 €",
  "💰 Konfigurator geöffnet von AstraZeneca",
  "🔔 Referent hat Video eingereicht",
  "💰 Angebot abgesendet · Marketing Plus M",
  "🎉 Video live! Money money money",
];

export function DxReel() {
  const [visible, setVisible] = useState(1);
  const [gong, setGong] = useState(false);

  useEffect(() => {
    if (visible >= MESSAGES.length) return;
    const t = setTimeout(() => {
      setVisible((v) => v + 1);
      setGong(true);
      setTimeout(() => setGong(false), 260);
    }, 900);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div className="mx-auto flex h-full w-full max-w-4xl flex-col justify-center gap-6 px-6 py-10">
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card p-6">
          <span className="text-5xl">🍺</span>
          <p className="text-center text-sm text-muted-foreground">
            DX employee, feet up, one beer. The team could be replaced by this beer.
          </p>
        </div>
        <div className="flex flex-col gap-2 rounded-2xl border border-border bg-[#1A2133] p-4 text-white">
          <div className="mb-1 flex items-center justify-between text-xs text-white/50">
            <span>#sales-feed</span>
            {gong && <span className="animate-pulse text-lg">🔔 GONG</span>}
          </div>
          {MESSAGES.slice(0, visible).map((m, i) => (
            <div
              key={i}
              className="rounded-lg bg-white/5 px-3 py-2 text-sm animate-in fade-in slide-in-from-bottom-2"
            >
              {m}
            </div>
          ))}
        </div>
      </div>
      <VideoPlaceholder label="DX-employee highlight reel — beer, gong, money-spam montage (~60s closer)" />
    </div>
  );
}
