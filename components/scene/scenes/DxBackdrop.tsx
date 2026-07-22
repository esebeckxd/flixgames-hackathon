"use client";

import { Backdrop } from "@/components/scene/Backdrop";

// Fixed backdrop shown before the DX-employee highlight reel (YouTube) plays —
// the lounge where the DX employee cracks a beer and lets Slack do the work.
export function DxBackdrop() {
  return <Backdrop variant="dx" />;
}
