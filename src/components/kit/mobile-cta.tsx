"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { CONTACT_INFO } from "@/data";
import { PRIMARY_CTA, UI_LABELS } from "@/data/site-copy";
import { enquiryHref, topicForPath } from "@/lib/enquiry";
import { ButtonLink } from "@/components/tg/button";
import { PhoneIcon } from "@/components/tg/icons";

// Pages that are themselves the enquiry (or its confirmation) never show the bar.
const HIDDEN_ON = ["/contact-us", "/thank-you"];

// The bar may show once the visitor has scrolled at all (80px), so it takes over as soon as the hero's
// pills leave the screen; until then those pills (a `data-cta-zone`) keep it hidden.
const subscribe = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => { window.removeEventListener("scroll", onChange); window.removeEventListener("resize", onChange); };
};
const pastTop = () => window.scrollY > 80;
const onServer = () => false;

/**
 * The site's one phone action bar (below lg): a round outline Call button and the black
 * "Discuss your training needs" pill, pinned to the bottom of the screen. On a programme or training area
 * page the pill opens the enquiry form with that programme or area as the topic, as the page's own pills do.
 *
 * It slides in as soon as the page is scrolled and no block that already carries the same actions is on
 * screen: anything in the page marked `data-cta-zone` (a hero's pill row, a programme's Next steps, the
 * closing band's pill and contacts), which counts while its own enquiry pill is on screen (the whole
 * block where it has none), and the footer as a whole (so it never covers the footer's last lines,
 * which reserve no room for it). So it takes over as soon as a hero's black pill leaves, and steps aside
 * only once the next one arrives, not as soon as the closing band's black edge or a Next steps heading
 * appears: exactly one enquiry pill is in reach at any point, and two black pills never show a few
 * pixels apart. It is not rendered on /contact-us or /thank-you. While hidden it is inert, aria-hidden
 * and (once it has slid out) invisible, so it never takes focus and never shows in a full-page capture
 * just under the fold. It is its own labelled landmark (an aside beside main and the footer), so its
 * links never sit outside one. From lg the header pill does this job. The bar is solid white (nothing
 * smears through it) and is left out on short landscape screens, where with the header it would cover
 * a third of the view; from sm the pill keeps its natural width at the right.
 */
export function MobileCta() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribe, pastTop, onServer);
  const [covered, setCovered] = useState<{ path: string; value: boolean } | null>(null);
  const hiddenHere = HIDDEN_ON.includes(pathname);

  // Every in-page action block (`data-cta-zone`, by its enquiry pill) and the footer: while any of them
  // is in view the bar steps aside. Observed again on every navigation, since each page renders its own.
  useEffect(() => {
    if (hiddenHere || !("IntersectionObserver" in window)) return;
    const zones = Array.from(document.querySelectorAll("main [data-cta-zone]"), (zone) => zone.querySelector("a[href^='/contact-us']") ?? zone);
    const targets = [document.querySelector("body > footer"), ...zones].filter((element): element is Element => element !== null);
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setCovered({ path: pathname, value: visible.size > 0 });
    });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname, hiddenHere]);

  if (hiddenHere) return null;
  const shown = scrolled && !(covered?.path === pathname && covered.value);
  const phone = CONTACT_INFO.phones[0];
  const href = enquiryHref(topicForPath(pathname));

  return <aside aria-label="Quick contact" inert={!shown} aria-hidden={!shown} className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[translate,visibility] motion-reduce:transition-none sm:px-8 lg:hidden [@media(max-height:30rem)]:hidden ${shown ? "visible translate-y-0 duration-(--motion-in) ease-out" : "invisible translate-y-full duration-(--motion-out) ease-in"}`}>
    <div className="flex gap-3 max-[359px]:gap-2 sm:justify-end">
      <ButtonLink href={`tel:${phone.replace(/\s+/g, "")}`} variant="outline" className="w-12 shrink-0 px-0! sm:w-auto sm:px-6!">
        <PhoneIcon className="size-[18px]" />
        <span className="sr-only">Call TraininGenie</span>
        <span aria-hidden="true" className="hidden sm:inline">{UI_LABELS.call}</span>
      </ButtonLink>
      <ButtonLink href={href} className="min-w-0 flex-1 max-[359px]:px-3! sm:flex-none">{PRIMARY_CTA.label}</ButtonLink>
    </div>
  </aside>;
}
