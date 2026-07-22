"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { useDemoState } from "@/lib/demo-state";
import styles from "./briefing.module.css";

const FOCUS_CHIPS = ["Diagnostics", "Treatment Options", "Practice Relevance", "Guideline Update"];

// What the "Fill in with AI" button types into the form — themed to the
// Chotto epidemic joke topic (see lib/demo-state.tsx's JOKE_TOPIC).
const AI_FOCUS = "Treatment Options";
const AI_NOTES =
  "Emphasize the REWE salad bar therapy — early data looks promising. Mention rising Chottoism case numbers and the 2-Tuesday incubation window.";

type Step = "form" | "processing" | "done";

export function Briefing() {
  const { topic } = useDemoState();
  const [focus, setFocus] = useState(FOCUS_CHIPS[1]);
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState<Step>("form");
  const [progress, setProgress] = useState(0);
  const [aiFilling, setAiFilling] = useState(false);
  const typingInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (typingInterval.current) clearInterval(typingInterval.current);
    };
  }, []);

  function handleAiFill() {
    if (aiFilling) return;
    setAiFilling(true);
    setNotes("");
    setTimeout(() => {
      setFocus(AI_FOCUS);
      let i = 0;
      typingInterval.current = setInterval(() => {
        i++;
        setNotes(AI_NOTES.slice(0, i));
        if (i >= AI_NOTES.length) {
          if (typingInterval.current) clearInterval(typingInterval.current);
          setAiFilling(false);
        }
      }, 18);
    }, 500);
  }

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
          <h2>One moment…</h2>
          <p>AI is reading your mind… {Math.min(progress, 87)} %</p>
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
          <h2>Thank you for your briefing!</h2>
          <p>
            Your Pre-Kick-Off briefing was successfully submitted to Doctorflix. The Speaker has
            been notified.
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
          <span className={styles.progressChip}>Ready to submit</span>
        </div>
      </header>

      <div className={styles.wrap}>
        <section className={styles.hero}>
          <div className={styles.eyebrow}>Kick-Off Preparation</div>
          <h1>
            Well <span className={styles.ac}>prepared</span>, together.
          </h1>
          <p>
            Doctorflix Medical has already developed a concept for &ldquo;{topic.title}&rdquo;. A
            few additional details, and we&rsquo;re ready to go.
          </p>
        </section>

        <div className={styles.dealCard}>
          <div className={styles.dealField}>
            <span className={styles.dcLabel}>Topic</span>
            <span className={styles.dcVal}>{topic.title}</span>
          </div>
          <div className={styles.dealField}>
            <span className={styles.dcLabel}>Contact</span>
            <span className={styles.dcVal}>{topic.speaker}</span>
          </div>
        </div>

        <div className={styles.disclaimer}>
          The information in this form is for transparency and documentation purposes only. The
          topic and delivery are determined independently by the Speaker.
        </div>

        <button
          onClick={handleAiFill}
          disabled={aiFilling}
          className="mb-6 flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
        >
          <Sparkles className="size-4" /> {aiFilling ? "Filling in…" : "Fill in with AI"}
        </button>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Content Focus</div>
          <div className={styles.sectionSubtitle}>What should take center stage?</div>
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
          <div className={styles.sectionTitle}>Notes</div>
          <div className={styles.sectionSubtitle}>Optional — we&rsquo;ll cover everything else on the kick-off call.</div>
          <textarea
            className={styles.fieldTextarea}
            placeholder="e.g. include practice examples…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {["Target Audience & Reach", "Format Details", "Billing Notes"].map((title) => (
          <div key={title} className={`${styles.section} ${styles.sectionDisabled}`}>
            <div className={styles.sectionTitle}>{title}</div>
            <div className={styles.sectionSubtitle}>Discussed on the kick-off call.</div>
          </div>
        ))}
      </div>

      <div className={styles.submitBar}>
        <span className={styles.submitInfo}>Ready to submit</span>
        <div className="flex items-center gap-2">
          <button
            className="rounded-full border border-brand/40 bg-brand/5 px-4 py-2 text-xs font-semibold text-brand hover:bg-brand/10"
            onClick={() => setStep("processing")}
          >
            Submit briefing and enable auto-reply until Q4 📤
          </button>
          <button className={styles.btnDark} onClick={() => setStep("processing")}>
            Submit to Doctorflix →
          </button>
        </div>
      </div>
    </div>
  );
}
