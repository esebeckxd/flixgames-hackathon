"use client";

// Full-screen atmospheric backdrop for the LIVE-ACTING beats — the moments
// where the actors perform in front of the screen and there's no portal/UI to
// show (e.g. Pharma before she starts clicking, the Speaker doomscrolling on
// the couch, the DX employee cracking a beer before the reel plays).
//
// Each variant paints a branded CSS gradient/scene. To use a real photographic
// backdrop instead, drop a file at public/backgrounds/<variant>.jpg — it layers
// on top of the gradient, and if it's absent the gradient simply shows through
// (a missing background-image paints nothing, no broken-image icon).

type Variant = "pharma" | "speaker" | "dx";

const GRADIENTS: Record<Variant, string> = {
  // bright, airy modern office / pharma space
  pharma:
    "radial-gradient(120% 80% at 50% -10%, #ffffff 0%, #eaf1fb 45%, #dbe6f7 100%)",
  // cozy evening living room, warm couch light
  speaker:
    "radial-gradient(90% 70% at 70% 20%, #3a3350 0%, #241f36 55%, #14101f 100%)",
  // chill lounge, teal glow, beer o'clock
  dx: "radial-gradient(100% 80% at 50% 120%, #0ec1b7 0%, #124a5c 40%, #0f2230 100%)",
};

export function Backdrop({ variant }: { variant: Variant }) {
  return (
    <div className="relative h-full min-h-dvh w-full overflow-hidden">
      {/* base brand gradient */}
      <div className="absolute inset-0" style={{ background: GRADIENTS[variant] }} />
      {/* optional real photo on top; absent file = gradient shows through */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(/backgrounds/${variant}.jpg)` }}
      />
      {/* faint hexagon motif (Doctorflix), only on the bright pharma set */}
      {variant === "pharma" && (
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(60deg, #159f95 0 1px, transparent 1px 26px), repeating-linear-gradient(-60deg, #159f95 0 1px, transparent 1px 26px)",
          }}
        />
      )}
      {/* subtle vignette so actors read against the projection */}
      <div className="absolute inset-0 shadow-[inset_0_0_240px_60px_rgba(0,0,0,0.18)]" />
    </div>
  );
}
