import type { Metadata } from "next";
import { MetricStrip } from "@/components/metric-strip";
import { PortalIndex } from "@/components/portal-index";
import { ProcessDiagram } from "@/components/process-diagram";
import { ScrollReveal } from "@/components/scroll-reveal";
import { LinkTiles, PageIntro } from "@/components/visual-ui";
import { listDocs } from "@/lib/content";
import { LEARNING_PORTAL_DESTINATIONS } from "@/lib/portal-destinations";

export const metadata: Metadata = {
  title: "Odoo Learning Center (Bangladesh)",
  description:
    "Learning paths, resources, and guides for Odoo ERP in Bangladesh: functional pathway, technical pathway, implementation, pricing, and career guidance.",
  alternates: { canonical: "/learning-center" },
};

export default async function LearningCenterPage() {
  const [functional, technical, resources] = await Promise.all([
    listDocs("training-functional"),
    listDocs("training-technical"),
    listDocs("resources"),
  ]);

  return (
    <div>
      <ScrollReveal />
      <section className="site-container section-y">
        <div data-reveal>
          <PageIntro
            eyebrow="Learning hub"
            title="Learning Center"
            description="A structured starting point for learning Odoo ERP in Bangladesh: for businesses, professionals, students, and developers."
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
                  value: resources.length,
                  label: "Resource assets",
                  href: "/resources/erp-checklist",
                },
              ]}
            />
          </div>
        </div>

        <div data-reveal className="mt-12">
          <h2 className="font-display text-[length:var(--text-h2)] font-semibold tracking-[var(--tracking-h2)] text-ink">
            Training pathways
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
            Pathway detail lives on the training hub so it is not repeated here.
            Counts below match published topics.
          </p>
          <div className="mt-6">
            <LinkTiles
              ariaLabel="Training pathways"
              items={[
                {
                  href: "/training/functional",
                  title: "Functional pathway",
                  description: `${functional.length} published topics covering processes and core modules.`,
                  icon: "clipboard",
                },
                {
                  href: "/training/technical",
                  title: "Technical pathway",
                  description: `${technical.length} published topics covering development and deployment.`,
                  icon: "wrench",
                },
                {
                  href: "/training",
                  title: "Training hub",
                  description:
                    "Syllabus links, workshops, and career consultation next steps.",
                  icon: "graduation",
                  featured: true,
                },
              ]}
            />
          </div>
        </div>

        <div data-reveal className="mt-12">
          <h2 className="font-display text-[length:var(--text-h2)] font-semibold tracking-[var(--tracking-h2)] text-ink">
            Learning sequence
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
            Diagram of how most learners move through the portal.
          </p>
          <div className="mt-6">
            <ProcessDiagram
              nodes={[
                {
                  id: "path",
                  label: "Pick a path",
                  detail: "Functional or technical",
                  href: "/training",
                  icon: "graduation",
                },
                {
                  id: "guide",
                  label: "Read a guide",
                  detail: "Implementation or pricing",
                  href: "/implementation-guide",
                  icon: "book",
                },
                {
                  id: "practice",
                  label: "Practice",
                  detail: "Syllabus exercises",
                  href: "/resources/functional-syllabus",
                  icon: "listChecks",
                },
                {
                  id: "career",
                  label: "Career map",
                  detail: "Roles & next skills",
                  href: "/odoo-career-guide",
                  icon: "users",
                },
              ]}
            />
          </div>
        </div>

        <div data-reveal className="mt-12">
          <h2 className="font-display text-[length:var(--text-h2)] font-semibold tracking-[var(--tracking-h2)] text-ink">
            Core guides
          </h2>
          <div className="mt-6">
            <PortalIndex
              ariaLabel="Core guides"
              items={LEARNING_PORTAL_DESTINATIONS}
            />
          </div>
        </div>

        <div data-reveal className="mt-12">
          <h2 className="font-display text-lg font-semibold text-ink">
            Explore by topic
          </h2>
          <div className="mt-4">
            <LinkTiles
              ariaLabel="Topic directories"
              items={[
                {
                  href: "/modules",
                  title: "Odoo modules directory",
                  description: "App-by-app Bangladesh notes.",
                  icon: "boxes",
                },
                {
                  href: "/industries",
                  title: "Odoo for industries",
                  description: "Sector playbooks for local operations.",
                  icon: "layers",
                },
                {
                  href: "/comparisons",
                  title: "ERP comparisons",
                  description: "Neutral shortlists for decision meetings.",
                  icon: "scale",
                },
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
