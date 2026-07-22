"use client";

import { useEffect, useState } from "react";
import {
  BatteryFull,
  CheckCheck,
  ChevronLeft,
  Camera,
  Mic,
  Phone,
  PhoneOutgoing,
  Plus,
  Signal,
  Smile,
  Video,
  Wifi,
} from "lucide-react";
import { playConfirm, playNotification } from "@/lib/sound";
import styles from "./leosIphone.module.css";

const CONTACT_NAME = "Hans (Best Co-Founder Ever) 🩷";

type Msg =
  | { kind: "date"; label: string }
  | { kind: "text"; from: "hans" | "leo"; text: string; time: string }
  | { kind: "emoji"; from: "hans" | "leo"; emoji: string; time: string }
  | { kind: "call"; from: "hans" | "leo"; duration: string; time: string };

// Invented, Gen-Z-casual — deliberately bad grammar/lowercase, natural
// texting voice. Callbacks to earlier gags (kidneys, "read my mind") are
// easter eggs for anyone who's seen the rest of the show.
const HISTORY: Msg[] = [
  { kind: "date", label: "3 months ago" },
  { kind: "text", from: "hans", text: "bro", time: "09:14" },
  { kind: "text", from: "hans", text: "BRO we hit 50k views 😭", time: "09:14" },
  { kind: "text", from: "leo", text: "WHAT", time: "09:15" },
  {
    kind: "text",
    from: "hans",
    text: "cant believe pia almost paid w her kidneys for this deal 💀",
    time: "09:16",
  },
  { kind: "emoji", from: "leo", emoji: "🎉", time: "09:16" },
  { kind: "date", label: "2 months ago" },
  { kind: "text", from: "hans", text: "ok not to brag but we're rich now. like actually rich", time: "18:40" },
  { kind: "text", from: "hans", text: "bought a house lol", time: "18:41" },
  { kind: "text", from: "leo", text: "WHAT HOUSE", time: "18:42" },
  { kind: "text", from: "hans", text: "5 bedrooms. i live alone. don't ask", time: "18:44" },
  { kind: "text", from: "leo", text: "u have 1 (one) friend hans", time: "18:45" },
  { kind: "date", label: "3 weeks ago" },
  { kind: "text", from: "hans", text: "yo can i use ur pj this wknd", time: "12:03" },
  { kind: "text", from: "leo", text: "ur pj?? get ur own 😭", time: "12:05" },
  { kind: "text", from: "hans", text: "cheapskate", time: "12:05" },
  { kind: "call", from: "leo", duration: "8 sec", time: "12:22" },
  { kind: "date", label: "2 days ago" },
  { kind: "text", from: "hans", text: "u up?", time: "02:14" },
  { kind: "date", label: "Yesterday" },
  { kind: "text", from: "leo", text: "bro it's literally 2pm", time: "14:02" },
  { kind: "text", from: "leo", text: "whats good", time: "14:03" },
];

// Shown today, right after Leo's belated reply — Hans drops the real
// question the same day he finally gets a response. The "Today" divider
// itself is rendered statically (see chatArea below), not timer-controlled.
const REVEAL: Msg[] = [
  { kind: "text", from: "hans", text: "so uhh", time: "18:20" },
  { kind: "text", from: "hans", text: "do we need them anymore?", time: "18:20" },
  {
    kind: "text",
    from: "hans",
    text: "lets make them rich and buy them all out 🤑🤑",
    time: "18:21",
  },
];

