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
        A community roadmap for building a career around Odoo — for fresh
        graduates, career switchers, ERP professionals, and developers.
      </p>

      <div className="prose prose-zinc mt-8 max-w-none">
        <h2>Common roles</h2>
        <ul>
          <li>Odoo Functional Consultant</li>
          <li>Odoo Technical Consultant / Developer</li>
          <li>Business Analyst (ERP)</li>
          <li>Implementation / Project Coordinator</li>
        </ul>

        <h2>Functional track (skills checklist)</h2>
        <ul>
          <li>Process mapping and requirements gathering</li>
          <li>UAT planning and documentation</li>
          <li>Core modules: Sales, Inventory, Accounting</li>
          <li>Training and change management</li>
        </ul>

        <h2>Technical track (skills checklist)</h2>
        <ul>
          <li>Python + PostgreSQL fundamentals</li>
          <li>Odoo ORM + module development</li>
          <li>Views (XML), reports (QWeb), APIs</li>
          <li>Deployment + Docker basics</li>
        </ul>

        <h2>Portfolio ideas</h2>
        <ul>
          <li>Write a module overview with a demo dataset</li>
          <li>Build a small custom addon and publish a README</li>
          <li>Create UAT scripts + training slides for a module flow</li>
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
          <Link className="underline underline-offset-4" href="/contact">
            Book a free career consultation
          </Link>
        </div>
      </div>
    </div>
  );
}

