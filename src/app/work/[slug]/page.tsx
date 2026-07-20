import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { caseStudyDetails } from "@/lib/caseStudies";
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
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.client}`,
    description: project.tagline.de,
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const detail = caseStudyDetails[slug] ?? null;
  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <ProjectDetail
      project={project}
      detail={detail}
      next={{ slug: next.slug, title: next.title }}
    />
  );
}
