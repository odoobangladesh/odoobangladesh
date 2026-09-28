import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Forum",
  description:
    "Community Q&A and discussions about Odoo ERP in Bangladesh. Ask questions, share resources, and learn together.",
  alternates: { canonical: "/forum" },
};

export default function ForumPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Community forum</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Forum features are planned. For now, you can submit your question via
          the inquiry form and we’ll turn recurring questions into public
          resources and FAQs.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 text-sm shadow-sm">
        <div className="font-medium">Ask a question</div>
        <p className="mt-1 text-zinc-600">
          Share your context (industry, module, Odoo version). We’ll respond
          with resources first.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Submit a question
        </Link>
      </div>
    </div>
  );
}

