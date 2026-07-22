"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  GagButton,
  Stage,
  Kicker,
  FakeProgress,
  SlotCounter,
} from "./primitives";

export type BurstKind = "confetti" | "money" | null;

export type SceneProps = {
  next: () => void;
  burst: (kind: BurstKind) => void;
};

export type Scene = {
  id: string;
  act: string;
  /** background tint class for the stage */
  bg?: string;
  render: (p: SceneProps) => React.ReactNode;
};

/* ----------------------------- AKT 1 ----------------------------- */

function TitleScene({ next }: SceneProps) {
  return (
    <Stage>
      <Kicker>Akt 1 · Der letzte Arbeitstag</Kicker>
      <h1 className="text-balance text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
        Wie wir <span className="text-brand">arbeitslos</span>
        <br />
        und <span className="text-brand">reich</span> wurden
      </h1>
      <p className="max-w-2xl text-xl text-muted-foreground sm:text-2xl">
        Ein Theaterstück in 4 Akten. Erzählt von Kalle Feierabend, DX-Mitarbeiter,
        Bier in der Hand. 🍺
      </p>
      <GagButton size="hero" variant="teal" onClick={next}>
        LOS GEHT&rsquo;S →
      </GagButton>
    </Stage>
  );
}

function AutopilotScene({ next, burst }: SceneProps) {
  const [on, setOn] = React.useState(false);
  return (
    <Stage>
      <Kicker>Akt 1 · Der Auftrag</Kicker>
      <p className="max-w-3xl text-2xl font-medium sm:text-3xl">
        Chef <b>Bernd Bonus</b>: <i>&bdquo;Macht mal so&rsquo;n Pharma-Video. In
        sechs Monaten. Und nervt mich nicht.&ldquo;</i>
      </p>
      <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
        Normalerweise: Monate Arbeit, Panik, Überstunden. Oder&hellip;
      </p>
      <GagButton
        size="hero"
        variant={on ? "teal" : "primary"}
        className={cn(on && "fg-power")}
        onClick={() => {
          if (on) return next();
          setOn(true);
          burst("confetti");
        }}
      >
        {on ? "✅ AUTOPILOT LÄUFT — WEITER →" : "⚡ AUTOPILOT AN"}
      </GagButton>
      {on && (
        <p className="fg-pop text-lg font-semibold text-brand sm:text-xl">
          Ab hier macht die Maschine alles. Wir gucken zu.
        </p>
      )}
    </Stage>
  );
}

/* ----------------------------- AKT 2 ----------------------------- */

const TOPICS = [
  { emoji: "🫀", title: "Kardiologie", tag: "Bestseller" },
  { emoji: "🧠", title: "Neurologie", tag: "Neu" },
  { emoji: "🍕", title: "Ernährung", tag: "Trend" },
];

function ShopScene({ next }: SceneProps) {
  const [picked, setPicked] = React.useState<number | null>(null);
  return (
    <Stage>
      <Kicker>Akt 2 · Pia kauft in drei Klicks</Kicker>
      <h2 className="text-4xl font-bold sm:text-6xl">
        <b>Pia Pharma</b> will einfach ein Video kaufen. 🛒
      </h2>
      <p className="text-xl text-muted-foreground sm:text-2xl">
        Kein Sales-Gespräch. Kein Termin. Thema antippen, fertig.
      </p>
      <div className="grid w-full gap-5 sm:grid-cols-3">
        {TOPICS.map((t, i) => (
          <button
            key={t.title}
            onClick={() => setPicked(i)}
            className={cn(
              "fg-hover-wobble flex flex-col items-center gap-3 rounded-3xl border-4 bg-card px-6 py-10 transition-all",
              picked === i
                ? "border-brand shadow-[0_20px_60px_-15px_var(--brand)] scale-[1.03]"
                : "border-border hover:border-brand/60",
              picked !== null && picked !== i && "opacity-40",
            )}
          >
            <span className="text-6xl">{t.emoji}</span>
            <span className="text-2xl font-bold">{t.title}</span>
            <span className="rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-muted-foreground">
              {t.tag}
            </span>
          </button>
        ))}
      </div>
      <GagButton
        size="big"
        variant="teal"
        disabled={picked === null}
        onClick={next}
      >
        {picked === null ? "Thema wählen…" : "WEITER ZUR KASSE →"}
      </GagButton>
    </Stage>
  );
}

