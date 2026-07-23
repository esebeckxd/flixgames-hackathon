"use client";

import { useSceneNav } from "@/components/scene/nav";

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

      {/* Theater curtain — two velvet panels that part on Next. */}
      <div className="pointer-events-none absolute inset-0 z-10 flex">
        <div
          className={`h-full w-1/2 transition-transform duration-[1400ms] ease-in-out ${
            open ? "-translate-x-full" : "translate-x-0"
          }`}
          style={{
            background:
              "repeating-linear-gradient(90deg, #7c1122 0px, #7c1122 22px, #5e0d1a 22px, #5e0d1a 44px)",
            boxShadow: "inset -30px 0 60px rgba(0,0,0,0.5)",
          }}
        />
        <div
          className={`h-full w-1/2 transition-transform duration-[1400ms] ease-in-out ${
            open ? "translate-x-full" : "translate-x-0"
          }`}
          style={{
            background:
              "repeating-linear-gradient(90deg, #7c1122 0px, #7c1122 22px, #5e0d1a 22px, #5e0d1a 44px)",
            boxShadow: "inset 30px 0 60px rgba(0,0,0,0.5)",
          }}
        />
        {/* Gold trim along the meeting edge of the curtains, fades as they open */}
        <div
          className={`absolute inset-y-0 left-1/2 w-2 -translate-x-1/2 bg-gradient-to-b from-[#e8c37a] via-[#c9a052] to-[#e8c37a] transition-opacity duration-500 ${
            open ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
    </div>
  );
}
