/**
 * The curated work — the INDEX. Single source of truth.
 *
 * Six published projects. Quality over quantity, and the count is a result,
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
   * Kept on file but not published: excluded from the reel, the index, the
   * next-project chain, the sitemap and the generated routes. Its assets are
   * untouched, so restoring it is a one-line change.
   */
  archived?: boolean;
};

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
/* Reel composition — one motion language, a distinct staging per work. */
/* ------------------------------------------------------------------ */

/** "type" = title-led, "artwork" = the work carries its own name,
 *  "meta" = editorial meta only, the live surface leads (web experience). */
export type TitleMode = "type" | "artwork" | "meta";

/**
 * ARTWORK MODE — the artwork is the interface.
 *
 * Present on a project = the reel stops treating that work as a backdrop and
 * shows it at its real format, complete, with the rest of the viewport as
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
export type WipeStyle = "linear" | "radial" | "slices";
/** Where the text block sits — deliberately not a uniform grid. */
export type Place = "bl" | "br" | "tl";

export type ReelComp = {
  /** Wipe/displacement direction. */
  dir: [number, number];
  /** Reveal style of this project as it enters. */
  wipe: WipeStyle;
  /** Idle framing zoom — posters crop in hard, web stays precise. */
  scale: number;
  /** Cover-crop focal point (0..1). */
  focus: [number, number];
  /** Displacement amplitude multiplier. */
  amp: number;
  /** Web work is title-led; artwork that already carries its name is not. */
  title: TitleMode;
  /** Text-block anchor. */
  place: Place;
  /** Title size multiplier (type-mode). */
  titleScale: number;
  /** Relative dwell length in the reel. >1 buys scroll for a longer story. */
  dwell?: number;
  /** Plane texture override (e.g. a brand backdrop instead of a screenshot). */
  stage?: string;
  /** Renders a live DOM surface over the plane during this project's dwell. */
  surface?: "firat" | "galabau";
  /** Present = ARTWORK MODE: shown complete, at its own format, on open ground. */
  artwork?: ArtworkStage;
};

