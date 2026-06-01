"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useLocalizedHref } from "@/components/providers/I18nProvider";

type OdooLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
};

export function OdooLink({ href, children, className, external }: OdooLinkProps) {
  const localize = useLocalizedHref();

  if (external || href.startsWith("http")) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  const localizedHref = localize(href);
  return (
    <Link href={localizedHref} className={className}>
      {children}
    </Link>
  );
}
