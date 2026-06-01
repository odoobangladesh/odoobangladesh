import { notFound } from "next/navigation";
import { AppPageTemplate } from "@/components/templates/AppPageTemplate";
import { apps, appsBySlug } from "@/data/apps";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const app = appsBySlug[slug];
  if (!app) return { title: "App not found" };
  return {
    title: `${app.name} | Odoo`,
    description: app.description,
  };
}

export default async function AppPage({ params }: Props) {
  const { slug } = await params;
  const app = appsBySlug[slug];
  if (!app) notFound();
  return <AppPageTemplate app={app} />;
}