function CheckoutScene({ next, burst }: SceneProps) {
  const [paid, setPaid] = React.useState(false);
  return (
    <Stage>
      <Kicker>Akt 2 · Die Kasse</Kicker>
      <h2 className="text-4xl font-bold sm:text-6xl">Bezahlen. Aber lustig.</h2>
      <p className="text-xl text-muted-foreground sm:text-2xl">
        Firmenkarte: noch <b className="text-foreground">14.997 €</b> von 50.000 €
        übrig. Womit zahlen?
      </p>

      {!paid ? (
        <div className="flex w-full max-w-3xl flex-col gap-4 sm:flex-row">
          <GagButton variant="pay" size="pay" onClick={() => setPaid(true)}>
            🫘 Mit Niere zahlen
          </GagButton>
          <GagButton variant="pay" size="pay" onClick={() => setPaid(true)}>
            👶 Mit Erstgeborenem zahlen
          </GagButton>
        </div>
      ) : (
        <div className="fg-pop flex flex-col items-center gap-6">
          <p className="text-2xl font-bold text-brand">
            ✅ Bezahlt. Niere wird abgeholt.
          </p>
          <GagButton
            size="hero"
            variant="teal"
            className="max-w-3xl text-balance"
            onClick={() => {
              burst("confetti");
              window.setTimeout(next, 900);
            }}
          >
            🏖️ PROJEKT STARTEN &amp; ONE-WAY-TICKET AN DEN STRAND BUCHEN
          </GagButton>
          <p className="text-lg text-muted-foreground">
            Pia ist ab jetzt im Urlaub. Für den Rest des Stücks.
          </p>
        </div>
      )}
    </Stage>
  );
}

/* ----------------------------- AKT 3 ----------------------------- */

const FIGHTERS = [
  { name: "Sehouli", emoji: "🥼" },
  { name: "Prelog", emoji: "🧑‍⚕️" },
  { name: "Paula Cramer", emoji: "👩‍⚕️" },
];

function FighterScene({ next }: SceneProps) {
  const [picked, setPicked] = React.useState<number | null>(null);
  return (
    <Stage>
      <Kicker>Akt 3 · Aus Pizza wird Gold</Kicker>
      <h2 className="text-4xl font-bold sm:text-6xl">PICK YOUR FIGHTER 🥊</h2>
      <p className="text-xl text-muted-foreground sm:text-2xl">
        Prof. Dr. <b>Ego von Kittel</b> isst Pizza und wählt&hellip; sich selbst
        als KI-Avatar. Kein echtes Recording.
      </p>
      <div className="grid w-full gap-5 sm:grid-cols-3">
        {FIGHTERS.map((f, i) => (
          <button
            key={f.name}
            onClick={() => setPicked(i)}
            className={cn(
              "fg-hover-wobble flex flex-col items-center gap-4 rounded-3xl border-4 bg-card px-6 py-10 transition-all",
              picked === i
                ? "border-brand shadow-[0_20px_60px_-15px_var(--brand)] scale-[1.04]"
                : "border-border hover:border-brand/60",
              picked !== null && picked !== i && "opacity-40 grayscale",
            )}
          >
            <span className="text-7xl">{f.emoji}</span>
            <span className="text-2xl font-bold">{f.name}</span>
            {picked === i && (
              <span className="fg-pop rounded-full bg-brand px-4 py-1 text-sm font-bold text-brand-foreground">
                READY!
              </span>
            )}
          </button>
        ))}
      </div>
      <GagButton size="big" variant="teal" disabled={picked === null} onClick={next}>
        {picked === null ? "Fighter wählen…" : "IN DEN RING →"}
      </GagButton>
    </Stage>
  );
}

function GenerateScene({ next }: SceneProps) {
  const [phase, setPhase] = React.useState<"idle" | "working" | "done">("idle");
  return (
    <Stage>
      <Kicker>Akt 3 · KI macht alles</Kicker>
      <h2 className="text-3xl font-bold sm:text-5xl">
        Thema: &bdquo;Effect of Pizza on the Human Body&ldquo; 🍕
      </h2>

      {phase === "idle" && (
        <>
          <p className="max-w-2xl text-xl text-muted-foreground sm:text-2xl">
            Kittel schreibt nichts. Dreht nichts. Er drückt nur diesen Knopf:
          </p>
          <GagButton
            size="hero"
            variant="primary"
            onClick={() => setPhase("working")}
          >
            🤖 TAKE MY JOB AWAY
          </GagButton>
        </>
      )}

      {phase === "working" && (
        <FakeProgress
          label="KI liest deine Gedanken… % "
          onDone={() => setPhase("done")}
        />
      )}

      {phase === "done" && (
        <div className="fg-pop flex flex-col items-center gap-6">
          <div className="flex aspect-video w-full max-w-2xl flex-col items-center justify-center gap-3 rounded-3xl border-4 border-dashed border-brand bg-card">
            <span className="text-6xl">🎬</span>
            <span className="text-xl font-bold sm:text-2xl">
              [ Video: KI-Avatar hält den Pizza-Vortrag ]
            </span>
            <span className="text-muted-foreground">Platzhalter — echtes Video kommt rein</span>
          </div>
          <GagButton size="big" variant="teal" onClick={next}>
            VIDEO VERÖFFENTLICHEN →
          </GagButton>
        </div>
      )}
    </Stage>
  );
}

