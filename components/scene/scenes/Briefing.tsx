"use client";

import { useEffect, useState } from "react";
import { useDemoState } from "@/lib/demo-state";
import styles from "./briefing.module.css";

const FOCUS_CHIPS = ["Diagnostik", "Therapieoptionen", "Praxisrelevanz", "Leitlinien-Update"];

type Step = "form" | "processing" | "done";

export function Briefing() {
  const { topic } = useDemoState();
  const [focus, setFocus] = useState(FOCUS_CHIPS[1]);
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState<Step>("form");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (step !== "processing") return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 87) {
          clearInterval(interval);
          setTimeout(() => setStep("done"), 400);
          return 87;
        }
        return p + Math.ceil(Math.random() * 15);
      });
    }, 120);
    return () => clearInterval(interval);
  }, [step]);

  if (step === "processing") {
    return (
      <div className={styles.page}>
        <div className={styles.stateScreen}>
          <div className={styles.stateIcon}>🧠</div>
          <h2>Einen Moment…</h2>
          <p>KI liest Ihre Gedanken… {Math.min(progress, 87)} %</p>
          <div className="mt-4 h-2 w-64 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-brand transition-all duration-150"
              style={{ width: `${Math.min(progress, 87)}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (step === "done") {
    return (
      <div className={styles.page}>
        <div className={styles.stateScreen}>
          <div className={styles.stateIcon}>✓</div>
          <h2>Vielen Dank für Ihr Briefing!</h2>
          <p>
            Ihr Pre Kick-Off Briefing wurde erfolgreich an Doctorflix übermittelt. Der Referent
            wurde benachrichtigt.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={`${styles.wrap} ${styles.topbarInner}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/doctorflix-logo.svg" alt="Doctorflix" className={styles.logo} />
          <span className={styles.progressChip}>Bereit zum Absenden</span>
        </div>
      </header>

      <div className={styles.wrap}>
        <section className={styles.hero}>
          <div className={styles.eyebrow}>Kick-Off Vorbereitung</div>
          <h1>
            Gemeinsam gut <span className={styles.ac}>vorbereitet</span>.
          </h1>
          <p>
            Doctorflix Medical hat für &ldquo;{topic.title}&rdquo; bereits ein Konzept
            entwickelt. Ein paar ergänzende Angaben, dann sind wir startklar.
          </p>
        </section>

        <div className={styles.dealCard}>
          <div className={styles.dealField}>
            <span className={styles.dcLabel}>Thema</span>
            <span className={styles.dcVal}>{topic.title}</span>
          </div>
          <div className={styles.dealField}>
            <span className={styles.dcLabel}>Ansprechpartner</span>
            <span className={styles.dcVal}>{topic.speaker}</span>
          </div>
        </div>

        <div className={styles.disclaimer}>
          Die Angaben in diesem Formular dienen ausschließlich der Transparenz und
          Dokumentation. Thema und Durchführung werden eigenständig vom Referenten festgelegt.
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Inhaltlicher Fokus</div>
          <div className={styles.sectionSubtitle}>Was soll im Vordergrund stehen?</div>
          <div className={styles.chipRow}>
            {FOCUS_CHIPS.map((c) => (
              <button
                key={c}
                onClick={() => setFocus(c)}
                className={`${styles.chip} ${focus === c ? styles.chipSelected : ""}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Anmerkungen</div>
          <div className={styles.sectionSubtitle}>Optional — alles Weitere besprechen wir im Kick-Off Call.</div>
          <textarea
            className={styles.fieldTextarea}
            placeholder="z. B. Praxisbeispiele einbauen…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {["Zielgruppe & Reichweite", "Format-Details", "Abrechnungshinweise"].map((title) => (
          <div key={title} className={`${styles.section} ${styles.sectionDisabled}`}>
            <div className={styles.sectionTitle}>{title}</div>
            <div className={styles.sectionSubtitle}>Wird im Kick-Off Call besprochen.</div>
          </div>
        ))}
      </div>

      <div className={styles.submitBar}>
        <span className={styles.submitInfo}>Bereit zum Absenden</span>
        <div className="flex items-center gap-2">
          <button
            className="rounded-full border border-brand/40 bg-brand/5 px-4 py-2 text-xs font-semibold text-brand hover:bg-brand/10"
            onClick={() => setStep("processing")}
          >
            Briefing absenden und Autoantwort aktivieren bis Q4 📤
          </button>
          <button className={styles.btnDark} onClick={() => setStep("processing")}>
            An Doctorflix übermitteln →
          </button>
        </div>
      </div>
    </div>
  );
}
