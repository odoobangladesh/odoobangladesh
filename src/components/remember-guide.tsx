"use client";

import { useEffect } from "react";
import { writeLastGuide } from "@/lib/last-guide";

/** Presentation helper: remembers the current guide for the hero “continue” link. */
export function RememberGuide({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  useEffect(() => {
    writeLastGuide({ href, title });
  }, [href, title]);

  return null;
}
