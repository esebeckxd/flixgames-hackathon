import type { ComponentType } from "react";
import { Act1Card } from "@/components/scene/scenes/Act1Card";
import { ColdOpen } from "@/components/scene/scenes/ColdOpen";
import { Act2Card } from "@/components/scene/scenes/Act2Card";
import { PharmaBackdrop } from "@/components/scene/scenes/PharmaBackdrop";
import { Shop } from "@/components/scene/scenes/Shop";
import { SpeakerSelect } from "@/components/scene/scenes/SpeakerSelect";
import { Checkout } from "@/components/scene/scenes/Checkout";
import { Briefing } from "@/components/scene/scenes/Briefing";
import { Act3Card } from "@/components/scene/scenes/Act3Card";
import { SpeakerBackdrop } from "@/components/scene/scenes/SpeakerBackdrop";
import { ReferentUpload } from "@/components/scene/scenes/ReferentUpload";
import { VideoGen } from "@/components/scene/scenes/VideoGen";
import { Act4Card } from "@/components/scene/scenes/Act4Card";
import { Publish } from "@/components/scene/scenes/Publish";
import { Payoff } from "@/components/scene/scenes/Payoff";
import { DxBackdrop } from "@/components/scene/scenes/DxBackdrop";
import { DxReel } from "@/components/scene/scenes/DxReel";
import { LeosIphone } from "@/components/scene/scenes/LeosIphone";
import { Stinger } from "@/components/scene/scenes/Stinger";

export const SCENE_COMPONENTS: Record<string, ComponentType> = {
  "act-1": Act1Card,
  "cold-open": ColdOpen,
  "act-2": Act2Card,
  "pharma-backdrop": PharmaBackdrop,
  shop: Shop,
  "speaker-select": SpeakerSelect,
  checkout: Checkout,
  briefing: Briefing,
  "act-3": Act3Card,
  "speaker-backdrop": SpeakerBackdrop,
  "slide-builder": ReferentUpload,
  "video-gen": VideoGen,
  "act-4": Act4Card,
  publish: Publish,
  payoff: Payoff,
  "dx-backdrop": DxBackdrop,
  "dx-reel": DxReel,
  "leos-iphone": LeosIphone,
  stinger: Stinger,
};
