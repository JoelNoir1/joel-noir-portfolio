/**
 * JOEL.NOIR — StageEngine.
 * A single persistent OGL plane, shared across the whole site. It blends
 * between two project textures and can be drawn either full-bleed (the Reel)
 * or inside a rectangle (a case-study hero), which is what makes the
 * Selected Work -> Case Study morph feel like one continuous scene.
 *
 * Deliberately one renderer, one context, one plane. No per-project canvases,
 * no render loop while off-screen. OGL is public domain (Unlicense).
 */
import { Renderer, Program, Mesh, Plane, Texture } from "ogl";
import { vertex, fragment } from "./glsl";
import type { ReelComp } from "@/lib/projects";
import type { HeroMask } from "./heroMask";

export type Rect = { x: number; y: number; w: number; h: number } | null;

type Slot = { tex: Texture; aspect: number };

const wipeCode = (w: ReelComp["wipe"]) => (w === "slices" ? 2 : w === "radial" ? 1 : 0);

const DEFAULT_COMP: ReelComp = {
  dir: [1, 0.28], wipe: "linear", scale: 1, focus: [0.5, 0.5], amp: 1, title: "type", place: "bl", titleScale: 1,
};

export class StageEngine {
  private canvas: HTMLCanvasElement;
  private renderer: Renderer;
  private gl: Renderer["gl"];
  private program!: Program;
  private mesh!: Mesh;

  private w = 1;
  private h = 1;
  private dpr = 1;

  private cache = new Map<string, Slot>();
  private raf = 0;
  private running = false;
  private start = 0;

  // smoothed state
  private rect: Rect = null; // target; null = full-bleed
  private curRect = { x: 0, y: 0, w: 1, h: 1 };
  private rectLerp = 1; // 1 = snap, <1 = ease toward target
  private velTarget = 0;
  private vel = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    this.renderer = new Renderer({
      canvas,
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      dpr: this.dpr,
      powerPreference: "high-performance",
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.build();
    this.resize();
  }

  private build() {
    const geometry = new Plane(this.gl);
    this.program = new Program(this.gl, {
      vertex,
      fragment,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uRectCenter: { value: [0, 0] },
        uRectSize: { value: [2, 2] },
        uTexA: { value: new Texture(this.gl) },
        uTexB: { value: new Texture(this.gl) },
        uImgAspectA: { value: 1 },
        uImgAspectB: { value: 1 },
        uRectAspect: { value: 1 },
        uDirA: { value: [1, 0.28] },
        uDirB: { value: [1, 0.28] },
        uScaleA: { value: 1 },
        uScaleB: { value: 1 },
        uFocusA: { value: [0.5, 0.5] },
        uFocusB: { value: [0.5, 0.5] },
        uAmpA: { value: 1 },
        uAmpB: { value: 1 },
        uWipeB: { value: 0 },
        uMix: { value: 0 },
        uVelocity: { value: 0 },
        uTime: { value: 0 },
        uOpacity: { value: 1 },
        uMaskOn: { value: 0 },
        uMask: { value: new Texture(this.gl) },
        uMaskBox: { value: [0, 0, 1, 1] },
        uMaskBias: { value: 0 },
        uMaskScale: { value: 1 },
        uMaskZ: { value: 1 },
        uMaskGrow: { value: 0 },
        uImgBox: { value: [0, 0, 1, 1] },
        uImgMix: { value: 1 },
        uGrade: { value: 0 },
        uView: { value: [1, 1] },
        uBuf: { value: [1, 1] },
      },
    });
    this.mesh = new Mesh(this.gl, { geometry, program: this.program });
  }

