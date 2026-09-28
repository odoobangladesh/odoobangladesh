import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDoc, listCollectionSlugs } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";

export async function generateStaticParams() {
  const slugs = await listCollectionSlugs("resources");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const doc = await getDoc("resources", slug);
    return {
      title: doc.title,
      description: doc.description,
      alternates: { canonical: `/resources/${slug}` },
      keywords: doc.keywords,
    };
  } catch {
    return {};
  }
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let doc: Awaited<ReturnType<typeof getDoc>>;
  try {
    doc = await getDoc("resources", slug);
  } catch {
    notFound();
  }
  const content = await renderMdx(doc.body);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">{doc.title}</h1>
      <p className="mt-2 text-sm leading-6 text-zinc-600">
        {doc.description}
      </p>
      <div className="prose prose-zinc mt-8 max-w-none">
        {content}
      </div>
    </div>
  );
}

