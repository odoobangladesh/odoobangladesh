"use client";

import Link from "next/link";
import GlareHover from "@/components/react-bits/GlareHover/GlareHover";

export function SeoSectionCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
  variant?: "standard" | "feature";
}) {
  return (
    <GlareHover
      width="100%"
      height="auto"
      background="transparent"
      borderRadius="var(--radius-control)"
      borderColor="transparent"
      glareColor="#ffffff"
      glareOpacity={0.18}
      glareSize={34}
      softness={0.7}
      variant="sheen"
      blendMode="soft-light"
      rimGlint={false}
      mode="hover"
      transitionDuration={500}
      className="!block w-full !place-items-stretch"
      style={{ display: "block" }}
    >
      <Link href={href} className="directory-row group w-full">
        <span className="directory-row-copy min-w-0">
          <span className="directory-row-title">{title}</span>
          <span className="directory-row-desc">{description}</span>
        </span>
        <span className="directory-row-chevron" aria-hidden="true">
          →
        </span>
      </Link>
    </GlareHover>
  );
}
