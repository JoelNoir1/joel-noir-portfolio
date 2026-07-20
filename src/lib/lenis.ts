type LenisLike = { scrollTo: (target: Element | number, opts?: object) => void };

/** Smooth-scroll to an element id, using Lenis when available. */
export function scrollToId(id: string, offset = 0) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
  if (el) {
    if (lenis) lenis.scrollTo(el, { offset });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (window.location.pathname !== "/") {
    // anchor lives on the homepage → navigate there with the hash
    window.location.href = `/#${id}`;
  }
}
