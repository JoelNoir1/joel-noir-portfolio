import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

/* the site's own plain page instead of the framework's default 404 */
export default function NotFound() {
  return (
    <LegalPage title="404">
      <p>
        Diese Seite gibt es nicht. <Link href="/">Zur Startseite</Link>
      </p>
    </LegalPage>
  );
}
