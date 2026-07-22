"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, MessageSquareText } from "lucide-react";
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
  { id: "card", label: "💳 Credit Card" },
  { id: "company", label: "🏢 Company Card" },
  { id: "kidneys", label: "🫘 Your Kidneys" },
  { id: "firstborn", label: "👶 Your Firstborn" },
] as const;

type PayStatus = "idle" | "paying" | "paid";

export function Checkout() {
  const { topic, speaker } = useDemoState();
  const { next, beat } = useSceneNav();
  const [pkg, setPkg] = useState<(typeof PACKAGES)[number]>(PACKAGES[1]);
  const [addonOn, setAddonOn] = useState(true);
  const [qty, setQty] = useState(1);
  const [payMethod, setPayMethod] = useState<string>(PAY_METHODS[0].id);
  const [payStatus, setPayStatus] = useState<PayStatus>("idle");

  const total = useMemo(
    () => pkg.year1 + FORMAT.price * qty + (addonOn ? ADDON.price : 0),
    [pkg, qty, addonOn]
  );

  // Fake payment processing → then the "submit your briefing" CTA pops up.
  useEffect(() => {
    if (payStatus !== "paying") return;
    const t = setTimeout(() => setPayStatus("paid"), 1500);
    return () => clearTimeout(t);
  }, [payStatus]);

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

  return (
    <>
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

                  {payStatus === "idle" && (
                    <>
                      <div className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Payment method
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {PAY_METHODS.map((m) => (
                          <button
                            key={m.id}
                            onClick={() => setPayMethod(m.id)}
                            className={`rounded-lg border px-2 py-2 text-xs font-medium transition ${
                              payMethod === m.id
                                ? "border-brand bg-brand/5 text-brand"
                                : "border-border bg-card hover:border-brand/40"
                            }`}
                          >
                            {m.label}
                          </button>
                        ))}
                      </div>
                      <button className={styles.btnSubmit} onClick={() => setPayStatus("paying")}>
                        Pay {total.toLocaleString("en-US")} € &amp; Start Project
                      </button>
                      <button
                        className="mt-2 w-full rounded-full border border-brand/40 bg-brand/5 py-2 text-xs font-semibold text-brand hover:bg-brand/10"
                        onClick={() => setPayStatus("paying")}
                      >
                        Pay &amp; Book a One-Way Ticket to the Beach 🏖️
                      </button>
                    </>
                  )}

                  {payStatus === "paying" && (
                    <div className="mt-4 flex flex-col items-center gap-2 rounded-xl bg-muted/40 p-4 text-sm text-muted-foreground">
                      <Loader2 className="size-6 animate-spin text-brand" />
                      Processing payment…
                    </div>
                  )}

                  {payStatus === "paid" && (
                    <p className="mt-4 rounded-xl bg-brand/10 p-3 text-center text-sm font-medium text-brand">
                      ✓ Payment successful — {speaker ?? "your speaker"} is booked directly.
                    </p>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </DashboardShell>

    {/* Corner CTA that pops up once payment is done — hands off to the briefing. */}
    {payStatus === "paid" && (
      <button
        onClick={next}
        className="fg-pop fixed bottom-16 right-6 z-40 flex items-center gap-3 rounded-2xl bg-primary px-5 py-4 text-left text-primary-foreground shadow-[0_18px_50px_-12px_rgba(26,33,51,0.6)] transition hover:scale-[1.02]"
      >
        <MessageSquareText className="size-6 flex-none" />
        <span>
          <span className="block text-[11px] font-medium uppercase tracking-wide opacity-70">
            Next step
          </span>
          <span className="block text-sm font-bold">Submit your briefing to the speaker →</span>
        </span>
      </button>
    )}
    </>
  );
}
