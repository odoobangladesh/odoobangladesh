import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About the Community",
  description:
    "Odoo Bangladesh is an independent community portal for Odoo learners, professionals, and organizations in Bangladesh.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">About the community</h1>
      <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        Odoo Bangladesh is a community-driven, educational platform for people
        exploring Odoo ERP in Bangladesh — including businesses planning ERP
        adoption, functional consultants, developers, students, and career
        switchers.
      </p>

      <div className="prose prose-zinc mt-8 max-w-none dark:prose-invert">
        <h2>What this portal is</h2>
        <ul>
          <li>A neutral knowledge hub for Odoo ERP concepts and workflows</li>
          <li>A learning platform with functional and technical pathways</li>
          <li>A connector to the Odoo ecosystem in Bangladesh</li>
        </ul>

        <h2>What this portal is not</h2>
        <ul>
          <li>Not an agency-style “hire us” website</li>
          <li>Not affiliated with Odoo S.A.</li>
        </ul>

        <h2>How to use it</h2>
        <ol>
          <li>Start from the Learning Center to pick a pathway.</li>
          <li>Use Modules + Industries pages to map Odoo to your needs.</li>
          <li>Use Comparisons to shortlist ERP options.</li>
          <li>Use Training pages to plan skills and certification prep.</li>
        </ol>
      </div>
    </div>
  );
}

