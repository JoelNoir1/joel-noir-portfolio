import type { Metadata } from "next";
import {
  Archivo,
  Fraunces,
  Space_Mono,
  Hanken_Grotesk,
  Rubik,
  Manrope,
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

/* Galabau's own display face, used only inside .galabau-scope. */
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--ff-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://joel-noir-portfolio.vercel.app"),
  title: {
    default: "Joel.Noir · Mediengestalter",
    template: "%s · Joel.Noir",
  },
  description:
    "Joel.Noir, Mediengestalter aus Nossen. Graphic & Sports Design, Branding, Social Media und Webdesign.",
  keywords: ["Joel.Noir", "Mediengestalter", "Sports Design", "Graphic Design", "Webdesign"],
  authors: [{ name: "Joel Hildebrand" }],
  creator: "Joel Hildebrand",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    alternateLocale: "en_US",
    siteName: "Joel.Noir",
    url: "/",
    title: "Joel.Noir · Mediengestalter",
    description:
      "Mediengestalter aus Nossen. Graphic & Sports Design, Branding, Social Media und Webdesign.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Joel.Noir" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joel.Noir · Mediengestalter",
    description:
      "Mediengestalter aus Nossen. Graphic & Sports Design, Branding, Social Media und Webdesign.",
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
      className={`${archivo.variable} ${fraunces.variable} ${mono.variable} ${hanken.variable} ${rubik.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
