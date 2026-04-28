import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDoc, listCollectionSlugs } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";

export async function generateStaticParams() {
  const slugs = await listCollectionSlugs("industries");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const doc = await getDoc("industries", slug);
    return {
      title: doc.title,
      description: doc.description,
      alternates: { canonical: `/industries/${slug}` },
      keywords: doc.keywords,
    };
  } catch {
    return {};
  }
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let doc: Awaited<ReturnType<typeof getDoc>>;
  try {
    doc = await getDoc("industries", slug);
  } catch {
    notFound();
  }

  const content = await renderMdx(doc.body);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">{doc.title}</h1>
      <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {doc.description}
      </p>
      <div className="prose prose-zinc mt-8 max-w-none dark:prose-invert">
        {content}
      </div>

      <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="font-medium">Related next steps</div>
        <div className="mt-3 grid gap-2">
          <Link className="underline underline-offset-4" href="/modules">
            Explore module pages for scoping
          </Link>
          <Link className="underline underline-offset-4" href="/comparisons">
            Compare Odoo vs other ERP
          </Link>
          <Link className="underline underline-offset-4" href="/resources/erp-checklist">
            Download ERP checklist
          </Link>
          <Link className="underline underline-offset-4" href="/contact">
            Request a free assessment call
          </Link>
        </div>
      </div>
    </div>
  );
}

