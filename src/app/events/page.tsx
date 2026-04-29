import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Events & Webinars",
  description:
    "Community events and webinars for Odoo learners in Bangladesh: free workshops, career sessions, module overviews, and implementation Q&A.",
  pathname: "/events",
});

export default function EventsPage() {
  return (
    <div className="ob-container ob-section">
      <div className="max-w-3xl">
        <h1 className="ob-h1">Events & webinars</h1>
        <p className="ob-lead mt-4">
          Community learning sessions for Odoo in Bangladesh. This section is designed to evolve
          into a schedule + registration system.
        </p>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {[
          { t: "Intro to Odoo ERP (Bangladesh)", d: "Free workshop for beginners." },
          { t: "Functional consultant roadmap", d: "Skills, projects, and learning plan." },
          { t: "Odoo module development basics", d: "Models, views, security, and packaging." },
        ].map((e) => (
          <div key={e.t} className="ob-card p-6">
            <div className="text-sm text-[color:var(--color-muted)]">Sample event</div>
            <div className="mt-2 text-lg font-semibold tracking-tight">{e.t}</div>
            <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">{e.d}</p>
            <div className="mt-4 text-xs text-[color:var(--color-muted)]">Registration: coming soon</div>
          </div>
        ))}
      </div>

      <div className="mt-10 ob-card p-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="text-lg font-semibold tracking-tight">Want to host a session?</div>
            <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
              Propose a topic (functional or technical) and we’ll help structure it as a community
              workshop.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/contact" className="ob-btn ob-btn-primary">
              Propose an event
            </Link>
            <Link href="/newsletter" className="ob-btn ob-btn-secondary">
              Get updates
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

