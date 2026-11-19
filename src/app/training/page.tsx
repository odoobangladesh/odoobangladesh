import type { Metadata } from "next";
import { ContinueExploring } from "@/components/continue-exploring";
import { DualTrack } from "@/components/compare-matrix";
import { MetricStrip } from "@/components/metric-strip";
import { ProcessDiagram } from "@/components/process-diagram";
import { ScrollReveal } from "@/components/scroll-reveal";
import { LinkTiles, PageIntro } from "@/components/visual-ui";
import { listDocs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Odoo Training Bangladesh",
  description:
    "Community-led Odoo Functional & Technical training pathways in Bangladesh: syllabus, workshops, batch calendar, and career consultation.",
  alternates: { canonical: "/training" },
};

export default async function TrainingIndexPage() {
  const [functional, technical] = await Promise.all([
    listDocs("training-functional"),
    listDocs("training-technical"),
  ]);

  return (
    <div>
      <ScrollReveal />
      <section className="site-container section-y">
        <div data-reveal>
          <PageIntro
            eyebrow="Training hub"
            title="Odoo Training (Bangladesh)"
            description="Choose a pathway: Functional (business processes + modules) or Technical (development + customization). This portal focuses on learning outcomes, roadmaps, and community support."
          />
          <div className="mt-8">
            <MetricStrip
              items={[
                {
                  value: functional.length,
                  label: "Functional topics",
                  href: "/training/functional",
                },
                {
                  value: technical.length,
                  label: "Technical topics",
                  href: "/training/technical",
                },
                {
                  value: functional.length + technical.length,
                  label: "Total published topics",
                  href: "/learning-center",
                },
              ]}
            />
          </div>
        </div>

        <div data-reveal className="mt-12">
          <DualTrack
            left={{
              title: "Functional Training",
              href: "/training/functional",
              body: (
                <>
                  Sales, CRM, Purchase, Inventory, Accounting, Manufacturing, HR,
                  POS, Project, plus business process analysis and consulting
                  skills.{" "}
                  <strong className="font-semibold text-ink">
                    {functional.length} topics
                  </strong>
                  .
                </>
              ),
            }}
            right={{
              title: "Technical Training",
              href: "/training/technical",
              body: (
                <>
                  Python for Odoo, ORM, module development, XML/QWeb, API
                  integrations, OWL, deployment, Docker, and performance.{" "}
                  <strong className="font-semibold text-ink">
                    {technical.length} topics
                  </strong>
                  .
                </>
              ),
            }}
          />
        </div>

        <div data-reveal className="mt-12">
          <h2 className="font-display text-[length:var(--text-h2)] font-semibold tracking-[var(--tracking-h2)] text-ink">
            From syllabus to practice
          </h2>
          <div className="mt-6">
            <ProcessDiagram
              nodes={[
                {
                  id: "syllabus",
                  label: "Syllabus",
                  detail: "Session outline",
                  href: "/resources/functional-syllabus",
                  icon: "listChecks",
                },
                {
                  id: "topics",
                  label: "Topics",
                  detail: "Module deep-dives",
                  href: "/training/functional",
                  icon: "book",
                },
                {
                  id: "events",
                  label: "Workshops",
                  detail: "Community sessions",
                  href: "/events",
                  icon: "graduation",
                },
                {
                  id: "consult",
                  label: "Career talk",
                  detail: "Personal roadmap",
                  href: "/contact",
                  icon: "users",
                },
              ]}
            />
          </div>
        </div>

        <div data-reveal className="mt-12">
          <LinkTiles
            ariaLabel="Training next steps"
            items={[
              {
                href: "/resources/erp-checklist",
                title: "Download ERP checklist",
                description:
                  "A planning checklist for implementations and learning.",
                icon: "listChecks",
              },
              {
                href: "/contact",
                title: "Book a free career consultation",
                description:
                  "Get a roadmap based on your background and goals.",
                icon: "users",
              },
              {
                href: "/events",
                title: "Workshops & webinars",
                description:
                  "Register for free sessions and community learning events.",
                icon: "graduation",
              },
            ]}
          />
        </div>

        <ContinueExploring excludeHref="/training" />
      </section>
    </div>
  );
}
