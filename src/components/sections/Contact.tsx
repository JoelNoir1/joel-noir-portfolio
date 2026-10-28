"use client";

import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";

/**
 * CONTACT — the close: one question, one button that opens an email, and the
 * address itself for anyone who would rather copy it. No form: without a
 * backend, a working mail link beats a form that only looks like it sends.
 */
export default function Contact() {
  const { lang } = useLang();
  const c = content[lang].contact;
  const mail = `mailto:${c.email}?subject=${encodeURIComponent(c.subject)}`;

  return (
    <section id="contact" className="jn-sec jn-contact">
      <div className="jn-wrap">
        <span className="label text-muted">{c.eyebrow}</span>

        <div className="jn-contact-grid">
          <div className="jn-contact-ask">
            <h2 className="jn-contact-lead">{c.lead}</h2>
            <p className="jn-contact-body">{c.body}</p>
            <a href={mail} className="jn-btn jn-btn--solid jn-contact-btn">
              {c.cta}
            </a>
          </div>

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
