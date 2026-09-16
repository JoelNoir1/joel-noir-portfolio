"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { StageEngine } from "./StageEngine";
import type { ReelComp } from "@/lib/projects";

type MorphRequest = { slug: string; src: string; comp: ReelComp } | null;

type StageCtx = {
  /** WebGL is available and the user has not asked for reduced motion. */
  enabled: boolean;
  /** The shared engine, or null until ready / when disabled. */
  getEngine: () => StageEngine | null;
  /** Reel -> Case handshake: the reel arms it, the case page consumes it. */
  armMorph: (req: MorphRequest) => void;
  consumeMorph: () => MorphRequest;
};

const Ctx = createContext<StageCtx | null>(null);

function detectWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl") || c.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export default function StageProvider({ children }: { children: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<StageEngine | null>(null);
  const morphRef = useRef<MorphRequest>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    // Mobile / touch gets the DOM experience; heavy WebGL stays on capable pointers.
    if (reduce || coarse || !detectWebGL()) return;

    let disposed = false;
    let engine: StageEngine | null = null;

    // Lazy-load the engine (and OGL) only when we actually intend to use it.
    import("./StageEngine").then(({ StageEngine }) => {
      if (disposed || !canvasRef.current) return;
      engine = new StageEngine(canvasRef.current);
      engineRef.current = engine;
      setEnabled(true);
    });

    const onResize = () => engineRef.current?.resize();
    window.addEventListener("resize", onResize);
    // Also track viewport changes that don't fire a window resize event
    // (mobile URL bars, split-view, devtools). Keeps the drawing buffer exact.
    const ro = new ResizeObserver(onResize);
    ro.observe(document.documentElement);

    return () => {
      disposed = true;
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      engineRef.current?.dispose();
      engineRef.current = null;
    };
  }, []);

  const value = useMemo<StageCtx>(
    () => ({
      enabled,
      getEngine: () => engineRef.current,
      armMorph: (req) => {
        morphRef.current = req;
      },
      consumeMorph: () => {
        const r = morphRef.current;
        morphRef.current = null;
        return r;
      },
    }),
    [enabled],
  );

  return (
    <Ctx.Provider value={value}>
      {/* One persistent, full-viewport canvas for the whole site. */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="jn-stage"
        data-on="false"
      />
      {children}
    </Ctx.Provider>
  );
}

export function useStage(): StageCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStage must be used within <StageProvider>");
  return ctx;
}