export const reelComp: Record<string, ReelComp> = {
  // Fight — ARTWORK MODE. A 4:5 poster built around a centred wordmark and a
  // centred figure: cropping it to 16:10 destroyed both. It now arrives
  // full-bleed out of the hero and resolves into its own format. Left of
  // centre, because the artwork is internally symmetrical and the page
  // composition should not be. The open right side carries the plate line.
  "russian-viking": {
    dir: [0.16, 1], wipe: "linear", scale: 1, focus: [0.5, 0.5], amp: 0.85,
    title: "artwork", place: "bl", titleScale: 1,
    artwork: { aspect: 1080 / 1350, fit: 0.78, maxW: 0.46, ax: "gutter", ay: 0.5 },
  },
  // Web — staged as a live responsive experience: the real UI is the subject,
  // the plane only carries Firat's brand atmosphere in and out.
  "firat-nossen": {
    dir: [1, 0.14], wipe: "linear", scale: 1.0, focus: [0.5, 0.5], amp: 0.9,
    title: "meta", place: "br", titleScale: 1,
    dwell: 2.6, stage: "/work/firat-stage.webp", surface: "firat",
  },
  // Fight — ARTWORK MODE. The whole lower 40% of this poster is type: the
  // wordmark, the handwritten signature, the Fightlab mark. All of it used to
  // be cropped away. Set larger than Russian Viking because that signature is
  // hairline script, and hung a little low because the type sits at the foot.
  // Left on the gutter: the fighter and his echo both face right, so the open
  // field is the direction they are looking, and the poster's own empty red
  // quarter stays quietly against the page edge instead of doubling the void.
  "cem-fightlab": {
    dir: [1, 0.12], wipe: "slices", scale: 1, focus: [0.5, 0.5], amp: 0.9,
    title: "artwork", place: "br", titleScale: 1,
    artwork: { aspect: 1080 / 1350, fit: 0.82, maxW: 0.46, ax: "gutter", ay: 0.46, carriesClient: true },
  },
  // Sports design — ARTWORK MODE, mirrored, and for a reason: the club block
  // "#34 | ERZGEBIRGE AUE" is set flush to the poster's own left edge, and the
  // player and the ball both drive left. Pinned left it would be crushed
  // against the page edge and collide with the wordmark above it. Pinned right,
  // the artwork finally has the room its own composition asks for. Smallest of
  // the three: this poster already carries generous margins inside itself.
  "marvin-stefaniak": {
    dir: [1, 0.62], wipe: "linear", scale: 1, focus: [0.5, 0.5], amp: 0.9,
    title: "artwork", place: "bl", titleScale: 1,
    artwork: { aspect: 1080 / 1350, fit: 0.8, maxW: 0.46, ax: "gutter-right", ay: 0.54, carriesClient: true },
  },
  // Poster / event visual — ARTWORK MODE, the same staging as the others. A
  // strictly symmetrical 4:5 piece: the title sits dead centre inside the
  // mouth, the date and the club mark are small type in the two top corners,
  // so it is set as large as Cem for that small type and pinned left on the
  // gutter, with the open right side carrying the plate line.
  "scream-night": {
    dir: [0.2, 1], wipe: "linear", scale: 1, focus: [0.5, 0.5], amp: 0.85,
    title: "artwork", place: "bl", titleScale: 1,
    artwork: { aspect: 1080 / 1350, fit: 0.82, maxW: 0.46, ax: "gutter", ay: 0.5 },
  },
  // Archived — kept only so restoring the project needs no rebuild.
  "cold-smile": { dir: [0, 1], wipe: "radial", scale: 1.12, focus: [0.5, 0.54], amp: 1.05, title: "artwork", place: "bl", titleScale: 1 },
  // Web / visual communication — the paving grid becomes the layout grid.
  "galabau-boettcher": {
    dir: [1, -0.14], wipe: "linear", scale: 1.04, focus: [0.5, 0.56], amp: 0.9,
    title: "meta", place: "br", titleScale: 1,
    dwell: 3.2, stage: "/work/gb-raster.webp", surface: "galabau",
  },
};

const FALLBACK_COMP: ReelComp = {
  dir: [1, 0.2], wipe: "linear", scale: 1, focus: [0.5, 0.5], amp: 1, title: "type", place: "bl", titleScale: 1,
};

export function compOf(slug: string): ReelComp {
  return reelComp[slug] ?? FALLBACK_COMP;
}

/**
 * The published sequence. One list drives the reel, the plate numbers, the
 * keyboard order, the next-project chain and the sitemap, so all of them tell
 * the same story in the same order.
 *
 * 01 RUSSIAN VIKING  — opens straight out of the hero: the same artwork that
 *    fills the headline resolves out of it into its own 4:5 format. Craft is
 *    proven in the first three seconds, and it is the only project that can
 *    hold that hand-off.
 * 02 FIRAT NOSSEN    — the live surface. From "he can draw" to "he can ship".
 * 03 SCREAM NIGHT    — back to a poster after the web work, pinned left: the
 *    pale face and centred red title read at once, and it is kept apart from
 *    CEM so the two red posters never meet.
 * 04 MARVIN STEFANIAK— brightest of the posters, pinned right. The frame
 *    travels across the page here, which is its own small event.
 * 05 CEM             — the darkest and most intense, pinned left. Kept away
 *    from Russian Viking so the two fight posters never echo.
 * 06 GALABAU BÖTTCHER— the close: one client, web and social and communication,
 *    ending on a real before/after. The last thing seen is proof, not a poster.
 *
 * With four posters and two web projects a run of posters is unavoidable, so
 * the run alternates sides (left, right, left) and colour (red, purple, red):
 * no two neighbours share a side or a palette.
 */
export const projectOrder = [
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

/** The reel shows the published sequence — same list, no second ordering. */
export const reelProjects: Project[] = projects;

/** The artwork that fills the hero type and hands off into the reel. */
export const HERO_SLUG = "russian-viking";
export const heroProject = projects.find((p) => p.slug === HERO_SLUG)!;

export const caseStudyProjects = projects.filter((p) => p.caseStudy);

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
