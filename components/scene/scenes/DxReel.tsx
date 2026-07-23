"use client";

import { YouTubePage } from "@/components/scene/YouTubePage";

export function DxReel() {
  return (
    <YouTubePage
      title="a day in my life (my job is literally AI now) 💸😭"
      channel="doctorflix.dx"
      views="48,213"
      uploadedWhen="today"
      videoLabel="DX-employee highlight reel — beer, gong, Slack money-spam montage (~60s closer)"
      videoSrc="/videos/dx-reel/daily-life.mp4"
      videoNeedsRotationFix
      description="no cap this is the whole job now. one beer, zero manual work, slack going off every time a deal closes on its own. we could get replaced by this beer and nobody would notice fr."
      dislikeNote="(1 dislike. hi bernd 👋)"
      comment={{ author: "Ali", text: "you guys will never win flixgames!!!" }}
    />
  );
}
