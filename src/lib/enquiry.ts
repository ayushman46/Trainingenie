import { COURSES } from "@/data";
import { PRIMARY_CTA } from "@/data/site-copy";

// The four training areas' h1s, as each area page passes them to AreaPage.
const AREA_TOPICS: Record<string, string> = {
  "/technology-training": "Technology Training",
  "/leadership-soft-skills-training": "Leadership and Soft Skills Training",
  "/itil-prince2-agile-training": "Management Systems and Frameworks",
  "/iso-standards-training": "ISO, Standards and GRC Training",
};

/**
 * Where an enquiry pill leads: the form on /contact-us (#enquiry), with `topic` filled into its Training
 * topic field when given (the form follows `?topic=`, never overwriting what the visitor typed).
 */
export const enquiryHref = (topic?: string) => (topic ? `/contact-us?topic=${encodeURIComponent(topic)}#enquiry` : PRIMARY_CTA.href);

/**
 * The topic a page's enquiry pills carry: a programme page's title or a training area's h1, so the
 * site-wide pills (header, menu sheet, phone action bar) prefill the form as the page's own pills do.
 * Any other page has none.
 */
export const topicForPath = (pathname: string) => COURSES.find((course) => `/${course.slug}` === pathname)?.title ?? AREA_TOPICS[pathname];
