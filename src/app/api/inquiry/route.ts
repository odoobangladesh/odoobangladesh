import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().max(60).optional().or(z.literal("")),
  role: z.enum(["business", "professional", "student", "developer", "organization"]),
  interest: z.enum([
    "erp-assessment",
    "implementation-guidance",
    "talk-to-specialist",
    "functional-training",
    "technical-training",
    "webinar",
  ]),
  message: z.string().max(5000).optional().or(z.literal("")),
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

  // Placeholder: send email / store in DB / CRM later.
  return NextResponse.json({ ok: true });
}

