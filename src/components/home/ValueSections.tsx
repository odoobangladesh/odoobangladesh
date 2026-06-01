"use client";

import { OdooLink } from "@/components/shared/OdooLink";
import { OdooImage } from "@/components/shared/OdooImage";
import { useMessages } from "@/components/providers/I18nProvider";
import { homeImages } from "@/lib/odoo-cdn";

const valueCards = [
  {
    key: "opensource",
    title: "Open source",
    body: "Behind the technology is a community of 100k+ developers collaborating worldwide. Odoo is available in Community (100% free) and Enterprise editions.",
    link: { href: "/page/editions", labelKey: "compare" as const },
  },
  {
    key: "ai",
    title: "Open Source + AI = ❤️",
    body: "Use Odoo.sh to develop tailored modules. As we are open source, LLMs are already trained on our source code.",
    link: { href: "https://www.odoo.sh", label: "Odoo.sh", external: true },
  },
  {
    key: "community",
    title: "40k+ community apps",
    body: "Thanks to its open source development model, Odoo became the world's largest business apps store.",
    link: { href: "https://apps.odoo.com/apps", label: "Browse Community Apps", external: true },
  },
  {
    key: "bull",
    title: "No corporate bullsh*t",
    body: '"With most systems, you get 70% of what you hoped. With Odoo, you get more than what you expected." — Anonymous competitor',
  },
  {
    key: "lockin",
    title: "No vendor lock-in",
    body: "No proprietary data format, just PostgreSQL. You get the source code, GitHub access, and flexibility to host on our infrastructure or on premise.",
    link: { href: "https://github.com/odoo/odoo", label: "Follow us on GitHub", external: true },
  },
  {
    key: "pricing",
    title: "Fair pricing",
    body: "No usage-based pricing, no feature upselling, no long term contracts... just a single price per user — all inclusive.",
    link: { href: "/pricing", labelKey: "pricing" as const },
  },
];

export function ValueSections() {
  const t = useMessages();

  return (
    <>
      <section className="px-4 py-20 text-center lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-odoo-teal">
            {t.home.imagine}
          </p>
          <p className="text-lg text-gray-700 md:text-xl">
            <strong>{t.home.imagineLead}</strong>
          </p>
          <p className="mt-4 text-gray-600">{t.home.imagineBody}</p>
          <blockquote className="font-display mt-8 text-xl italic text-gray-800">
            {t.home.quote}
            <footer className="mt-2 text-sm not-italic text-gray-500">{t.home.quoteAuthor}</footer>
          </blockquote>
        </div>
      </section>

      <section className="bg-white px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display mb-12 text-center text-3xl text-gray-900 md:text-4xl">
            {t.home.levelUp}
          </h2>
          <div className="grid items-center gap-12 md:grid-cols-2">
            <article className="rounded-2xl border border-gray-100 p-8 shadow-sm">
              <h3 className="font-display mb-3 text-2xl text-gray-900">{t.home.productivity}</h3>
              <p className="mb-4 text-gray-600">{t.home.productivityBody}</p>
              <OdooLink href="/page/all-apps" className="font-semibold text-odoo-teal hover:underline">
                {t.home.compareSap} →
              </OdooLink>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <OdooImage src={homeImages.speed1} alt="" width={280} height={160} className="rounded-lg" />
                <OdooImage src={homeImages.speed3} alt="" width={280} height={160} className="rounded-lg" />
              </div>
            </article>
            <article className="rounded-2xl border border-gray-100 bg-gradient-to-br from-odoo-purple/5 to-odoo-teal/5 p-8">
              <h3 className="font-display mb-3 text-2xl text-gray-900">{t.home.nativeAi}</h3>
              <p className="mb-6 text-gray-600">{t.home.nativeAiBody}</p>
              <OdooImage
                src={homeImages.aiClaude}
                alt="AI"
                width={400}
                height={240}
                className="mx-auto rounded-lg"
              />
            </article>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 px-4 py-20 text-white lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display mb-12 text-center text-3xl md:text-4xl">{t.home.enterprise}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {valueCards.map((card) => (
              <article
                key={card.key}
                className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <h4 className="mb-2 text-lg font-bold text-odoo-yellow">{card.title}</h4>
                <p className="mb-3 text-sm text-gray-300">{card.body}</p>
                {card.link && (
                  <OdooLink
                    href={card.link.href}
                    external={card.link.external}
                    className="text-sm font-semibold text-odoo-teal hover:underline"
                  >
                    {card.link.label ??
                      (card.link.labelKey === "compare" ? `${t.home.compareSap} →` : "View Pricing →")}{" "}
                  </OdooLink>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
          <OdooImage
            src={homeImages.uniqueValue}
            alt=""
            width={200}
            height={80}
            className="mx-auto mb-4"
          />
          <h4 className="text-center text-sm font-bold uppercase text-odoo-purple">
            {t.home.testimonialTitle}
          </h4>
          <h6 className="mt-2 text-center text-xl font-bold">{t.home.testimonialUsers}</h6>
          <blockquote className="mt-6 border-l-4 border-odoo-purple pl-4 text-gray-700">
            {t.home.testimonialQuote}
          </blockquote>
          <div className="mt-6 flex items-center gap-4">
            <OdooImage
              src={homeImages.testimonialAvatar}
              alt={t.home.testimonialName}
              width={56}
              height={56}
              className="rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-900">{t.home.testimonialName}</p>
              <OdooImage
                src={homeImages.testimonialLogo}
                alt="KPMG"
                width={80}
                height={24}
                className="mt-1 opacity-70"
              />
              <p className="text-sm text-gray-500">{t.home.testimonialRole}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
