"use client";

import { Logo } from "@/components/shared/Logo";
import { OdooLink } from "@/components/shared/OdooLink";
import { useMessages } from "@/components/providers/I18nProvider";
import {
  footerAbout,
  footerCommunity,
  footerOpenSource,
  footerServices,
} from "@/data/navigation";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-900">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <OdooLink
              href={link.href}
              external={link.external}
              className="text-sm text-gray-600 hover:text-odoo-purple"
            >
              {link.label}
            </OdooLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const t = useMessages();

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="mb-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn title={t.footer.community} links={footerCommunity} />
          <FooterColumn title={t.footer.openSource} links={footerOpenSource} />
          <FooterColumn title={t.footer.services} links={footerServices} />
          <FooterColumn title={t.footer.about} links={footerAbout} />
        </div>

        <div className="flex flex-col items-start justify-between gap-6 border-t border-gray-200 pt-8 md:flex-row md:items-center">
          <Logo />
          <p className="max-w-xl text-sm text-gray-600">{t.footer.blurb}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} Odoo S.A.</span>
          <OdooLink href="/legal" className="hover:text-odoo-purple">
            Legal
          </OdooLink>
          <OdooLink href="/privacy" className="hover:text-odoo-purple">
            Privacy
          </OdooLink>
          <OdooLink href="/security" className="hover:text-odoo-purple">
            Security
          </OdooLink>
        </div>
      </div>
    </footer>
  );
}
