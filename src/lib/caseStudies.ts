/**
 * Deep case-study content for the projects where real process material exists.
 * Keyed by project slug. Only projects with caseStudy: true have an entry.
 */

export type ProcessStep = {
  image: string;
  step: "composite" | "particles" | "final";
  caption: { de: string; en: string };
};

export type CaseStudyDetail = {
  intro: { de: string; en: string };
  story: {
    challenge: { de: string; en: string };
    idea: { de: string; en: string };
    craft: { de: string; en: string };
    result: { de: string; en: string };
  };
  process: ProcessStep[];
};

export const caseStudyDetails: Record<string, CaseStudyDetail> = {
  "russian-viking": {
    intro: {
      de: "Ein Bare-Knuckle-Kämpfer mit dem Beinamen 'Russian Viking' brauchte ein Keyvisual, das seine Präsenz in eine eigene Welt hebt — nicht nur ein Foto mit Schrift, sondern ein filmreifes Schlachtbild.",
      en: "A bare-knuckle fighter nicknamed 'Russian Viking' needed a key visual that lifts his presence into a world of its own — not just a photo with type, but a cinematic battle scene.",
    },
    story: {
      challenge: {
        de: "Aus nüchternen Wettkampf-Fotos ein einprägsames Krieger-Motiv formen, das sofort Respekt einfordert.",
        en: "Turn plain competition photos into a memorable warrior motif that commands respect at first glance.",
      },
      idea: {
        de: "Nordische Schlacht-Ästhetik: Nebel, Speere und Raben, ein Held im Zentrum, gedoppelt von seinem eigenen Schrei — Kälte, Stahl und Rohheit.",
        en: "Nordic battle aesthetics: mist, spears and ravens, a hero at the centre doubled by his own roar — cold, steel and rawness.",
      },
      craft: {
        de: "Sorgfältige Freistellung, ein mehrschichtiges Composite aus drei Aufnahmen, atmosphärischer Nebel für Tiefe — und darüber ein Metall-Schriftzug, der wie aus Eis gemeißelt wirkt.",
        en: "Careful cut-outs, a multi-layer composite from three shots, atmospheric fog for depth — topped with a metal wordmark that looks carved from ice.",
      },
      result: {
        de: "Ein Motiv, das nicht nach Social-Grafik aussieht, sondern nach Filmplakat.",
        en: "A visual that reads less like a social graphic and more like a movie poster.",
      },
    },
    process: [
      {
        image: "/work/cases/rv-composite.jpg",
        step: "composite",
        caption: {
          de: "Composite & Nebel — die Athleten freigestellt, in eine neblige Schlachtwelt gesetzt.",
          en: "Composite & fog — athletes cut out and placed into a misty battle world.",
        },
      },
      {
        image: "/work/cases/rv-final.jpg",
        step: "final",
        caption: {
          de: "Finale — der gemeißelte 'Russian Viking'-Schriftzug vollendet das Bild.",
          en: "Final — the chiselled 'Russian Viking' wordmark completes the piece.",
        },
      },
    ],
  },
  "cem-fightlab": {
    intro: {
      de: "Für Fightlab Munich und den Kämpfer Cem sollte ein Poster entstehen, das reine Aggression und Fokus in einem einzigen Bild bündelt.",
      en: "For Fightlab Munich and fighter Cem, the goal was a poster that channels pure aggression and focus into a single frame.",
    },
    story: {
      challenge: {
        de: "Die Intensität eines Kampfmoments einfangen — ohne dass das Poster überladen wirkt.",
        en: "Capture the intensity of a fighting moment — without letting the poster feel cluttered.",
      },
      idea: {
        de: "Ein durchdringendes Rot als Signalfarbe der Aggression. Der Kämpfer im Fokus, hinter ihm sein eigener Schrei als Echo — Präsenz, gedoppelt.",
        en: "A piercing red as the signal colour of aggression. The fighter in focus, his own roar echoing behind him — presence, doubled.",
      },
      craft: {
        de: "Freistellung, Rot-Grading, ein Partikel-Layer für Energie und Tiefe, dann die Typo: 'CEM' und die handschriftliche Signatur als ruhiger Gegenpol zur Wucht.",
        en: "Cut-out, red grading, a particle layer for energy and depth, then the type: 'CEM' and the handwritten signature as a calm counterpoint to the force.",
      },
      result: {
        de: "Ein Fight-Poster, das Kraft ausstrahlt und trotzdem klar bleibt.",
        en: "A fight poster that radiates power yet stays clean.",
      },
    },
    process: [
      {
        image: "/work/cases/cem-composite.jpg",
        step: "composite",
        caption: {
          de: "Komposition — der Kämpfer freigestellt auf Rot, der Schrei als Echo dahinter.",
          en: "Composition — the fighter cut out on red, the roar echoing behind.",
        },
      },
      {
        image: "/work/cases/cem-partikel.jpg",
        step: "particles",
        caption: {
          de: "Atmosphäre — ein Partikel-Layer bringt Energie und räumliche Tiefe.",
          en: "Atmosphere — a particle layer adds energy and spatial depth.",
        },
      },
      {
        image: "/work/cases/cem-final.jpg",
        step: "final",
        caption: {
          de: "Finale — Typografie und Signatur setzen den Schlusspunkt.",
          en: "Final — typography and signature land the finishing touch.",
        },
      },
    ],
  },
};
