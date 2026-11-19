import Link from "next/link";
import { Metadata } from "next";
import { ColumnChart } from "@/components/charts";
import { ProcessDiagram } from "@/components/process-diagram";
import { ScrollReveal } from "@/components/scroll-reveal";
import {
  FeatureRows,
  PageIntro,
  PhaseTimeline,
  StepRail,
} from "@/components/visual-ui";

export const metadata: Metadata = {
  title: "Odoo Implementation Guide (Bangladesh)",
  description:
    "A practical, community implementation guide for Odoo ERP in Bangladesh: scope, data, processes, timeline, UAT, training, and go-live.",
  alternates: { canonical: "/implementation-guide" },
};

export default function ImplementationGuidePage() {
  return (
    <div>
      <ScrollReveal />
      <div className="site-container section-y">
      <div className="mx-auto max-w-[var(--reading)]">
        <div data-reveal>
        <PageIntro
          title="Odoo implementation guide (Bangladesh)"
          description="A neutral planning guide for teams adopting Odoo in Bangladesh. It is a checklist for internal discussions, not an implementation proposal, and this portal is not affiliated with Odoo S.A."
        />
        </div>

        <section data-reveal className="mt-10 card-standard p-5 md:p-6">
          <ColumnChart
            title="Checklist density by phase"
            unitHint="checkpoints in this guide"
            items={[
              { label: "Discovery", value: 3, href: "#discovery" },
              { label: "Process", value: 3, href: "#process" },
              { label: "Data", value: 4, href: "#data" },
              { label: "Config", value: 3, href: "#configuration" },
              { label: "UAT", value: 3, href: "#uat" },
              { label: "Go-live", value: 3, href: "#go-live" },
            ]}
          />
        </section>

        <section data-reveal className="mt-10">
          <h2 className="font-display text-lg font-semibold text-ink md:text-xl">
            Phase map
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            Jump into a phase. Details follow in the timeline below.
          </p>
          <div className="mt-5">
            <ProcessDiagram
              nodes={[
                {
                  id: "d",
                  label: "Discovery",
                  detail: "Scope first release",
                  href: "#discovery",
                  icon: "search",
                },
                {
                  id: "p",
                  label: "Process",
                  detail: "Owners & flows",
                  href: "#process",
                  icon: "gitBranch",
                },
                {
                  id: "c",
                  label: "Configure",
                  detail: "Settings over code",
                  href: "#configuration",
                  icon: "settings",
                },
                {
                  id: "data",
                  label: "Data",
                  detail: "Masters & openings",
                  href: "#data",
                  icon: "database",
                },
                {
                  id: "uat",
                  label: "UAT",
                  detail: "Prove the hard path",
                  href: "#uat",
                  icon: "clipboard",
                },
                {
                  id: "live",
                  label: "Go-live",
                  detail: "Cutover & care",
                  href: "#go-live",
                  icon: "rocket",
                },
              ]}
            />
          </div>
        </section>

        <section className="mt-10 card-standard p-6">
          <h2 className="font-display text-lg font-semibold text-ink">
            How to use this guide
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            Read it in order if you are starting from zero. If a phase is already
            done, use that section to check what is still open. Pair it with the{" "}
            <Link className="btn-tertiary" href="/resources/erp-checklist">
              ERP readiness checklist
            </Link>{" "}
            and the{" "}
            <Link className="btn-tertiary" href="/learning-center">
              Learning Center
            </Link>{" "}
            when you need a shorter path.
          </p>
          <div className="mt-5">
            <StepRail
              ariaLabel="How to use this guide"
              steps={[
                {
                  title:
                    "Agree the first release before anyone configures a database.",
                },
                {
                  title: "Name an owner for each process and for master data.",
                },
                {
                  title:
                    "Treat customization as an exception, and write down why it exists.",
                },
              ]}
            />
          </div>
        </section>

        <div className="mt-10">
          <PhaseTimeline
            ariaLabel="Implementation phases"
            phases={[
              {
                id: "discovery",
                title: "Discovery and scope",
                icon: "search",
                body: (
                  <>
                    A useful first release is the smallest set of workflows that
                    the business will actually run on day one. Garments
                    traceability, a multi-warehouse distributor, a retail
                    counter, and a services firm do not share that set. Start
                    from the industry page that matches the operation, then pick
                    modules, instead of turning every app on.
                  </>
                ),
                points: [
                  <>
                    Write success metrics the team can check: order cycle time,
                    stock accuracy, invoice lag, or month-end close. Avoid
                    “implement ERP” as the metric.
                  </>,
                  <>
                    List must-have workflows per department, and mark everything
                    else out of scope for the first release.
                  </>,
                  <>
                    Use the{" "}
                    <Link className="btn-tertiary" href="/industries/garments">
                      garments
                    </Link>
                    ,{" "}
                    <Link
                      className="btn-tertiary"
                      href="/industries/distribution"
                    >
                      distribution
                    </Link>
                    ,{" "}
                    <Link className="btn-tertiary" href="/industries/retail">
                      retail
                    </Link>
                    , and{" "}
                    <Link className="btn-tertiary" href="/industries/services">
                      services
                    </Link>{" "}
                    pages to see which modules usually show up together.
                  </>,
                ],
              },
              {
                id: "process",
                title: "Process mapping",
                icon: "gitBranch",
                body: (
                  <>
                    Document the current process before designing the next one.
                    The gap between them is the change people have to learn, and
                    it is also where approvals, discounts, and stock moves get
                    lost.
                  </>
                ),
                points: [
                  "Record the as-is steps, including the spreadsheet or WhatsApp step that sits beside the current system.",
                  "Design the to-be process with a named approver for price, purchase, and credit decisions.",
                  "List the reports managers will ask for in the first month, and confirm the fields those reports need.",
                ],
              },
              {
                id: "data",
                title: "Data readiness",
                icon: "database",
                body: (
                  <>
                    Most go-live delays in this kind of project are data delays.
                    Products, customers, vendors, and the chart of accounts need
                    owners before migration rehearsals start. Confirm the
                    company’s financial year before opening periods. In
                    Bangladesh that year is often July to June, but the legal
                    entity’s own year is the one that matters.
                  </>
                ),
                points: [
                  "Assign owners for products, customers, vendors, and the chart of accounts.",
                  "Clean duplicates and units of measure before the first trial import.",
                  <>
                    Plan VAT invoicing as a workflow, not as a last-week
                    setting. The{" "}
                    <Link className="btn-tertiary" href="/modules/accounting">
                      accounting module
                    </Link>{" "}
                    page covers the finance decisions that sit next to stock and
                    sales.
                  </>,
                  "Run at least one full dry-run migration, then a final cut, instead of a single import on go-live weekend.",
                ],
              },
              {
                id: "configuration",
                title: "Configuration and customization",
                icon: "settings",
                body: (
                  <>
                    Configure the standard flow first. Customize when a
                    documented process cannot be covered by settings, and keep
                    that customization small enough to test. Inventory routes,
                    manufacturing bills of materials, and point-of-sale payment
                    methods are common places where configuration is enough.
                  </>
                ),
                points: [
                  <>
                    Review scope module by module in the{" "}
                    <Link className="btn-tertiary" href="/modules">
                      modules directory
                    </Link>
                    , starting with the apps in the first release.
                  </>,
                  "Write down each customization: the process it serves, the owner, and how to test it.",
                  "List integrations separately (bank, eCommerce, logistics) and decide which ones wait until after go-live.",
                ],
              },
              {
                id: "uat",
                title: "Testing and training",
                icon: "clipboard",
                body: (
                  <>
                    User acceptance testing should follow the real documents: a
                    quotation that becomes a delivery and an invoice, a purchase
                    that becomes a receipt and a vendor bill, a shop-floor order
                    that consumes components. Train people by role, on those same
                    flows.
                  </>
                ),
                points: [
                  "Write UAT scripts for the critical flows only. A script that nobody runs is not a test.",
                  <>
                    Point finance users at{" "}
                    <Link
                      className="btn-tertiary"
                      href="/training/functional/accounting"
                    >
                      functional accounting training
                    </Link>
                    , warehouse teams at{" "}
                    <Link
                      className="btn-tertiary"
                      href="/training/functional/inventory"
                    >
                      inventory
                    </Link>
                    , and developers at{" "}
                    <Link
                      className="btn-tertiary"
                      href="/training/technical/module-development"
                    >
                      module development
                    </Link>
                    . The broader paths sit on the{" "}
                    <Link className="btn-tertiary" href="/training">
                      training page
                    </Link>
                    .
                  </>,
                  "Train system owners on how to add a user, a tax, and a product, not only on day-to-day entry.",
                ],
              },
              {
                id: "go-live",
                title: "Go-live and stabilization",
                icon: "rocket",
                body: (
                  <>
                    Go-live is a cutover, then a short period of close support.
                    Keep a rollback point for master data, freeze non-critical
                    changes, and park improvements that can wait until the first
                    month-end is closed.
                  </>
                ),
                points: [
                  "Publish a cutover checklist: who stops the old process, who imports the final stock and open documents, and who signs off.",
                  "Name a hypercare window and the person who triages issues each day.",
                  "After the first close, review the improvement list instead of adding scope during the first week.",
                ],
              },
            ]}
          />
        </div>

        <section id="pitfalls" className="mt-10 card-standard p-6">
          <h2 className="font-display text-lg font-semibold text-ink">
            Common pitfalls
          </h2>
          <div className="mt-4">
            <FeatureRows
              ariaLabel="Common pitfalls"
              items={[
                {
                  icon: "alert",
                  title:
                    "Starting from custom code before the standard flow has been tried.",
                },
                {
                  icon: "alert",
                  title:
                    "Importing dirty product and partner data because the go-live date was announced first.",
                },
                {
                  icon: "alert",
                  title:
                    "Leaving approvals and pricelists “to be decided in training.”",
                },
                {
                  icon: "alert",
                  title: (
                    <>
                      Treating this guide as a quotation. Cost components belong
                      on the{" "}
                      <Link className="btn-tertiary" href="/pricing-guide">
                        pricing guide
                      </Link>
                      , and product choice belongs on the{" "}
                      <Link className="btn-tertiary" href="/comparisons">
                        comparisons
                      </Link>
                      .
                    </>
                  ),
                },
              ]}
            />
          </div>
        </section>

        <div className="mt-10 card-standard p-6 text-sm">
          <div className="font-medium text-ink">Helpful next steps</div>
          <div className="mt-3 grid gap-0">
            {[
              {
                href: "/resources/erp-checklist",
                label: "ERP readiness checklist",
              },
              { href: "/modules", label: "Review module-by-module scope" },
              { href: "/pricing-guide", label: "Pricing guide" },
              { href: "/industries", label: "Industry starting points" },
              {
                href: "/contact",
                label: "Request a community consultation",
              },
            ].map((link) => (
              <Link
                key={link.href}
                className="group flex items-center justify-between border-b border-line py-3 text-ink last:border-b-0 hover:text-brand"
                href={link.href}
              >
                <span>{link.label}</span>
                <span
                  className="card-arrow text-ink-muted transition-transform duration-[var(--dur-fast)] group-hover:translate-x-[3px]"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
