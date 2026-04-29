import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(900px circle at 20% 20%, rgba(176, 65, 214, 0.25), transparent 55%), radial-gradient(900px circle at 75% 25%, rgba(86, 121, 255, 0.20), transparent 55%), radial-gradient(900px circle at 60% 90%, rgba(16, 185, 129, 0.14), transparent 60%), #ffffff",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
        }}
      >
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 18,
              border: "1px solid rgba(20,20,20,0.10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            OB
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>
            {siteConfig.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.05, letterSpacing: -1 }}>
            Odoo community & learning hub
          </div>
          <div style={{ marginTop: 18, fontSize: 26, color: "rgba(20,20,20,0.70)" }}>
            Resources • Implementation guidance • Training • Bangladesh
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18 }}>
          <div style={{ color: "rgba(20,20,20,0.60)" }}>{siteConfig.domain}</div>
          <div style={{ color: "rgba(20,20,20,0.60)" }}>Independent community portal</div>
        </div>
      </div>
    ),
    size
  );
}

