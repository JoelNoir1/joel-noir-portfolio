"use client";

/**
 * GALABAU BÖTTCHER · DER RASTER
 *
 * The paving grid in the real photograph becomes the layout grid of the brand.
 * Construction site hands its geometry to the digital presence, the presence
 * fills the cells, and the sequence resolves on the one thing that proves real
 * client work: a genuine before/after of the same plot.
 *
 * Everything here is actual project material — the client's real photography,
 * their real headline and service list, and two real Instagram posts. No
 * mockups, no invented deliverables, no branding claims.
 *
 * Like the Firat surface: one fixed design grid, transform/opacity/clip-path
 * only, so the whole sequence costs no layout shift.
 */

import Image from "next/image";
import { useEffect, useState } from "react";

const STAGE_W = 1560;
const STAGE_H = 860;

/* content frame inside the stage */
const M = 60; // margin
const COLS = 4;
const ROWS = 3;
const GW = STAGE_W - M * 2; // 1440
const GH = STAGE_H - M * 2 - 40; // 700
const CW = GW / COLS; // 360
const CH = GH / ROWS; // ~233
/* proof frame width in design px (cell spans 2 cols, minus its 20px padding) */
const PROOF_PAD = 20;
const PROOF_W = CW * 2 - PROOF_PAD * 2;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const eo = (t: number) => 1 - Math.pow(1 - t, 3);

/* phases — rest, grid, brand, proof */
const GRID_A = 0.2;
const GRID_B = 0.44;
const FILL_A = 0.44;
const FILL_B = 0.68;
const PROOF_A = 0.74;
const PROOF_B = 0.92;

/** cell rect in stage coordinates */
const cell = (c: number, r: number, cs = 1, rs = 1) => ({
  left: M + c * CW,
  top: M + r * CH,
  width: CW * cs,
  height: CH * rs,
});

/* the client's real service list, taken from their site */
const SERVICES = [
  "Pflasterarbeiten",
  "Wegebau",
  "Zaunbau",
  "Erdarbeiten",
  "Gartenpflege",
  "Abriss",
  "Entwässerung",
];

