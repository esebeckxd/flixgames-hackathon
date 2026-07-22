"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Topic = {
  id: string;
  field: string;
  title: string;
  speaker: string;
  format: string;
};

export const TOPICS: Topic[] = [
  {
    id: "epilepsie",
    field: "Neurology",
    title: "Epilepsy – Fundamentals to Current Treatment Concepts",
    speaker: "University Professor of Neurology",
    format: "CME course · flexible focus",
  },
  {
    id: "demenz",
    field: "Neurology",
    title: "Dementia and Alzheimer's – State of the Art",
    speaker: "Neurology / Gerontology Specialist",
    format: "CME course · state of the art",
  },
  {
    id: "insulin",
    field: "Diabetology",
    title: "New Insulin Therapies – Weekly Update",
    speaker: "Diabetologist, DDG",
    format: "Series · weekly",
  },
  {
    id: "antikoagulation",
    field: "Cardiology",
    title: "Anticoagulation – Low Molecular Weight Heparin",
    speaker: "Prof. Dr. med. Florian Langer",
    format: "CME course · GP-focused",
  },
  {
    id: "ra",
    field: "Rheumatology",
    title: "Basic Therapy for Rheumatoid Arthritis (RA)",
    speaker: "Prof. Dr. med. Michael Hammer",
    format: "CME course · guideline-based",
  },
  {
    id: "mykosen",
    field: "Dermatology",
    title: "Fungal Infections in Daily Practice – Fascinating and Curable",
    speaker: "Dermatology / Infectious Disease Specialist",
    format: "CME course · practice-focused",
  },
];

export const DEFAULT_TOPIC = TOPICS[0];

// Locked in 2026-07-22: "Chotto" is a restaurant the team actually eats at a
// lot — reframed here as a fake worldwide overdose epidemic (people going
// too often), with Pharma's "treatment" being a REWE salad bar dressed up as
// a medicament. Real slide content exists for this (see VideoGen.tsx/
// ReferentUpload.tsx's SLIDES, public/slides/) — this topic drives that deck.
export const JOKE_TOPIC: Topic = {
  id: "joke-mind-read",
  field: "Epidemiology",
  title: "World Chotto Overdose Day",
  speaker: "Board-Certified Chottoism Specialist",
  format: "45 min. CME video",
};

type DemoState = {
  topic: Topic;
  setTopic: (topic: Topic) => void;
  speaker: string | null;
  setSpeaker: (speaker: string) => void;
};

const DemoStateContext = createContext<DemoState | null>(null);

export function DemoStateProvider({ children }: { children: ReactNode }) {
  const [topic, setTopic] = useState<Topic>(DEFAULT_TOPIC);
  const [speaker, setSpeaker] = useState<string | null>(null);
  return (
    <DemoStateContext.Provider value={{ topic, setTopic, speaker, setSpeaker }}>
      {children}
    </DemoStateContext.Provider>
  );
}

export function useDemoState() {
  const ctx = useContext(DemoStateContext);
  if (!ctx) throw new Error("useDemoState must be used within DemoStateProvider");
  return ctx;
}
