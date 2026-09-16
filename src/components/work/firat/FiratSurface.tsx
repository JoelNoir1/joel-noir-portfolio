"use client";

/**
 * FIRAT · RESPONSIVE MORPH
 *
 * A presentational snapshot of the real Firat client project, staged as design
 * material. No database, no Supabase/Prisma, no API, no restaurant logic, and
 * every CTA is inert (no tel: links) so nobody calls the client from here.
 *
 * Continuity model: four brand elements — wordmark, headline, CTA row and the
 * Pizzatag card — are SINGLE DOM instances that travel through all three
 * states. They are never crossfaded; they move. Everything else is supporting
 * chrome that masks in and out around them.
 *
 * Performance: all motion is transform/opacity/clip-path on a fixed design
 * grid. The only layout change is one class swap when the shared elements
 * reach their mobile geometry, so the sequence costs a single reflow.
 */

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const STAGE_W = 1560;
const STAGE_H = 860;
const MOBILE_W = 390;
const MOBILE_H = 800;

/* ---------- helpers ---------- */
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
/** strong ease-out — the site's motion language */
const eo = (t: number) => 1 - Math.pow(1 - t, 3);
/** soft ease-in-out for elements that travel rather than enter */
const eio = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

type Key = { x: number; y: number; s: number };
const lerpKey = (a: Key, b: Key, t: number): Key => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
  s: a.s + (b.s - a.s) * t,
});

/* Phase windows — REST / ACTION / REST / ACTION / REST */
const BREAK_A = 0.26; // desktop starts coming apart
const BREAK_B = 0.5; // editorial composition has landed
const BUILD_A = 0.62; // reconstruction begins
const BUILD_B = 0.82; // mobile has landed
const LAYOUT_SWITCH = 0.73; // the reflow, hidden inside the travel
const TAG_SWITCH = 0.46; // pizzatag wide -> compact, likewise masked

/**
 * Travel between three keyframes with a per-element delay, so the group reads
 * as a choreography with hierarchy instead of one synchronised block.
 */
function travel(
  p: number,
  keys: [Key, Key, Key],
  delay: number,
  ease: (t: number) => number,
): Key {
  const build = seg(p, BUILD_A + delay * 0.09, BUILD_B + delay * 0.05);
  if (build > 0) return lerpKey(keys[1], keys[2], ease(build));
  const brk = seg(p, BREAK_A + delay * 0.1, BREAK_B + delay * 0.06);
  return lerpKey(keys[0], keys[1], ease(brk));
}

/* ---------- inline icons (no icon dependency) ---------- */
const I = {
  arrow: (c: string) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className={c}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  phone: (c: string) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={c}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  pin: (c: string) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={c}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  star: (c: string) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={c}>
      <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.3-6.2 3.3L7 14.2l-5-4.9 6.9-1Z" />
    </svg>
  ),
  pizza: (c: string) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={c}>
      <path d="M12 2 2 20h20L12 2Z" strokeLinejoin="round" />
      <circle cx="12" cy="14" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="9" cy="17.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  search: (c: string) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={c}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" strokeLinecap="round" />
    </svg>
  ),
  burger: (c: string) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={c}>
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  ),
};

/* ---------- the four travelling elements ---------- */

function Wordmark() {
  return (
    <div className="fr-mark">
      <span className="fr-wordmark">Firat</span>
      <span className="fr-wordmark-sub">Pizza · Kebap · Haus</span>
    </div>
  );
}

/* The client's headlines are shown as interface, not as part of this page's
   document outline — a div, not an h1, so a case page (or the reel) never
   announces "Frischer Döner" as its own title. Same classes, same render. */
function Headline({ m }: { m: boolean }) {
  return (
    <div className={`fr-h1 ${m ? "fr-h1--m" : ""}`}>
      Frischer Döner.
      <br />
      <span className="fr-h1-accent">Knusprige Pizza.</span>
    </div>
  );
}

function CtaRow({ m }: { m: boolean }) {
  return (
    <div className={`fr-cta ${m ? "fr-cta--m" : ""}`}>
      <span className="fr-btn fr-btn--primary">Speisekarte {I.arrow("h-3.5 w-3.5")}</span>
      <span className="fr-btn fr-btn--line">{I.phone("h-3.5 w-3.5")} Jetzt anrufen</span>
      <span className="fr-btn fr-btn--ghost">{I.pin("h-3.5 w-3.5")} Route starten</span>
    </div>
  );
}

