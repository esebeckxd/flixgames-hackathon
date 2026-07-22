"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDemoState } from "@/lib/demo-state";

const FINAL_VIEWS = 48213;

function ViewCounter() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 40;
    const id = setInterval(() => {
      frame++;
      // ease-out: fast at first, decelerating into the final number — the "slot machine" feel.
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
      setValue(Math.round(FINAL_VIEWS * progress));
      if (frame >= totalFrames) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="font-heading text-4xl font-black tabular-nums text-brand">
      {value.toLocaleString("en-US")}
    </div>
  );
}

export function Publish() {
  const { topic } = useDemoState();
  const [published, setPublished] = useState(false);

  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col items-center justify-center gap-6 px-6 text-center">
      {!published ? (
        <Card className="w-full">
          <CardContent className="flex flex-col items-center gap-4 py-10">
            <h2 className="font-heading text-xl font-bold">Speaker submitted</h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              &ldquo;{topic.title}&rdquo; is finished and submitted.
            </p>
            <Button variant="accent" size="lg" onClick={() => setPublished(true)}>
              Publish Video
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <span className="text-5xl">✈️📱</span>
          <h2 className="font-heading text-2xl font-bold">Video is live!</h2>
          <ViewCounter />
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Views · live</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Pharma gets the notification on the way to the airport — &ldquo;video live, time to
            clock out.&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}