function Bubble({ msg }: { msg: Msg }) {
  if (msg.kind === "date") {
    return <div className={styles.dateDivider}>{msg.label}</div>;
  }

  const sent = msg.from === "leo";

  if (msg.kind === "call") {
    return (
      <div className={`${styles.row} ${sent ? styles.rowSent : styles.rowReceived}`}>
        <div className={`${styles.bubble} ${sent ? styles.bubbleSent : styles.bubbleReceived}`}>
          <div className={styles.callBubble}>
            <span className={styles.callIcon}>
              <PhoneOutgoing className="size-4" />
            </span>
            <div className={styles.callText}>
              <span className={styles.callLabel}>Voice call</span>
              <span className={styles.callSub}>{msg.duration}</span>
            </div>
          </div>
          <div className={`${styles.bubbleMeta} ${sent ? styles.metaSent : ""}`}>
            <span>{msg.time}</span>
            {sent && <CheckCheck className={`size-3.5 ${styles.tick}`} />}
          </div>
        </div>
      </div>
    );
  }

  if (msg.kind === "emoji") {
    return (
      <div className={`${styles.row} ${sent ? styles.rowSent : styles.rowReceived}`}>
        <div className={styles.emojiBubble}>
          <span className={styles.emojiOnly}>{msg.emoji}</span>
          <div className={`${styles.bubbleMeta} ${sent ? styles.metaSent : ""}`}>
            <span>{msg.time}</span>
            {sent && <CheckCheck className={`size-3.5 ${styles.tick}`} />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.row} ${sent ? styles.rowSent : styles.rowReceived}`}>
      <div className={`${styles.bubble} ${sent ? styles.bubbleSent : styles.bubbleReceived}`}>
        {msg.text}
        <div className={`${styles.bubbleMeta} ${sent ? styles.metaSent : ""}`}>
          <span>{msg.time}</span>
          {sent && <CheckCheck className={`size-3.5 ${styles.tick}`} />}
        </div>
      </div>
    </div>
  );
}

export function LeosIphone() {
  const [revealed, setRevealed] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setTyping(true), 700);
    const t2 = setTimeout(() => {
      setTyping(false);
      setRevealed(1);
    }, 1900);
    const t3 = setTimeout(() => {
      setRevealed(2);
      playNotification();
    }, 2900);
    const t4 = setTimeout(() => {
      setRevealed(3);
      playConfirm();
    }, 4100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className={styles.stage}>
      <div className={styles.phoneWrap}>
        <span className={styles.kicker}>Leo&rsquo;s iPhone</span>
        <div className={styles.phone}>
          <div className={styles.notch} />
          <div className={styles.screen}>
            <div className={styles.statusBar}>
              <span>18:20</span>
              <span className={styles.statusIcons}>
                <Signal className="size-3.5" />
                <Wifi className="size-3.5" />
                <BatteryFull className="size-4" />
              </span>
            </div>

            <div className={styles.header}>
              <ChevronLeft className={`size-5 ${styles.back}`} />
              <span className={styles.avatar}>H</span>
              <div className={styles.headerText}>
                <div className={styles.headerName}>{CONTACT_NAME}</div>
                <div className={`${styles.headerSub} ${typing ? styles.typing : ""}`}>
                  {typing ? "typing…" : "online"}
                </div>
              </div>
              <div className={styles.headerIcons}>
                <Video className="size-[18px]" />
                <Phone className="size-4" />
              </div>
            </div>

            <div className={styles.chatArea}>
              {HISTORY.map((msg, i) => (
                <Bubble key={i} msg={msg} />
              ))}
              <div className={styles.dateDivider}>Today</div>
              {revealed >= 1 &&
                REVEAL.slice(0, revealed).map((msg, i) => (
                  <div key={i} className={styles.bubbleIn}>
                    <Bubble msg={msg} />
                  </div>
                ))}
              {typing && (
                <div className={styles.row}>
                  <div className={styles.typingBubble}>
                    <span className={styles.typingDot} />
                    <span className={styles.typingDot} />
                    <span className={styles.typingDot} />
                  </div>
                </div>
              )}
            </div>

            <div className={styles.inputBar}>
              <Plus className="size-5" />
              <span className={styles.inputPill}>
                Message
                <Smile className="size-4" />
              </span>
              <Camera className="size-5" />
              <Mic className="size-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
