"use client";

import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";

export default function Contact() {
  const { lang } = useLang();
  const c = content[lang].contact;

  return (
    <section
      id="contact"
      className="border-t border-line px-[clamp(1.25rem,5vw,3.5rem)] py-[clamp(4rem,10vw,9rem)]"
    >
      <div className="mx-auto max-w-[1500px]">
        <h2 className="label text-muted">{c.eyebrow}</h2>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <p className="max-w-[42ch] text-lg text-muted">{c.body}</p>
          <div className="flex gap-12 font-mono text-sm">
            <div>
              <span className="label block text-faint">{c.emailLabel}</span>
              <a
                href={`mailto:${c.email}`}
                className="mt-2 block text-ink transition-opacity hover:opacity-55"
              >
                {c.email}
              </a>
            </div>
            <div>
              <span className="label block text-faint">{c.socialLabel}</span>
              <a
                href="https://instagram.com/joel.noir1"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-ink transition-opacity hover:opacity-55"
              >
                {c.social}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
