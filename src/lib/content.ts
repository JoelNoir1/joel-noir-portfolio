/**
 * Central bilingual content for the INDEX site. Every visible string lives
 * here so the site stays maintainable and DE/EN switch in one place.
 */

export const content = {
  de: {
    brand: "Joel.Noir",
    nav: {
      index: "Index",
      about: "Über",
      contact: "Kontakt",
      menu: "Menü",
      close: "Schließen",
    },
    hero: {
      role: "Mediengestalter · Visuelle Kommunikation",
      status: "Verfügbar für Projekte",
      line: "Design, das bleibt.",
      sub: "Graphic & Sports Design, Branding, Social Media und Web. Ausgewählte Arbeiten, kompromisslos kuratiert.",
      scroll: "Index",
    },
    index: {
      eyebrow: "Selected Work",
      title: "Index",
      note: "2025 / 2026 · Sieben Projekte",
      view: "Projekt ansehen",
      photography: "Photography",
      design: "Design",
    },
    about: {
      eyebrow: "Über",
      lead: "Lieber wenige Projekte richtig als viele halb.",
      body1:
        "Ich bin Joel und komme aus Sachsen. Angefangen habe ich mit Grafiken für Kämpfer und Vereine, inzwischen mache ich auch Social Media, Branding und ganze Websites. Ich arbeite an allem selbst und gebe erst ab, wenn es sitzt.",
      body2:
        "Mich interessiert weniger, ob etwas hübsch ist, sondern ob es hängen bleibt. Als Nächstes: Motorsport.",
      skills: [
        "Graphic Design",
        "Sports Design",
        "Motorsport Design",
        "Branding",
        "Social Media",
        "Fotografie",
        "Webdesign",
        "Digital Experiences",
      ],
    },
    contact: {
      eyebrow: "Kontakt",
      body: "Offen für Projekte, Kooperationen und Anfragen, von der einzelnen Grafik bis zur kompletten Marke oder Website.",
      emailLabel: "E-Mail",
      email: "joelnoir1.graphics@gmail.com",
      socialLabel: "Instagram",
      social: "@joel.noir1",
    },
    footer: {
      madeIn: "Gestaltet in Deutschland",
      rights: "Alle Rechte vorbehalten",
      back: "Nach oben",
    },
    project: {
      all: "Alle Arbeiten",
      next: "Nächstes Projekt",
      live: "Live ansehen",
      client: "Kunde",
      year: "Jahr",
      field: "Disziplin",
      overview: "Überblick",
    },
  },
  en: {
    brand: "Joel.Noir",
    nav: {
      index: "Index",
      about: "About",
      contact: "Contact",
      menu: "Menu",
      close: "Close",
    },
    hero: {
      role: "Media Designer · Visual Communication",
      status: "Available for work",
      line: "Design that stays.",
      sub: "Graphic & sports design, branding, social media and web. Selected work, uncompromisingly curated.",
      scroll: "Index",
    },
    index: {
      eyebrow: "Selected Work",
      title: "Index",
      note: "2025 / 2026 · Seven projects",
      view: "View project",
      photography: "Photography",
      design: "Design",
    },
    about: {
      eyebrow: "About",
      lead: "A few projects done right, not many done halfway.",
      body1:
        "I'm Joel, based in Saxony, Germany. I started out making graphics for fighters and clubs; these days I also do social media, branding and full websites. I do the work myself and only hand it over when it's right.",
      body2:
        "I care less about whether something looks nice than whether it sticks. Up next: motorsport.",
      skills: [
        "Graphic Design",
        "Sports Design",
        "Motorsport Design",
        "Branding",
        "Social Media",
        "Photography",
        "Web Design",
        "Digital Experiences",
      ],
    },
    contact: {
      eyebrow: "Contact",
      body: "Open for projects, collaborations and enquiries, from a single graphic to a full brand or website.",
      emailLabel: "Email",
      email: "joelnoir1.graphics@gmail.com",
      socialLabel: "Instagram",
      social: "@joel.noir1",
    },
    footer: {
      madeIn: "Designed in Germany",
      rights: "All rights reserved",
      back: "Back to top",
    },
    project: {
      all: "All work",
      next: "Next project",
      live: "View live",
      client: "Client",
      year: "Year",
      field: "Discipline",
      overview: "Overview",
    },
  },
} as const;

export type Content = (typeof content)["de"];
