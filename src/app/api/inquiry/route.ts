import { NextResponse } from "next/server";
import { z } from "zod";
import { captureLead, withDefaults } from "@/lib/leads";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().max(60).optional().or(z.literal("")),
  company: z.string().max(160).optional().or(z.literal("")),
  role: z.enum([
    "business",
    "professional",
    "student",
    "developer",
    "organization",
  ]),
  interest: z.enum([
    "erp-assessment",
    "implementation-guidance",
    "talk-to-specialist",
    "functional-training",
    "technical-training",
    "company-training",
    "webinar",
    "care-plan",
  ]),
  package: z
    .enum(["starter", "business", "growth", "enterprise", "care-plan"])
    .optional()
    .or(z.literal("")),
  message: z.string().max(5000).optional().or(z.literal("")),
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
  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid payload" },
      { status: 400 },
    );
  }

  const data = parsed.data;

  try {
    const result = await captureLead(
      withDefaults({
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        company: data.company || undefined,
        role: data.role,
        interest: data.interest,
        package: data.package || undefined,
        message: data.message || undefined,
        source_path: data.source_path || undefined,
        referrer: data.referrer || undefined,
        utm_source: data.utm_source || undefined,
        utm_medium: data.utm_medium || undefined,
        utm_campaign: data.utm_campaign || undefined,
        utm_term: data.utm_term || undefined,
        utm_content: data.utm_content || undefined,
        honeypot: data.honeypot || undefined,
      }),
    );

    return NextResponse.json({
      ok: true,
      lead_type: "lead_type" in result ? result.lead_type : undefined,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to store lead" },
      { status: 502 },
    );
  }
}
