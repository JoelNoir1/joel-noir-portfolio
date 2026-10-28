"use client";

import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";

/**
 * SERVICES — what can be booked, as two short lists. No descriptions, no
 * prices: the work above already shows what each one looks like.
 */
export default function Services() {
  const { lang } = useLang();
  const c = content[lang].services;

  return (
    <section id="services" className="jn-sec jn-services" aria-labelledby="services-title">
      <div className="jn-wrap">
        <h2 id="services-title" className="label text-muted">
          {c.title}
        </h2>
        <div className="jn-services-grid">
          {c.groups.map((g) => (
            <div key={g.name}>
              <h3 className="jn-services-group label">{g.name}</h3>
              <ul className="jn-services-list">
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
