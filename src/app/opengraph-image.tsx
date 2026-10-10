import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { COMPANY_NAME } from "@/data";

export const alt = `${COMPANY_NAME}, corporate training and professional learning in India`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/logo_dark.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", gap: 64, padding: "0 88px", background: "#f7f8fa", color: "#0e1726", borderBottom: "18px solid #1d2a63" }}>
      <img src={logoSrc} width={304} height={344} alt="" style={{ flexShrink: 0 }} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 5, textTransform: "uppercase", color: "#bd6d38" }}>Corporate learning and development</div>
        <div style={{ marginTop: 18, fontSize: 92, fontWeight: 800, letterSpacing: -3, lineHeight: 1 }}>{COMPANY_NAME}</div>
        <div style={{ marginTop: 22, fontSize: 40, fontWeight: 600, lineHeight: 1.2, color: "#1d2a63", maxWidth: 680 }}>Corporate Training and Professional Learning in India</div>
        <div style={{ marginTop: 26, fontSize: 25, color: "#475569", maxWidth: 680 }}>Technology · Leadership · ITIL · Agile · ISO and GRC</div>
        <div style={{ marginTop: 34, fontSize: 26, fontWeight: 700, color: "#0e1726" }}>www.trainingenie.com</div>
      </div>
    </div>,
    size,
  );
}
