import { ImageResponse } from "next/og";

export const alt = "Vice Yazılım — Dijital ürün ve büyüme ajansı";
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
          background:
            "radial-gradient(circle at 78% 22%, #263b63 0%, #0c1423 30%, #05070b 64%)",
          color: "white",
          padding: "72px 78px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.08em",
          }}
        >
          <span style={{ fontSize: 50, fontWeight: 400 }}>∫</span>
          VICE YAZILIM
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              maxWidth: 980,
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.045em",
            }}
          >
            Dijital ürünleri büyüme sistemlerine dönüştürüyoruz.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 27,
              color: "rgba(255,255,255,0.66)",
            }}
          >
            Web tasarım · Yazılım · E-ticaret · SEO · Google Ads
          </div>
        </div>
      </div>
    ),
    size,
  );
}
