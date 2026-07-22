"use client";

import { Stage } from "@/components/scene/plakativ";

// Act-1 title slide — just the big title. No kicker, no advance button
// (the moderator clicks Next), no subheading. Deliberately bare so the actors
// carry the opening in front of it.
export function ColdOpen() {
  return (
    <Stage className="bg-[#1A2133] text-white">
      <h1 className="text-balance text-6xl font-bold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
        How We Became <span className="text-[#0EC1B7]">Unemployed</span> and{" "}
        <span className="text-[#0EC1B7]">Rich</span>
      </h1>
    </Stage>
  );
}
