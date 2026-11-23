import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type LimitResult = { success: boolean; remaining?: number };

let limiter: Ratelimit | null | undefined;

function getLimiter(): Ratelimit | null {
  if (limiter !== undefined) return limiter;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    limiter = null;
    return null;
  }

  limiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(10, "10 m"),
    analytics: false,
    prefix: "obd:rl",
  });
  return limiter;
}

/** Best-effort in-memory limiter for local/dev when Upstash is unset. */
const memoryHits = new Map<string, { count: number; resetAt: number }>();

function memoryLimit(key: string, max = 20, windowMs = 10 * 60 * 1000): LimitResult {
  const now = Date.now();
  const row = memoryHits.get(key);
  if (!row || row.resetAt <= now) {
    memoryHits.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: max - 1 };
  }
  if (row.count >= max) return { success: false, remaining: 0 };
  row.count += 1;
  return { success: true, remaining: max - row.count };
}

export async function rateLimitRequest(
  req: Request,
  bucket: string,
): Promise<LimitResult> {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip")?.trim() ||
    "unknown";
  const key = `${bucket}:${ip}`;
  const upstash = getLimiter();
  if (!upstash) return memoryLimit(key);

  const result = await upstash.limit(key);
  return { success: result.success, remaining: result.remaining };
}
