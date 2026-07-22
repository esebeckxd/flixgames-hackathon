"use client";

import { createContext, useContext } from "react";

// Standalone leaf module so scenes can advance the play from their own buttons
// (e.g. Act-1 "Autopilot on") without importing SceneController — which would
// create a cycle (SceneController → registry → scene → SceneController).
// `beat` is the scene's current internal beat (0 = full overview, 1+ = zoomed
// into a specific element) — see lib/scenes.ts `beats` field. `goToBeat` lets
// a scene jump to a specific beat directly (branching paths within one scene,
// e.g. Shop's "Read My Mind" button skips straight to its own zoomed beat
// instead of the normal manual-browsing zoom beat). `skipToNextScene` jumps
// straight past any remaining beats in the current scene to the next scene's
// beat 0 — for a branch whose beat isn't the last one, so a plain `next()`
// would otherwise land on a beat in between instead of exiting.
export const SceneNavContext = createContext<{
  next: () => void;
  prev: () => void;
  goToBeat: (n: number) => void;
  skipToNextScene: () => void;
  beat: number;
}>({
  next: () => {},
  prev: () => {},
  goToBeat: () => {},
  skipToNextScene: () => {},
  beat: 0,
});

export const useSceneNav = () => useContext(SceneNavContext);
