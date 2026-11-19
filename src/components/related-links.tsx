import Link from "next/link";
import type { RelatedLink } from "@/lib/content";

export function RelatedLinks({
  title,
  links,
}: {
  title: string;
  links: RelatedLink[];
}) {
  const extras = [
    { href: "/packages", label: "Odoo packages (Starter to Enterprise)" },
    { href: "/packages/care-plan", label: "Care Plan (AMC + hosting)" },
    { href: "/contact", label: "Request ERP consultation" },
  ] as const;

  return (
    <div className="mt-10 rounded-[var(--radius-card)] border border-line bg-surface p-6 text-sm shadow-1">
      <div className="font-medium text-ink">{title}</div>
      <div className="mt-3 grid">
        {[...links, ...extras].map((link) => (
          <Link
            key={`${link.href}-${link.label}`}
            className="group flex items-center justify-between border-b border-line py-3 text-ink last:border-b-0 hover:text-brand"
            href={link.href}
          >
            <span className="underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-[var(--dur-fast)] group-hover:decoration-brand">
              {link.label}
            </span>
            <span
              className="card-arrow text-ink-muted transition-transform duration-[var(--dur-fast)] group-hover:translate-x-[3px] group-hover:text-brand"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
