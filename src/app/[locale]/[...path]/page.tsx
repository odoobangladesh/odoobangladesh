import { notFound } from "next/navigation";
import { StaticPageTemplate } from "@/components/templates/StaticPageTemplate";
import { staticPages, staticPagesByPath } from "@/data/static-pages";

type Props = { params: Promise<{ path: string[] }> };

export async function generateStaticParams() {
  return staticPages.map((page) => ({
    path: page.path.split("/"),
  }));
}

export async function generateMetadata({ params }: Props) {
  const { path } = await params;
  const pagePath = path.join("/");
  const page = staticPagesByPath[pagePath];
  if (!page) return { title: "Page not found" };
  return {
    title: page.title,
    description: page.description,
  };
}

export default async function CatchAllPage({ params }: Props) {
  const { path } = await params;
  const pagePath = path.join("/");
  const page = staticPagesByPath[pagePath];
  if (!page) notFound();
  return <StaticPageTemplate page={page} />;
}
