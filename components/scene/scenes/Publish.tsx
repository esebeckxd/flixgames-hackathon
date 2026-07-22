"use client";

import { useEffect, useRef, useState } from "react";
import { BarChart3 } from "lucide-react";
import { DashboardShell } from "@/components/scene/DashboardShell";
import { useSceneNav } from "@/components/scene/nav";
import { useDemoState } from "@/lib/demo-state";

const THUMBNAIL_SRC = "/videos/generated/doctor-presentation.mp4";

// Live view counter that keeps climbing forever, slowly — never lands on a
// fixed number (per Daniel's 2026-07-22 note). Starts from a believable base.
function LiveViews() {
  const [views, setViews] = useState(3412);

  useEffect(() => {
    const id = setInterval(() => {
      // small, slightly random bumps so it reads as a live, organic climb
      setViews((v) => v + 3 + Math.floor(Math.random() * 12));
    }, 500);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-heading text-3xl font-black tabular-nums text-brand">
      {views.toLocaleString("en-US")}
    </span>
  );
}

export function Publish() {
  const { topic } = useDemoState();
  const { next } = useSceneNav();
  const thumbRef = useRef<HTMLVideoElement>(null);

  return (
    <DashboardShell active="projects">
      <div className="flex min-h-full flex-col gap-6 px-8 py-8">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-muted-foreground">Your video is live on the platform.</p>
        </div>

        <div className="max-w-3xl rounded-3xl border border-border bg-card p-6">
          <div className="flex flex-col gap-5 sm:flex-row">
            {/* Thumbnail — muted looping frame of the finished video */}
            <div className="aspect-video w-full flex-none overflow-hidden rounded-2xl bg-black sm:w-64">
              <video
                ref={thumbRef}
                src={THUMBNAIL_SRC}
                className="h-full w-full object-cover"
                muted
                loop
                autoPlay
                playsInline
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-bold text-red-500">
                  <span className="size-1.5 animate-pulse rounded-full bg-red-500" /> LIVE
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Published
                </span>
              </div>
              <div className="mt-2 text-xl font-bold leading-tight">{topic.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">Video on demand · CME</div>

              <div className="mt-auto pt-4">
                <LiveViews />
                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                  Views · counting live
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={next}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground hover:bg-primary/90"
          >
            <BarChart3 className="size-4" /> View Reporting →
          </button>
        </div>
      </div>
    </DashboardShell>
  );
}
