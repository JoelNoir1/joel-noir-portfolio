/** Scroll to an element id with the browser's own scrolling. */
export function scrollToId(id: string) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (el) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  } else if (window.location.pathname !== "/") {
    // anchor lives on the homepage → navigate there with the hash
    window.location.href = `/#${id}`;
  }
}
