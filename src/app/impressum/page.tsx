import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false, follow: true },
  alternates: { canonical: "/impressum" },
};

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        Joel Hildebrand
        <br />
        {/* HINWEIS: Für ein geschäftliches Impressum ist eine vollständige
            Anschrift (Straße & Hausnummer) gesetzlich erforderlich.
            Bitte hier ergänzen: */}
        {/* Straße Hausnummer */}
        01683 Nossen
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail:{" "}
        <a href="mailto:joelnoir1.graphics@gmail.com">
          joelnoir1.graphics@gmail.com
        </a>
        <br />
        Instagram:{" "}
        <a
          href="https://instagram.com/joel.noir1"
          target="_blank"
          rel="noopener noreferrer"
        >
          @joel.noir1
        </a>
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>Joel Hildebrand, Anschrift wie oben.</p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter bin ich gemäß § 7 Abs. 1 DDG für eigene Inhalte auf
        diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis
        10 DDG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte
        oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
        forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Dieses Portfolio enthält ggf. Links zu externen Websites Dritter, auf deren
        Inhalte ich keinen Einfluss habe. Für die Inhalte der verlinkten Seiten ist
        stets der jeweilige Anbieter oder Betreiber verantwortlich.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die auf dieser Website gezeigten Arbeiten, Grafiken und Inhalte unterliegen
        dem deutschen Urheberrecht. Eine Vervielfältigung, Bearbeitung oder
        Verwendung außerhalb der Grenzen des Urheberrechts bedarf der vorherigen
        schriftlichen Zustimmung. Abgebildete Marken, Vereins- und Kundenlogos sind
        Eigentum der jeweiligen Rechteinhaber und dienen ausschließlich der
        Werkdokumentation.
      </p>
    </LegalPage>
  );
}
