import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

export function renderOgImage({
  title,
  label = "Guide",
}: {
  title: string;
  label?: string;
}) {
  const safeTitle = title.slice(0, 120);
  const safeLabel = label.slice(0, 40);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background: "linear-gradient(145deg, #064634 0%, #0a6b4f 55%, #0d1b16 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#DDF1E8",
            }}
          />
          Odoo Bangladesh
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "8px 16px",
              borderRadius: 999,
              background: "rgba(221, 241, 232, 0.16)",
              color: "#DDF1E8",
              fontSize: 22,
              fontWeight: 500,
            }}
          >
            {safeLabel}
          </div>
          <div
            style={{
              fontSize: safeTitle.length > 70 ? 48 : 58,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              maxWidth: 980,
            }}
          >
            {safeTitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#DDF1E8",
            fontSize: 22,
          }}
        >
          <span>Community learning portal</span>
          <span>odoobangladesh.com</span>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}

export function ogImagePath(title: string, label: string): string {
  const params = new URLSearchParams({ title, label });
  return `/og?${params.toString()}`;
}
