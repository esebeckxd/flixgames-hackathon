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
    field: "Neurologie",
    title: "Epilepsie – Grundlagen bis aktuelle Therapiekonzepte",
    speaker: "Universitätsprofessor Neurologie",
    format: "CME-Kurs · flexibel nach Fokus",
  },
  {
    id: "demenz",
    field: "Neurologie",
    title: "Demenzen und Alzheimer – State of the Art",
    speaker: "Facharzt Neurologie / Gerontologie",
    format: "CME-Kurs · State of the Art",
  },
  {
    id: "insulin",
    field: "Diabetologie",
    title: "Neues zur Insulintherapie – Wöchentliches Update",
    speaker: "Diabetologe DDG",
    format: "Serie · wöchentlich",
  },
  {
    id: "antikoagulation",
    field: "Kardiologie",
    title: "Antikoagulation – niedermolekulares Heparin",
    speaker: "Prof. Dr. med. Florian Langer",
    format: "CME-Kurs · Hausarzt-Schwerpunkt",
  },
  {
    id: "ra",
    field: "Rheumatologie",
    title: "Basistherapie der rheumatoiden Arthritis (RA)",
    speaker: "Prof. Dr. med. Michael Hammer",
    format: "CME-Kurs · Leitlinienbasiert",
  },
  {
    id: "mykosen",
    field: "Dermatologie",
    title: "Mykosen in der täglichen Praxis – faszinierend und heilbar",
    speaker: "Facharzt Dermatologie / Infektiologie",
    format: "CME-Kurs · Praxisfokus",
  },
];

export const DEFAULT_TOPIC = TOPICS[0];

type DemoState = {
  topic: Topic;
  setTopic: (topic: Topic) => void;
};

const DemoStateContext = createContext<DemoState | null>(null);

export function DemoStateProvider({ children }: { children: ReactNode }) {
  const [topic, setTopic] = useState<Topic>(DEFAULT_TOPIC);
  return (
    <DemoStateContext.Provider value={{ topic, setTopic }}>
      {children}
    </DemoStateContext.Provider>
  );
}

export function useDemoState() {
  const ctx = useContext(DemoStateContext);
  if (!ctx) throw new Error("useDemoState must be used within DemoStateProvider");
  return ctx;
}
