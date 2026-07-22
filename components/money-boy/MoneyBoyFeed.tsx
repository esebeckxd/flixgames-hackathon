"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Confetti, MoneyRain } from "@/components/scene/plakativ";
import { MoneyBoyAvatar } from "./MoneyBoyAvatar";
import { TEMPLATES, escalationMultiplier, formatK } from "./messages";

type Msg = {
  id: number;
  dealK: number;
  sponsor: string;
  format: string;
  referent: string;
  funny: string;
  bonusLine?: string;
  mtdK: number;
  ytdK: number;
  time: string;
  mega: boolean;
};

const TICK_MS = 2000;
const MAX_RENDERED = 200;

const CHANNELS = ["general", "vertrieb-alerts", "kaffeeküche", "zufall", "random"];
const DMS = [
  { name: "Money Boy (BOT)", online: true },
  { name: "Kalle Feierabend", online: true },
  { name: "Bernd Bonus", online: false },
  { name: "Prof. Dr. Ego von Kittel", online: true },
];

export function MoneyBoyFeed() {
  const [messages, setMessages] = React.useState<Msg[]>([]);
  const [burst, setBurst] = React.useState<"confetti" | "money" | null>(null);
  const countRef = React.useRef(0);
  const mtdRef = React.useRef(0);
  const ytdRef = React.useRef(0);
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const push = () => {
      const n = countRef.current++;
      const tpl = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
      const mult = escalationMultiplier(n);
      const dealK = Math.round(tpl.baseK * mult * (0.85 + Math.random() * 0.5));
      mtdRef.current += dealK;
      ytdRef.current += dealK;
      const mega = Boolean(tpl.bonusLine) || dealK > 300;

      const msg: Msg = {
        id: n,
        dealK,
        sponsor: tpl.sponsor,
        format: tpl.format,
        referent: tpl.referent,
        funny: tpl.funny,
        bonusLine: tpl.bonusLine,
        mtdK: mtdRef.current,
        ytdK: ytdRef.current,
        time: new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }),
        mega,
      };

      setMessages((prev) => {
        const next = [...prev, msg];
        return next.length > MAX_RENDERED ? next.slice(next.length - MAX_RENDERED) : next;
      });

      if (mega) {
        setBurst(dealK > 500 ? "money" : "confetti");
        window.setTimeout(() => setBurst(null), 2600);
      }
    };

    push(); // first message immediately, then every 2s forever
    const id = window.setInterval(push, TICK_MS);
    return () => window.clearInterval(id);
  }, []);

  React.useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-white font-sans text-[15px]">
      {/* burst effects */}
      {burst === "confetti" && <Confetti key={`c-${messages.length}`} pieces={30} />}
      {burst === "money" && <MoneyRain key={`m-${messages.length}`} pieces={22} />}

      {/* sidebar — keeps Slack's classic aubergine, unlike the now-light main pane */}
      <aside className="flex w-64 shrink-0 flex-col bg-[#3F0E40] text-white/80">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-4">
          <span className="flex size-8 items-center justify-center rounded-md bg-[#0EC1B7] font-bold text-[#1A2133]">
            D
          </span>
          <span className="font-bold text-white">Doctorflix</span>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          <div className="mb-1 px-2 text-xs font-bold uppercase tracking-wide text-white/50">
            Kanäle
          </div>
          <ul className="mb-6">
            {CHANNELS.map((c) => (
              <li key={c}>
                <span
                  className={cn(
                    "block rounded px-2 py-1.5 text-sm",
                    c === "general"
                      ? "bg-white/15 font-bold text-white"
                      : "text-white/60",
                  )}
                >
                  # {c}
                </span>
              </li>
            ))}
          </ul>

          <div className="mb-1 px-2 text-xs font-bold uppercase tracking-wide text-white/50">
            Direktnachrichten
          </div>
          <ul>
            {DMS.map((d) => (
              <li key={d.name} className="flex items-center gap-2 rounded px-2 py-1.5 text-sm text-white/60">
                <span
                  className={cn(
                    "size-2 shrink-0 rounded-full",
                    d.online ? "bg-[#2BAC76]" : "bg-white/25",
                  )}
                />
                {d.name}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* main — light Slack theme */}
      <div className="flex min-w-0 flex-1 flex-col bg-white">
        <header className="flex items-center gap-3 border-b border-black/10 px-6 py-3">
          <h1 className="text-lg font-bold text-[#1D1C1D]"># general</h1>
          <span className="flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">
            <span className="size-1.5 animate-pulse rounded-full bg-red-500" />
            LIVE
          </span>
          <span className="ml-auto text-sm text-black/40">👥 1 Mitglied (Money Boy (BOT))</span>
        </header>

        <div ref={listRef} className="flex-1 overflow-y-auto px-6 py-4">
          {messages.map((m) => (
            <div key={m.id} className="fg-pop mb-5 flex gap-3">
              <MoneyBoyAvatar className="size-10 shrink-0 rounded-md" />
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-[#1D1C1D]">Money Boy (BOT)</span>
                  <span className="rounded bg-black/5 px-1.5 py-0.5 text-[10px] font-bold uppercase text-black/50">
                    App
                  </span>
                  <span className="text-xs text-black/35">{m.time}</span>
                </div>
                <div
                  className={cn(
                    "mt-1 whitespace-pre-line rounded-lg px-3 py-2 text-[#1D1C1D]",
                    m.mega ? "bg-[#0EC1B7]/10 ring-1 ring-[#0EC1B7]/40" : "bg-black/[0.03]",
                  )}
                >
                  <span className="font-bold">💰 MONEY MONEY MONEY 💰</span>
                  {"\n"}
                  {formatK(m.dealK)}k &mdash; {m.sponsor} &mdash; {m.format} @{m.referent}!{"\n"}
                  {m.bonusLine && (
                    <>
                      <span className="font-semibold text-[#0d8f86]">{m.bonusLine}</span>
                      {"\n"}
                    </>
                  )}
                  MTD: {formatK(m.mtdK)}k{"\n"}
                  YTD: {formatK(m.ytdK)}k{"\n"}
                  <span className="text-sm italic text-black/45">{m.funny}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* decorative, non-functional composer */}
        <div className="px-6 pb-5">
          <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 text-black/35">
            <span>😀</span>
            <span className="flex-1 select-none text-sm">Nachricht an #general</span>
            <span>📎</span>
            <span>➤</span>
          </div>
        </div>
      </div>
    </div>
  );
}
