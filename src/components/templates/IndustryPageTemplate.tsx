import { Button } from "@/components/shared/Button";
import { CTASection } from "@/components/shared/CTASection";
import type { IndustryItem } from "@/data/types";

export function IndustryPageTemplate({ industry }: { industry: IndustryItem }) {
  return (
    <>
      <section className="bg-gradient-to-br from-odoo-purple to-odoo-teal px-4 py-16 text-white lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-white/70">
            {industry.category}
          </p>
          <h1 className="font-display mb-4 text-4xl md:text-5xl">{industry.name}</h1>
          <p className="mb-2 text-xl text-white/90">{industry.tagline}</p>
          <p className="mb-8 text-white/80">{industry.description}</p>
          <Button href="/trial" variant="secondary" className="bg-white text-odoo-purple">
            Start now - It&apos;s free
          </Button>
        </div>
      </section>

      <section className="px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display mb-8 text-center text-3xl">Solutions for your industry</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {industry.solutions.map((solution) => (
              <li
                key={solution}
                className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm"
              >
                <span className="font-medium text-gray-800">{solution}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
