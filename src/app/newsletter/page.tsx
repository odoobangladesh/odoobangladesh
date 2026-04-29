import { buildMetadata } from "@/lib/seo";
import { NewsletterCard } from "@/components/newsletter-card";

export const metadata = buildMetadata({
  title: "Newsletter",
  description:
    "Subscribe for Odoo learning resources, implementation guidance, and training updates for Bangladesh. Educational, community-first, no spam.",
  pathname: "/newsletter",
});

export default function NewsletterPage() {
  return (
    <div className="ob-container ob-section">
      <div className="max-w-3xl">
        <h1 className="ob-h1">Newsletter</h1>
        <p className="ob-lead mt-4">
          Monthly-ish updates: new guides, module/industry pages, webinar announcements, and training
          resources.
        </p>
      </div>

      <div className="mt-10 max-w-xl">
        <NewsletterCard />
      </div>
    </div>
  );
}