function PizzatagCard({ m }: { m: boolean }) {
  return (
    <div className={`fr-pizzatag ${m ? "fr-pizzatag--compact" : ""}`}>
      <div className="fr-pizzatag-row">
        <div className="flex items-center gap-4">
          <span className="fr-pizzatag-icon">{I.pizza("h-7 w-7")}</span>
          <div>
            <p className="fr-pizzatag-kicker">Jeden Montag</p>
            <div className="fr-pizzatag-title">Pizzatag</div>
          </div>
        </div>
        <p className="fr-pizzatag-copy">
          Jede Pizza in 28 cm für nur <span className="fr-pizzatag-price">7,00 €</span>. Den ganzen
          Montag, mit Vorbestellung und Abholung.
        </p>
      </div>
    </div>
  );
}

/**
 * Holds both wrap variants as absolute layers. Neither ever changes size, so
 * the desktop -> mobile swap produces no layout shift; only visibility moves.
 */
function Swap({
  on,
  desktop,
  mobile,
}: {
  on: boolean;
  desktop: React.ReactNode;
  mobile: React.ReactNode;
}) {
  return (
    <>
      <span className="fr-variant" data-on={!on}>{desktop}</span>
      <span className="fr-variant" data-on={on}>{mobile}</span>
    </>
  );
}

/* ---------- supporting chrome ---------- */

const NAV = ["Speisekarte", "Beliebt", "Über uns", "Kontakt"];
const CHIPS = ["Pizza", "Döner", "Dürüm", "Dönerteller", "Vegetarisch", "Pasta"];
const DISHES = [
  ["Dürüm Döner", "8,50 €"],
  ["Pizza Margherita", "7,00 €"],
  ["Dönerteller", "11,50 €"],
];

