"use client";

import { useEffect, useRef, useState } from "react";
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

// Classic YouTube desktop watch-page layout: big landscape video top-left,
// title + actions + channel + description stacked below it in the same main
// column, and a right-hand sidebar for comments (Ali's hostile one included).
//
// The real footage here is a phone-shot clip that Chrome renders sideways —
// a known Chromium bug where some iPhone-recorded MP4s report the correct
// (rotated) size via videoWidth/videoHeight but don't actually get the
// rotation matrix applied to the rendered frame. The <video> below is
// measured via ResizeObserver and rotated back with CSS: pre-rotation it's
// sized to the box's SWAPPED dimensions, then rotated -90deg, landing it
// exactly filling the landscape container the right way up.
function RotatingVideo({
  src,
  needsRotationFix,
  started,
  onPlay,
}: {
  src: string;
  needsRotationFix: boolean;
  started: boolean;
  onPlay: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !needsRotationFix) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setBox({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [needsRotationFix]);

  return (
    <div ref={containerRef} className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
      <video
        ref={videoRef}
        src={src}
        playsInline
        controls={started}
        className="object-cover"
        style={
          needsRotationFix
            ? {
                position: "absolute",
                top: "50%",
                left: "50%",
                width: box.h, // swapped: pre-rotation width = container height
                height: box.w, // swapped: pre-rotation height = container width
                maxWidth: "none", // override Tailwind preflight's video{max-width:100%}
                transform: "translate(-50%, -50%) rotate(-90deg)",
              }
            : { height: "100%", width: "100%" }
        }
      />

      {!started && (
        <button
          onClick={() => {
            const v = videoRef.current;
            if (!v) return;
            v.muted = false;
            v.play();
            onPlay();
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
  );
}

export function YouTubePage({
  title,
  channel,
  views,
  uploadedWhen,
  description,
  videoLabel,
  videoSrc,
  videoNeedsRotationFix = false,
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
  videoNeedsRotationFix?: boolean;
  likes?: string;
  dislikeNote?: string;
  comment?: { author: string; text: string };
}) {
  const [started, setStarted] = useState(false);

  return (
    <div className="flex h-full min-h-full w-full flex-col overflow-y-auto bg-[#0f0f0f] lg:flex-row lg:overflow-hidden">
      <div className="flex min-w-0 flex-1 flex-col gap-4 overflow-y-auto px-6 py-6">
        {videoSrc ? (
          <RotatingVideo
            src={videoSrc}
            needsRotationFix={videoNeedsRotationFix}
            started={started}
            onPlay={() => setStarted(true)}
          />
        ) : (
          <div className="relative aspect-video w-full flex-none overflow-hidden rounded-xl bg-black">
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center text-white/50">
              <span className="flex size-16 items-center justify-center rounded-full bg-white/10">
                <Play className="size-7 fill-white text-white" />
              </span>
              <span className="text-sm">[ Video: {videoLabel} ]</span>
            </div>
          </div>
        )}

        <div className="flex w-full max-w-2xl flex-col gap-3 text-white">
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

          <p className="text-sm leading-relaxed text-white/70">{description}</p>
        </div>
      </div>

      <div className="w-full flex-none border-t border-white/10 px-6 py-6 lg:w-80 lg:overflow-y-auto lg:border-l lg:border-t-0">
        <div className="flex items-center gap-2 text-xs text-white/40">
          <MessageCircleOff className="size-3.5" />
          {comment ? "Comments are off. (except this one, somehow)" : "Comments are off."}{" "}
          {dislikeNote}
        </div>

        {comment && (
          <div className="mt-3 flex items-start gap-3 rounded-xl bg-white/5 p-3">
            <span className="flex size-8 flex-none items-center justify-center rounded-full bg-white/15 text-xs font-bold">
              {comment.author[0]}
            </span>
            <div className="text-sm text-white">
              <span className="font-semibold">{comment.author}</span>{" "}
              <span className="text-white/70">{comment.text}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
