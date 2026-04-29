import { NextResponse } from "next/server";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { email?: string } | null;
  const email = String(body?.email ?? "").trim();
  if (!email) return NextResponse.json({ ok: false, error: "Email is required" }, { status: 400 });
  if (!isValidEmail(email))
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });

  // TODO: Wire to an email service / database later.
  console.log("[newsletter]", { email, ts: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}

