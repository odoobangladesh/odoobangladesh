import Link from "next/link";
import { Metadata } from "next";
import { PageIntro } from "@/components/visual-ui";

export const metadata: Metadata = {
  title: "Community Forum",
  description:
    "Community Q&A and discussions about Odoo ERP in Bangladesh. Ask questions, share resources, and learn together.",
  alternates: { canonical: "/forum" },
};

export default function ForumPage() {
  return (
    <div className="site-container section-y">
      <PageIntro
        title="Community forum"
        description="Forum features are planned. For now, you can submit your question via the inquiry form and we’ll turn recurring questions into public resources and FAQs."
      />

      <div className="mt-8 card-standard max-w-2xl p-6 text-sm">
        <div className="font-medium text-ink">Ask a question</div>
        <p className="mt-1 text-ink-muted">
          Share your context (industry, module, Odoo version). We’ll respond
          with resources first.
        </p>
        <Link href="/contact" className="btn-primary mt-4">
          Submit a question
        </Link>
      </div>
    </div>
  );
}
