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
      className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
    >
      <div className="text-sm font-semibold tracking-tight">{title}</div>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
      <div className="mt-3 text-sm font-medium text-zinc-900 underline underline-offset-4 group-hover:text-black dark:text-zinc-100 dark:group-hover:text-white">
        Explore
      </div>
    </Link>
  );
}

