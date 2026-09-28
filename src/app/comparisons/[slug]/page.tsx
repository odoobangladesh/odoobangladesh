import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDoc, listCollectionSlugs } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";

export async function generateStaticParams() {
  const slugs = await listCollectionSlugs("comparisons");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const doc = await getDoc("comparisons", slug);
    return {
      title: doc.title,
      description: doc.description,
      alternates: { canonical: `/comparisons/${slug}` },
      keywords: doc.keywords,
      openGraph: {
        title: doc.title,
        description: doc.description,
        url: `/comparisons/${slug}`,
        type: "article",
      },
    };
  } catch {
    return {};
  }
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let doc: Awaited<ReturnType<typeof getDoc>>;
  try {
    doc = await getDoc("comparisons", slug);
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

      <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 text-sm shadow-sm">
        <div className="font-medium">Decision support</div>
        <div className="mt-3 grid gap-2">
          <Link className="underline underline-offset-4" href="/implementation-guide">
            Implementation guide
          </Link>
          <Link className="underline underline-offset-4" href="/pricing-guide">
            Pricing guide (cost components)
          </Link>
          <Link className="underline underline-offset-4" href="/resources/erp-checklist">
            ERP readiness checklist
          </Link>
          <Link className="underline underline-offset-4" href="/contact">
            Talk to an Odoo specialist
          </Link>
        </div>
      </div>
    </div>
  );
}