  /** Load (and cache) a texture. Safe to call repeatedly / to preload. */
  load(src: string): Promise<Slot> {
    const hit = this.cache.get(src);
    if (hit) return Promise.resolve(hit);
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.decoding = "async";
      img.src = src;
      const finish = () => {
        const gl = this.gl;
        const tex = new Texture(gl, {
          image: img,
          generateMipmaps: false,
          wrapS: gl.CLAMP_TO_EDGE,
          wrapT: gl.CLAMP_TO_EDGE,
          minFilter: gl.LINEAR,
          magFilter: gl.LINEAR,
          flipY: true,
        });
        const slot: Slot = {
          tex,
          aspect: (img.naturalWidth || 1) / (img.naturalHeight || 1),
        };
        this.cache.set(src, slot);
        resolve(slot);
      };
      if (img.complete && img.naturalWidth) finish();
      else {
        img.onload = finish;
        img.onerror = finish;
      }
    });
  }

  /** Assign the outgoing (A) and incoming (B) textures with their compositions. */
  async setPair(
    aSrc: string,
    bSrc: string,
    compA: ReelComp = DEFAULT_COMP,
    compB: ReelComp = DEFAULT_COMP,
  ) {
    const [a, b] = await Promise.all([this.load(aSrc), this.load(bSrc)]);
    const u = this.program.uniforms;
    u.uTexA.value = a.tex;
    u.uImgAspectA.value = a.aspect;
    u.uDirA.value = compA.dir.slice();
    u.uScaleA.value = compA.scale;
    u.uFocusA.value = compA.focus.slice();
    u.uAmpA.value = compA.amp;
    u.uTexB.value = b.tex;
    u.uImgAspectB.value = b.aspect;
    u.uDirB.value = compB.dir.slice();
    u.uScaleB.value = compB.scale;
    u.uFocusB.value = compB.focus.slice();
    u.uAmpB.value = compB.amp;
    u.uWipeB.value = wipeCode(compB.wipe);
  }

  /** Single texture on both slots (case-study hero: no blend). */
  async setSingle(src: string, comp: ReelComp = DEFAULT_COMP) {
    return this.setPair(src, src, comp, comp);
  }

  setMix(v: number) {
    this.program.uniforms.uMix.value = Math.max(0, Math.min(1, v));
  }
  setOpacity(v: number) {
    this.program.uniforms.uOpacity.value = Math.max(0, Math.min(1, v));
  }
  /** Upload the hero glyph mask (see heroMask.ts). Replaces the previous one. */
  setMaskTexture(mask: HeroMask) {
    const gl = this.gl;
    const u = this.program.uniforms;
    const prev = u.uMask.value as Texture;
    const g2 = gl as WebGL2RenderingContext;
    const tex = new Texture(gl, {
      image: mask.data,
      width: mask.width,
      height: mask.height,
      generateMipmaps: false,
      flipY: false,
      wrapS: gl.CLAMP_TO_EDGE,
      wrapT: gl.CLAMP_TO_EDGE,
      minFilter: gl.LINEAR,
      magFilter: gl.LINEAR,
      ...(mask.float ? { internalFormat: g2.RG16F, format: g2.RG, type: gl.FLOAT, unpackAlignment: 1 } : {}),
    });
    tex.update(); // upload now, so the first masked frame is not also the upload
    u.uMask.value = tex;
    u.uMaskBias.value = mask.bias;
    u.uMaskScale.value = mask.scale;
    if (prev?.texture) gl.deleteTexture(prev.texture);
  }

  /** Whether a half-float, linearly filtered mask is available (WebGL2). */
  get floatMask() {
    return this.renderer.isWebgl2;
  }

  /**
   * Hero -> reel entry state. `on` false returns the plane to its ordinary
   * behaviour; everything else here is ignored while off.
   */
  setHeroMask(s: {
    on: boolean;
    box?: [number, number, number, number];
    img?: [number, number, number, number];
    zoom?: number;
    grow?: number;
    imgMix?: number;
    grade?: number;
  }) {
    const u = this.program.uniforms;
    u.uMaskOn.value = s.on ? 1 : 0;
    if (!s.on) return;
    if (s.box) u.uMaskBox.value = s.box;
    if (s.img) u.uImgBox.value = s.img;
    u.uMaskZ.value = s.zoom ?? 1;
    u.uMaskGrow.value = s.grow ?? 0;
    u.uImgMix.value = s.imgMix ?? 0;
    u.uGrade.value = s.grade ?? 0;
  }

  /** One frame on demand — for scroll-driven states that must not loop at rest. */
  draw() {
    this.applyRectUniforms();
    this.renderer.render({ scene: this.mesh });
  }

  setVelocity(v: number) {
    this.velTarget = Math.max(-1, Math.min(1, v));
  }

  /** Target draw rect in CSS px. null = full-bleed. `snap` skips easing. */
  setRect(rect: Rect, snap = false) {
    this.rect = rect;
    this.rectLerp = snap ? 1 : 0.14;
    if (snap) {
      const t = this.targetRect();
      this.curRect = { ...t };
    }
  }

  private targetRect() {
    if (this.rect) return this.rect;
    return { x: 0, y: 0, w: this.w, h: this.h };
  }

  resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.w = w;
    this.h = h;
    this.renderer.setSize(w, h);
    if (!this.rect) this.curRect = { x: 0, y: 0, w, h };
  }

  private applyRectUniforms() {
    const { x, y, w, h } = this.curRect;
    const cx = ((x + w / 2) / this.w) * 2 - 1;
    const cy = 1 - ((y + h / 2) / this.h) * 2; // flip Y (css top-left -> clip)
    const sx = (w / this.w) * 2;
    const sy = (h / this.h) * 2;
    const u = this.program.uniforms;
    u.uView.value = [this.w, this.h];
    u.uBuf.value = [this.gl.drawingBufferWidth, this.gl.drawingBufferHeight];
    u.uRectCenter.value = [cx, cy];
    u.uRectSize.value = [sx, sy];
    u.uRectAspect.value = h > 0 ? w / h : 1;
  }

  private frame = (t: number) => {
    if (!this.running) return;
    if (!this.start) this.start = t;
    const u = this.program.uniforms;
    u.uTime.value = (t - this.start) / 1000;

    // ease rect toward target
    const tr = this.targetRect();
    const k = this.rectLerp;
    this.curRect.x += (tr.x - this.curRect.x) * k;
    this.curRect.y += (tr.y - this.curRect.y) * k;
    this.curRect.w += (tr.w - this.curRect.w) * k;
    this.curRect.h += (tr.h - this.curRect.h) * k;

    // decay velocity toward target, then toward 0
    this.vel += (this.velTarget - this.vel) * 0.15;
    this.velTarget *= 0.9;
    u.uVelocity.value = this.vel;

    this.applyRectUniforms();
    this.renderer.render({ scene: this.mesh });
    this.raf = requestAnimationFrame(this.frame);
  };

  play() {
    if (this.running) return;
    this.running = true;
    this.start = 0;
    this.raf = requestAnimationFrame(this.frame);
  }
  pause() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }
  get isRunning() {
    return this.running;
  }

  dispose() {
    this.pause();
    const gl = this.gl;
    const ext = gl.getExtension("WEBGL_lose_context");
    this.cache.clear();
    if (ext) ext.loseContext();
  }
}
