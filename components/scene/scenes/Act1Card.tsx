"use client";

import { ActCard } from "@/components/scene/ActCard";
import { ACT_TITLE } from "@/lib/scenes";

export function Act1Card() {
  return <ActCard act={1} title={ACT_TITLE[1]} onScreen="Narrator, Pharma Boss" />;
}
