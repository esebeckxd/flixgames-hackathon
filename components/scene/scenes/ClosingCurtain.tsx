"use client";

import { useSceneNav } from "@/components/scene/nav";
import { Curtain } from "@/components/scene/Curtain";

// Bookend to the opening curtain (ColdOpen): beat 0 shows the title again
// with the curtain open; clicking Next closes the curtain over it, ending
// the show. Last scene, last beat — there's nothing after this.
export function ClosingCurtain() {
  const { beat } = useSceneNav();
  const closed = beat > 0;

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-[#1A2133]">
      <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <h1 className="text-balance text-6xl font-bold leading-[0.95] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl">
          How We Became <span className="text-[#0EC1B7]">Unemployed</span> and{" "}
          <span className="text-[#0EC1B7]">Rich</span>
        </h1>
      </div>

      <Curtain open={!closed} />
    </div>
  );
}
