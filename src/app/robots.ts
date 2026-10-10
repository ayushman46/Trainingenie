import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data";
// AI search and model crawlers are allowed explicitly so TraininGenie can be cited and recognized by AI assistants (ChatGPT, Claude, Perplexity, Gemini, Copilot, Apple Intelligence).
const AI_CRAWLERS = ["OAI-SearchBot", "ChatGPT-User", "GPTBot", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "CCBot", "meta-externalagent", "Amazonbot", "DuckAssistBot", "MistralAI-User"];
const PRIVATE_PATHS = ["/thank-you", "/api/"];
export default function robots(): MetadataRoute.Robots { return { rules: [{ userAgent: "*", allow: "/", disallow: PRIVATE_PATHS }, { userAgent: AI_CRAWLERS, allow: "/", disallow: PRIVATE_PATHS }], sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL }; }
