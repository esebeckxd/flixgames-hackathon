import { PERSONA_LABEL, type Persona } from "@/lib/scenes";

export function PersonaTransition({
  persona,
  phase,
}: {
  persona: Persona;
  phase: "in" | "out";
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <div
        className={`curtain-panel absolute inset-0 bg-[#1A2133] ${
          phase === "out" ? "curtain-panel--out" : ""
        }`}
      />
      {phase === "in" && (
        <div className="curtain-label relative z-10 text-center text-white">
          <div className="font-heading text-sm uppercase tracking-[0.2em] text-[#0EC1B7]">
            Now on screen
          </div>
          <div className="font-heading mt-2 text-4xl font-bold">
            {PERSONA_LABEL[persona]}
          </div>
        </div>
      )}
    </div>
  );
}
