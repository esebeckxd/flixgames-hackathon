"use client";

import { createContext, useContext } from "react";

// Standalone leaf module so scenes can advance the play from their own buttons
// (e.g. Akt-1 "Autopilot an") without importing SceneController — which would
// create a cycle (SceneController → registry → scene → SceneController).
export const SceneNavContext = createContext<{ next: () => void; prev: () => void }>({
  next: () => {},
  prev: () => {},
});

export const useSceneNav = () => useContext(SceneNavContext);
