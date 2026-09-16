import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: false, follow: true },
  alternates: { canonical: "/datenschutz" },
};

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutz" updated="Stand: 2026">
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist Joel
        Hildebrand, 01683 Nossen. Kontakt:{" "}
        <a href="mailto:joelnoir1.graphics@gmail.com">
          joelnoir1.graphics@gmail.com
        </a>
        .
      </p>

      <h2>2. Grundsatz</h2>
      <p>
        Der Schutz deiner personenbezogenen Daten ist mir wichtig. Diese Website
        ist bewusst datensparsam aufgebaut: Sie setzt <strong>keine Cookies</strong>{" "}
        zu Marketing- oder Analysezwecken, bindet <strong>keine Tracking-Tools</strong>{" "}
        (z. B. Google Analytics) ein und lädt <strong>keine externen Schriftarten</strong>.
        Alle Schriften werden lokal vom Server ausgeliefert.
      </p>

      <h2>3. Hosting</h2>
      <p>
        Diese Website wird bei der Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA
        91789, USA, gehostet. Beim Aufruf der Seite verarbeitet Vercel technisch
        notwendige Verbindungsdaten (siehe Server-Logfiles), um die Auslieferung der
        Website zu ermöglichen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
        (berechtigtes Interesse an einer sicheren und effizienten Bereitstellung).
        Eine mögliche Datenübermittlung in die USA wird durch entsprechende
        Garantien (u. a. Standardvertragsklauseln nach Art. 46 DSGVO) abgesichert.
      </p>

      <h2>4. Server-Logfiles</h2>
      <p>
        Beim Zugriff auf die Website werden automatisch Informationen erfasst, die
        dein Browser übermittelt. Dazu können gehören: Browsertyp und -version,
        verwendetes Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners,
        Uhrzeit der Serveranfrage sowie die IP-Adresse. Diese Daten dienen der
        technischen Sicherheit und Stabilität und werden nicht mit anderen
        Datenquellen zusammengeführt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
      </p>

      <h2>5. Kontaktaufnahme</h2>
      <p>
        Wenn du mich per E-Mail kontaktierst, werden deine Angaben zur Bearbeitung
        der Anfrage und für mögliche Anschlussfragen verarbeitet. Rechtsgrundlage ist
        Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. lit. f DSGVO
        (berechtigtes Interesse an der Beantwortung). Die Daten werden gelöscht,
        sobald sie nicht mehr benötigt werden und keine gesetzlichen
        Aufbewahrungspflichten entgegenstehen.
      </p>

      <h2>6. Lokale Speicherung (Local Storage)</h2>
      <p>
        Zur Speicherung deiner gewählten Sprache (Deutsch/Englisch) wird ein Eintrag
        im lokalen Speicher deines Browsers abgelegt. Dabei werden keine
        personenbezogenen Daten erhoben oder an den Server übertragen; der Eintrag
        verbleibt ausschließlich auf deinem Gerät und kann jederzeit über die
        Browsereinstellungen gelöscht werden.
      </p>

      <h2>7. Deine Rechte</h2>
      <p>Dir stehen nach der DSGVO folgende Rechte zu:</p>
      <ul>
        <li>Auskunft über die verarbeiteten Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
        <li>Löschung (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
      </ul>
      <p>
        Zudem hast du das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu
        beschweren. Für Sachsen ist dies der Sächsische Datenschutzbeauftragte.
      </p>

      <h2>8. Aktualität</h2>
      <p>
        Diese Datenschutzerklärung wird bei Änderungen der Website oder der
        Rechtslage angepasst.
      </p>
    </LegalPage>
  );
}
