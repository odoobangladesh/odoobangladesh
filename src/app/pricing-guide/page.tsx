import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Odoo Pricing Guide (Bangladesh)",
  description:
    "Community pricing guide for Odoo in Bangladesh: what affects total cost including implementation, customization, hosting, training, and support.",
  alternates: { canonical: "/pricing-guide" },
};

export default function PricingGuidePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">
        Odoo pricing guide (Bangladesh)
      </h1>
      <p className="mt-2 text-sm leading-6 text-zinc-600">
        A neutral way to think about total cost before anyone sends a
        quotation. This page does not publish prices, and this portal is not
        affiliated with Odoo S.A.
      </p>

      <div className="prose prose-zinc mt-8 max-w-none [&_h2]:scroll-mt-24">
        <h2>What this page is for</h2>
        <p>
          Teams usually ask for “the price of Odoo” before they have named a
          first release. The number that matters is the cost of that release:
          the people, the data, the apps, and the change, not a single license
          line. Use this with the{" "}
          <Link href="/implementation-guide">implementation guide</Link> and
          the{" "}
          <Link href="/resources/erp-checklist">ERP readiness checklist</Link>.
        </p>

        <h2 id="components">Cost components</h2>
        <p>
          Treat each line as a question to answer, not as a fee this site
          charges.
        </p>
        <ul>
          <li>
            <strong>Scope.</strong> Users, departments, and the workflows that
            must work on day one. A garments factory, a retailer, and a
            services firm do not buy the same first release. Start from{" "}
            <Link href="/industries">industry pages</Link> and the{" "}
            <Link href="/modules">modules directory</Link>.
          </li>
          <li>
            <strong>Edition and apps.</strong> Some setups use an edition with
            a subscription, and some do not. Confirm what is included before
            comparing two proposals. This guide does not list official rates.
          </li>
          <li>
            <strong>Configuration versus customization.</strong> Settings are
            cheaper to keep than custom code. Customization becomes a lasting
            cost when someone must test and upgrade it.
          </li>
          <li>
            <strong>Integrations.</strong> Bank feeds, eCommerce, logistics,
            and payment providers are separate from the first apps. Decide
            which ones wait.
          </li>
          <li>
            <strong>Data.</strong> Cleaning products, partners, and the chart
            of accounts often takes longer than installing the software. See{" "}
            <Link href="/implementation-guide#data">data readiness</Link>.
          </li>
          <li>
            <strong>Hosting and care.</strong> Cloud or on-prem, backups,
            monitoring, and who applies updates.
          </li>
          <li>
            <strong>Learning.</strong> Role-based training and the time people
            spend in testing. Pathways are on the{" "}
            <Link href="/training">training page</Link>.
          </li>
        </ul>

        <h2 id="compare">How to compare two proposals</h2>
        <p>
          Put both proposals on the same first release. If one includes
          manufacturing and the other stops at accounting, the totals are not
          comparable. Ask each one to separate license or subscription,
          implementation, data migration, training, and the first year of
          support.
        </p>
        <p>
          If the question is whether Odoo is the product to price at all, use
          the <Link href="/comparisons">comparisons</Link> before asking for a
          number.
        </p>

        <h2>How to keep the first release smaller</h2>
        <ul>
          <li>Name success metrics and mark everything else out of scope.</li>
          <li>Configure the standard flow before commissioning custom code.</li>
          <li>Run a proof of concept on the hardest workflow only.</li>
          <li>Train the people who will run month-end, not every screen.</li>
        </ul>
        <p>
          A smaller release is not a cheaper product forever. It is a way to
          learn the real cost before the second phase.
        </p>
      </div>

      <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 text-sm shadow-sm">
        <div className="font-medium">Next steps</div>
        <p className="mt-1 text-zinc-600">
          Use the checklist to describe scope. A consultation, if you want one,
          starts from that description rather than a price.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/resources/erp-checklist"
            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
          >
            ERP readiness checklist
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-200 px-5 py-3 text-sm font-medium hover:bg-zinc-50"
          >
            Request a community consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
