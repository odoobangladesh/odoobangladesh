import Link from "next/link";

export function SeoSectionCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group obd-card p-6 transition hover:-translate-y-0.5"
    >
      <div className="text-sm font-semibold tracking-tight">{title}</div>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
      <div className="mt-3 text-sm font-medium underline underline-offset-4" style={{ color: "var(--brand)" }}>
        Explore
      </div>
    </Link>
  );
}

