/**
 * Verify Cloudflare Turnstile token.
 * When TURNSTILE_SECRET_KEY is unset (local/dev), verification is skipped.
 */
export async function verifyTurnstile(
  token: string | undefined | null,
  remoteip?: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token?.trim()) return false;

  const body = new URLSearchParams({
    secret,
    response: token.trim(),
  });
  if (remoteip) body.set("remoteip", remoteip);

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body,
      },
    );
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

export function turnstileSiteKey(): string | undefined {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || undefined;
}
