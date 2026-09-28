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
    <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-zinc-950"
          >
            Odoo Bangladesh
          </Link>
          <nav className="hidden items-center gap-4 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-zinc-700 hover:text-zinc-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="rounded-full border border-zinc-200 px-3 py-1.5 text-sm text-zinc-900 hover:bg-zinc-50"
          >
            Request consultation
          </Link>
          <Link
            href="/training"
            className="rounded-full bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Explore training
          </Link>
        </div>
      </div>
    </header>
  );
}

