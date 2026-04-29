import { NextResponse } from "next/server";

type InquiryPayload = {
  name: string;
  email: string;
  topic: string;
  company?: string;
  message: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Partial<InquiryPayload> | null;
  if (!body) return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const topic = String(body.topic ?? "").trim();
  const company = String(body.company ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  // TODO: Wire to email / CRM later (e.g., Postmark, Resend, HubSpot, Airtable).
  // For now, we accept and return ok for development.
  const record = { name, email, topic, company, message, ts: new Date().toISOString() };
  console.log("[inquiry]", record);

  return NextResponse.json({ ok: true });
}

