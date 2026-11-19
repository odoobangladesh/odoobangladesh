import { Metadata } from "next";
import { PageIntro } from "@/components/visual-ui";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Odoo ERP in Bangladesh: implementation, training, careers, and choosing the right ERP approach.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  {
    q: "Is Odoo available in Bangladesh?",
    a: "Yes. Odoo is used by organizations in Bangladesh across retail, manufacturing, services, and distribution. Success depends on scope, data readiness, training, and implementation approach.",
  },
  {
    q: "Is this website an Odoo company or partner?",
    a: "No. This is a community and learning portal, not an agency website. We can connect you to ecosystem specialists when appropriate, but the primary goal is education and neutral guidance.",
  },
  {
    q: "Which is the best ERP in Bangladesh?",
    a: "“Best” depends on your industry, complexity, and budget. Use the comparisons and checklists to shortlist options based on real workflows and reporting needs.",
  },
  {
    q: "What’s the difference between functional and technical Odoo training?",
    a: "Functional training focuses on business processes, modules, and implementation consulting. Technical training focuses on development (Python, ORM, module building, views, integrations, deployment).",
  },
  {
    q: "How do I start learning Odoo in Bangladesh?",
    a: "Start with the Learning Center and pick a pathway: Functional or Technical. Then follow module/topic pages and build small portfolio projects.",
  },
  {
    q: "How much does Odoo implementation cost in Bangladesh?",
    a: "It varies by scope (modules/users), customization, integrations, data migration, hosting, and training. The pricing guide explains the typical cost components.",
  },
] as const;

function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="site-container section-y">
      <div className="mx-auto max-w-[var(--reading)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(faqJsonLd)}
        />

        <PageIntro
          title="FAQ"
          description="Common questions about Odoo ERP in Bangladesh, training pathways, and career planning."
        />

        <div className="mt-8 grid gap-3">
          {faqs.map((f) => (
            <details key={f.q} className="card-standard p-5">
              <summary className="cursor-pointer text-sm font-semibold text-ink">
                {f.q}
              </summary>
              <p className="mt-3 text-sm leading-6 text-ink-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
