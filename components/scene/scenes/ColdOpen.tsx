"use client";

import { useSceneNav } from "@/components/scene/nav";
import { Curtain } from "@/components/scene/Curtain";

// Act-1 title slide, theater-curtain style: beat 0 shows a closed curtain and
// no text at all — the actors open the cold-open scene in front of a blank
// stage. Clicking Next (beat 1) parts the curtain, revealing the title
// underneath. No kicker, no advance button beyond the standard Next control.
export function ColdOpen() {
  const { beat } = useSceneNav();
  const open = beat > 0;

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-[#1A2133]">
      <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <h1 className="text-balance text-6xl font-bold leading-[0.95] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl">
          How We Became <span className="text-[#0EC1B7]">Unemployed</span> and{" "}
          <span className="text-[#0EC1B7]">Rich</span>
        </h1>
      </div>

      <Curtain open={open} />
    </div>
  );
}
