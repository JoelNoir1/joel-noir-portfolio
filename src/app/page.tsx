import Loader from "@/components/ui/Loader";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Manifest from "@/components/sections/Manifest";
import SelectedWork from "@/components/sections/SelectedWork";
import Disciplines from "@/components/sections/Disciplines";
import About from "@/components/sections/About";
import WorkIndex from "@/components/sections/WorkIndex";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Loader />
      <Header />
      <main>
        <Hero />
        <Manifest />
        <SelectedWork />
        <Disciplines />
        <About />
        <WorkIndex />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
