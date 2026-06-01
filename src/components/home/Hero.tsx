"use client";

import { Button } from "@/components/shared/Button";
import { OdooImage } from "@/components/shared/OdooImage";
import { useMessages } from "@/components/providers/I18nProvider";
import { advisorLinks } from "@/data/navigation";
import { homeImages } from "@/lib/odoo-cdn";
import { OdooLink } from "@/components/shared/OdooLink";

export function Hero() {
  const t = useMessages();

  return (
    <section className="relative overflow-hidden bg-white px-4 pb-16 pt-12 text-center lg:px-8 lg:pt-20">
      <OdooImage
        src={homeImages.appsSwitched}
        alt=""
        width={800}
        height={120}
        className="mx-auto mb-8 max-h-24 w-full max-w-2xl object-contain opacity-90"
        priority
      />
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-4xl leading-tight text-gray-900 md:text-5xl lg:text-6xl">
          {t.hero.title}{" "}
          <span className="relative inline-block">
            <span className="relative z-10">{t.hero.highlight}</span>
            <OdooImage
              src={homeImages.yellowHighlight}
              alt=""
              width={400}
              height={40}
              className="absolute -bottom-2 left-1/2 -z-0 h-[0.5em] w-[110%] max-w-none -translate-x-1/2 object-fill"
              aria-hidden
            />
          </span>
        </h1>
        <h2 className="font-display mt-6 text-2xl text-gray-800 md:text-3xl">
          {t.hero.subtitle}{" "}
          <span className="relative inline-block border-b-4 border-odoo-blue/50 pb-0.5">
            {t.hero.affordable}
          </span>
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          <span className="font-semibold text-gray-800">{t.hero.price}</span>{" "}
          <em className="text-odoo-purple">{t.hero.forAllApps}</em>
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/trial">{t.hero.startFree}</Button>
          <Button href="/appointment/514" variant="outline">
            {t.hero.meetAdvisor}
          </Button>
        </div>

        <details className="mx-auto mt-6 max-w-md text-left">
          <summary className="cursor-pointer text-sm text-gray-500 hover:text-odoo-purple">
            {t.hero.companySize}
          </summary>
          <ul className="mt-2 space-y-1 rounded-lg border bg-gray-50 p-3 text-sm">
            {advisorLinks.map((link) => (
              <li key={link.href}>
                <OdooLink href={link.href} className="text-odoo-teal hover:underline">
                  {link.label}
                </OdooLink>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}
