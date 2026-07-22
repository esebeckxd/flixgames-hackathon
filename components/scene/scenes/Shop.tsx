"use client";

import { useState } from "react";
import { Brain } from "lucide-react";
import { useDemoState, TOPICS, JOKE_TOPIC, type Topic } from "@/lib/demo-state";
import { DashboardShell } from "@/components/scene/DashboardShell";
import { useSceneNav } from "@/components/scene/nav";
import styles from "./shop.module.css";

const TA_CLASS: Record<string, string> = {
  Neurology: styles.taNeurology,
  Diabetology: styles.taDiabetology,
  Cardiology: styles.taCardiology,
  Rheumatology: styles.taRheumatology,
  Dermatology: styles.taDermatology,
};

// Extra cards purely for grid density, matching the real landing page's
// fuller topic catalogue — genuinely selectable, same as TOPICS.
const MORE_TOPICS: Topic[] = [
  { id: "closed-loop", field: "Diabetology", title: "AID and Closed Loop Systems", speaker: "Diabetologist, Technology Focus", format: "CME course · technology focus" },
  { id: "ki-kardio", field: "Cardiology", title: "Digitalization and AI in Cardiology", speaker: "Cardiologist with AI Focus", format: "CME course · future topic" },
  { id: "eular", field: "Rheumatology", title: "EULAR 2025 – Psoriatic Arthritis Update", speaker: "Congress Report Expert", format: "Congress report · current" },
];

const FILTERS = ["All", "Neurology", "Diabetology", "Cardiology", "Rheumatology", "Dermatology"];

export function Shop() {
  const { topic, setTopic } = useDemoState();
  const { next, beat } = useSceneNav();
  const [filter, setFilter] = useState("All");

  const cards = [...TOPICS, ...MORE_TOPICS].filter(
    (t) => filter === "All" || t.field === filter
  );

  if (beat === 1) {
    // Suggested-topic confirmation — a required explicit step now, whether
    // the topic came from Read My Mind or a manual pick (Daniel's reorder).
    return (
      <DashboardShell active="shop">
        <div className={styles.page}>
          <div className={styles.zoomWrap}>
            <span className={styles.zoomKicker}>Confirm your topic</span>
            <h1 className={styles.zoomTitle}>One click, and the campaign is scoped.</h1>
            <button
              className={styles.zoomCard}
              style={{ background: "#fff" }}
              onClick={next}
            >
              <span className={styles.fieldTag}>{topic.field}</span>
              <div className={styles.zoomCardTitle}>{topic.title}</div>
              <div className={styles.cardSpeaker}>{topic.speaker}</div>
              <span className={styles.zoomCta}>Confirm this topic →</span>
            </button>
          </div>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell active="shop">
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroBadge}>Sponsoring Opportunities</div>
          <h1>
            Reach <em>specialist physicians</em> where they learn
          </h1>
          <p>
            Pick a topic from the shop and configure your offer — in just a few clicks.
          </p>
          <button
            onClick={() => {
              setTopic(JOKE_TOPIC);
              next();
            }}
            className="fg-power fg-hover-wobble mt-5 inline-flex items-center gap-3 rounded-full bg-[#1A2133] px-8 py-4 text-lg font-extrabold text-white shadow-[0_20px_60px_-15px_rgba(26,33,51,0.6)] transition hover:-translate-y-0.5"
          >
            <Brain className="size-6 text-[#0EC1B7]" /> Read My Mind.
          </button>
        </section>

        <section className={styles.section}>
          <div className="mb-6">
            <h2 className={styles.sectionTitle}>Available Topics</h2>
            <p className={styles.sectionSubtitle} style={{ marginBottom: 0 }}>
              Selected: <strong>{topic.title}</strong>
            </p>
          </div>

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
                    <span className={styles.statusDot}>Available</span>
                    <span className={styles.cardCta}>
                      {isSelected ? "Selected ✓" : "Request →"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
