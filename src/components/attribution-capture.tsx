"use client";

import { useEffect } from "react";
import { captureFirstTouch } from "@/lib/utm";

/** Captures first-touch UTMs + landing path once per browser session. */
export function AttributionCapture() {
  useEffect(() => {
    captureFirstTouch();
  }, []);
  return null;
}
