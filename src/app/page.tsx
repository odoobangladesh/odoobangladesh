import Link from "next/link";
import { AudienceSwitcher } from "@/components/audience-switcher";
import { CompareMatrix } from "@/components/compare-matrix";
import { PortalIndex } from "@/components/portal-index";
import { LandingAtmosphere } from "@/components/landing-atmosphere";
import { LandingHero } from "@/components/landing-hero";
import { LiveCoverage } from "@/components/live-coverage";
import { NewsletterCard } from "@/components/newsletter-card";
import { PackageCta } from "@/components/package-cta";
import { ProcessDiagram } from "@/components/process-diagram";
import { ScrollReveal } from "@/components/scroll-reveal";
import { FeatureRows, LinkTiles } from "@/components/visual-ui";
import { listDocs } from "@/lib/content";
import { packages } from "@/lib/packages";
import {
  HOME_PORTAL_DESTINATIONS,
  withPortalMetrics,
} from "@/lib/portal-destinations";

export default async function Home() {
  const [modules, industries, comparisons, trainingFunctional, trainingTechnical] =
    await Promise.all([
      listDocs("modules"),
      listDocs("industries"),
      listDocs("comparisons"),
      listDocs("training-functional"),
      listDocs("training-technical"),
    ]);

  const trainingCount = trainingFunctional.length + trainingTechnical.length;
  const packageCount = packages.length;
  const resourceCount = (await listDocs("resources")).length;
  const guideCount =
    modules.length +
    industries.length +
    comparisons.length +
    trainingCount +
    resourceCount;
  const portalItems = withPortalMetrics(HOME_PORTAL_DESTINATIONS, {
    "/modules": modules.length,
    "/industries": industries.length,
    "/comparisons": comparisons.length,
    "/training": trainingCount,
    "/resources/erp-checklist": resourceCount,
  });

  return (
    <div className="landing-page">
      <ScrollReveal />
      <LandingHero
        guideCount={guideCount}
        metricHref="/modules"
        metricLabel="published guides"
      />

      <LandingAtmosphere variant="ripple" className="section-y">
        <div data-reveal className="site-container">
          <LiveCoverage
            eyebrow="Live coverage dashboard"
            title="Portal at a glance"
            description="Counters use published collection counts on this site, not marketing estimates. Rings show training split only (not repeated elsewhere)."
            metrics={[
              {
                value: modules.length,
                label: "Module guides",
                href: "/modules",
              },
              {
                value: industries.length,
                label: "Industry playbooks",
                href: "/industries",
              },
              {
                value: trainingCount,
                label: "Training topics",
                href: "/training",
              },
              {
                value: comparisons.length,
                label: "ERP comparisons",
                href: "/comparisons",
              },
              {
                value: packageCount,
                label: "Packages",
                href: "/packages",
              },
              {
                value: resourceCount,
                label: "Resources",
                href: "/resources/erp-checklist",
              },
            ]}
            trackTitle="Training track split"
            tracks={[
              {
                label: "Functional topics",
                value: trainingFunctional.length,
                max: Math.max(trainingCount, 1),
                href: "/training/functional",
              },
              {
                label: "Technical topics",
                value: trainingTechnical.length,
                max: Math.max(trainingCount, 1),
                href: "/training/technical",
              },
            ]}
          />
        </div>
      </LandingAtmosphere>

      <LandingAtmosphere variant="threads" className="section-y">
        <div data-reveal className="site-container">
          <p className="landing-kicker">Motion map</p>
          <h2 className="landing-section-title">How knowledge flows</h2>
          <p className="landing-section-lead">
            A diagram of the portal journey. Same destinations, clearer sequence.
          </p>
          <div className="mt-8">
            <ProcessDiagram
              nodes={[
                {
                  id: "learn",
                  label: "Learn",
                  detail: "Pathways & syllabi",
                  href: "/learning-center",
                  icon: "book",
                },
                {
                  id: "map",
                  label: "Map",
                  detail: "Modules & industries",
                  href: "/modules",
                  icon: "boxes",
                },
                {
                  id: "compare",
                  label: "Compare",
                  detail: "ERP shortlists",
                  href: "/comparisons",
                  icon: "scale",
                },
                {
                  id: "plan",
                  label: "Plan",
                  detail: "Cost & go-live",
                  href: "/implementation-guide",
                  icon: "clipboard",
                },
                {
                  id: "act",
                  label: "Act",
                  detail: "Training or consult",
                  href: "/contact",
                  icon: "rocket",
                },
              ]}
            />
          </div>
        </div>
      </LandingAtmosphere>

      <section className="site-container section-y">
        <div data-reveal>
          <p className="landing-kicker">Portal index</p>
          <h2 className="landing-section-title">Choose a destination</h2>
          <p className="landing-section-lead">
            One path at a time—guides first, consultation when you need it.
          </p>
          <div className="mt-8">
            <PortalIndex
              ariaLabel="Portal destinations"
              items={portalItems}
            />
          </div>
        </div>
      </section>

      <section className="landing-panel section-y">
        <div data-reveal className="site-container">
          <p className="landing-kicker">Quick shortlist</p>
          <h2 className="landing-section-title">
            Odoo vs common alternatives
          </h2>
          <p className="landing-section-lead">
            Visual matrix of themes covered in the comparison guides. Open a
            full page for detail.
          </p>
          <div className="mt-8 overflow-x-auto">
            <CompareMatrix
              columns={["Odoo", "ERPNext", "Tally"]}
              rows={[
                {
                  dimension: "Best when",
                  cells: [
                    { label: "Ops + finance together", tone: "good" },
                    { label: "One free edition", tone: "neutral" },
                    { label: "Books only", tone: "warn" },
                  ],
                },
                {
                  dimension: "Inventory",
                  cells: [
                    { label: "Native modules", tone: "good" },
                    { label: "Native modules", tone: "good" },
                    { label: "Usually external", tone: "warn" },
                  ],
                },
                {
                  dimension: "BD localisation",
                  cells: [
                    { label: "l10n_bd + add-ons", tone: "good" },
                    { label: "Per project", tone: "neutral" },
                    { label: "Familiar books", tone: "neutral" },
                  ],
                },
                {
                  dimension: "Growth path",
                  cells: [
                    { label: "Add modules", tone: "good" },
                    { label: "Extend Frappe", tone: "neutral" },
                    { label: "More workarounds", tone: "warn" },
                  ],
                },
              ]}
              footnote="Summary only. See full guides for licensing, BDT ranges, and Mushak notes."
            />
          </div>
          <div className="shortlist-links">
            <Link href="/odoo-vs-erpnext" className="btn-secondary">
              Odoo vs ERPNext
            </Link>
            <Link href="/comparisons/odoo-vs-tally" className="btn-secondary">
              Odoo vs Tally
            </Link>
            <Link href="/comparisons" className="btn-tertiary">
              All comparisons
            </Link>
          </div>
        </div>
      </section>

      {/* <section className="site-container section-y">
        <div data-reveal>
          <p className="landing-kicker">Start where you are</p>
          <h2 className="landing-section-title">Paths by audience</h2>
          <div className="mt-8">
            <AudienceSwitcher
              tabs={[
                {
                  id: "business",
                  label: "Business",
                  summary:
                    "Owners and managers evaluating Odoo for operations, finance, and industry fit in Bangladesh.",
                  links: [
                    {
                      href: "/implementation-guide",
                      title: "Implementation guide",
                      description:
                        "Planning checklist, timelines, and common pitfalls.",
                      icon: "clipboard",
                    },
                    {
                      href: "/industries",
                      title: "Industry playbooks",
                      description: `${industries.length} sector guides from garments to F&B.`,
                      icon: "layers",
                    },
                    {
                      href: "/packages",
                      title: "Fixed-scope packages",
                      description: `${packageCount} package paths from starter finance to care plans.`,
                      icon: "boxes",
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
                      description: `${trainingFunctional.length} topic tracks with exercises.`,
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
                  id: "developer",
                  label: "Developer",
                  summary:
                    "Technical learners who want deployment, ORM, OWL, and performance guidance for Odoo 17 to 19.",
                  links: [
                    {
                      href: "/training/technical",
                      title: "Technical training",
                      description: `${trainingTechnical.length} topics from deployment to OWL.`,
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
      </section> */}

      <section className="landing-panel section-y">
        <div
          data-reveal
          className="site-container grid gap-10 lg:grid-cols-12 lg:items-start"
        >
          <div className="lg:col-span-5">
            <p className="landing-kicker">Signal brief</p>
            <h2 className="landing-section-title">Stay in the loop</h2>
            <p className="landing-section-lead">
              Practical notes for Bangladesh teams evaluating and operating Odoo.
            </p>
            <div className="mt-6">
              <NewsletterCard />
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="landing-kicker">Principles</p>
            <h2 className="landing-section-title">Community principles</h2>
            <p className="landing-section-lead">
              This site explains Odoo. Consultation is optional.
            </p>
            <div className="mt-6">
              <FeatureRows
                ariaLabel="Community principles"
                items={[
                  {
                    icon: "scale",
                    title:
                      "Neutral guides, with no agency pitch and no aggressive marketing.",
                  },
                  {
                    icon: "book",
                    title: "Resources come first. A consultation is optional.",
                  },
                  {
                    icon: "users",
                    title:
                      "Open to businesses, professionals, students, and developers.",
                  },
                  {
                    icon: "shield",
                    title: "Not affiliated with Odoo S.A.",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="site-container section-y">
        <div data-reveal>
          <p className="landing-kicker">High-intent</p>
          <h2 className="landing-section-title">Popular Odoo pages</h2>
          <p className="landing-section-lead">
            High-intent landings, listed for quick scanning.
          </p>
          <div className="mt-6">
            <LinkTiles
              ariaLabel="Popular Odoo pages"
              items={[
                {
                  href: "/odoo-accounting-bangladesh",
                  title: "Odoo Accounting in Bangladesh",
                  description:
                    "VAT, chart of accounts, and Mushak-aware patterns.",
                  icon: "clipboard",
                },
                {
                  href: "/odoo-for-garments-industry",
                  title: "Odoo for Garments Industry",
                  description:
                    "MRP, quality, and bonded-warehouse context for RMG.",
                  icon: "layers",
                },
                {
                  href: "/odoo-vs-erpnext",
                  title: "Odoo vs ERPNext",
                  description:
                    "Open-source shortlist with Bangladesh localisation notes.",
                  icon: "scale",
                },
                {
                  href: "/comparisons/odoo-vs-tally",
                  title: "Odoo vs Tally",
                  description:
                    "When bookkeeping tools stop scaling and ERP becomes the next step.",
                  icon: "target",
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="site-container pb-[var(--section-y)]">
        <div data-reveal>
          <PackageCta />
        </div>
      </section>
    </div>
  );
}
