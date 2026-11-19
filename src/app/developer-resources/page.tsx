import Link from "next/link";
import { Metadata } from "next";
import { LinkTiles, PageIntro } from "@/components/visual-ui";

export const metadata: Metadata = {
  title: "Odoo Developer Resources (Bangladesh)",
  description:
    "Developer resources for learning Odoo: module development, ORM, XML/QWeb, OWL, integrations, deployment, and best practices.",
  alternates: { canonical: "/developer-resources" },
};

export default function DeveloperResourcesPage() {
  return (
    <div className="site-container section-y">
      <PageIntro
        title="Odoo developer resources"
        description="A curated, community-first starting point for technical learners in Bangladesh."
      />

      <div className="mt-8">
        <LinkTiles
          items={[
            {
              href: "/training/technical",
              title: "Technical training pathway",
              description:
                "Structured learning path from basics to module development and deployment.",
              icon: "wrench",
            },
            {
              href: "/training/technical/module-development",
              title: "Module development topic",
              description:
                "Models, security, views, menus, data files, and best practices.",
              icon: "layers",
            },
          ]}
        />
      </div>

      <div className="mt-10 card-standard p-6 text-sm">
        <div className="font-medium text-ink">Need guidance?</div>
        <p className="mt-1 text-ink-muted">
          Ask for a roadmap based on your background (CS student, developer,
          freelancer, etc.).
        </p>
        <Link href="/contact" className="btn-primary mt-4">
          Book a free career consultation
        </Link>
      </div>
    </div>
  );
}
