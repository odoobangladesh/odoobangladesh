import type { Metadata } from "next";
import Link from "next/link";
import { AudienceSwitcher } from "@/components/audience-switcher";
import { HubCatalog, type HubCatalogItem } from "@/components/hub-catalog";
import { MetricStrip } from "@/components/metric-strip";
import { NewsletterCard } from "@/components/newsletter-card";
import { PortalIndex } from "@/components/portal-index";
import { ProcessDiagram } from "@/components/process-diagram";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TrustHighlights } from "@/components/trust-highlights";
import { LinkTiles, PageIntro } from "@/components/visual-ui";
import {
  COLLECTION_META,
  COLLECTIONS,
  listAllDocs,
  listDocs,
  type Collection,
} from "@/lib/content";
import { LEARNING_PORTAL_DESTINATIONS } from "@/lib/portal-destinations";

export const metadata: Metadata = {
  title: "Odoo Learning Center (Bangladesh)",
  description:
    "Learning paths, resources, and guides for Odoo ERP in Bangladesh: functional pathway, technical pathway, implementation, pricing, and career guidance.",
  alternates: { canonical: "/learning-center" },
};

const HUB_COLLECTIONS: Collection[] = [
  "blog",
  "landings",
  "modules",
  "industries",
  "comparisons",
  "training-functional",
  "training-technical",
  "resources",
];

