"use client";

import { ActCard } from "@/components/scene/ActCard";
import { ACT_TITLE } from "@/lib/scenes";

// Act 4 opens on a pharma dashboard scene (Publish), not a bare acting beat,
// so no "Now on screen" line here.
export function Act4Card() {
  return <ActCard act={4} title={ACT_TITLE[4]} />;
}
