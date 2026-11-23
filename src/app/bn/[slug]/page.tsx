import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConsultationBand } from "@/components/consultation-band";
import { JsonLd } from "@/components/json-ld";
import { getBnDoc } from "@/lib/bn-content";
import { BN_MIRRORS, languageAlternates, listBnSlugs } from "@/lib/i18n";
import { renderMdx } from "@/lib/mdx";
import { ogImagePath } from "@/lib/og";
import { breadcrumbList } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return listBnSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getBnDoc(slug);
  if (!doc) return {};
  const image = ogImagePath(doc.title, BN_MIRRORS[slug]?.label ?? "বাংলা");
  const languages = languageAlternates(doc.enPath, slug);
  return {
    title: doc.title,
    description: doc.description,
    alternates: {
      canonical: doc.path,
      languages: {
        en: languages.en,
        bn: languages.bn,
        "x-default": languages.en,
      },
    },
    openGraph: {
      title: doc.title,
      description: doc.description,
      url: doc.path,
      locale: "bn_BD",
      images: [{ url: image, width: 1200, height: 630, alt: doc.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [image],
    },
  };
}

export default async function BanglaMirrorPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const doc = await getBnDoc(slug);
  if (!doc) notFound();
  const content = await renderMdx(doc.body);
  const base = siteConfig.siteUrl.replace(/\/$/, "");

  return (
    <div
      lang="bn"
      className="site-container grid gap-10 py-10 lg:grid-cols-[minmax(0,720px)_240px] lg:justify-center"
    >
      <div className="min-w-0">
        <JsonLd
          data={[
            breadcrumbList([
              { name: "Home", path: "/" },
              { name: "বাংলা", path: "/bn" },
              { name: doc.title, path: doc.path },
            ]),
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: doc.title,
              description: doc.description,
              url: `${base}${doc.path}`,
              inLanguage: "bn",
              isPartOf: { "@type": "WebSite", url: base },
            },
          ]}
        />
        <nav aria-label="Breadcrumb" className="text-xs text-ink-muted">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-ink hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <span>বাংলা</span>
            </li>
          </ol>
        </nav>
        <header className="mt-4">
          <p className="text-xs font-medium text-brand">বাংলা সারাংশ</p>
          <h1 className="mt-2 font-display text-[length:var(--text-h1)] font-bold tracking-[var(--tracking-h1)] text-ink">
            {doc.title}
          </h1>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            {doc.description}
          </p>
          <p className="mt-3 text-xs text-ink-muted">
            সম্পূর্ণ গভীরতা:{" "}
            <Link
              href={doc.enPath}
              className="font-medium text-brand hover:underline"
            >
              English full guide
            </Link>
          </p>
        </header>
        <div className="prose prose-obd mt-8 max-w-none">{content}</div>
        <ConsultationBand
          title="পরামর্শ অনুরোধ করুন"
          description="শিক্ষামূলক পোর্টাল প্রথমে। ব্যবসায়িক আগ্রহ Binary Quest-এ যায়, উৎস odoobangladesh.com।"
          defaultInterest="talk-to-specialist"
        />
      </div>
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-[var(--radius-card)] border border-line bg-surface p-4 text-sm text-ink-muted">
          <div className="font-medium text-ink">ভাষা</div>
          <ul className="mt-3 grid gap-2">
            <li>
              <Link href={doc.enPath} className="hover:text-brand hover:underline">
                English
              </Link>
            </li>
            <li className="text-ink">বাংলা (এই পাতা)</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
