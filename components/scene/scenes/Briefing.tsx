"use client";

import { useRef, useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { useDemoState } from "@/lib/demo-state";
import { DashboardShell } from "@/components/scene/DashboardShell";
import styles from "./briefing.module.css";

const FOCUS_CHIPS = ["Diagnostics", "Treatment Options", "Practice Relevance", "Guideline Update"];

// What the "Fill in with AI" button types into the form — themed to the
// Chotto epidemic joke topic (see lib/demo-state.tsx's JOKE_TOPIC).
const AI_FOCUS = "Treatment Options";
const AI_NOTES =
  "Emphasize the REWE salad bar therapy — early data looks promising. Mention rising Chottoism case numbers and the 2-Tuesday incubation window.";
const AI_AUDIENCE =
  "General practitioners & internists nationwide — high self-reported overlap with Chotto regulars.";
const AI_FORMAT_DETAILS =
  "On-demand video · mobile-first playback · subtitles in DE/EN · CME certificate issued automatically on completion.";

// Kick-off prep, inside the Pharma "Projects" dashboard tab — same side nav as
// Shop/Checkout for a coherent shell, plus a process stepper showing where the
// project sits (Booking → Briefing → Production → Go Live → Reporting). The
// old detailed form stays — the AI-fill button types into it, scrolling the
// page down field by field so the moderator can watch it happen without
// scrolling manually — but submitting no longer shows an "AI is reading your
// brain" processing screen; it goes straight to the sent confirmation.
const STEPS = ["Booking", "Briefing", "Production", "Go Live", "Reporting"] as const;
const CURRENT_STEP = 1; // "Briefing"

function ProcessStepper() {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {STEPS.map((label, i) => {
        const done = i < CURRENT_STEP;
        const current = i === CURRENT_STEP;
        return (
          <div key={label} className="flex items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-2">
              <span
                className={`flex size-6 flex-none items-center justify-center rounded-full text-[11px] font-bold ${
                  done
                    ? "bg-brand text-brand-foreground"
                    : current
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/15"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {done ? <Check className="size-3.5" /> : i + 1}
              </span>
              <span
                className={`text-xs font-semibold ${
                  current ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span className={`h-px w-5 sm:w-8 ${done ? "bg-brand" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export function Briefing() {
  const { topic, speaker } = useDemoState();
  const [focus, setFocus] = useState(FOCUS_CHIPS[1]);
  const [notes, setNotes] = useState("");
  const [audience, setAudience] = useState("");
  const [formatDetails, setFormatDetails] = useState("");
  const [aiFilling, setAiFilling] = useState(false);
  const [done, setDone] = useState(false);

  const focusRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  const audienceRef = useRef<HTMLDivElement>(null);
  const formatRef = useRef<HTMLDivElement>(null);

  // Reveals `text` into `setter` character by character; resolves when done.
  function typeInto(setter: (s: string) => void, text: string, speed = 16) {
    return new Promise<void>((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setter(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  }

  function scrollTo(ref: React.RefObject<HTMLDivElement | null>) {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  async function handleAiFill() {
    if (aiFilling) return;
    setAiFilling(true);
    setNotes("");
    setAudience("");
    setFormatDetails("");

    scrollTo(focusRef);
    await wait(500);
    setFocus(AI_FOCUS);
    await wait(500);

    scrollTo(notesRef);
    await wait(300);
    await typeInto(setNotes, AI_NOTES);

    scrollTo(audienceRef);
    await wait(300);
    await typeInto(setAudience, AI_AUDIENCE);

    scrollTo(formatRef);
    await wait(300);
    await typeInto(setFormatDetails, AI_FORMAT_DETAILS);

    setAiFilling(false);
  }

  if (done) {
    return (
      <DashboardShell active="projects">
        <div className={styles.page}>
          <div className={styles.stateScreen}>
            <div className={styles.stateIcon}>✓</div>
            <h2>Thank you for your briefing!</h2>
            <p>
              Your Pre-Kick-Off briefing was successfully submitted to Doctorflix.{" "}
              {speaker ?? "The Speaker"} has been notified.
            </p>
          </div>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell active="projects">
      <div className={styles.page}>
        <header className={styles.topbar}>
          <div className={`${styles.wrap} ${styles.topbarInner}`}>
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

          <div className="mb-6 rounded-2xl border border-border bg-card px-6 py-5">
            <ProcessStepper />
          </div>

          <div className={styles.dealCard}>
            <div className={styles.dealField}>
              <span className={styles.dcLabel}>Topic</span>
              <span className={styles.dcVal}>{topic.title}</span>
            </div>
            <div className={styles.dealField}>
              <span className={styles.dcLabel}>Speaker</span>
              <span className={styles.dcVal}>{speaker ?? "TBD"}</span>
            </div>
            <div className={styles.dealField}>
              <span className={styles.dcLabel}>Format</span>
              <span className={styles.dcVal}>{topic.format}</span>
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

          <div ref={focusRef} className={styles.section}>
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

          <div ref={notesRef} className={styles.section}>
            <div className={styles.sectionTitle}>Notes</div>
            <div className={styles.sectionSubtitle}>
              Optional — we&rsquo;ll cover everything else on the kick-off call.
            </div>
            <textarea
              className={styles.fieldTextarea}
              placeholder="e.g. include practice examples…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div ref={audienceRef} className={styles.section}>
            <div className={styles.sectionTitle}>Target Audience &amp; Reach</div>
            <div className={styles.sectionSubtitle}>Who this campaign is aimed at.</div>
            <textarea
              className={styles.fieldTextarea}
              placeholder="e.g. general practitioners, nationwide…"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            />
          </div>

          <div ref={formatRef} className={styles.section}>
            <div className={styles.sectionTitle}>Format Details</div>
            <div className={styles.sectionSubtitle}>Delivery specifics for the Speaker.</div>
            <textarea
              className={styles.fieldTextarea}
              placeholder="e.g. subtitles, certificate handling…"
              value={formatDetails}
              onChange={(e) => setFormatDetails(e.target.value)}
            />
          </div>

          <div className={`${styles.section} ${styles.sectionDisabled}`}>
            <div className={styles.sectionTitle}>Billing Notes</div>
            <div className={styles.sectionSubtitle}>Discussed on the kick-off call.</div>
          </div>
        </div>

        <div className={styles.submitBar}>
          <span className={styles.submitInfo}>Ready to submit</span>
          <div className="flex items-center gap-2">
            <button
              className="rounded-full border border-brand/40 bg-brand/5 px-4 py-2 text-xs font-semibold text-brand hover:bg-brand/10"
              onClick={() => setDone(true)}
            >
              Submit briefing and enable auto-reply until Q4 📤
            </button>
            <button className={styles.btnDark} onClick={() => setDone(true)}>
              Submit to Doctorflix →
            </button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
