"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import { reelProjects, compOf, type Project } from "@/lib/projects";
import { artworkRect, artworkVars, fullRect, lerpRect, plateSide } from "@/lib/artwork";
import { useStage } from "@/webgl/StageProvider";
import { buildHeroMask } from "@/webgl/heroMask";
import Reveal from "@/components/ui/Reveal";

/* The live client surface is its own chunk — it never loads until needed. */
const FiratSurface = dynamic(() => import("@/components/work/firat/FiratSurface"), {
  ssr: false,
});
const GalabauSurface = dynamic(() => import("@/components/work/galabau/GalabauSurface"), {
  ssr: false,
});
const FiratMobile = dynamic(
  () => import("@/components/work/firat/FiratSurface").then((m) => m.FiratMobile),
  { ssr: false },
);

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
/** How far the headline's letters enlarge before they open (mask stays crisp). */
const ZOOM_CAP = 14;
/** Dwell at the ends, transition through the middle third of each segment. */
const plateau = (p: number) => clamp((p - 0.32) / (0.68 - 0.32));

type LenisLike = { velocity?: number; on?: (e: string, cb: () => void) => void; off?: (e: string, cb: () => void) => void };
type IndexCopy = { eyebrow: string; note: string; view: string };

/** One plate line, one stable position — nothing jumps between projects. */
type PlateRefs = {
  root: HTMLElement | null;
  num: HTMLElement | null;
  name: HTMLElement | null;
  meta: HTMLElement | null;
};

/** Staggered progress for one part of the line (number → name → meta). */
const part = (t: number, offset: number) => clamp((t - offset) / (1 - offset));

export default function Reel() {
  const { lang } = useLang();
  const c = content[lang].index;
  const { enabled, getEngine, armMorph } = useStage();

  if (!enabled) return <ReelFallback c={c} lang={lang} />;
  return <ReelWebGL c={c} lang={lang} getEngine={getEngine} armMorph={armMorph} />;
}

/* ------------------------------------------------------------------ */
/* WebGL experience — the published sequence on one plane              */
/* ------------------------------------------------------------------ */

