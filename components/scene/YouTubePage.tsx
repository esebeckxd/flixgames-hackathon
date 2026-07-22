"use client";

import { Play, Search, ThumbsUp, Share2 } from "lucide-react";

// Generic "video platform" page chrome — deliberately not the real YouTube
// logo/trademark (same rule as the fake Stripe/PayPal checkout buttons), just
// the recognizable layout: big player, title, channel row, description.
export function YouTubePage({
  title,
  channel,
  views,
  uploadedWhen,
  description,
  videoLabel,
}: {
  title: string;
  channel: string;
  views: string;
  uploadedWhen: string;
  description: string;
  videoLabel: string;
}) {
  return (
    <div className="flex h-full min-h-full w-full flex-col bg-[#0f0f0f] text-white">
      <header className="flex flex-none items-center gap-4 border-b border-white/10 px-6 py-3">
        <span className="flex items-center gap-1 text-lg font-black tracking-tight">
          <Play className="size-5 fill-brand text-brand" /> Tubely
        </span>
        <div className="mx-auto flex w-full max-w-md items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-white/50">
          <Search className="size-4" /> Search
        </div>
        <span className="flex size-8 flex-none items-center justify-center rounded-full bg-brand text-xs font-bold">
          DX
        </span>
      </header>

      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-4 overflow-y-auto px-6 py-6">
        <div className="flex aspect-video w-full flex-none items-center justify-center rounded-xl bg-black">
          <div className="flex flex-col items-center gap-3 text-white/50">
            <span className="flex size-16 items-center justify-center rounded-full bg-white/10">
              <Play className="size-7 fill-white text-white" />
            </span>
            <span className="text-sm">[ Video: {videoLabel} ]</span>
          </div>
        </div>

        <h1 className="text-xl font-bold">{title}</h1>

        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-brand text-sm font-bold">
              {channel[0]}
            </span>
            <div>
              <div className="text-sm font-semibold">{channel}</div>
              <div className="text-xs text-white/50">
                {views} views · {uploadedWhen}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-white/70">
            <ThumbsUp className="size-5" />
            <Share2 className="size-5" />
          </div>
        </div>

        <p className="max-w-2xl text-sm leading-relaxed text-white/70">{description}</p>
      </div>
    </div>
  );
}
