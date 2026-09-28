import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDoc, listCollectionSlugs } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";

export async function generateStaticParams() {
  const slugs = await listCollectionSlugs("landings");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const doc = await getDoc("landings", slug);
    const canonical = doc.canonical ?? `/landings/${slug}`;
    return {
      title: doc.title,
      description: doc.description,
      alternates: { canonical },
      keywords: doc.keywords,
      openGraph: {
        title: doc.title,
        description: doc.description,
        url: canonical,
        type: "article",
      },
    };
  } catch {
    return {};
  }
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let doc: Awaited<ReturnType<typeof getDoc>>;
  try {
    doc = await getDoc("landings", slug);
  } catch {
    notFound();
  }

  const content = await renderMdx(doc.body);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">{doc.title}</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          {doc.description}
        </p>
      </header>
      <div className="prose prose-zinc mt-8 max-w-none">
        {content}
      </div>
    </div>
  );
}

