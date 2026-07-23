"use client";

// Chapter-title card shown at the start of each act — "ACT N" + the act's
// name really big, and (only for acts that open on a pure acting beat, no
// portal UI) a "Now on screen: X" line telling the moderator/audience who's
// performing. Deliberately plain: no buttons, no animation beyond the
// standard scene cut — the moderator narrates over it.
export function ActCard({
  act,
  title,
  onScreen,
}: {
  act: 1 | 2 | 3 | 4;
  title: string;
  onScreen?: string;
}) {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-6 bg-[#1A2133] px-6 text-center text-white">
      <span className="text-lg font-bold uppercase tracking-[0.35em] text-[#0EC1B7] sm:text-xl">
        Act {act}
      </span>
      <h1 className="text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
        {title}
      </h1>
      {onScreen && (
        <span className="mt-4 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white/70 sm:text-base">
          Now on screen: {onScreen}
        </span>
      )}
    </div>
  );
}
