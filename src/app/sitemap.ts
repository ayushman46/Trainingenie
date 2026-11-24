import type { MetadataRoute } from "next";
import { ARTICLES } from "@/content/articles";
import { COURSES, SITE_URL } from "@/data";
// The date the site's content last changed, sent as each URL's lastmod (Google uses it to decide what to recrawl).
// Update it whenever page content changes.
const LAST_MODIFIED = "2026-11-23";
export default function sitemap(): MetadataRoute.Sitemap { const corePaths = ["", "what-we-do", "corporate-training-services", "technology-training", "leadership-soft-skills-training", "itil-prince2-agile-training", "iso-standards-training", "training-methodology", "about-us", "our-team", "clients-and-testimonials", "past-trainings", "faqs", "blog", "contact-us", "privacy-policy"]; const coursePaths = COURSES.map((course) => course.slug); return [...corePaths.map((path) => ({ url: `${SITE_URL}/${path}`, lastModified: LAST_MODIFIED, changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : corePaths.slice(0, 8).includes(path) ? 0.9 : 0.7 })), ...coursePaths.map((path) => ({ url: `${SITE_URL}/${path}`, lastModified: LAST_MODIFIED, changeFrequency: "monthly" as const, priority: 0.8 })), ...ARTICLES.map((article) => ({ url: `${SITE_URL}/blog/${article.slug}`, lastModified: article.updated, changeFrequency: "monthly" as const, priority: 0.7 }))]; }
