"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDemoState } from "@/lib/demo-state";

type Step = "notified" | "uploaded" | "cleaned";

export function SlideBuilder() {
  const { topic } = useDemoState();
  const [step, setStep] = useState<Step>("notified");

  return (
    <div className="mx-auto flex h-full w-full max-w-4xl flex-col justify-center gap-6 px-6 py-10">
      <div className="flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 shadow-sm">
        <span className="flex size-6 items-center justify-center rounded-full bg-brand text-xs font-bold text-brand-foreground">
          🔔
        </span>
        <span className="text-sm">
          🍕 Neue Buchung: <span className="font-semibold">{topic.title}</span> — mid-slice,
          während Sie gerade Ihre eigenen Fortbildungspunkte sammeln.
        </span>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-5 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold">Simple Slide Builder</h2>
            <Badge variant="outline">Referent</Badge>
          </div>

          {step === "notified" && (
            <div className="rounded-xl border-2 border-dashed border-border bg-muted/40 p-8 text-center">
              <p className="mb-4 text-sm text-muted-foreground">
                Die Assistenz hat das Deck von 1995 aus dem Archiv gescannt und rübergeschickt.
              </p>
              <Button variant="accent" onClick={() => setStep("uploaded")}>
                Altes Deck hochladen
              </Button>
            </div>
          )}

          {step === "uploaded" && (
            <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-muted/40 p-8 text-center">
              <div className="rounded-lg border border-border bg-background px-6 py-4 text-sm font-mono text-muted-foreground shadow-sm">
                Vortrag_FINAL_FINAL_v3_wirklich_final.ppt
              </div>
              <Button variant="accent" onClick={() => setStep("cleaned")}>
                Mit KI aufräumen ✨
              </Button>
            </div>
          )}

          {step === "cleaned" && (
            <div className="grid grid-cols-3 gap-3">
              {["Titel & Agenda", "Kernaussagen", "Zusammenfassung"].map((slide) => (
                <div
                  key={slide}
                  className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-lg border border-brand/40 bg-brand/5 p-3 text-center"
                >
                  <span className="text-lg">✅</span>
                  <span className="text-xs font-medium text-foreground">{slide}</span>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-3 gap-3 opacity-40">
            {["Layout", "Quellen", "Design"].map((label) => (
              <div
                key={label}
                className="flex aspect-[4/3] items-center justify-center rounded-lg border border-dashed border-border text-xs text-muted-foreground"
              >
                {label}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
