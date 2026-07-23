"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { DashboardShell } from "@/components/scene/DashboardShell";
import { useSceneNav } from "@/components/scene/nav";
import { useDemoState } from "@/lib/demo-state";

const THUMBNAIL_SRC = "/videos/generated/doctor-presentation.mp4";

// Back in the Pharma dashboard (Projects tab) instead of a standalone
// centered card, so Pharma sees the new video land in the same place the
// project was booked. Publishing reveals a real video thumbnail; the view
// counter and "Shift Whole Business Unit" gag live only on the Reporting
// slide now (Payoff.tsx) — showing both here doubled up the same beat.
export function Publish() {
  const { topic, speaker } = useDemoState();
  const { next } = useSceneNav();
  const thumbRef = useRef<HTMLVideoElement>(null);
  const [published, setPublished] = useState(false);

  return (
    <DashboardShell active="projects">
      <div className="flex min-h-full flex-col gap-6 px-8 py-8">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-muted-foreground">
            {published
              ? "Your video is live on the platform."
              : `${speaker ?? "Your speaker"} submitted the video — ready when you are.`}
          </p>
        </div>

        <div className="max-w-3xl">
          <div className="rounded-3xl border border-border bg-card p-6">
            <div className="flex flex-col gap-5 sm:flex-row">
              <div className="relative aspect-video w-full flex-none overflow-hidden rounded-2xl bg-black sm:w-64">
                <video
                  ref={thumbRef}
                  src={THUMBNAIL_SRC}
                  className="h-full w-full object-cover"
                  muted
                  loop
                  autoPlay={published}
                  playsInline
                />
                {!published && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Play className="size-8 fill-white text-white" />
                  </div>
                )}
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-center gap-2">
                  {published ? (
                    <span className="flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-bold text-red-500">
                      <span className="size-1.5 animate-pulse rounded-full bg-red-500" /> LIVE
                    </span>
                  ) : (
                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground">
                      Ready to publish
                    </span>
                  )}
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {published ? "Published" : "Draft"}
                  </span>
                </div>
                <div className="mt-2 text-xl font-bold leading-tight">{topic.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Speaker: {speaker ?? "TBD"} · Video on demand · CME
                </div>

                {!published && (
                  <button
                    onClick={() => setPublished(true)}
                    className="mt-6 w-fit rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90"
                  >
                    Publish Video
                  </button>
                )}
              </div>
            </div>

            {published && (
              <button
                onClick={next}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground hover:bg-primary/90"
              >
                View Reporting →
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
