"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { SiteBrandLockup } from "@/components/site-logo";

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
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const trigger = openRef.current;
    const dialog = document.getElementById(menuId);
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab" || !dialog) return;
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [menuOpen, menuId]);

  return (
    <header
      className={`glass-surface sticky top-0 z-40 transition-[box-shadow,border-color] duration-[var(--dur-base)] ease-[var(--ease-out)] ${
        scrolled ? "border-line shadow-1" : "border-line/70"
      }`}
    >
      <div className="site-container flex h-[var(--header-h)] items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-6">
          <SiteBrandLockup priority />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link relative px-2 py-2 text-sm text-ink-muted transition-colors duration-[var(--dur-fast)] hover:text-ink ${
                    active ? "text-ink" : ""
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-2 bottom-1 h-px origin-left bg-brand transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden rounded-[var(--radius-control)] border border-line px-3 py-2 text-sm text-ink transition-colors duration-[var(--dur-fast)] hover:border-brand sm:inline-flex"
          >
            Request consultation
          </Link>
          <Link
            href="/training"
            className="hidden rounded-[var(--radius-control)] bg-brand px-3 py-2 text-sm font-semibold text-on-brand transition-colors duration-[var(--dur-fast)] hover:bg-brand-deep sm:inline-flex"
          >
            Explore training
          </Link>
          <button
            ref={openRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-control)] border border-line text-ink lg:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <span aria-hidden="true" className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 bg-ink" />
              <span className="block h-0.5 w-5 bg-ink" />
              <span className="block h-0.5 w-5 bg-ink" />
            </span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          id={menuId}
          className="fixed inset-0 z-50 flex flex-col bg-surface lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="site-container flex h-[var(--header-h)] items-center justify-between border-b border-line">
            <SiteBrandLockup onNavigate={() => setMenuOpen(false)} />
            <button
              ref={closeRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-control)] border border-line"
              onClick={() => setMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <span aria-hidden="true" className="text-xl leading-none">
                ×
              </span>
            </button>
          </div>
          <nav className="site-container flex flex-1 flex-col gap-1 py-6" aria-label="Mobile">
            {nav.map((item, i) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-[var(--radius-control)] px-3 py-3 text-base font-medium text-ink transition-opacity duration-[var(--dur-base)] ease-[var(--ease-out)] ${
                    active ? "bg-brand-tint text-brand-deep" : ""
                  }`}
                  style={{ transitionDelay: `calc(var(--stagger) * ${i})` }}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
              <Link href="/contact" className="btn-secondary w-full">
                Request consultation
              </Link>
              <Link href="/training" className="btn-primary w-full">
                Explore training
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