export default function GalabauSurface({ progress }: { progress: number }) {
  const [fit, setFit] = useState(0.8);

  useEffect(() => {
    const compute = () =>
      setFit(
        clamp(
          Math.min(
            (window.innerHeight * 0.94) / STAGE_H,
            (window.innerWidth * 1.02) / STAGE_W,
          ),
          0.3,
          1.4,
        ),
      );
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const p = clamp(progress);

  // 1 · the grid draws itself out of the paving joints
  const grid = eo(seg(p, GRID_A, GRID_B));
  // 2 · the brand fills the cells
  const fill = eo(seg(p, FILL_A, FILL_B));
  // 3 · the proof takes over and the rest steps back
  const proof = eo(seg(p, PROOF_A, PROOF_B));
  const recede = 1 - proof * 0.66; // grid + brand step back, context stays legible

  /** staggered per-cell reveal so the grid builds like courses of paving */
  const cellIn = (i: number) => eo(clamp((fill - i * 0.07) / (1 - i * 0.07)));

  const line = (i: number, vertical: boolean) => {
    const t = eo(clamp((grid - i * 0.06) / (1 - i * 0.06)));
    return {
      transform: vertical ? `scaleY(${t})` : `scaleX(${t})`,
      opacity: 0.8 * t * recede,
    };
  };

  return (
    <div className="galabau-scope gb-stage" aria-hidden="true">
      <div
        className="gb-fitted"
        style={{
          width: STAGE_W,
          height: STAGE_H,
          transform: `translate3d(0, -50%, 0) scale(${fit})`,
        }}
      >
        {/* the brand tone rises out of the joints and takes the ground, so the
            presence has something to sit on and the type stays readable */}
        <div
          className="gb-wash"
          style={{ opacity: 0.18 + 0.66 * eo(seg(p, GRID_A, FILL_B)) }}
        />

        {/* ---- 1 · the grid, drawn along the joints ---- */}
        <div className="gb-grid" style={{ opacity: recede }}>
          {Array.from({ length: COLS + 1 }).map((_, i) => (
            <span
              key={`v${i}`}
              className="gb-rule gb-rule--v"
              style={{ left: M + i * CW, top: M, height: GH, ...line(i, true) }}
            />
          ))}
          {Array.from({ length: ROWS + 1 }).map((_, i) => (
            <span
              key={`h${i}`}
              className="gb-rule gb-rule--h"
              style={{ left: M, top: M + i * CH, width: GW, ...line(i, false) }}
            />
          ))}
        </div>

        {/* ---- 2 · the brand fills the cells ---- */}
        {/* headline, two columns wide — the client's real hero line */}
        <div
          className="gb-cell gb-headline"
          style={{
            ...cell(0, 0, 2),
            opacity: cellIn(0) * recede,
            transform: `translate3d(0, ${(1 - cellIn(0)) * 14}px, 0)`,
          }}
        >
          <h3>
            Wir gestalten
            <br />
            Außenanlagen
            <br />
            <span className="gb-accent">mit Qualität.</span>
          </h3>
        </div>

        {/* region eyebrow, far column */}
        <div
          className="gb-cell gb-region"
          style={{ ...cell(3, 0), opacity: cellIn(1) * recede }}
        >
          <span className="gb-rule-short" />
          <span>Garten- &amp; Landschaftsbau</span>
          <span className="gb-dim">Kyffhäuserkreis · Erfurt</span>
        </div>

        {/* the real service list */}
        <div
          className="gb-cell gb-services"
          style={{ ...cell(0, 1), opacity: cellIn(2) * recede }}
        >
          {SERVICES.map((s, i) => (
            <span
              key={s}
              style={{
                opacity: clamp((cellIn(2) - i * 0.06) * 3),
              }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* a brand surface: the forest green the whole presence is built on */}
        <div
          className="gb-cell gb-surface"
          style={{
            ...cell(2, 1, 2),
            opacity: cellIn(3) * recede,
            clipPath: `inset(0 ${(1 - cellIn(3)) * 100}% 0 0)`,
          }}
        />

        {/* two genuine Instagram posts — evidence, deliberately small */}
        <div
          className="gb-cell gb-social"
          style={{ ...cell(0, 2), opacity: cellIn(4) * recede }}
        >
          <span className="gb-social-tiles">
            <Image src="/work/gb-ig-1.webp" alt="" width={420} height={420} />
            <Image src="/work/gb-ig-2.webp" alt="" width={420} height={420} />
          </span>
          <span className="gb-dim">@galabau.boettcher</span>
        </div>

        {/* ---- 3 · the proof: same plot, before and after ---- */}
        <div
          className="gb-cell gb-proof"
          style={{
            ...cell(2, 2, 2),
            opacity: Math.max(cellIn(5) * recede, proof),
            transform: `scale(${1 + proof * 0.13})`,
          }}
        >
          <span className="gb-proof-frame">
            <Image className="gb-proof-img" src="/work/gb-nachher.webp" alt="" width={900} height={600} />
            {/* the seam sweeps the finished state across the raw ground */}
            <span
              className="gb-proof-before"
              style={{ clipPath: `inset(0 ${proof * 100}% 0 0)` }}
            >
              <Image className="gb-proof-img" src="/work/gb-vorher.webp" alt="" width={900} height={600} />
            </span>
            <span
              className="gb-proof-seam"
              style={{
                transform: `translate3d(${(proof * PROOF_W).toFixed(1)}px, 0, 0)`,
                opacity: proof > 0.02 && proof < 0.99 ? 1 : 0,
              }}
            />
          </span>
          <span className="gb-proof-label">
            <span>Vorher</span>
            <span className="gb-dim">Dasselbe Grundstück</span>
            <span>Nachher</span>
          </span>
        </div>
      </div>
    </div>
  );
}
