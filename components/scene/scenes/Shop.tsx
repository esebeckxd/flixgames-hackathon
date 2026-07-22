"use client";

import { useState } from "react";
import { useDemoState, TOPICS, type Topic } from "@/lib/demo-state";
import styles from "./shop.module.css";

const TA_CLASS: Record<string, string> = {
  Neurologie: styles.taNeurologie,
  Diabetologie: styles.taDiabetologie,
  Kardiologie: styles.taKardiologie,
  Rheumatologie: styles.taRheumatologie,
  Dermatologie: styles.taDermatologie,
};

// Extra cards purely for grid density, matching the real landing page's
// fuller topic catalogue — genuinely selectable, same as TOPICS.
const MORE_TOPICS: Topic[] = [
  { id: "closed-loop", field: "Diabetologie", title: "AID und Closed Loop Systeme", speaker: "Diabetologe, Schwerpunkt Technologie", format: "CME-Kurs · Technologiefokus" },
  { id: "ki-kardio", field: "Kardiologie", title: "Digitalisierung und KI in der Kardiologie", speaker: "Kardiologe mit KI-Schwerpunkt", format: "CME-Kurs · Zukunftsthema" },
  { id: "eular", field: "Rheumatologie", title: "EULAR 2025 – Update Psoriasis-Arthritis", speaker: "Kongressbericht-Experte", format: "Kongressbericht · aktuell" },
];

const FILTERS = ["Alle", "Neurologie", "Diabetologie", "Kardiologie", "Rheumatologie", "Dermatologie"];

export function Shop() {
  const { topic, setTopic } = useDemoState();
  const [filter, setFilter] = useState("Alle");

  const cards = [...TOPICS, ...MORE_TOPICS].filter(
    (t) => filter === "Alle" || t.field === filter
  );

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/doctorflix-logo.svg" alt="Doctorflix" className={styles.logo} />
        <span className={styles.navTag}>Pharma</span>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroBadge}>Sponsoring-Möglichkeiten</div>
        <h1>
          Erreichen Sie <em>Fachärzte</em> dort, wo sie lernen
        </h1>
        <p>
          Wählen Sie ein Thema aus dem Shop und konfigurieren Sie Ihr Angebot — in wenigen
          Klicks.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Verfügbare Themen</h2>
        <p className={styles.sectionSubtitle}>
          Ausgewählt: <strong>{topic.title}</strong>
        </p>

        <div className={styles.filters}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`${styles.filterBtn} ${filter === f ? styles.filterBtnActive : ""}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {cards.map((t) => {
            const isSelected = t.id === topic.id;
            return (
              <button
                key={t.id}
                onClick={() => setTopic(t)}
                className={`${styles.card} ${TA_CLASS[t.field] ?? ""} ${
                  isSelected ? styles.cardSelected : ""
                }`}
              >
                <div className={styles.cardOrb} />
                <span className={styles.fieldTag}>{t.field}</span>
                <div className={styles.cardTitle}>{t.title}</div>
                <div className={styles.cardSpeaker}>{t.speaker}</div>
                <div className={styles.cardFormat}>{t.format}</div>
                <div className={styles.cardBottom}>
                  <span className={styles.statusDot}>Verfügbar</span>
                  <span className={styles.cardCta}>
                    {isSelected ? "Ausgewählt ✓" : "Anfragen →"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
