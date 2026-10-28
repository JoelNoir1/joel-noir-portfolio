import type { Metadata } from "next";
import {
  Archivo,
  Fraunces,
  Space_Mono,
  Hanken_Grotesk,
  Rubik,
} from "next/font/google";
import "./globals.css";
import Providers from "./providers";

/* Structural voice: a precise grotesque, used from body to oversized display */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--ff-sans",
  display: "swap",
});

/* Editorial accent: an expressive serif, used sparingly for warmth */
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--ff-serif",
  display: "swap",
});

/* Meta: monospace for labels, numbers and coordinates */
const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--ff-mono",
  display: "swap",
});

/* Firat's own type voices, used only inside the .firat-scope surface so the
   client project renders in its real typography. Fraunces is already loaded
   above and is shared with Firat's display face. */
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--ff-hanken",
  display: "swap",
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["900"],
  style: ["italic"],
  variable: "--ff-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://joel-noir-portfolio.vercel.app"),
  title: {
    default: "Joel.Noir · Fotografie & Design aus Sachsen",
    template: "%s · Joel.Noir",
  },
  description:
    "Club- und Eventfotografie, Sportfotografie und Porträts, dazu Poster, Social-Media-Content, Branding und Webdesign. Joel Hildebrand, Mediengestalter aus Nossen, Sachsen.",
  keywords: [
    "Joel.Noir",
    "Eventfotografie",
    "Clubfotografie",
    "Sportfotografie",
    "Fotograf Dresden",
    "Mediengestalter",
    "Grafikdesign",
    "Webdesign",
  ],
  authors: [{ name: "Joel Hildebrand" }],
  creator: "Joel Hildebrand",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    alternateLocale: "en_US",
    siteName: "Joel.Noir",
    url: "/",
    title: "Joel.Noir · Fotografie & Design",
    description:
      "Club-, Event- und Sportfotografie, Poster, Social-Media-Content und Webdesign. Aus Sachsen.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Ein Künstler am DJ-Pult streckt den Arm über das Publikum, das Handys mit Licht hochhält.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joel.Noir · Fotografie & Design",
    description:
      "Club-, Event- und Sportfotografie, Poster, Social-Media-Content und Webdesign. Aus Sachsen.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${archivo.variable} ${fraunces.variable} ${mono.variable} ${hanken.variable} ${rubik.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