/** The menu experience — the real UI that says "web design", not food photography. */
function MenuDetail() {
  return (
    <div className="fr-menucard">
      <span className="fr-menu-eyebrow">Unsere Speisekarte</span>
      <div className="fr-menu-h">
        Alles frisch.
        <br />
        <span className="fr-h1-accent">Großzügig belegt.</span>
      </div>
      <div className="fr-search">
        {I.search("h-4 w-4")}
        <span>Gericht suchen …</span>
      </div>
      <div className="fr-chips">
        {CHIPS.map((c, i) => (
          <span key={c} className={`fr-chip ${i === 0 ? "fr-chip--on" : ""}`}>
            {c}
          </span>
        ))}
      </div>
      <ul className="fr-dishes">
        {DISHES.map(([n, p]) => (
          <li key={n}>
            <span>{n}</span>
            <span className="fr-price">{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Rating() {
  return (
    <div className="fr-rating">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="fr-star">{I.star("h-full w-full")}</span>
        ))}
      </div>
      <span className="fr-rating-num">4,6</span>
      <span className="fr-rating-note">aus 180+ Google-Bewertungen</span>
    </div>
  );
}

/* ---------- keyframes: desktop → editorial → mobile ---------- */
/* The mobile column sits left of centre and runs the full height of the
   stage, so it crops top and bottom instead of floating like a device. */
const MX = 168;

const KEYS: Record<string, [Key, Key, Key]> = {
  mark: [
    { x: 56, y: 38, s: 1 },
    { x: 104, y: 88, s: 2.7 },
    { x: MX + 26, y: 74, s: 0.95 },
  ],
  head: [
    { x: 56, y: 196, s: 1 },
    { x: 104, y: 322, s: 1.18 },
    { x: MX + 26, y: 186, s: 0.62 },
  ],
  cta: [
    { x: 56, y: 508, s: 1 },
    { x: 104, y: 598, s: 1 },
    { x: MX + 26, y: 424, s: 0.86 },
  ],
  /* Pizzatag steps back: small accent under the CTA so the typography keeps
     the hierarchy instead of the gold block pulling the eye. */
  tag: [
    { x: 56, y: 690, s: 1 },
    { x: 108, y: 706, s: 0.58 },
    { x: MX + 26, y: 668, s: 0.86 },
  ],
  /* The menu UI becomes the right-hand graphic block: enlarged and cropped
     off the frame so price typography, chips and rules read as material. */
  menu: [
    { x: 946, y: 150, s: 1 },
    { x: 892, y: 74, s: 1.34 },
    { x: 892, y: 74, s: 1.34 },
  ],
};

export default function FiratSurface({ progress }: { progress: number }) {
  const [fit, setFit] = useState(0.85);

  useEffect(() => {
    // Fit by height, but cap by width so only ~10% ever bleeds off the right.
    // Without the cap, a short wide viewport pushes the menu UI off-screen.
    const compute = () =>
      setFit(
        clamp(
          Math.min(
            (window.innerHeight * 0.94) / STAGE_H,
            (window.innerWidth * 1.1) / STAGE_W,
          ),
          0.3,
          1.5,
        ),
      );
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const p = clamp(progress);
  const mobileLayout = p >= LAYOUT_SWITCH;

  // Supporting chrome, staggered so the breakup reads as a sequence.
  const deskOut = (d: number) => 1 - eo(seg(p, BREAK_A + d, BREAK_A + 0.16 + d));
  const navOut = deskOut(0);
  const subOut = deskOut(0.03);
  const rateOut = deskOut(0.05);
  /* The menu card no longer leaves with the chrome — it travels into the
     editorial composition and only hands over once mobile assembles. */
  const menuOpacity = 1 - eo(seg(p, BUILD_A, BUILD_A + 0.1));

  const mobIn = eo(seg(p, BUILD_A + 0.12, BUILD_B));
  const panelIn = eo(seg(p, BUILD_A + 0.04, BUILD_B - 0.04));

  // The travelling four — each with its own delay and easing.
  const kMark = travel(p, KEYS.mark, 0, eo);
  const kHead = travel(p, KEYS.head, 0.35, eio);
  const kCta = travel(p, KEYS.cta, 0.7, eio);
  const kTag = travel(p, KEYS.tag, 1, eio);
  const kMenu = travel(p, KEYS.menu, 0.5, eio);

  /**
   * The one layout swap (desktop wrap -> mobile wrap) is covered by a short
   * mask. It hides the re-wrap pop and keeps the shift out of CLS, because an
   * element at zero opacity contributes no visible layout shift.
   */
  const maskAt = (center: number) => {
    const dist = Math.abs(p - center);
    return dist >= 0.042 ? 1 : dist <= 0.014 ? 0 : Math.pow((dist - 0.014) / 0.028, 1.4);
  };
  const swapMask = maskAt(LAYOUT_SWITCH);
  const swapBlur = (1 - swapMask) * 3;
  /* The Pizzatag has a second switch (wide -> compact) at TAG_SWITCH, so it
     needs both moments covered or the un-masked one shows up as CLS. */
  const tagMask = Math.min(swapMask, maskAt(TAG_SWITCH));
  const tagBlur = (1 - tagMask) * 3;

  const place = (base: Key, cur: Key, masked = false, m = swapMask, b = swapBlur) => ({
    left: base.x,
    top: base.y,
    transform: `translate3d(${(cur.x - base.x).toFixed(1)}px, ${(cur.y - base.y).toFixed(1)}px, 0) scale(${cur.s.toFixed(3)})`,
    ...(masked
      ? {
          opacity: m,
          filter: b > 0.05 ? `blur(${b.toFixed(2)}px)` : undefined,
          /* visibility:hidden takes the element out of layout-shift
             accounting entirely, so the one re-wrap costs no CLS. */
          visibility: (m === 0 ? "hidden" : "visible") as "hidden" | "visible",
        }
      : null),
  });

  return (
    <div className="firat-scope fr-stage" aria-hidden="true">
      <div
        className="fr-fitted"
        /* nudged down so the client's wordmark clears the reel's own eyebrow */
        style={{
          width: STAGE_W,
          height: STAGE_H,
          transform: `translate3d(0, calc(-50% + 52px), 0) scale(${fit})`,
        }}
      >
        {/* mobile ground: appears under the elements as they arrive */}
        <div
          className="fr-mobpanel"
          /* full stage height: the surface crops top and bottom instead of
             floating in the middle like a device preview */
          style={{
            left: MX,
            top: -130,
            width: MOBILE_W,
            height: STAGE_H + 260,
            opacity: panelIn,
            transform: `scale(${0.98 + 0.02 * panelIn})`,
          }}
        />

        {/* desktop chrome — masks away in sequence */}
        <div
          className="fr-el fr-navlinks"
          style={{ opacity: navOut, clipPath: `inset(0 0 ${(1 - navOut) * 100}% 0)` }}
        >
          {NAV.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
        <div className="fr-el fr-navright" style={{ opacity: navOut, transform: `translate3d(${(1 - navOut) * 26}px,0,0)` }}>
          <span className="fr-pill">
            <i className="fr-dot" />
            Jetzt geöffnet
          </span>
          <span className="fr-btn fr-btn--primary fr-btn--sm">{I.phone("h-3.5 w-3.5")} Anrufen</span>
        </div>
        <div className="fr-el fr-eyebrow-row" style={{ opacity: navOut }}>
          <span className="fr-eyebrow-line" />
          <span className="fr-eyebrow">Seit 2018 in Nossen</span>
        </div>
        <p className="fr-el fr-sub" style={{ opacity: subOut, clipPath: `inset(0 0 ${(1 - subOut) * 100}% 0)` }}>
          Dürüm, Pide, Lahmacun und mehr. Aus frischen Zutaten, großzügig belegt und immer frisch
          zubereitet. Mitten in Nossen.
        </p>
        <div className="fr-el fr-rate" style={{ opacity: rateOut }}>
          <Rating />
        </div>
        {/* the menu UI travels with the group — right-hand graphic block */}
        <div
          className="fr-el fr-menu"
          style={{ ...place(KEYS.menu[0], kMenu), opacity: menuOpacity }}
        >
          <MenuDetail />
        </div>

        {/* mobile chrome — arrives last */}
        <div className="fr-el fr-burger-w" style={{ left: MX + MOBILE_W - 74, top: 82, opacity: mobIn }}>
          <span className="fr-burger">{I.burger("h-5 w-5")}</span>
        </div>
        <p className="fr-el fr-sub fr-sub--m" style={{ left: MX + 26, top: 340, opacity: mobIn }}>
          Dürüm, Pide, Lahmacun und mehr. Aus frischen Zutaten, großzügig belegt und immer frisch
          zubereitet.
        </p>
        <div className="fr-el fr-rate fr-rate--m" style={{ left: MX + 26, top: 606, opacity: mobIn }}>
          <Rating />
        </div>

        {/* the four that never fade — they travel */}
        <div className="fr-el fr-shared" style={place(KEYS.mark[0], kMark)}>
          <Wordmark />
        </div>
        {/* Both wrap variants exist as absolute layers inside a stable anchor,
            so switching between them never resizes a live element — the swap
            costs zero layout shift regardless of scroll speed or direction. */}
        <div className="fr-el fr-shared" style={place(KEYS.head[0], kHead, true)}>
          <Swap on={mobileLayout} desktop={<Headline m={false} />} mobile={<Headline m />} />
        </div>
        <div className="fr-el fr-shared" style={place(KEYS.cta[0], kCta, true)}>
          <Swap on={mobileLayout} desktop={<CtaRow m={false} />} mobile={<CtaRow m />} />
        </div>
        <div className="fr-el fr-shared fr-shared--tag" style={place(KEYS.tag[0], kTag, true, tagMask, tagBlur)}>
          <Swap
            on={mobileLayout || p > TAG_SWITCH}
            desktop={<PizzatagCard m={false} />}
            mobile={<PizzatagCard m />}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- static mobile composition (portfolio mobile / reduced motion) ---------- */

/**
 * The real 390px mobile layout at the full width of a phone's case hero. The
 * box reserving its height is set by the case page (aspect-ratio), so this
 * only picks the scale — measured before paint, 1.0 on a 390px screen.
 */
export function FiratMobileCase() {
  const ref = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(1);
  useLayoutEffect(() => {
    const fit = () => setS((ref.current?.clientWidth ?? MOBILE_W) / MOBILE_W);
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div style={{ transform: `scale(${s})`, transformOrigin: "top left" }}>
        <FiratMobile />
      </div>
    </div>
  );
}


export function FiratMobile() {
  return (
    <div className="firat-scope fr-static-m" style={{ width: MOBILE_W, height: MOBILE_H }}>
      <div className="fr-bg" />
      <div className="fr-static-nav">
        <Wordmark />
        <span className="fr-burger">{I.burger("h-5 w-5")}</span>
      </div>
      <div className="fr-static-body">
        <div className="fr-eyebrow-row">
          <span className="fr-eyebrow-line" />
          <span className="fr-eyebrow">Seit 2018 in Nossen</span>
        </div>
        <Headline m />
        <p className="fr-sub fr-sub--m fr-sub--static">
          Dürüm, Pide, Lahmacun und mehr. Aus frischen Zutaten, großzügig belegt und immer frisch
          zubereitet.
        </p>
        <div className="mt-6">
          <CtaRow m />
        </div>
        <div className="mt-6">
          <Rating />
        </div>
        <div className="mt-7">
          <PizzatagCard m />
        </div>
      </div>
    </div>
  );
}
