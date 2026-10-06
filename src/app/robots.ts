import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data";
export default function robots(): MetadataRoute.Robots { return { rules: [{ userAgent: "*", allow: "/", disallow: ["/thank-you", "/api/"] }, { userAgent: "OAI-SearchBot", allow: "/" }, { userAgent: "GPTBot", disallow: "/" }, { userAgent: "ChatGPT-User", allow: "/" }], sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL }; }
