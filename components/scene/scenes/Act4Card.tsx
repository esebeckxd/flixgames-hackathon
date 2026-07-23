"use client";

import { ActCard } from "@/components/scene/ActCard";
import { ACT_TITLE } from "@/lib/scenes";

export function Act4Card() {
  return <ActCard act={4} title={ACT_TITLE[4]} onScreen="DX Employee" />;
}
