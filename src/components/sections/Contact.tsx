"use client";

import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";

export default function Contact() {
  const { lang } = useLang();
  const c = content[lang].contact;

  return (
    <section
      id="contact"
      className="border-t border-line py-[clamp(5rem,13vw,11rem)]"
    >
      <div className="mx-auto max-w-[1500px] px-[clamp(1.25rem,5vw,4rem)]">
        <span className="eyebrow text-flame">{c.eyebrow}</span>

        <Reveal>
          <a
            href={`mailto:${c.email}`}
            data-cursor-hover
            className="mt-6 block"
          >
            <h2 className="display text-[clamp(2.25rem,8.5vw,7.5rem)] text-bone transition-colors duration-300 hover:text-flame">
              {c.title}
            </h2>
          </a>
        </Reveal>

        <div className="mt-[clamp(2.5rem,6vw,5rem)] flex flex-col gap-10 border-t border-line pt-10 md:flex-row md:items-start md:justify-between">
          <p className="max-w-[42ch] text-lg text-ash">{c.body}</p>

          <div className="flex gap-12 font-mono text-sm">
            <div>
              <span className="block text-xs uppercase tracking-widest text-ash">
                {c.emailLabel}
              </span>
              <a
                href={`mailto:${c.email}`}
                data-cursor-hover
                className="mt-2 block text-bone transition-colors hover:text-flame"
              >
                {c.email}
              </a>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-widest text-ash">
                {c.socialLabel}
              </span>
              <a
                href="https://instagram.com/joel.noir1"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="mt-2 block text-bone transition-colors hover:text-flame"
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
