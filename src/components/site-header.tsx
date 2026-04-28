import Link from "next/link";

const nav = [
  { href: "/blog", label: "Blog" },
  { href: "/learning-center", label: "Learning Center" },
  { href: "/modules", label: "Modules" },
  { href: "/industries", label: "Industries" },
  { href: "/comparisons", label: "Comparisons" },
  { href: "/training", label: "Training" },
  { href: "/events", label: "Events" },
  { href: "/forum", label: "Forum" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur dark:bg-zinc-950/70" style={{ borderColor: "var(--border)" }}>
      <div className="obd-container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full text-white" style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-2))" }}>
              O
            </span>
            Odoo Bangladesh
          </Link>
          <nav className="hidden items-center gap-4 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="rounded-full px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:text-zinc-100 dark:hover:bg-zinc-900"
            style={{ border: "1px solid var(--border)" }}
          >
            Request consultation
          </Link>
          <Link
            href="/training"
            className="rounded-full px-4 py-2 text-sm font-medium text-white shadow-sm"
            style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-2))" }}
          >
            Explore training
          </Link>
        </div>
      </div>
    </header>
  );
}