function ReelWebGL({
  c,
  lang,
  getEngine,
  armMorph,
}: {
  c: IndexCopy;
  lang: "de" | "en";
  getEngine: ReturnType<typeof useStage>["getEngine"];
  armMorph: ReturnType<typeof useStage>["armMorph"];
}) {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const layers = useRef<PlateRefs[]>([]);
  const morphing = useRef(false);
  const curA = useRef(-1);
  /** Index of the one project currently open for interaction. -1 = none. */
  const liveIdx = useRef(-1);

  const items = reelProjects;
  const n = items.length;

  // Weighted segments: a project with a longer story (Firat) buys more scroll
  // without slowing the posters down.
  const segLen = items
    .slice(0, -1)
    .map((p, i) => ((compOf(p.slug).dwell ?? 1) + (compOf(items[i + 1].slug).dwell ?? 1)) / 2);
  const totalLen = segLen.reduce((a, b) => a + b, 0);
  /* The last project has only one adjacent segment, so it would otherwise get
     half the dwell of a middle one — and its resolution would land exactly in
     the reel's exit ramp. TAIL holds it at full presence before releasing. */
  const TAIL = 0.9;
  const spanLen = totalLen + TAIL;
  const heightVh = Math.round(70 + spanLen * 88);

  /* Projects that render a live DOM surface during their dwell. */
  const surfaces = items
    .map((p, i) => ({ i, kind: compOf(p.slug).surface }))
    .filter((s): s is { i: number; kind: "firat" | "galabau" } => Boolean(s.kind));
  const [surface, setSurface] = useState<{ kind?: "firat" | "galabau"; p: number; o: number }>({
    p: 0,
    o: 0,
  });

  useEffect(() => {
    const engine = getEngine();
    const section = sectionRef.current;
    if (!engine || !section) return;

    const canvas = document.querySelector<HTMLCanvasElement>(".jn-stage");
    let playing = false;

    const texOf = (p: Project) => compOf(p.slug).stage ?? p.image;

    const pairReady = engine.setPair(
      texOf(items[0]),
      texOf(items[1]),
      compOf(items[0].slug),
      compOf(items[1].slug),
    );
    curA.current = 0;

    /* HERO -> REEL ENTRY · TYPOGRAPHY BECOMES ARTWORK
       The first work is first seen through the headline's own letters, on this
       same plane and texture. The letters grow until they stop being a
       boundary, the placement travels into the plane's framing, and from there
       the entry resolves into the artwork's format exactly as before. The h1
       stays real text; only its paint hands over to the plane. */
    const h1 = document.querySelector<HTMLElement>(".jn-hero-title");
    const heroSection = h1?.closest("section") ?? null;
    let maskReady = false;
    let heroAspect = 1;
    let focal: [number, number] = [0, 0];
    let depth = 1;
    let disposed = false;
    let rebuildTimer = 0;
    const introDone = () =>
      new Promise<void>((resolve) => {
        const t0 = performance.now();
        const check = () => {
          const cp = h1 ? getComputedStyle(h1).clipPath : "none";
          if (cp === "none" || /^inset\(0px( 0(px|%)){3}\)$/.test(cp) || performance.now() - t0 > 3000) resolve();
          else window.setTimeout(check, 80);
        };
        check();
      });
    const buildMask = async () => {
      if (!h1 || disposed) return;
      await Promise.all([document.fonts.ready, pairReady, introDone()]);
      if (disposed) return;
      const mask = await buildHeroMask(h1, engine.floatMask);
      if (disposed) return;
      if (!mask) return;
      heroAspect = (await engine.load(texOf(items[0]))).aspect;
      if (disposed) return;
      // the upload lands with the next drawn frame — give it a frame of its own
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      if (disposed) return;
      engine.setMaskTexture(mask);
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      if (disposed) return;
      focal = mask.focal;
      depth = mask.depth;
      maskReady = true;
      h1.classList.add("jn-hero-title--gl");
      onScroll();
    };
    const scheduleRebuild = () => {
      window.clearTimeout(rebuildTimer);
      rebuildTimer = window.setTimeout(buildMask, 140);
    };
    const ro = h1 ? new ResizeObserver(scheduleRebuild) : null;
    if (h1) ro!.observe(h1);
    const mo = h1 ? new MutationObserver(scheduleRebuild) : null;
    if (h1) mo!.observe(h1, { childList: true, characterData: true, subtree: true });
    let resizeRaf = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      // after the engine has resized its buffer (which clears it)
      resizeRaf = requestAnimationFrame(() => onScroll());
    };
    window.addEventListener("resize", onResize);

    // Preload the rest on idle — only the textures the reel actually draws.
    let idle = 2;
    let timer = window.setTimeout(function next() {
      if (idle >= n) return;
      engine.load(texOf(items[idle]));
      idle += 1;
      timer = window.setTimeout(next, 200);
    }, 400);

    /**
     * The plate line replaces itself as ONE choreography: the number leads,
     * the name follows, the meta trails. Outgoing parts clip upward, incoming
     * parts clip in from below, on the same clock. Calm at rest, alive only
     * while a project is actually being exchanged.
     */
    const OFFSETS = [0, 0.1, 0.2]; // num, name, meta
    const setOverlays = (a: number, t: number, enter: number) => {
      /* The project the reel is actually offering right now. Exactly one, or
         none while the reel is off-screen or mid-exchange. */
      let live = -1;

      for (let i = 0; i < layers.current.length; i++) {
        const L = layers.current[i];
        if (!L?.root) continue;
        const active = i === a || i === a + 1;
        if (!active) {
          L.root.style.opacity = "0";
          L.root.style.pointerEvents = "none";
          /* An invisible project must not be a tab stop. tabindex -1 (rather
             than inert or aria-hidden) takes it out of the sequential order and
             out of reach of Enter, while leaving the link and its heading in
             the accessibility tree — so nothing becomes undiscoverable. */
          L.root.tabIndex = -1;
          continue;
        }
        const inc = i === a + 1;
        const o = (inc ? t : 1 - t) * enter;
        const interactive = o > 0.5;
        if (interactive) live = i;
        L.root.style.opacity = String(enter);
        L.root.style.pointerEvents = interactive ? "auto" : "none";
        L.root.tabIndex = interactive ? 0 : -1;

        const parts = [L.num, L.name, L.meta];
        for (let k = 0; k < 3; k++) {
          const el = parts[k];
          if (!el) continue;
          const q = part(t, OFFSETS[k]);
          const shift = inc ? (1 - q) : -q;
          el.style.opacity = String((inc ? q : 1 - q) * enter);
          el.style.transform = `translate3d(0, ${(shift * 0.55).toFixed(3)}em, 0)`;
          el.style.clipPath = inc
            ? `inset(${((1 - q) * 105).toFixed(1)}% 0 0 0)`
            : `inset(0 0 ${(q * 105).toFixed(1)}% 0)`;
        }
      }

      /* Keyboard hand-off: if the reel exchanges projects while the caption is
         focused, focus travels to the incoming one instead of being stranded on
         a project that is no longer on screen. preventScroll, or focusing would
         fight the scroll that caused the exchange. */
      /* Always recorded, -1 included: once the reel is off screen nothing is
         open for activation, so a focus left behind on a caption cannot still
         navigate on Enter. */
      const prevLive = liveIdx.current;
      liveIdx.current = live;
      if (live >= 0 && live !== prevLive) {
        const el = document.activeElement;
        const onSomePlate = layers.current.some((L) => L?.root && L.root === el);
        if (onSomePlate && el !== layers.current[live]?.root) {
          layers.current[live]?.root?.focus({ preventScroll: true });
        }
      }

      // "Selected Work" shows once on entry, then dissolves into the first line.
      if (introRef.current) {
        const introOut = 1 - clamp((enter - 0.55) / 0.35);
        introRef.current.style.opacity = String(enter * introOut);
      }
    };

    const onScroll = () => {
      if (morphing.current) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = section.offsetHeight - vh;

      // Canvas reveal: off while the hero owns the screen, in as the reel takes
      // over, out again as it ends. This is the C1 fix + the hero hand-off.
      const inRamp = clamp((0.85 * vh - rect.top) / (0.55 * vh));
      const outRamp = clamp((rect.bottom - 0.35 * vh) / (0.55 * vh));
      const enter = Math.min(inRamp, outRamp);

      /* Entry through the headline: while the reel has not pinned yet, the
         plane is never faded — it is masked. First the letters grow (E), then
         the frame resolves into the artwork's format (R), overlapping so the
         two read as one movement. */
      const heroPhase = maskReady && rect.top > 0;
      const E = clamp(inRamp / 0.55);
      const R = clamp((inRamp - 0.38) / 0.62);
      const easeInOut = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

      if (enter > 0 && !playing) { engine.play(); playing = true; }
      if (canvas) {
        canvas.style.transition = "none";
        canvas.style.opacity = String(heroPhase ? 1 : enter);
      }

      const p = clamp(-rect.top / Math.max(1, total));

      // locate the weighted segment and the local progress inside it
      const target = p * spanLen;
      let acc = 0;
      let a = 0;
      for (; a < segLen.length - 1; a++) {
        if (target <= acc + segLen[a]) break;
        acc += segLen[a];
      }
      const local = clamp((target - acc) / segLen[a]);
      const t = plateau(local);

      if (a !== curA.current) {
        const ca = compOf(items[a].slug);
        const cb = compOf(items[a + 1].slug);
        engine.setPair(ca.stage ?? items[a].image, cb.stage ?? items[a + 1].image, ca, cb);
        curA.current = a;
      }

      /* A live surface owns its dwell window. A project in the middle of the
         reel gets both adjacent halves; the first or last one only gets the
         half that exists. */
      let sp = -1;
      let sk: "firat" | "galabau" | undefined;
      for (const s of surfaces) {
        const last = s.i === n - 1;
        const first = s.i === 0;
        let v = -1;
        if (last) v = a === s.i - 1 && local >= 0.68 ? (local - 0.68) / 0.32 : -1;
        else if (first) v = a === s.i && local <= 0.32 ? local / 0.32 : -1;
        else if (a === s.i - 1 && local >= 0.68) v = ((local - 0.68) / 0.32) * 0.5;
        else if (a === s.i && local <= 0.32) v = 0.5 + (local / 0.32) * 0.5;
        if (v >= 0) { sp = v; sk = s.kind; break; }
      }
      const lastSurface = sk !== undefined && surfaces.some((x) => x.kind === sk && x.i === n - 1);
      const so =
        sp < 0
          ? 0
          : lastSurface
            ? clamp(sp / 0.05)
            : Math.min(clamp(sp / 0.05), clamp((1 - sp) / 0.05));
      setSurface((prev) =>
        prev.kind === sk && Math.abs(prev.p - sp) < 0.002 && Math.abs(prev.o - so) < 0.02
          ? prev
          : { kind: sp < 0 ? undefined : sk, p: sp < 0 ? 0 : sp, o: so },
      );
      /* ARTWORK MODE — the crop resolves into the work's own format.
         The plane starts full-bleed (continuous with the hero hand-off) and
         eases into the artwork's true rectangle as the reel takes over. Once
         it is settled it does not move again: rest, action, rest. Everything
         here is scroll-driven, so scrubbing back un-resolves it exactly. */
      const vw = window.innerWidth;
      const full = fullRect(vw, vh);
      const artA = compOf(items[a].slug).artwork;
      const artB = compOf(items[a + 1].slug).artwork;
      const settled = lerpRect(
        artA ? artworkRect(artA, vw, vh) : full,
        artB ? artworkRect(artB, vw, vh) : full,
        t,
      );
      engine.setRect(lerpRect(full, settled, heroPhase ? easeInOut(R) : enter), true);

      if (heroPhase && E < 1 && h1 && heroSection) {
        const box = h1.getBoundingClientRect();
        const hr = heroSection.getBoundingClientRect();
        // the headline's own fill placement (Hero.tsx: 50%→16%, 130%→150% over the hero)
        const hp = clamp(-hr.top / Math.max(1, hr.height));
        const iw = (1.3 + 0.2 * hp) * box.width;
        const ih = iw / heroAspect;
        /* The letters enlarge around a point deep inside one stroke —
           exponentially, so the move reads at one constant speed — up to the
           scale the mask stays crisp at; from there they open outward along
           their own contours until nothing on screen is outside a letter. */
        const s0 = box.width / Math.max(1, h1.offsetWidth);
        const fx = box.left + focal[0] * s0;
        const fy = box.top + focal[1] * s0;
        const reach = Math.hypot(Math.max(fx, vw - fx), Math.max(fy, vh - fy));
        const zMax = Math.min(ZOOM_CAP, Math.max(1, reach / Math.max(0.5, depth * s0)));
        const z = Math.exp(Math.log(zMax) * Math.pow(clamp(E / 0.72), 1.25));
        const open = clamp((E - 0.5) / 0.5);
        const grow = open * open * Math.hypot(vw, vh);
        engine.setHeroMask({
          on: true,
          box: [fx + (box.left - fx) * z, fy + (box.top - fy) * z, box.width * z, box.height * z],
          img: [box.left + (box.width - iw) * 0.5, box.top + (box.height - ih) * (0.5 - 0.34 * hp), iw, ih],
          zoom: z * s0,
          grow,
          imgMix: easeInOut(E),
          grade: 1 - E,
        });
      } else {
        engine.setHeroMask({ on: false });
      }

      /* How much of the frame is currently an artwork standing in open space.
         The reel's own atmosphere steps back by exactly that much — a poster
         is not something to grade a gradient over. */
      const artW = ((artA ? 1 - t : 0) + (artB ? t : 0)) * enter;
      /* entering through the headline the plane is opaque from the first
         letter on, so an entering artwork already has its resting (scrim-free)
         ground — otherwise the stage's top edge shows as a seam across it */
      const scrimO = heroPhase && artA ? 0 : 1 - artW;
      if (scrimRef.current) scrimRef.current.style.opacity = String(scrimO);

      engine.setMix(t);
      setOverlays(a, t, enter);

      const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
      engine.setVelocity(clamp((lenis?.velocity ?? 0) / 40, -1, 1));

      if (enter <= 0 && playing) { engine.pause(); playing = false; }
      // the resting headline: one frame per scroll step, never a loop
      if (heroPhase && !playing) engine.draw();
    };

    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    if (lenis?.on) lenis.on("scroll", onScroll);
    else window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      disposed = true;
      clearTimeout(timer);
      clearTimeout(rebuildTimer);
      cancelAnimationFrame(resizeRaf);
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
      mo?.disconnect();
      engine.setHeroMask({ on: false });
      h1?.classList.remove("jn-hero-title--gl");
      if (lenis?.off) lenis.off("scroll", onScroll);
      else window.removeEventListener("scroll", onScroll);
      if (!morphing.current) {
        engine.pause();
        if (canvas) { canvas.style.transition = "none"; canvas.style.opacity = "0"; }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getEngine]);

  const open = (p: Project) => {
    morphing.current = true;
    const comp = compOf(p.slug);
    getEngine()?.setSingle(comp.stage ?? p.image, comp);
    const canvas = document.querySelector<HTMLCanvasElement>(".jn-stage");
    if (canvas) {
      canvas.style.transition = "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
      canvas.style.opacity = "1";
      canvas.style.transform = "scale(1.045)"; // push into the work
    }
    // clear the reel UI fast so only the image travels
    layers.current.forEach((L) => {
      if (!L?.root) return;
      L.root.style.transition = "opacity 0.24s ease";
      L.root.style.opacity = "0";
    });
    if (markRef.current) markRef.current.style.opacity = "0";
    armMorph({ slug: p.slug, src: p.image, comp });
    router.push(`/work/${p.slug}`);
  };

  /**
   * The pointer mark is an interaction detail, not a standing invitation:
   * it appears while the pointer actually moves over a live project, follows,
   * and retires once the pointer rests or leaves.
   */
  const idle = useRef<number | undefined>(undefined);
  const showMark = (on: boolean) => {
    const m = markRef.current;
    if (m) m.style.opacity = on ? "0.85" : "0";
  };
  const onStageMove = (e: React.MouseEvent) => {
    const m = markRef.current;
    if (!m || morphing.current) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    // only over a project that is actually open for interaction
    const live = layers.current.some(
      (L) => L?.root && getComputedStyle(L.root).pointerEvents !== "none",
    );
    m.style.transform = `translate3d(${e.clientX + 14}px, ${e.clientY - 10}px, 0)`;
    showMark(live);
    window.clearTimeout(idle.current);
    idle.current = window.setTimeout(() => showMark(false), 900);
  };
  const onStageLeave = () => {
    window.clearTimeout(idle.current);
    showMark(false);
  };

  return (
    <section
      id="index"
      ref={sectionRef}
      className="jn-reel relative"
      style={{ height: `${heightVh}vh` }}
      aria-label="Selected Work"
    >
      {/* the outline needs this level between the hero's h1 and the works'
          h3s; the visible eyebrow is a dissolving plate, not a heading */}
      <h2 className="sr-only">{c.eyebrow}</h2>
      <div
        className="jn-reel-stage sticky top-0 z-[31] h-screen overflow-hidden"
        onMouseMove={onStageMove}
        onMouseLeave={onStageLeave}
      >
        {/* live client surface — crisp DOM over the plane, only while in view */}
        {surface.kind && (
          <div className="jn-surface" style={{ opacity: surface.o }}>
            {surface.kind === "firat" ? (
              <FiratSurface progress={surface.p} />
            ) : (
              <GalabauSurface progress={surface.p} />
            )}
          </div>
        )}

        <div
          ref={scrimRef}
          className="jn-reel-scrim pointer-events-none absolute inset-0"
        />

        {/* shown once on entry, then dissolves into the first plate line */}
        <div ref={introRef} className="jn-plate jn-plate--intro" style={{ opacity: 0 }}>
          <span className="jn-plate-num">{c.eyebrow}</span>
        </div>

        {items.map((p, i) => {
          const comp = compOf(p.slug);
          /* Posters carry their name inside the artwork, so the line shows the
             client instead — the project name never appears twice. */
          const artwork = comp.title === "artwork";
          /* In ARTWORK MODE the whole work is on screen, wordmark included.
             The line then says only what the artwork cannot: plate number,
             discipline, year. The title stays in the document for assistive
             tech and for the heading outline — it is simply not set twice. */
          const artMode = Boolean(comp.artwork);
          const label = artwork ? p.client[lang] : p.title;
          return (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              aria-label={`${p.title} — ${p.category[lang]}, ${p.year}`}
              /* Before hydration every layer is out of the tab order; the
                 scroll handler promotes the visible one on mount. */
              tabIndex={-1}
              onClick={(e) => {
                e.preventDefault();
                /* Only the project actually on screen can be opened — a stale
                   focus or a stray Enter cannot navigate to a hidden one. */
                if (i !== liveIdx.current) return;
                open(p);
              }}
              ref={(el) => {
                const L = (layers.current[i] ??= { root: null, num: null, name: null, meta: null });
                L.root = el;
              }}
              className="jn-plate-hit"
              style={{ opacity: 0 }}
            >
              <span
                className={`jn-plate${artMode ? " jn-plate--art" : ""}`}
                /* the line sits on the artwork's own baseline, not on a clamp,
                   and always in the open margin — so an artwork pinned right
                   moves its caption left */
                data-side={comp.artwork ? plateSide(comp.artwork) : undefined}
                style={comp.artwork ? (artworkVars(comp.artwork) as CSSProperties) : undefined}
              >
                <span
                  className="jn-plate-num"
                  ref={(el) => {
                    const L = (layers.current[i] ??= { root: null, num: null, name: null, meta: null });
                    L.num = el;
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="jn-plate-body">
                  {artMode ? (
                    /* not animated and never registered as a layer — it has no
                       visual presence to choreograph */
                    <h3 className="jn-plate-name jn-plate-name--silent">
                      {p.title}
                    </h3>
                  ) : (
                    <h3
                      className={`jn-plate-name ${artwork ? "jn-plate-name--work" : "jn-plate-name--web"}`}
                      ref={(el) => {
                        const L = (layers.current[i] ??= { root: null, num: null, name: null, meta: null });
                        L.name = el;
                      }}
                    >
                      {label}
                      <i className="jn-plate-rule" aria-hidden="true" />
                    </h3>
                  )}
                  <span
                    className="jn-plate-meta"
                    ref={(el) => {
                      const L = (layers.current[i] ??= { root: null, num: null, name: null, meta: null });
                      L.meta = el;
                    }}
                  >
                    {/* spacing does the separating — no dots, no pills */}
                    {p.category[lang].split("·").map((seg) => (
                      <span key={seg}>{seg.trim()}</span>
                    ))}
                    <span className="jn-plate-year">{p.year}</span>
                  </span>
                </span>
              </span>
            </Link>
          );
        })}

        {/* the only pointer signal — a single glyph, never a badge */}
        <div ref={markRef} className="jn-plate-mark" aria-hidden="true">
          ↗
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* DOM fallback (mobile / no-WebGL / reduced motion)                   */
/* ------------------------------------------------------------------ */

/** Fits the real 390px-wide Firat mobile layout into the fallback column. */
function FiratMobileFit() {
  const ref = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(1);
  useEffect(() => {
    const fit = () => {
      const w = ref.current?.clientWidth ?? 390;
      setS(w / 390);
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  return (
    <div ref={ref} className="fr-fit-m firat-scope bg-[#17100b]">
      <div style={{ transform: `scale(${s})` }}>
        <FiratMobile />
      </div>
    </div>
  );
}

function ReelFallback({ c, lang }: { c: IndexCopy; lang: "de" | "en" }) {
  return (
    <section
      id="index"
      className="border-t border-line px-[clamp(1.25rem,5vw,3.5rem)] py-[clamp(3.5rem,8vw,7rem)]"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* the section names itself once, then gets out of the way */}
        <h2 className="label text-muted">{c.eyebrow}</h2>

        <div className="mt-[clamp(2rem,5vw,4rem)] flex flex-col gap-[clamp(2.5rem,7vw,5rem)]">
          {reelProjects.map((p, i) => {
            const comp = compOf(p.slug);
            const artwork = comp.title === "artwork";
            return (
            <Reveal key={p.slug}>
              <Link
                href={`/work/${p.slug}`}
                aria-label={`${p.title} — ${p.category[lang]}, ${p.year}`}
                className="group block"
              >
                {comp.surface === "firat" ? (
                  /* the real mobile design, native and sharp — never a shrunk desktop */
                  <FiratMobileFit />
                ) : comp.artwork ? (
                  /* ARTWORK MODE, mobile: the file's own ratio drives the box,
                     so the work is complete edge to edge. No hover zoom — a
                     zoom on a finished poster is just another crop. */
                  <div
                    className="relative w-full bg-paper-2"
                    style={{ aspectRatio: String(comp.artwork.aspect) }}
                  >
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width:768px) 100vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className={`relative w-full overflow-hidden bg-paper-2 ${
                      p.previewAspect === "landscape" ? "aspect-[16/10]" : "aspect-[4/5]"
                    }`}
                  >
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width:768px) 100vw, 90vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                )}
                {/* same plate language, set on paper instead of over image */}
                <div
                  className={`jn-plate jn-plate--static mt-4${
                    comp.artwork ? " jn-plate--art" : ""
                  }`}
                >
                  <span className="jn-plate-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="jn-plate-body">
                    {comp.artwork ? (
                      <h3 className="jn-plate-name jn-plate-name--silent">{p.title}</h3>
                    ) : (
                      <h3
                        className={`jn-plate-name ${artwork ? "jn-plate-name--work" : "jn-plate-name--web"}`}
                      >
                        {artwork ? p.client[lang] : p.title}
                      </h3>
                    )}
                    <span className="jn-plate-meta">
                      {p.category[lang].split("·").map((seg) => (
                        <span key={seg}>{seg.trim()}</span>
                      ))}
                      <span className="jn-plate-year">{p.year}</span>
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
