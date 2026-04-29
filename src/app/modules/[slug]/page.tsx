import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getDoc, importMdxBySlug, listDocs } from "@/lib/content";

export async function generateStaticParams() {
  return listDocs("modules").map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc("modules", slug);
  if (!doc) return buildMetadata({ title: "Not found", pathname: `/modules/${slug}`, noIndex: true });

  return buildMetadata({
    title: doc.title,
    description: doc.description,
    pathname: doc.canonicalPath,
  });
}

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc("modules", slug);
  if (!doc) notFound();

  const mod = await importMdxBySlug("modules", slug);
  const Content = mod.default;

  return (
    <div className="ob-container ob-section">
      <div className="max-w-3xl">
        <div className="text-sm text-[color:var(--color-muted)]">Module</div>
        <h1 className="ob-h1 mt-3">{doc.title}</h1>
        {doc.description ? <p className="ob-lead mt-4">{doc.description}</p> : null}
        <article className="mt-10">
          <Content />
        </article>
      </div>
    </div>
  );
}

