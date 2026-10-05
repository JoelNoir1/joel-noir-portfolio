"use client";

import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";

/**
 * CONTACT — the close of the page: what can be asked for, and the address to
 * write to, set as the one large line of the section. Who it reaches beneath.
 */
export default function Contact() {
  const { lang } = useLang();
  const c = content[lang].contact;

  return (
    <section id="contact" className="jn-sec jn-contact">
      <div className="jn-wrap">
        <h2 className="label text-muted">{c.eyebrow}</h2>

        <div className="jn-contact-grid">
          <p className="jn-contact-body">{c.body}</p>

          <div className="jn-contact-reach">
            <span className="label block text-muted">{c.emailLabel}</span>
            <a href={`mailto:${c.email}`} className="jn-contact-mail">
              {c.email}
              <i className="jn-plate-rule" aria-hidden="true" />
            </a>
            <div className="jn-contact-meta label">
              <span>
                <span className="text-muted">{c.socialLabel}</span>{" "}
                <a
                  href="https://instagram.com/joel.noir1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink transition-opacity hover:opacity-60"
                >
                  {c.social}
                </a>
              </span>
              <span className="text-muted">{c.who}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
