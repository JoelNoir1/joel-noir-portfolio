/**
 * The curated work — the INDEX. Single source of truth.
 *
 * Seven published projects. Quality over quantity, and the count is a result,
 * not a target: a project is here because it holds up next to the others, not
 * to fill a row. Archived entries stay in this file (and keep their assets) so
 * a decision can be reversed, but they are not part of the public site.
 */

export type Bi = { de: string; en: string };

export type Project = {
  slug: string;
  title: string;
  client: Bi;
  year: string;
  category: Bi;
  image: string;
  /** Format of the hover preview so it flatters posters vs. web work. */
  previewAspect: "portrait" | "landscape";
  /** External live link (launched website). */
  url?: string;
  /** Has a full case study. */
  caseStudy: boolean;
  /**
   * "visual" = the artwork is the case: stage, one note, the next work. No
   * intro, no spec table, no gallery. For work whose only honest content is
   * the finished piece itself.
   */
  caseKind?: "visual";
  /** One-line description. Optional: only set when it is actually known. */
  tagline?: Bi;
  /** Descriptive alt text for the artwork. Falls back to the title. */
  alt?: Bi;
  /**
   * Kept on file but not published: excluded from the home page, the
   * next-project chain, the sitemap and the generated routes. Its assets are
   * untouched, so restoring it is a one-line change.
   */
  archived?: boolean;
  /**
   * Who the hero image shows, when that is certain. Set once, as a single quiet
   * line beside the image: a name, never a claim about the relationship.
   */
  subject?: string;
  /**
   * PHOTO SERIES — the frames that follow the hero on a visual case. The hero
   * stays `image`; these are set after it with the same artwork-mode geometry.
   */
  series?: SeriesRow[];
};

/**
 * One frame of a photo series. `src` is the base path of the web versions,
 * served as `${src}-960.jpg` and `${src}-1600.jpg`, both at the file's 4:5.
 */
export type SeriesFrame = { src: string; alt: Bi };
/**
 * One spread of the series: two frames, `big` naming the large one (it takes
 * that side of the page, the small one the other), or a single closing frame.
 */
export type SeriesRow = { frames: SeriesFrame[]; big?: 0 | 1 };

