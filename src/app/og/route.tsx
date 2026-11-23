import { renderOgImage } from "@/lib/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title")?.trim() || "Odoo Bangladesh";
  const label = searchParams.get("label")?.trim() || "Community";
  return renderOgImage({ title, label });
}
