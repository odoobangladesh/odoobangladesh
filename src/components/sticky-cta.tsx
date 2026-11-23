"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CtaSpark } from "@/components/cta-spark";
import { withStoredUtms } from "@/lib/utm";

type StickyIntent = {
  title: string;
  subtitle: string;
  href: string;
  button: string;
};

const COST_LANDINGS = [
  "/odoo-implementation-cost-bangladesh",
  "/odoo-pricing-bangladesh",
];

const COMMERCIAL_PREFIXES = [
  "/packages",
  "/industries",
  "/comparisons",
  "/pricing-guide",
  ...COST_LANDINGS,
  "/odoo-partners-bangladesh",
  "/odoo-for-garments-industry",
  "/odoo-accounting-bangladesh",
  "/open-source-erp-bangladesh",
  "/odoo-vs-erpnext",
];

function isCommercialPath(pathname: string): boolean {
  return COMMERCIAL_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

function intentForPath(pathname: string | null): StickyIntent {
  const path = pathname ?? "/";

  if (
    path.startsWith("/training") ||
    path.startsWith("/learning-center") ||
    path.startsWith("/knowledge-hub") ||
    path.startsWith("/odoo-career-guide") ||
    path.startsWith("/developer-resources")
  ) {
    const technical = path.startsWith("/training/technical");
    return {
      title: "Training advice",
      subtitle: "Request guidance for your learning path.",
      href: technical
        ? "/contact?interest=technical-training"
        : "/contact?interest=functional-training",
      button: "Request",
    };
  }

  if (
    path.startsWith("/comparisons") ||
    path.startsWith("/pricing-guide") ||
    path.startsWith("/packages") ||
    COST_LANDINGS.some((p) => path === p || path.startsWith(`${p}/`))
  ) {
    const onPackages = path.startsWith("/packages");
    return {
      title: "Talk to a specialist",
      subtitle: onPackages
        ? "Scoped discovery with Binary Quest."
        : "Request guidance on scope and cost.",
      href: "/contact?interest=talk-to-specialist",
      button: onPackages ? "Talk" : "Request",
    };
  }

  if (
    path.startsWith("/resources") ||
    path.startsWith("/implementation-guide") ||
    path.startsWith("/modules") ||
    path.startsWith("/industries")
  ) {
    return {
      title: "Free assessment",
      subtitle: "Request a free ERP assessment.",
      href: "/contact?interest=erp-assessment",
      button: "Request",
    };
  }

  return {
    title: "Need Odoo guidance?",
    subtitle: "Request guidance—educational first.",
    href: "/contact",
    button: "Request",
  };
}

export function StickyCta() {
  const pathname = usePathname();
  const intent = intentForPath(pathname);
  const commercial = isCommercialPath(pathname ?? "/");
  const [visible, setVisible] = useState(false);
  const [href, setHref] = useState(intent.href);

  useEffect(() => {
    setHref(withStoredUtms(intent.href));
  }, [intent.href]);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const footer = document.querySelector("footer");

    const update = () => {
      const pastHero = hero
        ? window.scrollY > hero.offsetTop + hero.offsetHeight * 0.6
        : window.scrollY > 320;
      const nearFooter = footer
        ? footer.getBoundingClientRect().top < window.innerHeight - 80
        : false;
      const vv = window.visualViewport;
      const keyboardOpen = Boolean(
        vv && vv.height < window.innerHeight * 0.75,
      );
      setVisible(pastHero && !nearFooter && !keyboardOpen);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      data-sticky-cta={visible ? "visible" : "hidden"}
      className={`fixed bottom-0 left-0 right-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] ${
        commercial ? "" : "md:hidden"
      } ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-[120%]"
      }`}
      aria-hidden={!visible}
    >
      <div className="glass-surface mx-auto flex max-w-xl items-center justify-between gap-3 rounded-[var(--radius-card)] border border-line p-3 shadow-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-ink">
            {intent.title}
          </div>
          <div className="truncate text-xs text-ink-muted">
            {intent.subtitle}
          </div>
        </div>
        <CtaSpark magnet={false}>
          <Link href={href} className="btn-primary h-10 shrink-0 px-4 text-xs">
            {intent.button}
          </Link>
        </CtaSpark>
      </div>
    </div>
  );
}
