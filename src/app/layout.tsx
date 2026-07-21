import type { Metadata } from "next";
import { Archivo, Manrope, Space_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

/* Display: broad, editorial grotesk for oversized headlines */
const display = Archivo({
  subsets: ["latin"],
  variable: "--ff-display",
  display: "swap",
});

/* Text: clean humanist grotesk for body & UI */
const sans = Manrope({
  subsets: ["latin"],
  variable: "--ff-sans",
  display: "swap",
});

/* Meta: monospace for labels, numbers, coordinates */
const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--ff-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://joelnoir.com"),
  title: {
    default: "Joel.Noir · Creative Design & Art Direction",
    template: "%s · Joel.Noir",
  },
  description:
    "Joel.Noir ist Creative Designer & Art Director. Editorial, cinematisch, kompromisslos. Sport, Fight, Event, Branding und Motion Design auf Studio-Niveau.",
  keywords: [
    "Joel.Noir",
    "Creative Designer",
    "Art Director",
    "Sports Design",
    "Fight Design",
    "Grafikdesign",
    "Portfolio",
  ],
  authors: [{ name: "Joel.Noir" }],
  creator: "Joel.Noir",
  openGraph: {
    type: "website",
    locale: "de_DE",
    alternateLocale: "en_US",
    siteName: "Joel.Noir",
    title: "Joel.Noir · Creative Design & Art Direction",
    description:
      "Editorial, cinematisch, kompromisslos. Sport, Fight, Event, Branding und Motion Design auf Studio-Niveau.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Joel.Noir" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joel.Noir · Creative Design & Art Direction",
    description:
      "Editorial, cinematisch, kompromisslos. Sport, Fight, Event, Branding und Motion Design auf Studio-Niveau.",
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
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
