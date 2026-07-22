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
      <Kicker>Akt 1 · Der letzte Arbeitstag</Kicker>

      <h1 className="text-balance text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
        Wie wir <span className="text-[#0EC1B7]">arbeitslos</span>
        <br />
        und <span className="text-[#0EC1B7]">reich</span> wurden
      </h1>

      <p className="max-w-3xl text-xl font-medium sm:text-2xl md:text-3xl">
        Chef <b>Bernd Bonus</b>:{" "}
        <i>&bdquo;Macht mal so&rsquo;n Pharma-Video. In sechs Monaten. Und nervt mich nicht.&ldquo;</i>
      </p>
      <p className="max-w-2xl text-lg text-white/60 sm:text-xl">
        Normalerweise: Monate Arbeit, Panik, Überstunden. Oder&hellip; wir lassen das die Maschine machen.
      </p>

      <GagButton
        size="hero"
        variant={on ? "teal" : "primary"}
        className={cn(on && "fg-power", !on && "bg-white text-[#1A2133] hover:bg-white/90")}
        onClick={() => {
          if (on) return next();
          setOn(true);
        }}
      >
        {on ? "✅ AUTOPILOT LÄUFT — WEITER →" : "⚡ AUTOPILOT AN"}
      </GagButton>

      {on && (
        <p className="fg-pop text-lg font-semibold text-[#0EC1B7] sm:text-xl">
          Ab hier macht die Maschine alles. Wir gucken zu. 🍺
        </p>
      )}
    </Stage>
  );
}
