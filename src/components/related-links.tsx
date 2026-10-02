import Link from "next/link";
import type { RelatedLink } from "@/lib/content";

export function RelatedLinks({
  title,
  links,
}: {
  title: string;
  links: RelatedLink[];
}) {
  return (
    <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 text-sm shadow-sm">
      <div className="font-medium">{title}</div>
      <div className="mt-3 grid gap-2">
        {links.map((link) => (
          <Link
            key={`${link.href}-${link.label}`}
            className="underline underline-offset-4"
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
        <Link className="underline underline-offset-4" href="/contact">
          Request a community consultation
        </Link>
      </div>
    </div>
  );
}
