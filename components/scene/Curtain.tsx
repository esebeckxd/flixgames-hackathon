"use client";

// Shared theater-curtain overlay used to open the show (ColdOpen) and close
// it again (ClosingCurtain) — two velvet panels that part/meet on Next.
export function Curtain({ open }: { open: boolean }) {
  return (
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
  );
}
