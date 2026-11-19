import Link from "next/link";
import { Metadata } from "next";
import { DonutChart, GroupedBars } from "@/components/charts";
import { RangeBars } from "@/components/range-bars";
import { ScrollReveal } from "@/components/scroll-reveal";
import {
  FeatureRows,
  InfoTiles,
  PageIntro,
  StepRail,
} from "@/components/visual-ui";

export const metadata: Metadata = {
  title: "Odoo Pricing Guide (Bangladesh)",
  description:
    "Community pricing guide for Odoo in Bangladesh: what affects total cost including implementation, customization, hosting, training, and support.",
  alternates: { canonical: "/pricing-guide" },
};

export default function PricingGuidePage() {
  return (
    <div>
      <ScrollReveal />
      <div className="site-container section-y">
      <div className="mx-auto max-w-[var(--reading)]">
        <div data-reveal>
        <PageIntro
          title="Odoo pricing guide (Bangladesh)"
          description="A neutral way to think about total cost before anyone sends a quotation. This page does not publish prices, and this portal is not affiliated with Odoo S.A."
        />
        </div>

        <section className="mt-10 card-standard p-6">
          <h2 className="font-display text-lg font-semibold text-ink">
            What this page is for
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            Teams usually ask for “the price of Odoo” before they have named a
            first release. The number that matters is the cost of that release:
            the people, the data, the apps, and the change, not a single license
            line. Use this with the{" "}
            <Link className="btn-tertiary" href="/implementation-guide">
              implementation guide
            </Link>{" "}
            and the{" "}
            <Link className="btn-tertiary" href="/resources/erp-checklist">
              ERP readiness checklist
            </Link>
            .
          </p>
        </section>

        <section id="components" className="mt-10">
          <h2 className="font-display text-lg font-semibold text-ink md:text-xl">
            Cost components
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            Treat each line as a question to answer, not as a fee this site
            charges.
          </p>
          <div className="mt-5">
            <InfoTiles
              ariaLabel="Cost components"
              items={[
                {
                  icon: "target",
                  title: "Scope",
                  description: (
                    <>
                      Users, departments, and the workflows that must work on
                      day one. A garments factory, a retailer, and a services
                      firm do not buy the same first release. Start from{" "}
                      <Link className="btn-tertiary" href="/industries">
                        industry pages
                      </Link>{" "}
                      and the{" "}
                      <Link className="btn-tertiary" href="/modules">
                        modules directory
                      </Link>
                      .
                    </>
                  ),
                },
                {
                  icon: "layers",
                  title: "Edition and apps",
                  description:
                    "Some setups use an edition with a subscription, and some do not. Confirm what is included before comparing two proposals. This guide does not list official rates.",
                },
                {
                  icon: "settings",
                  title: "Configuration versus customization",
                  description:
                    "Settings are cheaper to keep than custom code. Customization becomes a lasting cost when someone must test and upgrade it.",
                },
                {
                  icon: "plug",
                  title: "Integrations",
                  description:
                    "Bank feeds, eCommerce, logistics, and payment providers are separate from the first apps. Decide which ones wait.",
                },
                {
                  icon: "database",
                  title: "Data",
                  description: (
                    <>
                      Cleaning products, partners, and the chart of accounts
                      often takes longer than installing the software. See{" "}
                      <Link
                        className="btn-tertiary"
                        href="/implementation-guide#data"
                      >
                        data readiness
                      </Link>
                      .
                    </>
                  ),
                },
                {
                  icon: "lifeBuoy",
                  title: "Hosting and care",
                  description:
                    "Cloud or on-prem, backups, monitoring, and who applies updates.",
                },
                {
                  icon: "graduation",
                  title: "Learning",
                  description: (
                    <>
                      Role-based training and the time people spend in testing.
                      Pathways are on the{" "}
                      <Link className="btn-tertiary" href="/training">
                        training page
                      </Link>
                      .
                    </>
                  ),
                },
              ]}
            />
          </div>
        </section>

        <section data-reveal className="mt-10">
          <h2 className="font-display text-lg font-semibold text-ink md:text-xl">
            Community-observed first-phase bands
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            Relative ranges used across this portal (not quotes). Scale is BDT
            lakh; the diagram stops at about 1 crore for manufacturing-heavy
            first releases. Confirm regional licence prices on odoo.com/pricing.
          </p>
          <div className="mt-5">
            <RangeBars
              unitLabel="lakh BDT"
              maxScale={100}
              ariaLabel="Community-observed implementation cost bands in lakh BDT"
              items={[
                {
                  label: "Small SME (2–5 users, 3–6 apps)",
                  low: 3,
                  high: 8,
                  hint: "Trading or services starting with finance and sales.",
                  href: "/packages/starter",
                },
                {
                  label: "Mid-size (10–30 users, customisation)",
                  low: 8,
                  high: 25,
                  hint: "Multi-warehouse or multi-department first releases.",
                  href: "/packages/business",
                },
                {
                  label: "Manufacturing / garments + integrations",
                  low: 25,
                  high: 100,
                  hint: "MRP, quality, and integrations often push higher.",
                  href: "/packages/growth",
                },
              ]}
            />
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="card-standard p-5">
              <GroupedBars
                title="Band bounds (lakh BDT)"
                keys={[
                  { key: "low", label: "Low" },
                  { key: "high", label: "High" },
                ]}
                items={[
                  {
                    label: "Small SME",
                    href: "/packages/starter",
                    series: [
                      { key: "low", value: 3 },
                      { key: "high", value: 8 },
                    ],
                  },
                  {
                    label: "Mid-size",
                    href: "/packages/business",
                    series: [
                      { key: "low", value: 8 },
                      { key: "high", value: 25 },
                    ],
                  },
                  {
                    label: "Mfg / garments",
                    href: "/packages/growth",
                    series: [
                      { key: "low", value: 25 },
                      { key: "high", value: 100 },
                    ],
                  },
                ]}
              />
            </div>
            <div className="card-standard p-5">
              <DonutChart
                title="Cost questions to answer"
                centerLabel="lines"
                slices={[
                  { label: "Scope", value: 1, href: "#components" },
                  { label: "Edition", value: 1, href: "#components" },
                  { label: "Config vs custom", value: 1, href: "#components" },
                  { label: "Integrations", value: 1, href: "#components" },
                  { label: "Data", value: 1, href: "#components" },
                  { label: "Hosting", value: 1, href: "#components" },
                  { label: "Learning", value: 1, href: "#components" },
                ]}
              />
            </div>
          </div>
        </section>

        <section id="compare" className="mt-10 card-standard p-6">
          <h2 className="font-display text-lg font-semibold text-ink">
            How to compare two proposals
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            Put both proposals on the same first release. If one includes
            manufacturing and the other stops at accounting, the totals are not
            comparable. Ask each one to separate license or subscription,
            implementation, data migration, training, and the first year of
            support.
          </p>
          <div className="mt-5">
            <FeatureRows
              ariaLabel="Proposal comparison checklist"
              items={[
                {
                  icon: "listChecks",
                  title: "License or subscription",
                },
                {
                  icon: "listChecks",
                  title: "Implementation",
                },
                {
                  icon: "listChecks",
                  title: "Data migration",
                },
                {
                  icon: "listChecks",
                  title: "Training",
                },
                {
                  icon: "listChecks",
                  title: "First year of support",
                },
              ]}
            />
          </div>
          <p className="mt-4 text-sm leading-6 text-ink-muted">
            If the question is whether Odoo is the product to price at all, use
            the{" "}
            <Link className="btn-tertiary" href="/comparisons">
              comparisons
            </Link>{" "}
            before asking for a number.
          </p>
        </section>

        <section className="mt-10 card-standard p-6">
          <h2 className="font-display text-lg font-semibold text-ink">
            How to keep the first release smaller
          </h2>
          <div className="mt-4">
            <StepRail
              ariaLabel="Keep the first release smaller"
              steps={[
                {
                  title:
                    "Name success metrics and mark everything else out of scope.",
                },
                {
                  title:
                    "Configure the standard flow before commissioning custom code.",
                },
                {
                  title:
                    "Run a proof of concept on the hardest workflow only.",
                },
                {
                  title:
                    "Train the people who will run month-end, not every screen.",
                },
              ]}
            />
          </div>
          <p className="mt-4 text-sm leading-6 text-ink-muted">
            A smaller release is not a cheaper product forever. It is a way to
            learn the real cost before the second phase.
          </p>
        </section>

        <div className="mt-10 rounded-[var(--radius-panel)] bg-brand-deep p-6 text-on-brand md:p-8">
          <div className="font-medium">Next steps</div>
          <p className="mt-1 text-sm text-brand-tint">
            Use the checklist to describe scope. A consultation, if you want one,
            starts from that description rather than a price.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Link
              href="/resources/erp-checklist"
              className="inline-flex h-12 items-center justify-center rounded-[var(--radius-control)] bg-surface px-6 text-sm font-semibold text-brand"
            >
              ERP readiness checklist
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-[var(--radius-control)] border border-white/20 px-6 text-sm font-semibold text-on-brand"
            >
              Request a community consultation
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
