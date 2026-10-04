import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, projectBySlug, plateOf } from "@/lib/projects";
import { caseStudies } from "@/lib/caseStudies";
import ProjectDetail from "@/components/work/ProjectDetail";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) return {};
  /* Only what is certain: the discipline, the name, the year. Any work
     without a confirmed tagline says nothing beyond that (the posters' visual
     cases carry none; the photo series has one, since its title is no name). */
  const factual = `${p.category.de} für ${p.title} aus dem Jahr ${p.year}.`;
  const title = `${p.title} · ${p.client.de}`;
  const description = p.tagline?.de ?? factual;
  const url = `/work/${p.slug}`;
  /* each case shares as itself, not as the home page it would otherwise inherit */
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: "Joel.Noir",
      locale: "de_DE",
      url,
      title: `${title} · Joel.Noir`,
      description,
      images: [{ url: p.image, alt: p.alt?.de ?? p.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · Joel.Noir`,
      description,
      images: [p.image],
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) notFound();

  const study = caseStudies[slug] ?? null;
  const idx = projects.findIndex((x) => x.slug === slug);
  const nextIdx = (idx + 1) % projects.length;
  const next = projects[nextIdx];

  return (
    <ProjectDetail
      project={p}
      study={study}
      next={{
        slug: next.slug,
        title: next.title,
        category: next.category,
        year: next.year,
        /* the plate number the home page gives this work */
        plate: plateOf(next.slug),
      }}
    />
  );
}
