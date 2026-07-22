"use client";

import { createContext, useContext } from "react";

// Standalone leaf module so scenes can advance the play from their own buttons
// (e.g. Act-1 "Autopilot on") without importing SceneController — which would
// create a cycle (SceneController → registry → scene → SceneController).
// `beat` is the scene's current internal beat (0 = full overview, 1+ = zoomed
// into a specific element) — see lib/scenes.ts `beats` field. `goToBeat` lets
// a scene jump to a specific beat directly (branching paths within one scene).
export const SceneNavContext = createContext<{
  next: () => void;
  prev: () => void;
  goToBeat: (n: number) => void;
  beat: number;
}>({
  next: () => {},
  prev: () => {},
  goToBeat: () => {},
  beat: 0,
});

export const useSceneNav = () => useContext(SceneNavContext);
