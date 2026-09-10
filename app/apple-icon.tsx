import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0b0f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 32 32" fill="none">
          <rect x="2" y="3" width="28" height="26" rx="8" fill="#f7f7f5" />
          <path d="M2 11.25h28" stroke="#0a0b0f" strokeWidth="2" />
          <circle cx="8" cy="7.1" r="1.7" fill="#0a0b0f" />
          <rect x="8" y="16" width="10" height="3.6" rx="1.8" fill="#2f5bff" />
          <rect x="8" y="22.2" width="16" height="3" rx="1.5" fill="#0a0b0f" opacity="0.35" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
