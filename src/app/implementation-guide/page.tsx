import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Odoo Implementation Guide (Bangladesh)",
  description:
    "A practical, community implementation guide for Odoo ERP in Bangladesh: scope, data, processes, timeline, UAT, training, and go-live.",
  alternates: { canonical: "/implementation-guide" },
};

export default function ImplementationGuidePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">
        Odoo implementation guide (Bangladesh)
      </h1>
      <p className="mt-2 text-sm leading-6 text-zinc-600">
        A neutral planning guide for teams adopting Odoo in Bangladesh. It is
        a checklist for internal discussions, not an implementation proposal,
        and this portal is not affiliated with Odoo S.A.
      </p>

      <div className="prose prose-zinc mt-8 max-w-none [&_h2]:scroll-mt-24">
        <h2>How to use this guide</h2>
        <p>
          Read it in order if you are starting from zero. If a phase is already
          done, use that section to check what is still open. Pair it with the{" "}
          <Link href="/resources/erp-checklist">ERP readiness checklist</Link>{" "}
          and the{" "}
          <Link href="/learning-center">Learning Center</Link> when you need a
          shorter path.
        </p>
        <ol>
          <li>Agree the first release before anyone configures a database.</li>
          <li>Name an owner for each process and for master data.</li>
          <li>Treat customization as an exception, and write down why it exists.</li>
        </ol>

        <h2 id="discovery">Phase 1: Discovery and scope</h2>
        <p>
          A useful first release is the smallest set of workflows that the
          business will actually run on day one. Garments traceability, a
          multi-warehouse distributor, a retail counter, and a services firm
          do not share that set. Start from the industry page that matches the
          operation, then pick modules, instead of turning every app on.
        </p>
        <ul>
          <li>
            Write success metrics the team can check: order cycle time, stock
            accuracy, invoice lag, or month-end close. Avoid “implement ERP”
            as the metric.
          </li>
          <li>
            List must-have workflows per department, and mark everything else
            out of scope for the first release.
          </li>
          <li>
            Use the{" "}
            <Link href="/industries/garments">garments</Link>,{" "}
            <Link href="/industries/distribution">distribution</Link>,{" "}
            <Link href="/industries/retail">retail</Link>, and{" "}
            <Link href="/industries/services">services</Link> pages to see
            which modules usually show up together.
          </li>
        </ul>

        <h2 id="process">Phase 2: Process mapping</h2>
        <p>
          Document the current process before designing the next one. The gap
          between them is the change people have to learn, and it is also
          where approvals, discounts, and stock moves get lost.
        </p>
        <ul>
          <li>Record the as-is steps, including the spreadsheet or WhatsApp step that sits beside the current system.</li>
          <li>Design the to-be process with a named approver for price, purchase, and credit decisions.</li>
          <li>List the reports managers will ask for in the first month, and confirm the fields those reports need.</li>
        </ul>

        <h2 id="data">Phase 3: Data readiness</h2>
        <p>
          Most go-live delays in this kind of project are data delays. Products,
          customers, vendors, and the chart of accounts need owners before
          migration rehearsals start. Confirm the company’s financial year
          before opening periods. In Bangladesh that year is often July to
          June, but the legal entity’s own year is the one that matters.
        </p>
        <ul>
          <li>Assign owners for products, customers, vendors, and the chart of accounts.</li>
          <li>Clean duplicates and units of measure before the first trial import.</li>
          <li>
            Plan VAT invoicing as a workflow, not as a last-week setting. The{" "}
            <Link href="/modules/accounting">accounting module</Link> page
            covers the finance decisions that sit next to stock and sales.
          </li>
          <li>Run at least one full dry-run migration, then a final cut, instead of a single import on go-live weekend.</li>
        </ul>

        <h2 id="configuration">Phase 4: Configuration and customization</h2>
        <p>
          Configure the standard flow first. Customize when a documented
          process cannot be covered by settings, and keep that customization
          small enough to test. Inventory routes, manufacturing bills of
          materials, and point-of-sale payment methods are common places where
          configuration is enough.
        </p>
        <ul>
          <li>
            Review scope module by module in the{" "}
            <Link href="/modules">modules directory</Link>, starting with the
            apps in the first release.
          </li>
          <li>Write down each customization: the process it serves, the owner, and how to test it.</li>
          <li>List integrations separately (bank, eCommerce, logistics) and decide which ones wait until after go-live.</li>
        </ul>

        <h2 id="uat">Phase 5: Testing and training</h2>
        <p>
          User acceptance testing should follow the real documents: a
          quotation that becomes a delivery and an invoice, a purchase that
          becomes a receipt and a vendor bill, a shop-floor order that consumes
          components. Train people by role, on those same flows.
        </p>
        <ul>
          <li>Write UAT scripts for the critical flows only. A script that nobody runs is not a test.</li>
          <li>
            Point finance users at{" "}
            <Link href="/training/functional/accounting">
              functional accounting training
            </Link>
            , warehouse teams at{" "}
            <Link href="/training/functional/inventory">inventory</Link>, and
            developers at{" "}
            <Link href="/training/technical/module-development">
              module development
            </Link>
            . The broader paths sit on the{" "}
            <Link href="/training">training page</Link>.
          </li>
          <li>Train system owners on how to add a user, a tax, and a product, not only on day-to-day entry.</li>
        </ul>

        <h2 id="go-live">Phase 6: Go-live and stabilization</h2>
        <p>
          Go-live is a cutover, then a short period of close support. Keep a
          rollback point for master data, freeze non-critical changes, and
          park improvements that can wait until the first month-end is closed.
        </p>
        <ul>
          <li>Publish a cutover checklist: who stops the old process, who imports the final stock and open documents, and who signs off.</li>
          <li>Name a hypercare window and the person who triages issues each day.</li>
          <li>After the first close, review the improvement list instead of adding scope during the first week.</li>
        </ul>

        <h2 id="pitfalls">Common pitfalls</h2>
        <ul>
          <li>Starting from custom code before the standard flow has been tried.</li>
          <li>Importing dirty product and partner data because the go-live date was announced first.</li>
          <li>Leaving approvals and pricelists “to be decided in training.”</li>
          <li>Treating this guide as a quotation. Cost components belong on the <Link href="/pricing-guide">pricing guide</Link>, and product choice belongs on the <Link href="/comparisons">comparisons</Link>.</li>
        </ul>
      </div>

      <div className="mt-10 grid gap-3 rounded-2xl border border-zinc-200 bg-white p-6 text-sm shadow-sm">
        <div className="font-medium">Helpful next steps</div>
        <div className="grid gap-2">
          <Link className="underline underline-offset-4" href="/resources/erp-checklist">
            ERP readiness checklist
          </Link>
          <Link className="underline underline-offset-4" href="/modules">
            Review module-by-module scope
          </Link>
          <Link className="underline underline-offset-4" href="/pricing-guide">
            Pricing guide
          </Link>
          <Link className="underline underline-offset-4" href="/industries">
            Industry starting points
          </Link>
          <Link className="underline underline-offset-4" href="/contact">
            Request a community consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
