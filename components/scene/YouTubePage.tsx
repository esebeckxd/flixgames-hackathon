"use client";

import {
  BadgeCheck,
  Bell,
  Bookmark,
  Captions,
  MessageCircleOff,
  Maximize,
  MoreHorizontal,
  PictureInPicture,
  Play,
  Settings,
  Share2,
  ThumbsDown,
  ThumbsUp,
  Volume2,
} from "lucide-react";

// Generic video-platform watch page — deliberately unbranded (no logo/
// wordmark anywhere, same rule as the fake Stripe/PayPal checkout buttons),
// just the recognizable player + info-panel layout.
export function YouTubePage({
  title,
  channel,
  views,
  uploadedWhen,
  description,
  videoLabel,
  likes = "48.1K",
  dislikeNote,
}: {
  title: string;
  channel: string;
  views: string;
  uploadedWhen: string;
  description: string;
  videoLabel: string;
  likes?: string;
  dislikeNote?: string;
}) {
  return (
    <div className="flex h-full min-h-full w-full flex-col overflow-y-auto bg-[#0f0f0f]">
      {/* Fixed viewport-relative height (not aspect-video) so the title/
          channel/description panel below is always visible without
          scrolling on a standard presentation display. */}
      <div className="relative h-[56vh] w-full flex-none bg-black">
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-white/50">
          <span className="flex size-16 items-center justify-center rounded-full bg-white/10">
            <Play className="size-7 fill-white text-white" />
          </span>
          <span className="text-sm">[ Video: {videoLabel} ]</span>
        </div>

        {/* Decorative player chrome — not a real seekable video. */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-6">
          <div className="h-[3px] w-full rounded-full bg-white/25">
            <div className="h-full w-[2%] rounded-full bg-red-600" />
          </div>
          <div className="flex items-center justify-between text-white/90">
            <div className="flex items-center gap-4">
              <Play className="size-4 fill-white" />
              <Volume2 className="size-4" />
              <span className="text-xs font-medium text-white/80">0:00 / 12:00</span>
            </div>
            <div className="flex items-center gap-4">
              <Captions className="size-4" />
              <Settings className="size-4" />
              <PictureInPicture className="size-4" />
              <Maximize className="size-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-3 px-6 py-5 text-white">
        <h1 className="text-lg font-bold leading-snug">{title}</h1>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <span className="text-sm text-white/60">
            {views} views · {uploadedWhen}
          </span>
          <div className="flex items-center gap-2 text-sm text-white/80">
            <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5">
              <ThumbsUp className="size-4" /> {likes}
              <span className="mx-1 h-3.5 w-px bg-white/20" />
              <ThumbsDown className="size-4" />
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5">
              <Share2 className="size-4" /> Share
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5">
              <Bookmark className="size-4" /> Save
            </span>
            <span className="flex size-8 items-center justify-center rounded-full bg-white/10">
              <MoreHorizontal className="size-4" />
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-red-600 text-sm font-bold">
              {channel[0]}
            </span>
            <div>
              <div className="flex items-center gap-1 text-sm font-semibold">
                {channel} <BadgeCheck className="size-3.5 text-white/50" />
              </div>
              <div className="text-xs text-white/50">Published: {uploadedWhen}</div>
            </div>
          </div>
          <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white/70">
            Subscribed <Bell className="size-3.5" />
          </span>
        </div>

        <p className="max-w-2xl text-sm leading-relaxed text-white/70">{description}</p>

        <div className="mt-1 flex items-center gap-2 text-xs text-white/40">
          <MessageCircleOff className="size-3.5" />
          Comments are off. {dislikeNote}
        </div>
      </div>
    </div>
  );
}