const allProjects: Project[] = [
  {
    slug: "firat-nossen",
    title: "Firat Nossen",
    client: {
      de: "Firat Döner-Pizza-Kebap-Haus",
      en: "Firat Döner-Pizza-Kebap-Haus",
    },
    year: "2026",
    category: { de: "Web · Digital Experience", en: "Web · Digital Experience" },
    image: "/work/firat.jpg",
    previewAspect: "landscape",
    url: "https://firat-website.vercel.app",
    caseStudy: true,
    tagline: {
      de: "Eine Website mit eigenem Content-System für ein Restaurant in Nossen.",
      en: "A website with its own content system for a restaurant in Nossen.",
    },
  },
  {
    slug: "russian-viking",
    title: "Russian Viking",
    client: { de: "Bare-Knuckle Athlet", en: "Bare-knuckle athlete" },
    year: "2025",
    category: { de: "Fight Sports", en: "Fight Sports" },
    image: "/work/russian-viking.jpg",
    previewAspect: "portrait",
    caseStudy: true,
    tagline: {
      de: "Ein Krieger-Keyvisual aus Eis, Rauch und Stahl.",
      en: "A warrior key visual of ice, smoke and steel.",
    },
  },
  {
    slug: "cem-fightlab",
    title: "CEM",
    client: { de: "Fightlab Munich", en: "Fightlab Munich" },
    year: "2025",
    category: { de: "Fight Sports", en: "Fight Sports" },
    image: "/work/cem.jpg",
    previewAspect: "portrait",
    caseStudy: true,
    tagline: {
      de: "Rohe Energie, in ein rotes Fight-Poster gegossen.",
      en: "Raw energy cast into a red fight poster.",
    },
  },
  {
    slug: "marvin-stefaniak",
    title: "Marvin Stefaniak",
    client: { de: "Erzgebirge Aue", en: "Erzgebirge Aue" },
    year: "2025",
    category: { de: "Sports Design", en: "Sports Design" },
    image: "/work/stefaniak.jpg",
    previewAspect: "portrait",
    caseStudy: false,
    caseKind: "visual",
    /* No tagline: the earlier "player branding" line claimed more than is
       confirmed about this piece. A context line returns only once it is. */
    alt: {
      de: "Poster: Marvin Stefaniak im Trikot von Erzgebirge Aue am Ball, vor violetten Lichtblitzen. Oben der Schriftzug STEFANIAK, links #34 Erzgebirge Aue, Since 1995, Attacking Midfielder.",
      en: "Poster: Marvin Stefaniak in an Erzgebirge Aue kit on the ball, in front of violet light streaks. STEFANIAK across the top, on the left #34 Erzgebirge Aue, Since 1995, Attacking Midfielder.",
    },
  },
  {
    slug: "scream-night",
    title: "Scream Night",
    /* a personal concept piece: no client is named, so none is claimed */
    client: { de: "Persönliches Projekt · Konzept", en: "Personal project · Concept" },
    year: "2026",
    category: { de: "Poster Design · Event Visual", en: "Poster Design · Event Visual" },
    image: "/work/scream-night.jpg",
    previewAspect: "portrait",
    caseStudy: false,
    caseKind: "visual",
    /* No tagline: nothing beyond the facts above is confirmed. */
    alt: {
      de: "Poster: ein weiß geschminktes Gesicht mit weit aufgerissenem Mund, darin in roter Schrift SCREAM NIGHT. Darunter 31 October, Halloween Special, Puschkin Dresden, Doors 22:00, 18+. Oben links Oct. 31 2026, oben rechts das Puschkin-Logo.",
      en: "Poster: a white-painted face with a wide open mouth, SCREAM NIGHT set in red inside it. Below: 31 October, Halloween Special, Puschkin Dresden, Doors 22:00, 18+. Top left Oct. 31 2026, top right the Puschkin logo.",
    },
  },
  {
    slug: "club-event-photography",
    title: "Club / Event Photography",
    /* seven club / event frames; nothing about event, venue or brief is
       confirmed, so none of it is claimed */
    client: { de: "Fotoserie", en: "Photo series" },
    year: "2026",
    category: { de: "Photography", en: "Photography" },
    image: "/work/club/asto.jpg",
    previewAspect: "portrait",
    caseStudy: false,
    caseKind: "visual",
    /* used for the page description only: a photograph carries no title */
    tagline: {
      de: "Club- und Eventfotografie, sieben Bilder.",
      en: "Club and event photography, seven frames.",
    },
    subject: "ASTO",
    alt: {
      de: "Porträt von ASTO in einem Club: Sonnenbrille mit orangefarbenen Gläsern, Cap nach hinten, die tätowierten Arme vor einem hellen, bedruckten ärmellosen Hemd verschränkt. Links an der Wand ein Neonschriftzug.",
      en: "Portrait of ASTO in a club: orange-tinted sunglasses, cap worn backwards, tattooed arms crossed over a light, printed sleeveless shirt. A neon sign on the wall to the left.",
    },
    /* Spreads, as in a photo book: a large frame beside a small one, the
       large one changing sides. The order stays the order of the shoot as
       edited: portrait, motion, DJs, portrait, the room, the bar. */
    series: [
      {
        big: 0,
        frames: [
          {
            src: "/work/club/dj",
            alt: {
              de: "Ein DJ im Profil am Pult, von der Bewegung leicht verwischt, darüber rote und blaue Lichtröhren. Links im Hintergrund das Publikum.",
              en: "A DJ in profile at the decks, softly blurred by movement, red and blue light tubes above. The crowd in the background to the left.",
            },
          },
          {
            src: "/work/club/dj1",
            alt: {
              de: "Ein DJ mit Kopfhörern um den Hals blickt auf das Pult. Dahinter eine LED-Wand, die Kabel und Regler zeigt.",
              en: "A DJ with headphones around the neck looks down at the decks. Behind, an LED wall showing cables and controls.",
            },
          },
        ],
      },
      {
        big: 1,
        frames: [
          {
            src: "/work/club/dj2",
            alt: {
              de: "Ein DJ in Lederjacke am Pult, das Gesicht rot beleuchtet. Im Hintergrund ein violett beleuchteter Raum.",
              en: "A DJ in a leather jacket at the decks, the face lit red. A violet-lit room in the background.",
            },
          },
          {
            src: "/work/club/einzeln",
            alt: {
              de: "Eine lachende Person in weißem Tanktop mit Halsketten, die Faust vor der Brust, ein Glas in der Hand, vor einer roten Wand.",
              en: "A laughing person in a white tank top and chains, fist raised to the chest, a glass in hand, in front of a red wall.",
            },
          },
        ],
      },
      {
        big: 0,
        frames: [
          {
            src: "/work/club/neon",
            alt: {
              de: "Ein Neonschriftzug „Soup of the Day, Vodka Red Bull“ spiegelt sich auf einer dunklen Theke, links ein Getränkemenü auf einem Bildschirm.",
              en: "A neon sign reading “Soup of the Day, Vodka Red Bull” reflected on a dark bar counter, a drinks menu on a screen to the left.",
            },
          },
          {
            src: "/work/club/bar",
            alt: {
              de: "Zwei Personen hinter einer Bar, von oben fotografiert. Eine Person mit Brille und weißem Top blickt lächelnd zurück, vorne Gläser, Limetten und ein Kartenterminal auf der Theke. Dahinter beleuchtete Getränkekühlschränke.",
              en: "Two people behind a bar, photographed from above. One, in glasses and a white top, looks back smiling; glasses, limes and a card terminal on the counter in front. Lit drinks fridges behind.",
            },
          },
        ],
      },
    ],
  },
  {
    /* Archived 2026-09-07. Strong photography, but the typography does not hold
       up beside the other three posters, and the file still carries a leftover
       "Titel:" layer plus a Pento/Pendo contradiction in the client's own name.
       Shown complete in ARTWORK MODE all of that would be fully visible, so the
       staging cannot rescue it. Files and assets are kept. */
    slug: "cold-smile",
    title: "Cold Smile",
    client: { de: "Pendo Club", en: "Pendo Club" },
    year: "2025",
    category: { de: "Event & Culture", en: "Event & Culture" },
    image: "/work/cold-smile.jpg",
    previewAspect: "portrait",
    caseStudy: false,
    archived: true,
    tagline: {
      de: "Glitch, Grillz und Trap. Ein Club-Poster mit Attitüde.",
      en: "Glitch, grillz and trap. A club poster with attitude.",
    },
  },
  {
    slug: "galabau-boettcher",
    title: "Galabau Böttcher",
    client: {
      de: "Garten- & Landschaftsbau Böttcher",
      en: "Böttcher Landscaping",
    },
    year: "2026",
    category: { de: "Web · Social · Kommunikation", en: "Web · Social · Comms" },
    image: "/work/galabau.jpg",
    previewAspect: "landscape",
    url: "https://galabau-boettcher.vercel.app",
    caseStudy: true,
    tagline: {
      de: "Website und visuelle Kommunikation für einen Landschaftsbau-Betrieb.",
      en: "Website and visual communication for a landscaping company.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Composition — a distinct staging per work, no per-work effect.      */
/* ------------------------------------------------------------------ */

/** "type" = title-led, "artwork" = the work carries its own name,
 *  "meta" = editorial meta only, the live surface leads (web experience). */
export type TitleMode = "type" | "artwork" | "meta";

/**
 * ARTWORK MODE — the artwork is the interface.
 *
 * Present on a project = the work is never a backdrop: it is shown at its
 * real format, complete, with the rest of the viewport as
 * negative space. Individuality comes from these five numbers, never from a
 * per-project effect: the composition is the only thing that differs.
 */
export type ArtworkStage = {
  /** True aspect ratio of the file (w / h). Format first. */
  aspect: number;
  /** Share of the viewport height the artwork takes. */
  fit: number;
  /** Ceiling on width as a share of the viewport, so the margin stays real. */
  maxW: number;
  /** Horizontal placement in the free space: 0 left, 0.5 centred, 1 right.
   *  "gutter" / "gutter-right" pin an edge to the page margin the whole site
   *  is set to. The plate line always goes to the open side. */
  ax: number | "gutter" | "gutter-right";
  /** Vertical placement in the free space. */
  ay: number;
  /**
   * True when the client is already named inside the artwork (a club block, a
   * gym's logo). The case caption then leaves it out instead of setting the
   * same words a second time next to the image that carries them. The title is
   * always assumed carried — that is what ARTWORK MODE means.
   */
  carriesClient?: boolean;
};

export type ReelComp = {
  /** Idle framing zoom — posters crop in hard, web stays precise. */
  scale: number;
  /** Cover-crop focal point (0..1). */
  focus: [number, number];
  /** Web work is title-led; artwork that already carries its name is not. */
  title: TitleMode;
  /** Case hero image override (e.g. a brand backdrop instead of a screenshot). */
  stage?: string;
  /** The web work presented through its own live UI instead of a screenshot. */
  surface?: "firat";
  /** Present = ARTWORK MODE: shown complete, at its own format, on open ground. */
  artwork?: ArtworkStage;
};

export const reelComp: Record<string, ReelComp> = {
  // Fight — ARTWORK MODE. A 4:5 poster built around a centred wordmark and a
  // centred figure: cropping it to 16:10 destroyed both, so it is shown at
  // its own format. Left of centre, because the artwork is internally symmetrical and the page
  // composition should not be. The open right side carries the plate line.
  "russian-viking": {
    scale: 1, focus: [0.5, 0.5],
    title: "artwork",
    artwork: { aspect: 1080 / 1350, fit: 0.78, maxW: 0.46, ax: "gutter", ay: 0.5 },
  },
  // Web — the real UI is the subject: its own mobile layout in the list, the
  // desktop surface on Firat's brand ground in the case.
  "firat-nossen": {
    scale: 1.0, focus: [0.5, 0.5],
    title: "meta",
    stage: "/work/firat-stage.webp", surface: "firat",
  },
  // Fight — ARTWORK MODE. The whole lower 40% of this poster is type: the
  // wordmark, the handwritten signature, the Fightlab mark. All of it used to
  // be cropped away. Set larger than Russian Viking because that signature is
  // hairline script, and hung a little low because the type sits at the foot.
  // Left on the gutter: the fighter and his echo both face right, so the open
  // field is the direction they are looking, and the poster's own empty red
  // quarter stays quietly against the page edge instead of doubling the void.
  "cem-fightlab": {
    scale: 1, focus: [0.5, 0.5],
    title: "artwork",
    artwork: { aspect: 1080 / 1350, fit: 0.82, maxW: 0.46, ax: "gutter", ay: 0.46, carriesClient: true },
  },
  // Sports design — ARTWORK MODE, mirrored, and for a reason: the club block
  // "#34 | ERZGEBIRGE AUE" is set flush to the poster's own left edge, and the
  // player and the ball both drive left. Pinned left it would be crushed
  // against the page edge and collide with the wordmark above it. Pinned right,
  // the artwork finally has the room its own composition asks for. Smallest of
  // the three: this poster already carries generous margins inside itself.
  "marvin-stefaniak": {
    scale: 1, focus: [0.5, 0.5],
    title: "artwork",
    artwork: { aspect: 1080 / 1350, fit: 0.8, maxW: 0.46, ax: "gutter-right", ay: 0.54, carriesClient: true },
  },
  // Poster / event visual — ARTWORK MODE, the same staging as the others. A
  // strictly symmetrical 4:5 piece: the title sits dead centre inside the
  // mouth, the date and the club mark are small type in the two top corners,
  // so it is set as large as Cem for that small type and pinned left on the
  // gutter, with the open right side carrying the plate line.
  "scream-night": {
    scale: 1, focus: [0.5, 0.5],
    title: "artwork",
    artwork: { aspect: 1080 / 1350, fit: 0.82, maxW: 0.46, ax: "gutter", ay: 0.5 },
  },
  // Photography — ARTWORK MODE, the same staging as the posters: the photograph
  // complete, at its 4:5, on open ground. The ASTO portrait opens the series.
  // Pinned right: the figure stands centred and looks straight out, while the
  // neon sign and the watermark sit on the photo's own left, so that side faces
  // the open field. Set a touch larger than the posters, because a photograph
  // has no type to carry it, only the face.
  "club-event-photography": {
    scale: 1, focus: [0.5, 0.5],
    title: "artwork",
    artwork: { aspect: 4 / 5, fit: 0.84, maxW: 0.46, ax: "gutter-right", ay: 0.5 },
  },
  // Archived — kept only so restoring the project needs no rebuild.
  "cold-smile": { scale: 1.12, focus: [0.5, 0.54], title: "artwork" },
  // Web / visual communication — the paving grid becomes the layout grid.
  "galabau-boettcher": {
    scale: 1.04, focus: [0.5, 0.56],
    title: "meta",
    stage: "/work/gb-raster.webp",
  },
};

const FALLBACK_COMP: ReelComp = {
  scale: 1, focus: [0.5, 0.5], title: "type",
};

export function compOf(slug: string): ReelComp {
  return reelComp[slug] ?? FALLBACK_COMP;
}

/**
 * The published sequence. One list drives the home page, the plate numbers,
 * the keyboard order, the next-project chain and the sitemap, so all of them
 * tell the same story in the same order.
 *
 * PHOTOGRAPHY comes first, as its own section: the club / event series.
 * DESIGN follows, in its established order:
 * 01 RUSSIAN VIKING   — the strongest poster, and the artwork in the headline.
 * 02 FIRAT NOSSEN     — the web work. From "he can draw" to "he can ship".
 * 03 SCREAM NIGHT     — back to a poster, pinned left, kept apart from CEM so
 *    the two red posters never meet.
 * 04 MARVIN STEFANIAK — brightest of the posters, pinned right.
 * 05 CEM              — the darkest and most intense, pinned left.
 * 06 GALABAU BÖTTCHER — the close: one client, web and social and
 *    communication. The last thing seen is proof, not a poster.
 *
 * The design works alternate sides (left, right, left, right, left), so no
 * two neighbours share a side or a palette.
 */
export const projectOrder = [
  "club-event-photography",
  "russian-viking",
  "firat-nossen",
  "scream-night",
  "marvin-stefaniak",
  "cem-fightlab",
  "galabau-boettcher",
] as const;

export const projects: Project[] = projectOrder
  .map((s) => allProjects.find((p) => p.slug === s))
  .filter((p): p is Project => p !== undefined && !p.archived);

/** The two sections of the home page: a photo series is photography. */
export const photoProjects: Project[] = projects.filter((p) => p.series);
export const designProjects: Project[] = projects.filter((p) => !p.series);

/** A work's plate number, counted within its own section. */
export function plateOf(slug: string): string {
  const group = photoProjects.some((p) => p.slug === slug) ? photoProjects : designProjects;
  return String(group.findIndex((p) => p.slug === slug) + 1).padStart(2, "0");
}

/** The artwork that fills the hero type. */
export const HERO_SLUG = "russian-viking";
export const heroProject = projects.find((p) => p.slug === HERO_SLUG)!;

export const caseStudyProjects = projects.filter((p) => p.caseStudy);

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
