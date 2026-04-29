import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Community Forum (Coming Soon)",
  description:
    "A community forum for Odoo learners and professionals in Bangladesh. Coming soon — join the newsletter for updates.",
  pathname: "/forum",
  noIndex: true,
});

export default function ForumPage() {
  return (
    <div className="ob-container ob-section">
      <div className="max-w-3xl">
        <h1 className="ob-h1">Community forum</h1>
        <p className="ob-lead mt-4">
          Coming soon. For now, use the contact page or subscribe to the newsletter to stay updated.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/newsletter" className="ob-btn ob-btn-primary">
          Newsletter
        </Link>
        <Link href="/contact" className="ob-btn ob-btn-secondary">
          Contact
        </Link>
      </div>
    </div>
  );
}

