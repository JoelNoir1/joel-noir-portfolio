/**
 * Central bilingual content for the INDEX site. Every visible string lives
 * here so the site stays maintainable and DE/EN switch in one place.
 */

export const content = {
  de: {
    brand: "Joel.Noir",
    nav: {
      index: "Index",
      photo: "Fotografie",
      design: "Design",
      about: "Über",
      contact: "Kontakt",
      menu: "Menü",
      close: "Schließen",
    },
    hero: {
      role: "Mediengestalter · Sachsen",
      line: "Fotografie & Design.",
      sub: "Event- und Sportfotografie, Eventgrafiken, Social Media und Web.",
      work: "Arbeiten ansehen",
      enquire: "Projekt anfragen",
      alt: "Joel Hildebrand in schwarzer Lederjacke mit einem Becher in der Hand, vor einem schrägen roten Block auf blauem Rasterhintergrund, links der Schriftzug JOEL NOIR.",
    },
    photo: {
      title: "Fotografie",
      enlarge: "Vergrößern",
      close: "Schließen",
      prev: "Vorheriges Foto",
      next: "Nächstes Foto",
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
      body: "Ich bin Joel, Mediengestalter aus Sachsen. Ich fotografiere Clubnächte, Events und Sport und gestalte Poster, Social-Media-Content und Websites. Bild und Gestaltung kommen bei mir aus einer Hand.",
    },
    services: {
      title: "Leistungen",
      groups: [
        { name: "Fotografie", items: ["Eventfotografie", "Sportfotografie", "Porträts"] },
        { name: "Design", items: ["Eventgrafiken & Flyer", "Social-Media-Content", "Branding & Webdesign"] },
      ],
    },
    contact: {
      eyebrow: "Kontakt",
      lead: "Du planst ein Event oder hast ein Projekt?",
      body: "Schreib mir kurz, worum es geht, wann und wo.",
      cta: "Projekt anfragen",
      subject: "Projektanfrage",
      emailLabel: "E-Mail",
      email: "joelnoir1.graphics@gmail.com",
      socialLabel: "Instagram",
      social: "@joel.noir1",
      who: "Joel Hildebrand · Mediengestalter · Nossen",
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
      photo: "Photography",
      design: "Design",
      about: "About",
      contact: "Contact",
      menu: "Menu",
      close: "Close",
    },
    hero: {
      role: "Media Designer · Saxony, Germany",
      line: "Photography & Design.",
      sub: "Event and sports photography, event graphics, social media and web.",
      work: "View work",
      enquire: "Start a project",
      alt: "Joel Hildebrand in a black leather jacket holding a cup, in front of a slanted red block on a blue halftone background, the words JOEL NOIR on the left.",
    },
    photo: {
      title: "Photography",
      enlarge: "Enlarge",
      close: "Close",
      prev: "Previous photo",
      next: "Next photo",
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
      body: "I'm Joel, a media designer from Saxony, Germany. I photograph club nights, events and sport, and design posters, social media content and websites. The pictures and the design come from the same hand.",
    },
    services: {
      title: "Services",
      groups: [
        { name: "Photography", items: ["Event photography", "Sports photography", "Portraits"] },
        { name: "Design", items: ["Event graphics & flyers", "Social media content", "Branding & web design"] },
      ],
    },
    contact: {
      eyebrow: "Contact",
      lead: "Planning an event or a project?",
      body: "Write me a few lines: what, when and where.",
      cta: "Start a project",
      subject: "Project enquiry",
      emailLabel: "Email",
      email: "joelnoir1.graphics@gmail.com",
      socialLabel: "Instagram",
      social: "@joel.noir1",
      who: "Joel Hildebrand · Media Designer · Nossen",
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
