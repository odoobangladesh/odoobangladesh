import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Odoo Career Path Guide (Bangladesh)",
  description:
    "Career guide for Odoo professionals in Bangladesh: roles, skills, portfolios, learning roadmap, and training pathways for functional and technical tracks.",
  alternates: { canonical: "/odoo-career-guide" },
};

export default function CareerGuidePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">
        Odoo career path guide (Bangladesh)
      </h1>
      <p className="mt-2 text-sm leading-6 text-zinc-600">
        A community roadmap for people learning Odoo in Bangladesh. It is a
        study plan, not a placement service, and this portal is not affiliated
        with Odoo S.A.
      </p>

      <div className="prose prose-zinc mt-8 max-w-none [&_h2]:scroll-mt-24">
        <h2>Pick a track before collecting certificates</h2>
        <p>
          Functional work is explaining a business flow and configuring it.
          Technical work is building and maintaining the addon when
          configuration is not enough. Many people do some of both. Choose the
          track you can practice every week, then use the{" "}
          <Link href="/training">training pathways</Link> as the syllabus.
        </p>

        <h2>Roles you will see</h2>
        <ul>
          <li>
            <strong>Functional consultant.</strong> Maps a process, configures
            apps, writes test scripts, and trains users.
          </li>
          <li>
            <strong>Technical consultant or developer.</strong> Builds modules,
            fixes upgrades, and explains what custom code will cost to keep.
          </li>
          <li>
            <strong>Business analyst.</strong> Sits between the department and
            the people configuring the system. The{" "}
            <Link href="/implementation-guide">implementation guide</Link> is
            the vocabulary for that seat.
          </li>
          <li>
            <strong>Project coordinator.</strong> Keeps scope, data owners, and
            the go-live checklist moving. This is not a substitute for knowing
            one app well.
          </li>
        </ul>

        <h2 id="functional">Functional track</h2>
        <p>
          Learn one app until you can demo a full document flow without notes.
          Then add the neighbor app.
        </p>
        <ul>
          <li>
            Accounting: chart of accounts, taxes, invoices, and reconciliation.
            Start at{" "}
            <Link href="/training/functional/accounting">
              functional accounting
            </Link>
            .
          </li>
          <li>
            Inventory and purchasing: receipts, deliveries, and replenishment.
            Use{" "}
            <Link href="/training/functional/inventory">
              inventory training
            </Link>
            .
          </li>
          <li>
            Manufacturing: bills of materials and work orders. Use{" "}
            <Link href="/training/functional/manufacturing">
              manufacturing training
            </Link>
            .
          </li>
          <li>
            HR and the payroll conversation that follows it. Use{" "}
            <Link href="/training/functional/hr">HR training</Link> and the{" "}
            <Link href="/modules/hr">HR module</Link>.
          </li>
          <li>
            Point of Sale for retail counters. Use{" "}
            <Link href="/training/functional/pos">POS training</Link>.
          </li>
        </ul>
        <p>
          A functional portfolio is a written flow: the as-is steps, the to-be
          steps, a short UAT script, and the reports a manager would ask for.
        </p>

        <h2 id="technical">Technical track</h2>
        <p>
          You need enough Python to read a method and enough PostgreSQL to
          understand why a search is slow. The Odoo-specific work starts after
          that.
        </p>
        <ul>
          <li>
            Build one addon from models, security, and views. Follow{" "}
            <Link href="/training/technical/module-development">
              module development
            </Link>
            .
          </li>
          <li>
            Learn recordsets, domains, and computed fields in{" "}
            <Link href="/training/technical/orm">ORM</Link>.
          </li>
          <li>
            Add a small interface only when a form view is not enough. See{" "}
            <Link href="/training/technical/owl">OWL</Link>.
          </li>
          <li>
            Practice a staging-to-production checklist in{" "}
            <Link href="/training/technical/deployment">deployment</Link>, then{" "}
            <Link href="/training/technical/performance">performance</Link>.
          </li>
        </ul>
        <p>
          A technical portfolio is a small addon with a README, sample data,
          and a note about how you would upgrade it. The{" "}
          <Link href="/developer-resources">developer resources</Link> page
          points at the same path.
        </p>

        <h2>What this guide will not do</h2>
        <ul>
          <li>Promise a job, a salary, or a partner introduction.</li>
          <li>Replace practice on a real flow with a list of course names.</li>
          <li>Rank “the best” institute. Compare syllabi against the topics above.</li>
        </ul>
      </div>

      <div className="mt-10 grid gap-3 rounded-2xl border border-zinc-200 bg-white p-6 text-sm shadow-sm">
        <div className="font-medium">Choose a pathway</div>
        <div className="grid gap-2">
          <Link className="underline underline-offset-4" href="/training/functional">
            Functional training pathway
          </Link>
          <Link className="underline underline-offset-4" href="/training/technical">
            Technical training pathway
          </Link>
          <Link className="underline underline-offset-4" href="/learning-center">
            Learning Center
          </Link>
          <Link className="underline underline-offset-4" href="/contact">
            Book a free career consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
