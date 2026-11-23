import type { Metadata } from "next";
import Link from "next/link";
import { listBnDocs } from "@/lib/bn-content";
import { BN_MIRRORS } from "@/lib/i18n";
import { PageIntro } from "@/components/visual-ui";

export const metadata: Metadata = {
  title: "বাংলা গাইডসমূহ | Odoo Bangladesh",
  description:
    "ওডু বাংলাদেশের প্রথম বাংলা সারাংশ পাতা—মূল্য, বাস্তবায়ন খরচ, অ্যাকাউন্টিং, গার্মেন্টস ও ট্যালি তুলনা।",
  alternates: { canonical: "/bn" },
};

export default async function BanglaIndexPage() {
  const docs = await listBnDocs();

  return (
    <div lang="bn" className="site-container section-y">
      <PageIntro
        eyebrow="বাংলা সারাংশ"
        title="বাংলায় ওডু গাইড"
        description="প্রথম অর্থবহ পাতাগুলোর বাংলা সারাংশ। সম্পূর্ণ গভীরতা ও কর/মূল্য দাবির জন্য ইংরেজি গাইড দেখুন।"
      />
      <ul className="mt-10 grid gap-0 border-t border-line">
        {docs.map((doc) => (
          <li key={doc.slug} className="border-b border-line py-5">
            <Link
              href={doc.path}
              className="group flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <span className="font-display text-lg font-semibold text-ink group-hover:text-brand">
                {doc.title}
              </span>
              <span className="text-xs text-ink-muted">
                {BN_MIRRORS[doc.slug]?.label ?? "গাইড"}
              </span>
            </Link>
            <p className="mt-1 max-w-2xl text-sm text-ink-muted">
              {doc.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
