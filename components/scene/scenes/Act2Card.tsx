"use client";

import { ActCard } from "@/components/scene/ActCard";
import { ACT_TITLE } from "@/lib/scenes";

export function Act2Card() {
  return <ActCard act={2} title={ACT_TITLE[2]} onScreen="Speaker" />;
}
