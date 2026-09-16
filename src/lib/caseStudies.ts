import type { Bi } from "./projects";

export type CaseSection = { heading: Bi; body: Bi };
export type CaseImage = { src: string; label: Bi; span?: "full" | "half" };
export type DesignDirection = {
  palette: { hex: string; name: string }[];
  typeNote: Bi;
  capabilities: Bi[];
};
export type CaseStudy = {
  role: Bi;
  intro: Bi;
  designDirection?: DesignDirection;
  sections: CaseSection[];
  gallery: CaseImage[];
};

export const caseStudies: Record<string, CaseStudy> = {
  "firat-nossen": {
    role: { de: "Web Design & Development", en: "Web Design & Development" },
    intro: {
      de: "Für Firat in Nossen entstand eine Website, die sich nicht wie eine Restaurantseite anfühlt, sondern wie eine Marke: warm, appetitlich und schnell.",
      en: "For Firat in Nossen I built a website that doesn't feel like a restaurant page but like a brand: warm, appetising and fast.",
    },
    designDirection: {
      palette: [
        { hex: "#171310", name: "Espresso" },
        { hex: "#e8834a", name: "Orange" },
        { hex: "#ede4d6", name: "Cream" },
        { hex: "#5fb07a", name: "Open" },
      ],
      typeNote: {
        de: "Editoriale Serif fürs Appetitliche, klare Sans für die Fakten.",
        en: "Editorial serif for appetite, a clean sans for the facts.",
      },
      capabilities: [
        { de: "Digitale Speisekarte", en: "Digital menu" },
        { de: "Öffnungszeiten in Echtzeit", en: "Live opening hours" },
        { de: "Admin-Dashboard (Supabase)", en: "Admin dashboard (Supabase)" },
      ],
    },
    sections: [
      {
        heading: { de: "Herausforderung", en: "Challenge" },
        body: {
          de: "Ein lokales Restaurant sollte online so hochwertig wirken, wie das Essen schmeckt, und der Inhaber sollte alles selbst pflegen können, ohne Agentur.",
          en: "A local restaurant needed to look online as good as the food tastes, and the business had to be able to maintain everything in-house, without an agency.",
        },
      },
      {
        heading: { de: "Umsetzung", en: "Execution" },
        body: {
          de: "Next.js mit eigenem Content-System auf Supabase: digitale Speisekarte, Öffnungszeiten-Logik und ein Admin-Dashboard.",
          en: "Next.js with its own Supabase-backed content system: a digital menu, opening-hours logic and an admin dashboard.",
        },
      },
      {
        heading: { de: "Ergebnis", en: "Outcome" },
        body: {
          de: "Eine schnelle, gepflegte Web-Experience, die der Betrieb selbst aktuell hält, statt einer statischen Broschüre.",
          en: "A fast, maintained web experience the business keeps current itself, instead of a static brochure.",
        },
      },
    ],
    gallery: [
      {
        src: "/work/firat-detail.jpg",
        label: { de: "Frische, groß inszeniert", en: "Freshness, staged large" },
        span: "full",
      },
    ],
  },

  "russian-viking": {
    role: { de: "Sports Key Visual", en: "Sports Key Visual" },
    intro: {
      de: "Ein Bare-Knuckle-Kämpfer mit dem Beinamen 'Russian Viking' brauchte ein Keyvisual, das seine Präsenz in eine eigene Welt hebt. Kein Foto mit Schrift, sondern ein filmreifes Schlachtbild.",
      en: "A bare-knuckle fighter nicknamed 'Russian Viking' needed a key visual that lifts his presence into a world of its own. Not a photo with type, but a cinematic battle scene.",
    },
    sections: [
      {
        heading: { de: "Idee", en: "Idea" },
        body: {
          de: "Nordische Schlacht-Ästhetik: Nebel, Speere und Raben, ein Held im Zentrum, gedoppelt von seinem eigenen Schrei. Kälte, Stahl und Rohheit.",
          en: "Nordic battle aesthetics: mist, spears and ravens, a hero at the centre doubled by his own roar. Cold, steel and rawness.",
        },
      },
      {
        heading: { de: "Umsetzung", en: "Craft" },
        body: {
          de: "Sorgfältige Freistellung, ein mehrschichtiges Composite aus drei Aufnahmen, atmosphärischer Nebel für Tiefe, darüber ein Metall-Schriftzug wie aus Eis gemeißelt.",
          en: "Careful cut-outs, a multi-layer composite from three shots, atmospheric fog for depth, and a metal wordmark carved as if from ice.",
        },
      },
    ],
    gallery: [
      { src: "/work/cases/rv-composite.jpg", label: { de: "Composite und Nebel, vor der Typografie", en: "Composite and fog, before the type" }, span: "half" },
      { src: "/work/cases/rv-final.jpg", label: { de: "Finales Keyvisual", en: "Final key visual" }, span: "half" },
    ],
  },

  "cem-fightlab": {
    role: { de: "Fight Poster", en: "Fight Poster" },
    intro: {
      de: "Für Fightlab Munich und den Kämpfer Cem sollte ein Poster entstehen, das reine Aggression und Fokus in einem einzigen Bild bündelt.",
      en: "For Fightlab Munich and fighter Cem, the goal was a poster that channels pure aggression and focus into a single frame.",
    },
    sections: [
      {
        heading: { de: "Idee", en: "Idea" },
        body: {
          de: "Ein durchdringendes Rot als Signalfarbe der Aggression. Der Kämpfer im Fokus, hinter ihm sein eigener Schrei als Echo. Präsenz, gedoppelt.",
          en: "A piercing red as the signal colour of aggression. The fighter in focus, his own roar echoing behind him. Presence, doubled.",
        },
      },
      {
        heading: { de: "Umsetzung", en: "Craft" },
        body: {
          de: "Freistellung, Rot-Grading, ein Partikel-Layer für Energie und Tiefe, dann die Typo: 'CEM' und eine handschriftliche Signatur als ruhiger Gegenpol.",
          en: "Cut-out, red grading, a particle layer for energy and depth, then the type: 'CEM' and a handwritten signature as a calm counterpoint.",
        },
      },
    ],
    gallery: [
      { src: "/work/cases/cem-composite.jpg", label: { de: "Komposition auf Rot", en: "Composition on red" }, span: "half" },
      { src: "/work/cases/cem-partikel.jpg", label: { de: "Atmosphäre, Partikel-Layer", en: "Atmosphere, particle layer" }, span: "half" },
      { src: "/work/cases/cem-final.jpg", label: { de: "Finales Poster", en: "Final poster" }, span: "full" },
    ],
  },

  "galabau-boettcher": {
    role: { de: "Web · Social Media · Kommunikation", en: "Web · Social · Communication" },
    intro: {
      de: "Für den Landschaftsbau-Betrieb Böttcher entstand mehr als eine Website: ein visueller Auftritt, der Handwerk seriös und modern zeigt, online wie in Social Media.",
      en: "For the landscaping company Böttcher I built more than a website: a visual identity that shows craft as serious and modern, online and on social.",
    },
    designDirection: {
      palette: [
        { hex: "#1e3320", name: "Forest" },
        { hex: "#a8c84a", name: "Lime" },
        { hex: "#f1efe6", name: "Bone" },
      ],
      typeNote: {
        de: "Kräftige Grotesk, regional und vertrauensbildend.",
        en: "Bold grotesque, regional and trustworthy.",
      },
      capabilities: [
        { de: "Website", en: "Website" },
        { de: "Social-Media-Vorlagen", en: "Social templates" },
        { de: "Bildsprache", en: "Image language" },
        { de: "Kommunikation", en: "Communication" },
      ],
    },
    sections: [
      {
        heading: { de: "Herausforderung", en: "Challenge" },
        body: {
          de: "Ein Handwerksbetrieb sollte online professionell auftreten und zugleich regelmäßig Material für Social Media bekommen.",
          en: "A trade business needed a professional online presence and, at the same time, a steady stream of social-media material.",
        },
      },
      {
        heading: { de: "Umsetzung", en: "Execution" },
        body: {
          de: "Eine klare, vertrauensbildende Website plus wiederverwendbare Social-Vorlagen, die aus einzelnen Aufträgen kleine Geschichten machen.",
          en: "A clear, trust-building website plus reusable social templates that turn individual jobs into small stories.",
        },
      },
    ],
    gallery: [
      { src: "/work/galabau-detail.jpg", label: { de: "Website, Hero", en: "Website, hero" }, span: "half" },
      { src: "/work/dachpflege.jpg", label: { de: "Social-Media-Grafik", en: "Social-media graphic" }, span: "half" },
    ],
  },
};
