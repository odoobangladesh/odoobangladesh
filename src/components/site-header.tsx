import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const nav = [
  { href: "/blog", label: "Blog" },
  { href: "/modules", label: "Modules" },
  { href: "/learning-center", label: "Learning" },
  { href: "/training", label: "Training" },
  { href: "/comparisons", label: "Comparisons" },
  { href: "/implementation-guide", label: "Implementation" },
  { href: "/events", label: "Events" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--color-border)] bg-[color:var(--color-background)]/80 backdrop-blur">
      <div className="ob-container">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-white shadow-sm">
              <span className="text-[10px] font-semibold text-black">OB</span>
            </span>
            <span className="font-semibold tracking-tight">Odoo Bangladesh</span>
            <span className="hidden text-sm text-[color:var(--color-muted)] md:inline">
              Community portal
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm text-[color:var(--color-muted)] transition hover:bg-black/5 hover:text-[color:var(--color-foreground)] dark:hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/contact" className="ob-btn ob-btn-secondary">
              Request consultation
            </Link>
            <Link href="/training" className="ob-btn ob-btn-primary hidden sm:inline-flex">
              Explore training
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

