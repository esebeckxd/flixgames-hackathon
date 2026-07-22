"use client";

import { useEffect } from "react";
import { playNotification } from "@/lib/sound";

export function LeosIphone() {
  useEffect(() => {
    playNotification();
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 bg-gradient-to-br from-[#1A2133] via-[#22304a] to-[#0B5A54] px-8 text-center">
      <span className="text-sm font-bold uppercase tracking-[0.25em] text-white/60">
        Leo&rsquo;s iPhone
      </span>

      {/* Phone frame */}
      <div className="relative flex h-[520px] w-[260px] flex-col overflow-hidden rounded-[2.5rem] border-[6px] border-black bg-black shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)]">
        <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
        <div className="flex h-full flex-col bg-[#f5f5f5] px-3 pt-9">
          <div className="mb-4 text-center text-xs font-semibold text-black/70">Hans</div>
          <div className="flex flex-1 flex-col justify-end gap-2 pb-6">
            <div className="max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-[#e5e5ea] px-4 py-2.5 text-left text-sm text-black">
              Do we need them anymore?
            </div>
            <div className="self-start text-[10px] text-black/40">now</div>
          </div>
        </div>
      </div>
    </div>
  );
}