/* ----------------------------- AKT 4 ----------------------------- */

function LiveScene({ next }: SceneProps) {
  return (
    <Stage>
      <Kicker>Akt 4 · Arbeitslos und reich</Kicker>
      <h2 className="text-3xl font-bold sm:text-5xl">Das Video ist live. 🎉</h2>
      <p className="text-xl text-muted-foreground sm:text-2xl">Und die Zahlen&hellip;</p>
      <div className="flex flex-col items-center gap-2">
        <SlotCounter
          target={10_000_000}
          className="text-6xl font-bold text-brand sm:text-8xl"
        />
        <span className="text-2xl font-semibold sm:text-3xl">Views</span>
      </div>
      <GagButton size="big" variant="teal" onClick={next}>
        UND JETZT? →
      </GagButton>
    </Stage>
  );
}

function FinaleScene({ next, burst }: SceneProps) {
  React.useEffect(() => {
    burst("money");
    return () => burst(null);
  }, [burst]);

  return (
    <Stage>
      <Kicker>Akt 4 · Finale</Kicker>
      <h2 className="text-4xl font-bold sm:text-6xl">
        Es gibt nichts mehr zu tun.
      </h2>
      <p className="max-w-2xl text-xl text-muted-foreground sm:text-2xl">
        Chef <b>Bernd Bonus</b> reißt sich den Erfolg unter den Nagel
        (&bdquo;Ich hab das quasi erfunden&ldquo;) und wird Senior Vice President.
        Wir? Arbeitslos. Und reich.
      </p>
      <GagButton
        size="hero"
        variant="banner"
        className="max-w-3xl text-balance"
        onClick={() => burst("confetti")}
      >
        🏝️ GANZE ABTEILUNG ZU DOCTORFLIX VERLAGERN &amp; IN RENTE GEHEN
      </GagButton>
      <GagButton size="shy" variant="shy" onClick={() => burst("confetti")}>
        vielleicht nur Urlaub
      </GagButton>
      <div className="pt-4">
        <GagButton size="big" variant="ghostbig" onClick={next}>
          🍺 Abspann: DX-Highlight-Reel →
        </GagButton>
      </div>
    </Stage>
  );
}

function ReelScene({ next }: SceneProps) {
  return (
    <Stage>
      <Kicker>Abspann</Kicker>
      <div className="flex aspect-video w-full max-w-3xl flex-col items-center justify-center gap-3 rounded-3xl border-4 border-dashed border-brand bg-card">
        <span className="text-6xl">🍺🔔💸</span>
        <span className="text-xl font-bold sm:text-2xl">
          [ Video: DX-Highlight-Reel ]
        </span>
        <span className="max-w-md text-muted-foreground">
          Bier, Verkaufs-Gong bei jedem Deal, Slack-Geldregen. ~60 Sekunden.
        </span>
      </div>
      <p className="text-2xl font-bold text-brand sm:text-3xl">
        Ende. Applaus. 👏
      </p>
      <GagButton size="big" variant="ghostbig" onClick={next}>
        ↺ Nochmal von vorn
      </GagButton>
    </Stage>
  );
}

export const SCENES: Scene[] = [
  { id: "title", act: "Akt 1", render: (p) => <TitleScene {...p} /> },
  { id: "autopilot", act: "Akt 1", render: (p) => <AutopilotScene {...p} /> },
  { id: "shop", act: "Akt 2", render: (p) => <ShopScene {...p} /> },
  { id: "checkout", act: "Akt 2", render: (p) => <CheckoutScene {...p} /> },
  { id: "fighter", act: "Akt 3", render: (p) => <FighterScene {...p} /> },
  { id: "generate", act: "Akt 3", render: (p) => <GenerateScene {...p} /> },
  { id: "live", act: "Akt 4", render: (p) => <LiveScene {...p} /> },
  { id: "finale", act: "Akt 4", render: (p) => <FinaleScene {...p} /> },
  { id: "reel", act: "Abspann", render: (p) => <ReelScene {...p} /> },
];
