import { NextResponse } from "next/server";
import { z } from "zod";
import { captureLead } from "@/lib/leads";
import { rateLimitRequest } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/site";

const schema = z.object({
  email: z.string().email(),
  asset: z.string().max(100).optional().or(z.literal("")),
  consent: z.boolean().optional(),
  honeypot: z.string().max(200).optional().or(z.literal("")),
  source_path: z.string().max(500).optional().or(z.literal("")),
  referrer: z.string().max(1000).optional().or(z.literal("")),
  utm_source: z.string().max(200).optional().or(z.literal("")),
  utm_medium: z.string().max(200).optional().or(z.literal("")),
  utm_campaign: z.string().max(200).optional().or(z.literal("")),
  utm_term: z.string().max(200).optional().or(z.literal("")),
  utm_content: z.string().max(200).optional().or(z.literal("")),
});

export async function POST(req: Request) {
  const limited = await rateLimitRequest(req, "newsletter");
  if (!limited.success) {
    return NextResponse.json(
      { ok: false, error: "Too many requests" },
      { status: 429 },
    );
  }

  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid email" },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Plain newsletter subscribe requires explicit consent; gated asset unlocks
  // treat the unlock action as consent for that asset email.
  if (!data.asset && data.consent !== true) {
    return NextResponse.json(
      { ok: false, error: "Consent required" },
      { status: 400 },
    );
  }

  try {
    await captureLead({
      kind: "newsletter",
      email: data.email,
      lead_type: "newsletter",
      source: siteConfig.leadSource,
      asset: data.asset || undefined,
      consentAt:
        data.consent === true || Boolean(data.asset)
          ? new Date().toISOString()
          : undefined,
      source_path: data.source_path || undefined,
      referrer: data.referrer || undefined,
      utm_source: data.utm_source || undefined,
      utm_medium: data.utm_medium || undefined,
      utm_campaign: data.utm_campaign || undefined,
      utm_term: data.utm_term || undefined,
      utm_content: data.utm_content || undefined,
      honeypot: data.honeypot || undefined,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to store subscription" },
      { status: 502 },
    );
  }
}
