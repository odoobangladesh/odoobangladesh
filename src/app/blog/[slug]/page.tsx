import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDoc, listCollectionSlugs } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";

export async function generateStaticParams() {
  const slugs = await listCollectionSlugs("blog");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getDoc("blog", slug);
    return {
      title: post.title,
      description: post.description,
      alternates: { canonical: `/blog/${slug}` },
      keywords: post.keywords,
      openGraph: {
        title: post.title,
        description: post.description,
        url: `/blog/${slug}`,
        type: "article",
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post: Awaited<ReturnType<typeof getDoc>>;
  try {
    post = await getDoc("blog", slug);
  } catch {
    notFound();
  }

  const content = await renderMdx(post.body);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          {post.description}
        </p>
        {post.date ? (
          <p className="mt-3 text-xs text-zinc-500">Updated: {post.date}</p>
        ) : null}
      </header>
      <div className="prose prose-zinc mt-8 max-w-none">
        {content}
      </div>
    </article>
  );
}