export default async function LearningCenterPage() {
  const [functional, technical, resources, blog, industries, allDocs] =
    await Promise.all([
      listDocs("training-functional"),
      listDocs("training-technical"),
      listDocs("resources"),
      listDocs("blog"),
      listDocs("industries"),
      listAllDocs(),
    ]);

  const catalogItems: HubCatalogItem[] = allDocs
    .filter((doc) => HUB_COLLECTIONS.includes(doc.collection))
    .map((doc) => ({
      path: doc.path,
      title: doc.title,
      description: doc.description,
      collection: doc.collection,
      collectionLabel: COLLECTION_META[doc.collection].label,
      keywords: doc.keywords ?? [],
      date: doc.date,
    }));

  const catalogCollections = COLLECTIONS.filter((id) =>
    HUB_COLLECTIONS.includes(id),
  ).map((id) => ({
    id,
    label: COLLECTION_META[id].label,
  }));

  const latestBlog = blog.slice(0, 3);

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
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/training/functional" className="btn-primary">
              Start functional path
            </Link>
            <Link href="#browse-catalog" className="btn-secondary">
              Browse all resources
            </Link>
          </div>
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
                  href: "/resources",
                },
                {
                  value: catalogItems.length,
                  label: "Published guides",
                },
              ]}
            />
          </div>
        </div>

        <div data-reveal className="mt-12">
          <h2 className="font-display text-[length:var(--text-h2)] font-semibold tracking-[var(--tracking-h2)] text-ink">
            Start where you are
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
            Pick an audience to see two or three clear next steps—not the whole
            catalog at once.
          </p>
          <div className="mt-6">
            <AudienceSwitcher
              tabs={[
                {
                  id: "business",
                  label: "Business",
                  summary:
                    "Owners and managers evaluating Odoo for operations, cost, and industry fit in Bangladesh.",
                  links: [
                    {
                      href: "/implementation-guide",
                      title: "Implementation guide",
                      description:
                        "Planning checklist, timelines, and common pitfalls.",
                      icon: "clipboard",
                    },
                    {
                      href: "/pricing-guide",
                      title: "Pricing guide",
                      description:
                        "What drives total cost before you request a quote.",
                      icon: "scale",
                    },
                    {
                      href: "/industries",
                      title: "Industry playbooks",
                      description: `${industries.length} sector guides from garments to F&B.`,
                      icon: "layers",
                    },
                  ],
                },
                {
                  id: "professional",
                  label: "Professional",
                  summary:
                    "Functional consultants and career switchers building Odoo skills for the Bangladesh market.",
                  links: [
                    {
                      href: "/odoo-career-guide",
                      title: "Career guide",
                      description:
                        "Functional vs technical paths and what employers look for.",
                      icon: "users",
                    },
                    {
                      href: "/training/functional",
                      title: "Functional training",
                      description: `${functional.length} topic tracks with exercises.`,
                      icon: "graduation",
                    },
                    {
                      href: "/resources/functional-syllabus",
                      title: "Functional syllabus",
                      description: "Session outline you can take to a trainer.",
                      icon: "listChecks",
                    },
                  ],
                },
                {
                  id: "student",
                  label: "Student",
                  summary:
                    "Learners building a first portfolio and deciding between functional and technical tracks.",
                  links: [
                    {
                      href: "/training",
                      title: "Training hub",
                      description:
                        "Syllabus links, workshops, and career consultation next steps.",
                      icon: "graduation",
                    },
                    {
                      href: "/odoo-career-guide",
                      title: "Career path guide",
                      description:
                        "Role map, skills checklist, and interview prep.",
                      icon: "users",
                    },
                    {
                      href: "/resources/erp-checklist",
                      title: "ERP readiness checklist",
                      description:
                        "Free planning asset—email unlocks it once on this device.",
                      icon: "clipboard",
                    },
                  ],
                },
                {
                  id: "developer",
                  label: "Developer",
                  summary:
                    "Technical learners who want deployment, ORM, OWL, and performance guidance for Odoo 17 to 19.",
                  links: [
                    {
                      href: "/training/technical",
                      title: "Technical training",
                      description: `${technical.length} topics from deployment to OWL.`,
                      icon: "wrench",
                    },
                    {
                      href: "/developer-resources",
                      title: "Developer resources",
                      description: "Tooling and references for local builds.",
                      icon: "gitBranch",
                    },
                    {
                      href: "/resources/technical-syllabus",
                      title: "Technical syllabus",
                      description: "Ordered practice path for module work.",
                      icon: "book",
                    },
                  ],
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
            How most learners move through the portal after they pick a path.
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

        <div data-reveal className="mt-12" id="browse-catalog">
          <h2 className="font-display text-[length:var(--text-h2)] font-semibold tracking-[var(--tracking-h2)] text-ink">
            Browse all resources
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
            Filter the full published catalog by category or keyword.
          </p>
          <div className="mt-6">
            <HubCatalog
              items={catalogItems}
              collections={catalogCollections}
            />
          </div>
        </div>

        <div data-reveal className="mt-12">
          <h2 className="font-display text-[length:var(--text-h2)] font-semibold tracking-[var(--tracking-h2)] text-ink">
            Explore by topic
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
            Directories for module, industry, comparison, and downloadable
            assets.
          </p>
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
                {
                  href: "/resources",
                  title: "Resource downloads",
                  description: `${resources.length} checklists and syllabi.`,
                  icon: "listChecks",
                },
              ]}
            />
          </div>
        </div>

        {latestBlog.length > 0 ? (
          <div data-reveal className="mt-12">
            <h2 className="font-display text-[length:var(--text-h2)] font-semibold tracking-[var(--tracking-h2)] text-ink">
              Latest from the blog
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
              Longer-form articles for implementation and career readers.
            </p>
            <ul className="directory-list directory-list-1 mt-6">
              {latestBlog.map((post) => (
                <li key={post.slug}>
                  <Link href={post.path} className="directory-row group">
                    <span className="directory-row-copy min-w-0">
                      <span className="directory-row-title">
                        {post.title}
                        {post.date ? (
                          <span className="directory-row-meta">{post.date}</span>
                        ) : null}
                      </span>
                      <span className="directory-row-desc">
                        {post.description}
                      </span>
                    </span>
                    <span className="directory-row-chevron" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div data-reveal className="mt-12">
          <TrustHighlights />
        </div>

        <div
          data-reveal
          className="mt-12 grid gap-8 md:grid-cols-2 md:items-start"
        >
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">
              Stay updated
            </h2>
            <p className="mt-2 text-sm leading-6 text-ink-muted">
              Get learning resources, training events, and implementation notes.
            </p>
          </div>
          <NewsletterCard />
        </div>
      </section>
    </div>
  );
}
