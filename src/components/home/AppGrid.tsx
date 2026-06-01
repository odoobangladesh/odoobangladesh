"use client";

import { OdooLink } from "@/components/shared/OdooLink";
import { OdooImage } from "@/components/shared/OdooImage";
import { useMessages } from "@/components/providers/I18nProvider";
import { appsBySlug, featuredApps } from "@/data/apps";
import { appIconUrl } from "@/lib/odoo-cdn";

export function AppGrid() {
  const t = useMessages();

  return (
    <section className="bg-gray-50 px-4 py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {featuredApps.map((slug) => {
            const app = appsBySlug[slug];
            if (!app) return null;
            return (
              <OdooLink
                key={slug}
                href={`/app/${slug}`}
                className="flex min-w-[100px] flex-col items-center gap-2 rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <OdooImage
                  src={appIconUrl(slug)}
                  alt={app.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                />
                <span className="text-center text-xs font-medium text-gray-700">
                  {app.name}
                </span>
              </OdooLink>
            );
          })}
        </div>
        <p className="text-center">
          <OdooLink href="/page/all-apps" className="font-semibold text-odoo-teal hover:underline">
            {t.home.viewAllApps} →
          </OdooLink>
        </p>
      </div>
    </section>
  );
}
