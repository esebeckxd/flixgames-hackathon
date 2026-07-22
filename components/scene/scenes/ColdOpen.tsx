"use client";

import { useState } from "react";
import { GagButton, Kicker, Stage } from "@/components/scene/plakativ";
import { useSceneNav } from "@/components/scene/nav";
import { cn } from "@/lib/utils";

export function ColdOpen() {
  const { next } = useSceneNav();
  const [on, setOn] = useState(false);

  return (
    <Stage className="bg-[#1A2133] text-white">
      <Kicker>Act 1 · The Last Work Day</Kicker>

      <h1 className="text-balance text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
        How We Became <span className="text-[#0EC1B7]">Unemployed</span> and{" "}
        <span className="text-[#0EC1B7]">Rich</span>
      </h1>

      <GagButton
        size="hero"
        variant={on ? "teal" : "primary"}
        className={cn(on && "fg-power", !on && "bg-white text-[#1A2133] hover:bg-white/90")}
        onClick={() => {
          if (on) return next();
          setOn(true);
        }}
      >
        {on ? "✅ AUTOPILOT RUNNING — NEXT →" : "⚡ AUTOPILOT ON"}
      </GagButton>

      {on && (
        <p className="fg-pop text-lg font-semibold text-[#0EC1B7] sm:text-xl">
          From here, the machine does everything. We watch. 🍺
        </p>
      )}
    </Stage>
  );
}
