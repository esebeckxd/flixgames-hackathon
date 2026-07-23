"use client";

import { useState } from "react";
import { useDemoState } from "@/lib/demo-state";
import { DashboardShell } from "@/components/scene/DashboardShell";
import { useSceneNav } from "@/components/scene/nav";
import styles from "./checkout.module.css";

// Moved ahead of Checkout per Daniel's 2026-07-22 flow-reorder call (see
// docs/TECH-ROADMAP.md). Picking a name is the live cue for that person to
// walk on stage.
const SPEAKERS = [
  { name: "Sehouli", photo: "/referents/sehouli.jpg" },
  { name: "Prelog", photo: "/referents/prelog.jpg" },
  { name: "Paula Cramer", photo: "/referents/cramer.jpg" },
  { name: "Daniel", photo: "/referents/daniel.jpg" },
];

export function SpeakerSelect() {
  const { setSpeaker } = useDemoState();
  const { next } = useSceneNav();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <DashboardShell active="shop">
      <div className={styles.page}>
        <div className={styles.zoomWrap}>
          <h1 className={styles.zoomTitle}>Pick your fighter?</h1>
          <div className={styles.zoomPkgs}>
            {SPEAKERS.map(({ name, photo }) => (
              <button
                key={name}
                onClick={() => setSelected(name)}
                className={`${styles.zoomPkg} ${selected === name ? styles.zoomPkgSelected : ""}`}
                style={{ textAlign: "center" }}
              >
                {photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photo}
                    alt={name}
                    style={{
                      height: 72,
                      width: 72,
                      margin: "0 auto 12px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <span
                    style={{
                      display: "flex",
                      height: 72,
                      width: 72,
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 12px",
                      borderRadius: "50%",
                      border: "2px dashed #b5c0d7",
                      color: "#6d7d9c",
                      fontSize: 11,
                      fontWeight: 700,
                      textAlign: "center",
                      lineHeight: 1.2,
                    }}
                  >
                    photo
                    <br />
                    pending
                  </span>
                )}
                <div className={styles.zoomPkgTier}>{name}</div>
              </button>
            ))}
          </div>
          <button
            className={styles.btnSubmit}
            style={{ maxWidth: 320 }}
            disabled={!selected}
            onClick={() => {
              if (!selected) return;
              setSpeaker(selected);
              next();
            }}
          >
            {selected ? `Book ${selected} →` : "Pick a Speaker"}
          </button>
        </div>
      </div>
    </DashboardShell>
  );
}
