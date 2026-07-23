"use client";

import { ActCard } from "@/components/scene/ActCard";
import { ACT_TITLE } from "@/lib/scenes";

export function Act3Card() {
  return <ActCard act={3} title={ACT_TITLE[3]} onScreen="Speaker" />;
}
