"use client";

import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";

/* The one public profile link, already used on the Impressum page. A WhatsApp
   button (wa.me) needs a phone number on the page, so it stays out until that
   number is cleared for publication; until then WhatsApp is reached through
   the button on the Instagram profile. */
const INSTAGRAM_URL = "https://instagram.com/joel.noir1";

/**
 * CONTACT — the close, on the hero's dark ground so the page ends where it
 * began. One invitation, two ways in (Instagram first, email for anything
 * formal), what a first message needs, how pricing works, and who the work is
 * for. No form: without a backend that stores and protects the data, a link
 * to a real inbox beats a form that only looks like it sends.
 */
export default function Contact() {
  const { lang } = useLang();
  const c = content[lang].contact;
  const mail = `mailto:${c.email}?subject=${encodeURIComponent(c.subject)}`;

  return (
    <section id="contact" className="jn-sec jn-contact" aria-labelledby="contact-title">
      <div className="jn-wrap">
        <span className="label jn-contact-dim">{c.eyebrow}</span>

        <div className="jn-contact-grid">
          <div className="jn-contact-ask">
            <h2 id="contact-title" className="jn-contact-lead">
              {c.lead}
            </h2>
            <p className="jn-contact-body">{c.body}</p>
            <div className="jn-contact-ctas">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={c.ctaAria}
                className="jn-btn jn-btn--solid"
              >
                {c.cta}
              </a>
              <a href={mail} className="jn-btn">
                {c.mailCta}
              </a>
            </div>
            <p className="jn-contact-note">{c.whatsapp}</p>
          </div>

          <div className="jn-contact-side">
            <div>
              <h3 className="label jn-contact-dim">{c.briefLabel}</h3>
              <ol className="jn-contact-brief">
                {c.brief.map((item, i) => (
                  <li key={item}>
                    <span className="label jn-contact-dim" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className="label jn-contact-dim">{c.priceLabel}</h3>
              <p className="jn-contact-price">{c.price}</p>
            </div>
          </div>
        </div>

        <div className="jn-contact-for">
          <h3 className="label jn-contact-dim">{c.forLabel}</h3>
          <ul className="jn-contact-audiences">
            {c.audiences.map((a) => (
              <li key={a.name}>
                <span className="jn-contact-aud-name">{a.name}</span>
                <span className="jn-contact-aud-items">{a.items.join(" · ")}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="jn-contact-reach">
          <div>
            <span className="label block jn-contact-dim">{c.emailLabel}</span>
            <a href={`mailto:${c.email}`} className="jn-contact-mail">
              {c.email}
              <i className="jn-plate-rule" aria-hidden="true" />
            </a>
          </div>
          <div className="jn-contact-meta label">
            <span>
              <span className="jn-contact-dim">{c.socialLabel}</span>{" "}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-60"
              >
                {c.social}
              </a>
            </span>
            <span className="jn-contact-dim">{c.who}</span>
            <span className="jn-contact-dim">{c.area}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
