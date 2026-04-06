import { ImageResponse } from "next/og";
import { SITE_NAME } from "./lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #f8fafc 0%, #ffffff 45%, #e0f2fe 100%)",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            background: "#ffffff",
            border: "2px solid #e2e8f0",
            borderRadius: "32px",
            padding: "56px",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "110px",
              height: "110px",
              borderRadius: "28px",
              background: "linear-gradient(135deg, #2563eb 0%, #22c55e 100%)",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "56px",
              fontWeight: 700,
            }}
          >
            O
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              color: "#0f172a",
            }}
          >
            <div
              style={{
                fontSize: 72,
                lineHeight: 1.05,
                fontWeight: 800,
                letterSpacing: "-0.04em",
              }}
            >
              {SITE_NAME}
            </div>
            <div
              style={{
                marginTop: "18px",
                fontSize: 30,
                color: "#475569",
              }}
            >
              Fast, free image tools
            </div>
            <div
              style={{
                marginTop: "16px",
                fontSize: 22,
                color: "#64748b",
              }}
            >
              Compress • Convert • Resize • Crop
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
