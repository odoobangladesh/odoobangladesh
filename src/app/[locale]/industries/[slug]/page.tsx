import { notFound } from "next/navigation";
import { IndustryPageTemplate } from "@/components/templates/IndustryPageTemplate";
import { industries, industriesBySlug } from "@/data/industries";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return industries.map((ind) => ({ slug: ind.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const industry = industriesBySlug[slug];
  if (!industry) return { title: "Industry not found" };
  return {
    title: `${industry.name} | Odoo`,
    description: industry.description,
  };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = industriesBySlug[slug];
  if (!industry) notFound();
  return <IndustryPageTemplate industry={industry} />;
}
