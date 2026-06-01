"use client";

import { useState } from "react";
import { Button } from "@/components/shared/Button";
import { CTASection } from "@/components/shared/CTASection";
import { OdooLink } from "@/components/shared/OdooLink";
import { OdooImage } from "@/components/shared/OdooImage";
import { useMessages } from "@/components/providers/I18nProvider";
import type { AppItem } from "@/data/types";
import { appsBySlug } from "@/data/apps";
import { appHeroUrl, appIconUrl } from "@/lib/odoo-cdn";

export function AppPageTemplate({ app }: { app: AppItem }) {
  const t = useMessages();
  const [heroFailed, setHeroFailed] = useState(false);
  const related = (app.relatedApps ?? [])
    .map((slug) => appsBySlug[slug])
    .filter(Boolean);

  return (
    <>
      <section
        className="relative overflow-hidden px-4 py-16 text-white lg:px-8"
        style={{ background: `linear-gradient(135deg, ${app.color} 0%, #1a1a2e 100%)` }}
      >
        {!heroFailed && (
          <OdooImage
            src={appHeroUrl(app.slug)}
            alt=""
            width={1200}
            height={600}
            className="absolute inset-0 h-full w-full object-cover opacity-40"
            priority
            onError={() => setHeroFailed(true)}
          />
        )}
        <div className="relative mx-auto max-w-4xl text-center">
          <OdooImage
            src={appIconUrl(app.slug)}
            alt=""
            width={64}
            height={64}
            className="mx-auto mb-4 h-16 w-16"
          />
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-white/70">
            {app.category}
          </p>
          <h1 className="font-display mb-4 text-4xl md:text-5xl">{app.tagline}</h1>
          <p className="mb-8 text-lg text-white/90">{app.description}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              href={`/trial?app=${app.slug}`}
              variant="secondary"
              className="bg-white text-gray-900"
            >
              {t.hero.startFree}
            </Button>
            <Button
              href="/appointment/514"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              {t.hero.meetAdvisor}
            </Button>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display mb-8 text-center text-3xl text-gray-900">
            All the features done right.
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {app.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-odoo-teal text-xs text-white">
                  ✓
                </span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-gray-50 px-4 py-12 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h3 className="font-display mb-6 text-center text-2xl">
              One need, one app. Expand as you grow.
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {related.map((r) => (
                <OdooLink
                  key={r.slug}
                  href={`/app/${r.slug}`}
                  className="flex items-center gap-2 rounded-lg border bg-white px-4 py-3 font-medium text-odoo-purple shadow-sm hover:shadow"
                >
                  <OdooImage src={appIconUrl(r.slug)} alt="" width={24} height={24} className="h-6 w-6" />
                  {r.name}
                </OdooLink>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
