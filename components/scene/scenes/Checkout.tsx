"use client";

import { useMemo, useState } from "react";
import { useDemoState } from "@/lib/demo-state";
import styles from "./checkout.module.css";

const PACKAGES = [
  { id: "basic", name: "Basic", jahr1: 6900, tag: "Solide CME-Distribution mit allen Basics." },
  { id: "plus", name: "Plus", jahr1: 8400, tag: "Mehr Reichweite, Newsletter & eigene Partnerpage.", badge: "Empfohlen" },
  { id: "premium", name: "Premium", jahr1: 12600, tag: "Maximale Sichtbarkeit & Journal." },
] as const;

const FORMAT = { name: "Video on demand", price: 11950 };
const ADDON = { name: "Marketing Plus M", price: 6500 };

const PAY_METHODS = [
  { id: "kidneys", label: "🫘 Pay with your Kidneys" },
  { id: "firstborn", label: "👶 Pay with your Firstborn" },
] as const;

export function Checkout() {
  const { topic } = useDemoState();
  const [pkg, setPkg] = useState<(typeof PACKAGES)[number]>(PACKAGES[1]);
  const [addonOn, setAddonOn] = useState(true);
  const [qty, setQty] = useState(1);
  const [payMethod, setPayMethod] = useState<string>(PAY_METHODS[0].id);
  const [submitted, setSubmitted] = useState(false);

  const total = useMemo(
    () => pkg.jahr1 + FORMAT.price * qty + (addonOn ? ADDON.price : 0),
    [pkg, qty, addonOn]
  );

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={`${styles.wrap} ${styles.topbarInner}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/doctorflix-logo.svg" alt="Doctorflix" className={styles.logo} />
          <div className={styles.tbTotal}>
            <span className={styles.ttLabel}>Jahr 1 · live</span>
            <span className={styles.ttVal}>{total.toLocaleString("de-DE")} €</span>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={`${styles.wrap} ${styles.heroInner}`}>
          <div className={styles.eyebrow}>Interaktiver Kostenkonfigurator</div>
          <h1>
            Ihre CME-Kampagne, <span className={styles.ac}>transparent</span> kalkuliert.
          </h1>
          <p>
            Angebot für <strong>{topic.title}</strong> — Preise passen sich live an Ihre Auswahl
            an.
          </p>
        </div>
      </section>

      <div className={styles.wrap}>
        <div className={styles.layout}>
          <main>
            <section className={styles.step}>
              <div className={styles.stepHead}>
                <div className={styles.stepNum}>1</div>
                <h2>CME-Format</h2>
              </div>
              <p className={styles.stepSub}>Basierend auf Ihrer Themenauswahl.</p>
              <div className={styles.opt}>
                <div className={`${styles.optCheck}`} style={{ background: "#159f95", borderColor: "#159f95" }}>
                  ✓
                </div>
                <div className={styles.optBody}>
                  <div className={styles.optTitle}>{FORMAT.name}</div>
                  <div className={styles.optDesc}>{topic.title}</div>
                </div>
                <div className={styles.optPrice}>{FORMAT.price.toLocaleString("de-DE")} €</div>
                <div className={styles.qty}>
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))}>–</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)}>+</button>
                </div>
              </div>
            </section>

            <section className={styles.step}>
              <div className={styles.stepHead}>
                <div className={styles.stepNum}>2</div>
                <h2>Paket wählen</h2>
              </div>
              <p className={styles.stepSub}>Plus ist vorausgewählt.</p>
              <div className={styles.pkgs}>
                {PACKAGES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPkg(p)}
                    className={`${styles.pkg} ${pkg.id === p.id ? styles.pkgSelected : ""}`}
                  >
                    {"badge" in p && <span className={styles.pkgBadge}>{p.badge}</span>}
                    <div className={styles.pkgTier}>{p.name}</div>
                    <div className={styles.pkgPrice}>
                      {p.jahr1.toLocaleString("de-DE")} € <small>/ Jahr 1</small>
                    </div>
                    <div className={styles.pkgTag}>{p.tag}</div>
                  </button>
                ))}
              </div>
            </section>

            <section className={styles.step}>
              <div className={styles.stepHead}>
                <div className={styles.stepNum}>3</div>
                <h2>Zusatzleistungen</h2>
              </div>
              <p className={styles.stepSub}>Flexible Marketing-Leistungen.</p>
              <div
                className={`${styles.opt} ${addonOn ? styles.optSelected : ""}`}
                onClick={() => setAddonOn((v) => !v)}
              >
                <div className={styles.optCheck}>{addonOn ? "✓" : ""}</div>
                <div className={styles.optBody}>
                  <div className={styles.optTitle}>{ADDON.name}</div>
                  <div className={styles.optDesc}>Marketing-Paket M.</div>
                </div>
                <div className={styles.optPrice}>{ADDON.price.toLocaleString("de-DE")} €</div>
              </div>
            </section>
          </main>

          <aside className={styles.summary}>
            <div className={styles.sumCard}>
              <div className={styles.sumHead}>
                <div className={styles.shLabel}>Ihre Konfiguration</div>
                <div className={styles.shPkg}>Paket {pkg.name}</div>
              </div>
              <div className={styles.sumBody}>
                <div className={styles.li}>
                  <span>{FORMAT.name} × {qty}</span>
                  <span>{(FORMAT.price * qty).toLocaleString("de-DE")} €</span>
                </div>
                {addonOn && (
                  <div className={styles.li}>
                    <span>{ADDON.name}</span>
                    <span>{ADDON.price.toLocaleString("de-DE")} €</span>
                  </div>
                )}
                <div className={styles.li}>
                  <span>Paketgebühr</span>
                  <span>{pkg.jahr1.toLocaleString("de-DE")} €</span>
                </div>
                <div className={styles.sumTot}>
                  <div className={styles.tLabel}>
                    Investment Jahr 1<small>zzgl. USt.</small>
                  </div>
                  <div className={styles.tVal}>{total.toLocaleString("de-DE")} €</div>
                </div>

                {!submitted ? (
                  <>
                    <div className="mt-4 flex gap-2">
                      {PAY_METHODS.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setPayMethod(m.id)}
                          className={`flex-1 rounded-lg border px-2 py-2 text-xs font-medium transition ${
                            payMethod === m.id
                              ? "border-brand bg-brand/5 text-brand"
                              : "border-border bg-card hover:border-brand/40"
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                    <button className={styles.btnSubmit} onClick={() => setSubmitted(true)}>
                      Projekt starten
                    </button>
                    <button
                      className="mt-2 w-full rounded-full border border-brand/40 bg-brand/5 py-2 text-xs font-semibold text-brand hover:bg-brand/10"
                      onClick={() => setSubmitted(true)}
                    >
                      Projekt starten und One-Way-Ticket an den Strand buchen 🏖️
                    </button>
                  </>
                ) : (
                  <p className="mt-4 rounded-xl bg-brand/10 p-3 text-center text-sm font-medium text-brand">
                    ✓ Checkout abgeschlossen — Referent wird direkt gebucht.
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
