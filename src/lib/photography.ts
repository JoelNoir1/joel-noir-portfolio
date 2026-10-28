/**
 * PHOTOGRAPHY — the public selection.
 *
 * Curated by shoot: at most three frames per event or shoot, each with its own
 * reason to be there (the strongest first), fewer where fewer hold up. Every
 * frame is a finished edit, shown at its own format. Event names appear only
 * where the shoot itself is known; nothing about clients or commissions is
 * claimed. The full reasoning lives in docs/Bildauswahl_*.md.
 *
 * Web versions live in /public/work/photo as `${id}-${width}.jpg`. The
 * originals, the RAW files and every edit stay where they are.
 */
import type { Bi } from "./projects";

export type Photo = {
  id: string;
  /** Pixel size of the finished file: the frame is always shown at w / h. */
  w: number;
  h: number;
  /** Widths that exist as web versions. */
  widths: number[];
  alt: Bi;
  /** The shoot, as a short caption. */
  shoot: string;
};

/** One event or shoot: up to three frames, set as one row. */
export type Shoot = {
  id: string;
  name: string;
  /** Place, only where it is known. */
  place?: string;
  year: string;
  photos: Photo[];
};

export type PhotoSection = {
  id: "events" | "sport";
  title: Bi;
  shoots: Shoot[];
};

const W3 = [960, 1600, 2400];
const V = [1080];

const p = (id: string, w: number, h: number, widths: number[], shoot: string, de: string, en: string): Photo => ({
  id, w, h, widths, shoot, alt: { de, en },
});

const LOCURA = "Locura · 2026";
const RUMBA = "Rumba Latina · Dresden · 2026";
const HANS = "Hans im Club · 2026";
const DSC = "Dresdner SC · Volleyball · 2026";

const locura: Shoot = {
  id: "locura",
  name: "Locura",
  year: "2026",
  photos: [
    /* the strongest: artist and crowd in one picture */
    p("hero-locura", 6000, 4000, W3, LOCURA,
      "Ein Künstler in heller Jacke steht am DJ-Pult und streckt den Arm über das Publikum, das Handys mit Licht hochhält.",
      "An artist in a light jacket stands at the DJ booth, arm stretched out over a crowd holding up phones with their lights on."),
    /* a person at work: the DJ under red lasers and blue light */
    p("locura-dj", 4000, 6000, W3, LOCURA,
      "Ein DJ mit Cap und Brille arbeitet am Pult, über ihm rote Laserstrahlen, dahinter blaues Licht und ein LED-Bildschirm.",
      "A DJ in a cap and glasses works the decks, red laser beams above, blue light and an LED screen behind."),
    /* two guests, close: the emotion of the night */
    p("locura-friends", 4000, 6000, W3, LOCURA,
      "Zwei Gäste umarmen sich auf der Tanzfläche, eine Person lächelt mit geschlossenen Augen in die Kamera, mit Blitz fotografiert.",
      "Two guests embrace on the dance floor, one smiling with eyes closed towards the camera, shot with flash."),
  ],
};

const rumba: Shoot = {
  id: "rumba",
  name: "Rumba Latina",
  place: "Dresden",
  year: "2026",
  /* four, chosen by Joel (28.10.): the DJ as the lead, three moments beneath */
  photos: [
    p("rumba-dj-booth", 6000, 4000, W3, RUMBA,
      "Ein DJ mit Cap legt auf, pinkes und blaues Licht, dahinter eine LED-Wand und eine weiße Lounge.",
      "A DJ in a cap plays a set in pink and blue light, an LED wall and a white lounge behind."),
    p("rumba-red-hair", 4000, 6000, W3, RUMBA,
      "Eine Person mit langen Haaren tanzt im roten Licht, von der Seite fotografiert.",
      "A person with long hair dances in red light, seen from the side."),
    p("rumba-decks", 4000, 6000, W3, RUMBA,
      "Ein Gast beugt sich lachend über das DJ-Pult, alles in rotes Licht getaucht.",
      "A guest leans over the DJ decks, laughing, everything bathed in red light."),
    p("rumba-glance", 4000, 6000, W3, RUMBA,
      "Gäste im gedämpften Clublicht, eine Person mit blonden Haaren blickt zur Seite.",
      "Guests in dim club light, a person with blond hair glancing to the side."),
  ],
};

const hans: Shoot = {
  id: "hans",
  name: "Hans im Club",
  year: "2026",
  photos: [
    p("hans-asto", 3726, 4658, W3, HANS,
      "Porträt von ASTO in einem Club: Sonnenbrille mit orangefarbenen Gläsern, Cap nach hinten, die tätowierten Arme verschränkt.",
      "Portrait of ASTO in a club: orange-tinted sunglasses, cap worn backwards, tattooed arms crossed."),
    p("hans-laugh", 3856, 4820, W3, HANS,
      "Eine lachende Person in weißem Tanktop mit Halsketten, die Faust vor der Brust, ein Glas in der Hand, vor einer roten Wand.",
      "A laughing person in a white tank top and chains, fist raised to the chest, a glass in hand, in front of a red wall."),
    p("hans-dj-red", 3592, 4489, W3, HANS,
      "Ein DJ in Lederjacke am Pult, das Gesicht in rotes Licht getaucht, die Hände an den Reglern.",
      "A DJ in a leather jacket at the decks, face lit red, hands on the controls."),
  ],
};

const dsc: Shoot = {
  id: "dsc",
  name: "Dresdner SC",
  place: "Volleyball",
  year: "2026",
  /* four, chosen by Joel (28.10.): game, a creative frame, the fans, the team */
  photos: [
    p("volley-block", 1080, 1350, V, DSC,
      "Angriff über den Block: Die Nummer 15 schlägt am Netz, drei Gegenspielerinnen springen dagegen.",
      "An attack over the block: number 15 hits at the net as three opponents jump against it."),
    p("volley-net", 1080, 1350, V, DSC,
      "Schwarz-Weiß-Aufnahme durch das Netz: eine Spielerin mit der Nummer 2, konzentriert, im Hintergrund die Tribüne.",
      "Black and white, shot through the net: a player wearing number 2, focused, the stands behind."),
    p("volley-fans", 1080, 1350, V, DSC,
      "Eine große Fahne mit der Aufschrift DSC Fans Dresden weht über der Fankurve im dunklen Hallenlicht.",
      "A large flag reading DSC Fans Dresden waves above the supporters' stand in the dark hall."),
    p("volley-team", 1080, 1350, V, DSC,
      "Das Team feiert im Kreis, Arme in der Luft, alle lachen.",
      "The team celebrates in a circle, arms in the air, everyone laughing."),
  ],
};

export const photoSections: PhotoSection[] = [
  { id: "events", title: { de: "Club & Events", en: "Club & Events" }, shoots: [locura, rumba, hans] },
  { id: "sport", title: { de: "Sport", en: "Sport" }, shoots: [dsc] },
];

/** All frames in reading order: the order the lightbox steps through. */
export const allPhotos: Photo[] = photoSections.flatMap((s) => s.shoots.flatMap((sh) => sh.photos));

export const srcOf = (ph: Photo, w: number) => `/work/photo/${ph.id}-${w}.jpg`;
export const srcSetOf = (ph: Photo) => ph.widths.map((w) => `${srcOf(ph, w)} ${w}w`).join(", ");
