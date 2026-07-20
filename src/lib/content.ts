/**
 * Central bilingual content. Every visible string lives here so the site
 * stays fully maintainable and DE/EN switch in one place.
 */

export const disciplines = [
  "Branding",
  "Sports Design",
  "Fight Sports",
  "Event & Club",
  "Commercial",
  "Editorial",
  "Motion",
  "Web",
] as const;

export const content = {
  de: {
    brand: "Joel.Noir",
    nav: {
      work: "Arbeiten",
      disciplines: "Disziplinen",
      about: "Über",
      contact: "Kontakt",
      menu: "Menü",
      close: "Schließen",
    },
    hero: {
      role: "Creative Designer & Art Director",
      status: "Offen für Projekte",
      lead: "Ich gestalte cinematische Visuals für Sport, Fight, Events und Marken — kompromisslos, editorial, unvergesslich.",
      scroll: "Scrollen",
      location: "Deutschland — Weltweit tätig",
    },
    manifest: {
      eyebrow: "Manifest",
      line1: "Kein Template.",
      line2: "Kein KI-Look.",
      line3: "Jede Fläche gestaltet, jede Entscheidung begründet.",
      body: "Zwischen einer Idee und einem Ergebnis, das man nicht vergisst, liegt Handwerk. Genau dort arbeite ich.",
    },
    work: {
      eyebrow: "Ausgewählte Arbeiten",
      title: "Projekte, die im Kopf bleiben.",
      all: "Alle Projekte",
    },
    disciplinesSection: {
      eyebrow: "Disziplinen",
      title: "Von der Idee bis zum letzten Pixel.",
      body: "Eine Handschrift, viele Formate. Ich bewege mich sicher zwischen den Welten — und bringe aus jeder etwas mit.",
    },
    caseStudies: {
      eyebrow: "Case Studies",
      title: "Hinter dem Design.",
      body: "Nicht nur das Ergebnis — der Weg dorthin. Vom Rohmaterial zur finalen Komposition.",
      view: "Case Study ansehen",
      steps: {
        raw: "Rohmaterial",
        composite: "Komposition",
        particles: "Atmosphäre",
        final: "Finale",
      },
    },
    about: {
      eyebrow: "Über",
      title: "Design ist für mich kein Job. Es ist Haltung.",
      body1:
        "Joel.Noir ist die Design-Handschrift von Joel — Creative Designer und Art Director mit einem Faible für dunkle, cinematische Bildwelten. Von Kampfsport-Kampagnen über Matchday-Grafiken bis zu Club-Postern und Marken: Jede Arbeit entsteht handgemacht, mit Blick fürs Detail und ohne KI-Shortcuts.",
      body2:
        "Was mich antreibt, ist Design, das nicht dekoriert, sondern wirkt — das eine Emotion trägt, eine Geschichte erzählt und in Erinnerung bleibt.",
      skillsTitle: "Fähigkeiten",
      skills: [
        "Art Direction",
        "Brand Design",
        "Sports Design",
        "Photo Compositing",
        "Retusche",
        "Poster Design",
        "Motion",
        "Web Design",
      ],
      toolsTitle: "Werkzeuge",
      tools: ["Photoshop", "After Effects", "Illustrator", "Figma", "Lightroom"],
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Lass uns etwas bauen, an das man sich erinnert.",
      body: "Offen für Projekte, Kooperationen und Anfragen — von der einzelnen Grafik bis zur kompletten Marke.",
      cta: "Schreib mir",
      emailLabel: "E-Mail",
      email: "joelnoir1.graphics@gmail.com",
      socialLabel: "Social",
      social: "@joel.noir1",
    },
    footer: {
      cta: "Lass uns etwas bauen, an das man sich erinnert.",
      email: "joelnoir1.graphics@gmail.com",
      madeIn: "Gestaltet in Deutschland",
      rights: "Alle Rechte vorbehalten",
      back: "Nach oben",
    },
  },
  en: {
    brand: "Joel.Noir",
    nav: {
      work: "Work",
      disciplines: "Disciplines",
      about: "About",
      contact: "Contact",
      menu: "Menu",
      close: "Close",
    },
    hero: {
      role: "Creative Designer & Art Director",
      status: "Open for work",
      lead: "I craft cinematic visuals for sport, fight, events and brands — uncompromising, editorial, unforgettable.",
      scroll: "Scroll",
      location: "Germany — Working worldwide",
    },
    manifest: {
      eyebrow: "Manifesto",
      line1: "No template.",
      line2: "No AI look.",
      line3: "Every surface designed, every decision earned.",
      body: "Between an idea and a result you don't forget lies craft. That's exactly where I work.",
    },
    work: {
      eyebrow: "Selected Work",
      title: "Work that stays with you.",
      all: "All projects",
    },
    disciplinesSection: {
      eyebrow: "Disciplines",
      title: "From the idea to the last pixel.",
      body: "One signature, many formats. I move confidently between worlds — and bring something back from each.",
    },
    caseStudies: {
      eyebrow: "Case Studies",
      title: "Behind the design.",
      body: "Not just the result — the road there. From raw material to the final composition.",
      view: "View case study",
      steps: {
        raw: "Raw material",
        composite: "Composition",
        particles: "Atmosphere",
        final: "Final",
      },
    },
    about: {
      eyebrow: "About",
      title: "Design isn't a job to me. It's a stance.",
      body1:
        "Joel.Noir is the design signature of Joel — creative designer and art director with a taste for dark, cinematic imagery. From fight-sport campaigns and matchday graphics to club posters and brands: every piece is handmade, detail-obsessed and free of AI shortcuts.",
      body2:
        "What drives me is design that doesn't decorate but works — that carries emotion, tells a story and stays in memory.",
      skillsTitle: "Capabilities",
      skills: [
        "Art Direction",
        "Brand Design",
        "Sports Design",
        "Photo Compositing",
        "Retouching",
        "Poster Design",
        "Motion",
        "Web Design",
      ],
      toolsTitle: "Tools",
      tools: ["Photoshop", "After Effects", "Illustrator", "Figma", "Lightroom"],
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's build something people remember.",
      body: "Open for projects, collaborations and enquiries — from a single graphic to a full brand.",
      cta: "Write me",
      emailLabel: "Email",
      email: "joelnoir1.graphics@gmail.com",
      socialLabel: "Social",
      social: "@joel.noir1",
    },
    footer: {
      cta: "Let's build something people remember.",
      email: "joelnoir1.graphics@gmail.com",
      madeIn: "Designed in Germany",
      rights: "All rights reserved",
      back: "Back to top",
    },
  },
} as const;

export type Content = (typeof content)["de"];
