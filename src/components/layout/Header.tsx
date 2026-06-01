"use client";

import { useState } from "react";
import { Logo } from "@/components/shared/Logo";
import { OdooLink } from "@/components/shared/OdooLink";
import { Button } from "@/components/shared/Button";
import { useMessages } from "@/components/providers/I18nProvider";
import { appsNav, communityNav, industriesNav } from "@/data/navigation";
import { cn } from "@/lib/utils";

type MegaMenuProps = {
  label: string;
  groups: typeof appsNav;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  footerLink?: { label: string; href: string };
};

function MegaMenu({ label, groups, open, onOpen, onClose, footerLink }: MegaMenuProps) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        type="button"
        className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-odoo-purple"
        aria-expanded={open}
      >
        {label}
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 w-[min(90vw,900px)] rounded-lg border border-gray-100 bg-white p-6 shadow-xl lg:-translate-x-1/4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {groups.map((group) => (
              <div key={group.title}>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-odoo-purple">
                  {group.title}
                </p>
                <ul className="space-y-1">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <OdooLink
                        href={item.href}
                        external={item.external}
                        className="block py-0.5 text-sm text-gray-600 hover:text-odoo-purple"
                      >
                        {item.label}
                      </OdooLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {footerLink && (
            <div className="mt-4 border-t pt-4">
              <OdooLink href={footerLink.href} className="text-sm font-semibold text-odoo-teal hover:underline">
                {footerLink.label} →
              </OdooLink>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const t = useMessages();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const navLinks = [
    { href: "/pricing", label: t.nav.pricing },
    { href: "/help", label: t.nav.help },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          <MegaMenu
            label={t.nav.apps}
            groups={appsNav}
            open={activeMenu === "apps"}
            onOpen={() => setActiveMenu("apps")}
            onClose={() => setActiveMenu(null)}
            footerLink={{ label: t.nav.viewAllApps, href: "/page/all-apps" }}
          />
          <MegaMenu
            label={t.nav.industries}
            groups={industriesNav}
            open={activeMenu === "industries"}
            onOpen={() => setActiveMenu("industries")}
            onClose={() => setActiveMenu(null)}
            footerLink={{ label: t.nav.browseIndustries, href: "/all-industries" }}
          />
          <MegaMenu
            label={t.nav.community}
            groups={communityNav}
            open={activeMenu === "community"}
            onOpen={() => setActiveMenu("community")}
            onClose={() => setActiveMenu(null)}
          />
          {navLinks.map((link) => (
            <OdooLink
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-odoo-purple"
            >
              {link.label}
            </OdooLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <OdooLink href="/web/login" className="text-sm font-medium text-gray-600 hover:text-odoo-purple">
            {t.nav.signIn}
          </OdooLink>
          <Button href="/trial" variant="primary">
            {t.nav.tryFree}
          </Button>
        </div>

        <button
          type="button"
          className="flex flex-col gap-1.5 p-2 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span className={cn("block h-0.5 w-6 bg-gray-800 transition", mobileOpen && "translate-y-2 rotate-45")} />
          <span className={cn("block h-0.5 w-6 bg-gray-800 transition", mobileOpen && "opacity-0")} />
          <span className={cn("block h-0.5 w-6 bg-gray-800 transition", mobileOpen && "-translate-y-2 -rotate-45")} />
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t bg-white px-4 py-4 lg:hidden">
          <div className="mb-4 flex gap-3">
            <Button href="/trial" variant="primary" className="flex-1 text-center">
              {t.nav.tryFree}
            </Button>
            <OdooLink href="/web/login" className="flex items-center text-sm font-medium text-gray-600">
              {t.nav.signIn}
            </OdooLink>
          </div>
          {[...appsNav, ...industriesNav, ...communityNav].map((group) => (
            <div key={group.title} className="mb-4">
              <p className="mb-2 text-xs font-bold uppercase text-odoo-purple">{group.title}</p>
              <ul className="grid grid-cols-2 gap-1">
                {group.items.slice(0, 6).map((item) => (
                  <li key={item.href}>
                    <OdooLink href={item.href} className="text-sm text-gray-600" external={item.external}>
                      {item.label}
                    </OdooLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {navLinks.map((link) => (
            <OdooLink key={link.href} href={link.href} className="block py-2 font-medium">
              {link.label}
            </OdooLink>
          ))}
        </nav>
      )}
    </header>
  );
}
