"use client";

import { useMemo, useState } from "react";
import { useDemoState } from "@/lib/demo-state";
import { DashboardShell } from "@/components/scene/DashboardShell";
import { useSceneNav } from "@/components/scene/nav";
import styles from "./checkout.module.css";

const PACKAGES = [
  { id: "basic", name: "Basic", year1: 6900, tag: "Solid CME distribution with all the basics." },
  { id: "plus", name: "Plus", year1: 8400, tag: "More reach, newsletter & your own partner page.", badge: "Recommended" },
  { id: "premium", name: "Premium", year1: 12600, tag: "Maximum visibility & journal placement." },
] as const;

const FORMAT = { name: "Video on demand", price: 11950 };
const ADDON = { name: "Marketing Plus M", price: 6500 };

const PAY_METHODS = [
  { id: "kidneys", label: "🫘 Pay with your Kidneys" },
  { id: "firstborn", label: "👶 Pay with your Firstborn" },
] as const;

// Same roster as VideoGen's avatar picker — here it's Pharma choosing who
// gets booked; picking a name is the live cue for that person to walk on stage.
const REFERENTS = ["Sehouli", "Prelog", "Paula Cramer"];

export function Checkout() {
  const { topic } = useDemoState();
  const { next, beat } = useSceneNav();
  const [pkg, setPkg] = useState<(typeof PACKAGES)[number]>(PACKAGES[1]);
  const [addonOn, setAddonOn] = useState(true);
  const [qty, setQty] = useState(1);
  const [payMethod, setPayMethod] = useState<string>(PAY_METHODS[0].id);
  const [submitted, setSubmitted] = useState(false);
  const [referent, setReferent] = useState<string | null>(null);

  const total = useMemo(
    () => pkg.year1 + FORMAT.price * qty + (addonOn ? ADDON.price : 0),
    [pkg, qty, addonOn]
  );

  if (beat === 1) {
    // Zoomed beat: the package decision, blown up — this is the click that
    // sets the whole deal size.
    return (
      <DashboardShell active="shop">
        <div className={styles.page}>
          <div className={styles.zoomWrap}>
            <span className={styles.zoomKicker}>Choose a package</span>
            <h1 className={styles.zoomTitle}>Pick a tier, the price updates live.</h1>
            <div className={styles.zoomPkgs}>
              {PACKAGES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPkg(p)}
                  className={`${styles.zoomPkg} ${pkg.id === p.id ? styles.zoomPkgSelected : ""}`}
                >
                  {"badge" in p && <span className={styles.pkgBadge}>{p.badge}</span>}
                  <div className={styles.zoomPkgTier}>{p.name}</div>
                  <div className={styles.zoomPkgPrice}>
                    {p.year1.toLocaleString("en-US")} € <small style={{ fontSize: 14, fontWeight: 400 }}>/ year 1</small>
                  </div>
                  <div className={styles.pkgTag}>{p.tag}</div>
                </button>
              ))}
            </div>
            <button className={styles.btnSubmit} style={{ maxWidth: 320 }} onClick={next}>
              Continue with {pkg.name} →
            </button>
          </div>
        </div>
      </DashboardShell>
    );
  }

  if (beat === 2) {
    // Zoomed beat: Pharma picks who presents — the click is the live cue for
    // that candidate to walk on stage.
    return (
      <DashboardShell active="shop">
        <div className={styles.page}>
          <div className={styles.zoomWrap}>
            <span className={styles.zoomKicker}>Pick your fighter</span>
            <h1 className={styles.zoomTitle}>Which Referent presents this one?</h1>
            <div className={styles.zoomPkgs}>
              {REFERENTS.map((name) => (
                <button
                  key={name}
                  onClick={() => setReferent(name)}
                  className={`${styles.zoomPkg} ${referent === name ? styles.zoomPkgSelected : ""}`}
                  style={{ textAlign: "center" }}
                >
                  <span
                    className={styles.zoomPkgTier}
                    style={{
                      display: "flex",
                      height: 64,
                      width: 64,
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 12px",
                      borderRadius: "50%",
                      background: "#1A2133",
                      color: "#fff",
                    }}
                  >
                    {name[0]}
                  </span>
                  <div className={styles.zoomPkgTier}>{name}</div>
                </button>
              ))}
            </div>
            <button
              className={styles.btnSubmit}
              style={{ maxWidth: 320 }}
              disabled={!referent}
              onClick={next}
            >
              {referent ? `Book ${referent} →` : "Pick a Referent"}
            </button>
          </div>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell active="shop">
      <div className={styles.page}>
        <header className={styles.topbar}>
          <div className={`${styles.wrap} ${styles.topbarInner}`}>
            <div className={styles.tbTotal}>
              <span className={styles.ttLabel}>Year 1 · live</span>
              <span className={styles.ttVal}>{total.toLocaleString("en-US")} €</span>
            </div>
          </div>
        </header>

        <section className={styles.hero}>
          <div className={`${styles.wrap} ${styles.heroInner}`}>
            <div className={styles.eyebrow}>Interactive Cost Configurator</div>
            <h1>
              Your CME campaign, <span className={styles.ac}>transparently</span> calculated.
            </h1>
            <p>
              Offer for <strong>{topic.title}</strong> — prices update live as you configure.
            </p>
          </div>
        </section>

        <div className={styles.wrap}>
          <div className={styles.layout}>
            <main>
              <section className={styles.step}>
                <div className={styles.stepHead}>
                  <div className={styles.stepNum}>1</div>
                  <h2>CME Format</h2>
                </div>
                <p className={styles.stepSub}>Based on your topic selection.</p>
                <div className={styles.opt}>
                  <div className={`${styles.optCheck}`} style={{ background: "#159f95", borderColor: "#159f95" }}>
                    ✓
                  </div>
                  <div className={styles.optBody}>
                    <div className={styles.optTitle}>{FORMAT.name}</div>
                    <div className={styles.optDesc}>{topic.title}</div>
                  </div>
                  <div className={styles.optPrice}>{FORMAT.price.toLocaleString("en-US")} €</div>
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
                  <h2>Choose a Package</h2>
                </div>
                <p className={styles.stepSub}>Plus is preselected.</p>
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
                        {p.year1.toLocaleString("en-US")} € <small>/ year 1</small>
                      </div>
                      <div className={styles.pkgTag}>{p.tag}</div>
                    </button>
                  ))}
                </div>
              </section>

              <section className={styles.step}>
                <div className={styles.stepHead}>
                  <div className={styles.stepNum}>3</div>
                  <h2>Add-Ons</h2>
                </div>
                <p className={styles.stepSub}>Flexible marketing services.</p>
                <div
                  className={`${styles.opt} ${addonOn ? styles.optSelected : ""}`}
                  onClick={() => setAddonOn((v) => !v)}
                >
                  <div className={styles.optCheck}>{addonOn ? "✓" : ""}</div>
                  <div className={styles.optBody}>
                    <div className={styles.optTitle}>{ADDON.name}</div>
                    <div className={styles.optDesc}>Marketing package M.</div>
                  </div>
                  <div className={styles.optPrice}>{ADDON.price.toLocaleString("en-US")} €</div>
                </div>
              </section>
            </main>

            <aside className={styles.summary}>
              <div className={styles.sumCard}>
                <div className={styles.sumHead}>
                  <div className={styles.shLabel}>Your Configuration</div>
                  <div className={styles.shPkg}>Package {pkg.name}</div>
                </div>
                <div className={styles.sumBody}>
                  <div className={styles.li}>
                    <span>{FORMAT.name} × {qty}</span>
                    <span>{(FORMAT.price * qty).toLocaleString("en-US")} €</span>
                  </div>
                  {addonOn && (
                    <div className={styles.li}>
                      <span>{ADDON.name}</span>
                      <span>{ADDON.price.toLocaleString("en-US")} €</span>
                    </div>
                  )}
                  <div className={styles.li}>
                    <span>Package fee</span>
                    <span>{pkg.year1.toLocaleString("en-US")} €</span>
                  </div>
                  <div className={styles.sumTot}>
                    <div className={styles.tLabel}>
                      Year 1 Investment<small>excl. VAT</small>
                    </div>
                    <div className={styles.tVal}>{total.toLocaleString("en-US")} €</div>
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
                        Start Project
                      </button>
                      <button
                        className="mt-2 w-full rounded-full border border-brand/40 bg-brand/5 py-2 text-xs font-semibold text-brand hover:bg-brand/10"
                        onClick={() => setSubmitted(true)}
                      >
                        Start Project and Book a One-Way Ticket to the Beach 🏖️
                      </button>
                    </>
                  ) : (
                    <p className="mt-4 rounded-xl bg-brand/10 p-3 text-center text-sm font-medium text-brand">
                      ✓ Checkout complete — Referent is booked directly.
                    </p>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
