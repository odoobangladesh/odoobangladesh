import Link from "next/link";
import { SiteBrandLockup } from "@/components/site-logo";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-brand-deep text-on-brand">
      <div className="site-container grid gap-10 py-12 md:grid-cols-4 md:py-16">
        <div className="md:col-span-2">
          <SiteBrandLockup onDark />
          <p className="mt-4 max-w-md text-sm leading-6 text-brand-tint">
            Independent community portal for Odoo ERP learners, professionals,
            and organizations in Bangladesh. Neutral resources, training
            pathways, and ecosystem connections.
          </p>
          <p className="mt-4 text-sm text-brand-tint">
            Contact:{" "}
            <a
              className="underline underline-offset-4 hover:text-on-brand"
              href={`mailto:${siteConfig.contactEmail}`}
            >
              {siteConfig.contactEmail}
            </a>
          </p>
        </div>
        <div className="grid gap-2 text-sm">
          <div className="font-medium text-on-brand">Explore</div>
          <Link className="text-brand-tint hover:text-on-brand hover:underline" href="/blog">
            Blog
          </Link>
          <Link
            className="text-brand-tint hover:text-on-brand hover:underline"
            href="/learning-center"
          >
            Learning Center
          </Link>
          <Link
            className="text-brand-tint hover:text-on-brand hover:underline"
            href="/resources"
          >
            Resources
          </Link>
          <Link
            className="text-brand-tint hover:text-on-brand hover:underline"
            href="/implementation-guide"
          >
            Implementation Guide
          </Link>
          <Link
            className="text-brand-tint hover:text-on-brand hover:underline"
            href="/pricing-guide"
          >
            Pricing Guide
          </Link>
        </div>
        <div className="grid gap-2 text-sm">
          <div className="font-medium text-on-brand">Community</div>
          <Link className="text-brand-tint hover:text-on-brand hover:underline" href="/events">
            Events & webinars
          </Link>
          <Link className="text-brand-tint hover:text-on-brand hover:underline" href="/forum">
            Forum
          </Link>
          <Link className="text-brand-tint hover:text-on-brand hover:underline" href="/faq">
            FAQ
          </Link>
          <Link className="text-brand-tint hover:text-on-brand hover:underline" href="/about">
            About
          </Link>
        </div>
      </div>
      <div className="border-t border-white/14 py-6 text-center text-[0.875rem] text-on-brand opacity-100">
        © {new Date().getFullYear()} Odoo Bangladesh Community. Not affiliated
        with Odoo S.A.
      </div>
    </footer>
  );
}
