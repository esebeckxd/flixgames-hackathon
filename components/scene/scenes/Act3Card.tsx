"use client";

import { ActCard } from "@/components/scene/ActCard";
import { ACT_TITLE } from "@/lib/scenes";

// Act 3 opens on the Publish dashboard, not a bare acting beat, so no
// "Now on screen" line here.
export function Act3Card() {
  return <ActCard act={3} title={ACT_TITLE[3]} />;
}
