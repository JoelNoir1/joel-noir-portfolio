/**
 * Central project database. Feeds Selected Work, Disciplines, the Work Index
 * and the Case Studies — single source of truth, fully typed.
 */

export type CategoryKey =
  | "fight"
  | "sports"
  | "event"
  | "commercial"
  | "editorial";

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  image: string;
  category: CategoryKey;
  tagline: { de: string; en: string };
  featured: boolean;
  caseStudy?: boolean;
};

export const categories: Record<CategoryKey, { de: string; en: string }> = {
  fight: { de: "Fight Sports", en: "Fight Sports" },
  sports: { de: "Sports Design", en: "Sports Design" },
  event: { de: "Event & Club", en: "Event & Club" },
  commercial: { de: "Commercial", en: "Commercial" },
  editorial: { de: "Editorial", en: "Editorial" },
};

export const projects: Project[] = [
  {
    slug: "russian-viking",
    title: "Russian Viking",
    client: "Bare-Knuckle Athlet",
    year: "2025",
    image: "/work/russian-viking.jpg",
    category: "fight",
    tagline: {
      de: "Ein Krieger-Keyvisual aus Eis, Rauch und Stahl.",
      en: "A warrior key visual forged from ice, smoke and steel.",
    },
    featured: true,
    caseStudy: true,
  },
  {
    slug: "cem-fightlab",
    title: "CEM",
    client: "Fightlab Munich",
    year: "2025",
    image: "/work/cem.jpg",
    category: "fight",
    tagline: {
      de: "Rohe Energie, in ein rotes Fight-Poster gegossen.",
      en: "Raw energy poured into a red fight poster.",
    },
    featured: true,
    caseStudy: true,
  },
  {
    slug: "marvin-stefaniak",
    title: "Marvin Stefaniak",
    client: "Erzgebirge Aue",
    year: "2025",
    image: "/work/stefaniak.jpg",
    category: "sports",
    tagline: {
      de: "Spieler-Branding mit Blitz und Vereinsfarbe.",
      en: "Player branding charged with lightning and club colour.",
    },
    featured: true,
  },
  {
    slug: "cold-smile",
    title: "Cold Smile",
    client: "Pendo Club",
    year: "2025",
    image: "/work/cold-smile.jpg",
    category: "event",
    tagline: {
      de: "Glitch, Grillz und Trap — ein Club-Poster mit Attitüde.",
      en: "Glitch, grillz and trap — a club poster with attitude.",
    },
    featured: true,
  },
  {
    slug: "trainer-gesucht",
    title: "Wir suchen dich",
    client: "Budissa Bautzen",
    year: "2024",
    image: "/work/trainer-gesucht.jpg",
    category: "sports",
    tagline: {
      de: "Recruiting-Kampagne, die den Betrachter direkt anspricht.",
      en: "A recruiting campaign that points straight at the viewer.",
    },
    featured: true,
  },
  {
    slug: "dj-drops",
    title: "DJ Drops",
    client: "Joel.Noir Audio",
    year: "2025",
    image: "/work/dj-drops.jpg",
    category: "commercial",
    tagline: {
      de: "Service-Branding für handgemachtes Sounddesign.",
      en: "Service branding for handcrafted sound design.",
    },
    featured: false,
  },
  {
    slug: "hayk-the-lion",
    title: "Hayk — The Lion",
    client: "Boxing Athlet",
    year: "2024",
    image: "/work/hayk.jpg",
    category: "fight",
    tagline: {
      de: "Ein Kämpfer-Portrait mit der Wucht seines Namens.",
      en: "A fighter portrait as heavy as his name.",
    },
    featured: false,
  },
  {
    slug: "taeddy",
    title: "Taeddy",
    client: "Bare-Knuckle",
    year: "2024",
    image: "/work/taeddy.jpg",
    category: "fight",
    tagline: {
      de: "Rauch, Rot und rohe Präsenz.",
      en: "Smoke, red and raw presence.",
    },
    featured: false,
  },
  {
    slug: "tottenham-matchday",
    title: "Matchday",
    client: "Sports Editorial",
    year: "2025",
    image: "/work/tottenham.jpg",
    category: "sports",
    tagline: {
      de: "Matchday-Grafik im Premier-League-Format.",
      en: "Matchday graphic in Premier League format.",
    },
    featured: false,
  },
  {
    slug: "wolfsburg-wind",
    title: "On Fire",
    client: "VfL Wolfsburg",
    year: "2024",
    image: "/work/wolfsburg.jpg",
    category: "sports",
    tagline: {
      de: "Spieler-Feature im Player-Interface-Look.",
      en: "Player feature styled as a music player.",
    },
    featured: true,
  },
  {
    slug: "pendo-after-dark",
    title: "After Dark",
    client: "Pendo Club",
    year: "2025",
    image: "/work/pendo-club.jpg",
    category: "event",
    tagline: {
      de: "Rot-schwarzes Eventposter mit Parental-Advisory-Kante.",
      en: "Red-and-black event poster with a parental-advisory edge.",
    },
    featured: false,
  },
  {
    slug: "baddies",
    title: "Baddies",
    client: "Joel.Noir Nights",
    year: "2025",
    image: "/work/baddies.jpg",
    category: "event",
    tagline: {
      de: "Neon-Grün trifft Graffiti — Club-Night-Branding.",
      en: "Neon green meets graffiti — club night branding.",
    },
    featured: false,
  },
  {
    slug: "editorial-study",
    title: "Editorial Study",
    client: "Personal",
    year: "2025",
    image: "/work/editorial.jpg",
    category: "editorial",
    tagline: {
      de: "Schwarz-Weiß-Studie in Form, Licht und Haltung.",
      en: "A black-and-white study in form, light and posture.",
    },
    featured: false,
  },
  {
    slug: "dachpflege",
    title: "Dachpflege",
    client: "Galabau Böttcher",
    year: "2024",
    image: "/work/dachpflege.jpg",
    category: "commercial",
    tagline: {
      de: "Social-Werbung, die aus einem Handwerk Story macht.",
      en: "Social ad that turns a trade into a story.",
    },
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const caseStudies = projects.filter((p) => p.caseStudy);
