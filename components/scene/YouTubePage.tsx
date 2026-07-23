"use client";

import { useRef, useState } from "react";
import {
  BadgeCheck,
  Bell,
  Bookmark,
  MessageCircleOff,
  MoreHorizontal,
  Play,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

// Generic video-platform watch page — deliberately unbranded (no logo/
// wordmark anywhere, same rule as the fake Stripe/PayPal checkout buttons),
// just the recognizable player + info-panel layout.
//
// Player column is sized for portrait (9:16) clips — the real footage we use
// here is a phone-shot vertical video, so a full-width 16:9 black bar just
// wasted space on both sides. Video + info panel now sit side by side so the
// whole screen stays used regardless of aspect ratio.
export function YouTubePage({
  title,
  channel,
  views,
  uploadedWhen,
  description,
  videoLabel,
  videoSrc,
  likes = "48.1K",
  dislikeNote,
  comment,
}: {
  title: string;
  channel: string;
  views: string;
  uploadedWhen: string;
  description: string;
  videoLabel: string;
  videoSrc?: string;
  likes?: string;
  dislikeNote?: string;
  comment?: { author: string; text: string };
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  return (
    <div className="flex h-full min-h-full w-full flex-col overflow-y-auto bg-[#0f0f0f] lg:flex-row lg:overflow-hidden">
      {/* Player — sized to a portrait 9:16 frame, capped to the viewport height. */}
      <div className="relative mx-auto aspect-[9/16] h-[70vh] max-h-[70vh] w-auto flex-none bg-black lg:h-full lg:max-h-none">
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            className="h-full w-full object-cover"
            playsInline
            controls={started}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center text-white/50">
            <span className="flex size-16 items-center justify-center rounded-full bg-white/10">
              <Play className="size-7 fill-white text-white" />
            </span>
            <span className="text-sm">[ Video: {videoLabel} ]</span>
          </div>
        )}

        {videoSrc && !started && (
          <button
            onClick={() => {
              const v = videoRef.current;
              if (!v) return;
              v.muted = false;
              v.play();
              setStarted(true);
            }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 transition hover:bg-black/30"
          >
            <span className="flex size-20 items-center justify-center rounded-full bg-white/90 shadow-lg">
              <Play className="size-9 translate-x-0.5 fill-[#1A2133] text-[#1A2133]" />
            </span>
            <span className="text-sm font-semibold text-white">Play with sound 🔊</span>
          </button>
        )}
      </div>

      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-3 overflow-y-auto px-6 py-5 text-white lg:max-w-md">
        <h1 className="text-lg font-bold leading-snug">{title}</h1>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <span className="text-sm text-white/60">
            {views} views · {uploadedWhen}
          </span>
          <div className="flex flex-wrap items-center gap-2 text-sm text-white/80">
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
          {comment ? "Comments are off. (except this one, somehow)" : "Comments are off."}{" "}
          {dislikeNote}
        </div>

        {comment && (
          <div className="flex items-start gap-3 rounded-xl bg-white/5 p-3">
            <span className="flex size-8 flex-none items-center justify-center rounded-full bg-white/15 text-xs font-bold">
              {comment.author[0]}
            </span>
            <div className="text-sm">
              <span className="font-semibold">{comment.author}</span>{" "}
              <span className="text-white/70">{comment.text}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
