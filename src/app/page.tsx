import { preload } from "react-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import { photoProjects } from "@/lib/projects";

export default function Home() {
  /* MOBILE HERO: on a touch phone the first work (the opening photograph)
     rises into the first frame and becomes the largest thing on screen. Hint
     it in the initial HTML at high priority, only under the mobile hero's own
     condition, so desktop fetches nothing new. Same srcset and sizes as the
     image itself, so the preload is the file the phone actually uses. Keep
     this query identical to the MOBILE HERO media query in globals.css. */
  const first = photoProjects[0]?.image.replace(/\.jpg$/, "");
  if (first) {
    preload(`${first}-1600.jpg`, {
      as: "image",
      fetchPriority: "high",
      imageSrcSet: `${first}-960.jpg 960w, ${first}-1600.jpg 1600w`,
      imageSizes: "(max-width: 767px) 92vw, 46vw",
      media: "(max-width: 767px) and (pointer: coarse)",
    });
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
