import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — websites, Shopify stores and custom web apps`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(file: string) {
  return readFile(join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans", file));
}

export default async function OpenGraphImage() {
  const [semibold, regular] = await Promise.all([
    loadFont("Geist-SemiBold.ttf"),
    loadFont("Geist-Regular.ttf"),
  ]);

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
          fontFamily: "Geist",
          position: "relative",
        }}
      >
        {/* Soft cobalt glow: layered circles, because Satori can't rasterise radial gradients cleanly. */}
        {Array.from({ length: 16 }, (_, i) => 720 - i * 40).map((size) => (
          <div
            key={size}
            style={{
              position: "absolute",
              right: 120 - size / 2,
              top: 40 - size / 2,
              width: size,
              height: size,
              borderRadius: 9999,
              background: "rgba(47, 91, 255, 0.04)",
              display: "flex",
            }}
          />
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 32 32" fill="none">
            <rect x="2" y="3" width="28" height="26" rx="8" fill="#f7f7f5" />
            <path d="M2 11.25h28" stroke="#0a0b0f" strokeWidth="2" />
            <circle cx="8" cy="7.1" r="1.7" fill="#0a0b0f" />
            <rect x="8" y="16" width="10" height="3.6" rx="1.8" fill="#2f5bff" />
            <rect x="8" y="22.2" width="16" height="3" rx="1.5" fill="#0a0b0f" opacity="0.35" />
          </svg>
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 60, fontWeight: 600, lineHeight: 1.04, letterSpacing: -2.2, maxWidth: 1000 }}>
            Websites, stores and software, built around your business.
          </div>
          <div style={{ fontSize: 26, color: "#a3a9b6", maxWidth: 960, lineHeight: 1.4, fontWeight: 400 }}>
            A one-person software studio for local businesses and early-stage startups.
            Fixed-price projects, direct communication and support after launch.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
        { name: "Geist", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
