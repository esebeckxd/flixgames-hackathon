import type { ComponentType } from "react";
import { ColdOpen } from "@/components/scene/scenes/ColdOpen";
import { Shop } from "@/components/scene/scenes/Shop";
import { Checkout } from "@/components/scene/scenes/Checkout";
import { Briefing } from "@/components/scene/scenes/Briefing";
import { SlideBuilder } from "@/components/scene/scenes/SlideBuilder";
import { VideoGen } from "@/components/scene/scenes/VideoGen";
import { Publish } from "@/components/scene/scenes/Publish";
import { Payoff } from "@/components/scene/scenes/Payoff";
import { DxReel } from "@/components/scene/scenes/DxReel";
import { Stinger } from "@/components/scene/scenes/Stinger";

export const SCENE_COMPONENTS: Record<string, ComponentType> = {
  "cold-open": ColdOpen,
  shop: Shop,
  checkout: Checkout,
  briefing: Briefing,
  "slide-builder": SlideBuilder,
  "video-gen": VideoGen,
  publish: Publish,
  payoff: Payoff,
  "dx-reel": DxReel,
  stinger: Stinger,
};
