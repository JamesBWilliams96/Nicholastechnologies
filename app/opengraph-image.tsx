import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — websites, Shopify stores and custom web apps`;
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
          background: "#0a0b0f",
          color: "#f7f7f5",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -160,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "radial-gradient(closest-side, rgba(47,91,255,0.55), rgba(124,92,255,0.18) 60%, transparent)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 15,
              background: "#f7f7f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
              <path d="M10.5 22V10l11 12V10" stroke="#0a0b0f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 66, fontWeight: 600, lineHeight: 1.02, letterSpacing: -2.5, maxWidth: 900 }}>
            Websites, stores and software, built around your business.
          </div>
          <div style={{ fontSize: 26, color: "#a3a9b6", maxWidth: 860, lineHeight: 1.4 }}>
            A one-person software studio for local businesses and early-stage startups.
            Fixed-price projects. Direct communication. Support after launch.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
