import { PERSONA_LABEL, type Persona } from "@/lib/scenes";

export function PersonaTransition({
  persona,
  phase,
  act,
  actTitle,
}: {
  persona: Persona;
  phase: "in" | "out";
  /** when set, the curtain announces a new act of the play, plakativ */
  act?: number;
  actTitle?: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <div
        className={`curtain-panel absolute inset-0 bg-[#1A2133] ${
          phase === "out" ? "curtain-panel--out" : ""
        }`}
      />
      {phase === "in" && (
        <div className="curtain-label relative z-10 px-8 text-center text-white">
          {act ? (
            <>
              <div className="font-heading text-lg font-bold uppercase tracking-[0.35em] text-[#0EC1B7] sm:text-2xl">
                Act {act}
              </div>
              <div className="font-heading mt-3 text-balance text-4xl font-bold leading-[0.95] sm:text-6xl md:text-7xl">
                {actTitle}
              </div>
              <div className="mt-4 text-sm uppercase tracking-[0.25em] text-white/50">
                {PERSONA_LABEL[persona]}
              </div>
            </>
          ) : (
            <>
              <div className="font-heading text-sm uppercase tracking-[0.2em] text-[#0EC1B7]">
                Now on screen
              </div>
              <div className="font-heading mt-2 text-4xl font-bold">
                {PERSONA_LABEL[persona]}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
