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
  const { next, beat, goToBeat, skipToNextScene } = useSceneNav();
  const [filter, setFilter] = useState("All");

  const cards = [...TOPICS, ...MORE_TOPICS].filter(
    (t) => filter === "All" || t.field === filter
  );

  if (beat === 1) {
    // "Read My Mind" now comes first — the default next beat after the
    // overview, ahead of manually browsing. Clicking it picks a joke topic
    // and skips straight to checkout, bypassing the manual-pick zoom below.
    return (
      <DashboardShell active="shop">
        <div className={styles.page}>
          <div className={styles.zoomWrap}>
            <span className={styles.zoomKicker}>AI at work</span>
            <h1 className={styles.zoomTitle}>Let AI read your mind…</h1>
            <button
              onClick={() => {
                setTopic(JOKE_TOPIC);
                skipToNextScene();
              }}
              className="flex items-center gap-4 rounded-full bg-[#1A2133] px-14 py-8 text-3xl font-extrabold text-white shadow-[0_30px_80px_-20px_rgba(26,33,51,0.5)] transition hover:-translate-y-1"
            >
              <Brain className="size-9 text-[#0EC1B7]" /> Read My Mind.
            </button>
          </div>
        </div>
      </DashboardShell>
    );
  }

  if (beat === 2) {
    // Zoomed beat: drop all chrome, one huge focal card — the manual-pick
    // path, shown after Read My Mind if the moderator keeps pressing Next.
    return (
      <DashboardShell active="shop">
        <div className={styles.page}>
          <div className={styles.zoomWrap}>
            <span className={styles.zoomKicker}>Pick a topic</span>
            <h1 className={styles.zoomTitle}>One click, and the campaign is scoped.</h1>
            <button
              className={styles.zoomCard}
              style={{ background: "#fff" }}
              onClick={next}
            >
              <span className={styles.fieldTag}>{topic.field}</span>
              <div className={styles.zoomCardTitle}>{topic.title}</div>
              <div className={styles.cardSpeaker}>{topic.speaker}</div>
              <span className={styles.zoomCta}>Select this topic →</span>
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
        </section>

        <section className={styles.section}>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className={styles.sectionTitle}>Available Topics</h2>
              <p className={styles.sectionSubtitle} style={{ marginBottom: 0 }}>
                Selected: <strong>{topic.title}</strong>
              </p>
            </div>
            <button
              onClick={() => goToBeat(1)}
              className="flex items-center gap-2 rounded-full border-2 border-[#1A2133] px-5 py-2.5 text-sm font-bold text-[#1A2133] transition hover:bg-[#1A2133] hover:text-white"
            >
              <Brain className="size-4" /> Read My Mind.
            </button>
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
