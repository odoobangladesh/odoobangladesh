import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="text-sm font-semibold">Odoo Bangladesh</div>
          <p className="mt-2 max-w-md text-sm text-zinc-600">
            Independent community portal for Odoo ERP learners, professionals,
            and organizations in Bangladesh. Neutral resources, training
            pathways, and ecosystem connections.
          </p>
          <p className="mt-4 text-sm text-zinc-600">
            Contact:{" "}
            <a
              className="underline underline-offset-4 hover:text-zinc-950"
              href={`mailto:${siteConfig.contactEmail}`}
            >
              {siteConfig.contactEmail}
            </a>
          </p>
        </div>
        <div className="grid gap-2 text-sm">
          <div className="font-medium text-zinc-900">
            Explore
          </div>
          <Link className="text-zinc-600 hover:underline" href="/blog">
            Blog
          </Link>
          <Link
            className="text-zinc-600 hover:underline"
            href="/learning-center"
          >
            Learning Center
          </Link>
          <Link
            className="text-zinc-600 hover:underline"
            href="/implementation-guide"
          >
            Implementation Guide
          </Link>
          <Link
            className="text-zinc-600 hover:underline"
            href="/pricing-guide"
          >
            Pricing Guide
          </Link>
        </div>
        <div className="grid gap-2 text-sm">
          <div className="font-medium text-zinc-900">
            Community
          </div>
          <Link className="text-zinc-600 hover:underline" href="/events">
            Events & webinars
          </Link>
          <Link className="text-zinc-600 hover:underline" href="/forum">
            Forum
          </Link>
          <Link className="text-zinc-600 hover:underline" href="/faq">
            FAQ
          </Link>
          <Link className="text-zinc-600 hover:underline" href="/about">
            About
          </Link>
        </div>
      </div>
      <div className="border-t border-zinc-200 py-6 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} Odoo Bangladesh Community. Not affiliated
        with Odoo S.A.
      </div>
    </footer>
  );
}

