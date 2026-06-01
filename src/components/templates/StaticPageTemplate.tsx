"use client";

import { Button } from "@/components/shared/Button";
import { CTASection } from "@/components/shared/CTASection";
import { OdooLink } from "@/components/shared/OdooLink";
import { OdooImage } from "@/components/shared/OdooImage";
import { apps } from "@/data/apps";
import { industries } from "@/data/industries";
import { appIconUrl } from "@/lib/odoo-cdn";
import type { StaticPage } from "@/data/types";

function PricingPage() {
  const plans = [
    {
      name: "One App Free",
      price: "$0",
      features: ["One app, unlimited users", "Odoo Online"],
      cta: { label: "Start free", href: "/trial" },
    },
    {
      name: "Standard",
      price: "$24.90",
      period: "/ user / month",
      features: ["All apps", "Odoo Online"],
      cta: { label: "Free trial", href: "/trial" },
      highlight: true,
    },
    {
      name: "Custom",
      price: "$49.00",
      period: "/ user / month",
      features: [
        "All apps",
        "Odoo Online / Odoo.sh / On-premise",
        "Odoo Studio",
        "Multi-Company",
        "External API",
      ],
      cta: { label: "Free trial", href: "/trial" },
    },
  ];

  return (
    <>
      <section className="bg-white px-4 py-16 text-center lg:px-8">
        <h1 className="font-display text-4xl text-gray-900 md:text-5xl">You are not dreaming!</h1>
        <p className="mt-4 text-gray-600">One price per user — all apps included.</p>
      </section>
      <section className="px-4 pb-16 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-2xl border p-8 ${
                plan.highlight
                  ? "border-odoo-purple bg-odoo-purple/5 shadow-lg ring-2 ring-odoo-purple"
                  : "border-gray-200 bg-white"
              }`}
            >
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="mt-4">
                <span className="text-3xl font-bold text-odoo-purple">{plan.price}</span>
                {plan.period && (
                  <span className="block text-sm text-gray-500">{plan.period}</span>
                )}
              </p>
              <ul className="mt-6 space-y-2 text-sm text-gray-600">
                {plan.features.map((f) => (
                  <li key={f}>✓ {f}</li>
                ))}
              </ul>
              <Button href={plan.cta.href} className="mt-6 w-full justify-center">
                {plan.cta.label}
              </Button>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-gray-500">
          All plans include unlimited support, hosting and maintenance. With no hidden costs,
          no limit on features or data: enjoy real transparency!
        </p>
      </section>
    </>
  );
}

function TrialPage() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-lg">
        <h1 className="font-display mb-2 text-center text-3xl">Start your free trial</h1>
        <p className="mb-6 text-center text-gray-600">Instant access. No credit card required.</p>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Work email"
            className="w-full rounded-lg border px-4 py-3"
            required
          />
          <input
            type="text"
            placeholder="Company name"
            className="w-full rounded-lg border px-4 py-3"
            required
          />
          <button
            type="submit"
            className="w-full rounded-full bg-odoo-purple py-3 font-semibold text-white hover:bg-odoo-purple-dark"
          >
            Start now — It&apos;s free
          </button>
        </form>
      </div>
    </section>
  );
}

function ContactPage({ title }: { title: string }) {
  return (
    <section className="px-4 py-16 lg:px-8">
      <div className="mx-auto max-w-xl">
        <h1 className="font-display mb-6 text-center text-3xl">{title}</h1>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Name" className="w-full rounded-lg border px-4 py-3" />
          <input type="email" placeholder="Email" className="w-full rounded-lg border px-4 py-3" />
          <textarea placeholder="Message" rows={5} className="w-full rounded-lg border px-4 py-3" />
          <button
            type="submit"
            className="w-full rounded-full bg-odoo-purple py-3 font-semibold text-white"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}

function LoginPage() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border bg-white p-8 shadow">
        <h1 className="font-display mb-6 text-center text-2xl">Sign in</h1>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Email" className="w-full rounded-lg border px-4 py-3" />
          <input type="password" placeholder="Password" className="w-full rounded-lg border px-4 py-3" />
          <button type="submit" className="w-full rounded-full bg-odoo-purple py-3 text-white">
            Sign in
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          <OdooLink href="/trial" className="text-odoo-teal hover:underline">
            Start free trial
          </OdooLink>
        </p>
      </div>
    </section>
  );
}

function AppsListPage() {
  return (
    <section className="px-4 py-16 lg:px-8">
      <h1 className="font-display mb-10 text-center text-4xl">All Apps</h1>
      <div className="mx-auto grid max-w-6xl gap-8">
        {["Finance", "Sales", "Websites", "Supply Chain", "Human Resources", "Marketing", "Services", "Productivity"].map(
          (cat) => (
            <div key={cat}>
              <h2 className="mb-4 text-lg font-bold text-odoo-purple">{cat}</h2>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {apps
                  .filter((a) => a.category === cat)
                  .map((app) => (
                    <OdooLink
                      key={app.slug}
                      href={`/app/${app.slug}`}
                      className="flex items-start gap-3 rounded-lg border p-4 hover:border-odoo-purple hover:shadow"
                    >
                      <OdooImage
                        src={appIconUrl(app.slug)}
                        alt=""
                        width={32}
                        height={32}
                        className="h-8 w-8 shrink-0 object-contain"
                      />
                      <div>
                        <span className="font-medium">{app.name}</span>
                        <p className="mt-1 text-xs text-gray-500">{app.tagline}</p>
                      </div>
                    </OdooLink>
                  ))}
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}

function IndustriesListPage() {
  return (
    <section className="px-4 py-16 lg:px-8">
      <h1 className="font-display mb-10 text-center text-4xl">Browse all Industries</h1>
      <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {industries.map((ind) => (
          <OdooLink
            key={ind.slug}
            href={`/industries/${ind.slug}`}
            className="rounded-lg border p-4 hover:border-odoo-teal"
          >
            <span className="text-xs font-bold uppercase text-odoo-purple">{ind.category}</span>
            <p className="font-medium">{ind.name}</p>
          </OdooLink>
        ))}
      </div>
    </section>
  );
}

export function StaticPageTemplate({ page }: { page: StaticPage }) {
  if (page.template === "pricing") {
    return (
      <>
        <PricingPage />
        <CTASection />
      </>
    );
  }
  if (page.template === "trial") return <TrialPage />;
  if (page.template === "contact") return <ContactPage title={page.title.split("|")[0].trim()} />;
  if (page.template === "login") return <LoginPage />;
  if (page.template === "apps-list") return <AppsListPage />;
  if (page.template === "industries-list") return <IndustriesListPage />;

  return (
    <>
      <section className="bg-gradient-to-r from-odoo-purple/10 to-odoo-teal/10 px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-3xl text-gray-900 md:text-4xl">
            {page.title.split("|")[0].trim()}
          </h1>
          <p className="mt-4 text-gray-600">{page.description}</p>
        </div>
      </section>
      {page.sections && page.sections.length > 0 && (
        <section className="px-4 py-12 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-10">
            {page.sections.map((section) => (
              <article key={section.heading}>
                <h2 className="mb-3 text-xl font-bold text-gray-900">{section.heading}</h2>
                <p className="text-gray-600">{section.body}</p>
                {section.items && (
                  <ul className="mt-3 list-inside list-disc text-gray-600">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>
      )}
      <CTASection />
    </>
  );
}
