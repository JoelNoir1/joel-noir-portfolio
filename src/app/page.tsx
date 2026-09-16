import { preload } from "react-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Reel from "@/components/sections/Reel";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import { heroProject } from "@/lib/projects";

export default function Home() {
  /* MOBILE HERO: on a touch phone the first work (list item 01) rises into the
     first frame and becomes the largest thing on screen — but it is rendered
     further down by a lazy image. Hint it in the initial HTML at high priority,
     only under the mobile hero's own condition, so desktop fetches nothing new.
     Keep this query identical to the MOBILE HERO media query in globals.css. */
  preload(heroProject.image, {
    as: "image",
    fetchPriority: "high",
    media: "(max-width: 767px) and (pointer: coarse)",
  });

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Reel />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
