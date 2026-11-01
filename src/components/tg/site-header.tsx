"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore, type FocusEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { CONTACT_INFO, COURSES } from "@/data";
import { AREA_COPY, COMPANY_MENU, PRIMARY_CTA, UI_LABELS, type AreaSlug } from "@/data/site-copy";
import { enquiryHref, topicForPath } from "@/lib/enquiry";
import { AREAS } from "@/components/site/areas";
import { lockPageScroll, openSiteSearch, SEARCH_OPEN_EVENT, SearchButton } from "@/components/kit/command-menu";
import { ButtonLink } from "./button";
import { Container } from "./container";
import { ChevronIcon, CloseIcon, MenuIcon, SearchIcon } from "./icons";
import { CLOSE_MENU_EVENT, HEADER_TUCK_FROM } from "./smooth-anchors";
import { TextLink } from "./text-link";
import { Wordmark } from "./wordmark";

type MenuName = "training" | "company" | "mobile";
// `switched`: this desktop menu replaced the other one, so the swap happens in one frame.
type Opened = { name: MenuName; path: string; switched?: boolean };

const TRAINING_PATHS = ["/corporate-training-services", ...AREAS.map((area) => area.href), ...COURSES.map((course) => `/${course.slug}`)];
const COMPANY_PATHS = COMPANY_MENU.map((item) => item.href);
const tel = (phone: string) => `tel:${phone.replace(/\s+/g, "")}`;

// The page's scroll state, kept outside React and read through useSyncExternalStore:
// - "top": within 8px of the top (no hairline);
// - "scrolled": past 8px (the bottom hairline shows);
// - "away": scrolling down, more than 400px (HEADER_TUCK_FROM) from the top. Below lg the header
//   slides up out of view, and it comes back on any scroll up (by more than a few pixels) or near the top.
type ScrollState = "top" | "scrolled" | "away";
// Movements smaller than this are ignored, so a finger resting on the screen or a momentum bounce
// never flickers the header.
const JITTER = 6;
let scrollState: ScrollState = "top";
let lastY = 0;
const updateScroll = () => {
  const y = Math.max(0, window.scrollY);
  const delta = y - lastY;
  let away = scrollState === "away";
  if (y <= HEADER_TUCK_FROM) away = false;
  else if (delta > JITTER) away = true;
  else if (delta < -JITTER) away = false;
  if (y <= HEADER_TUCK_FROM || Math.abs(delta) > JITTER) lastY = y;
  scrollState = y <= 8 ? "top" : away ? "away" : "scrolled";
};
const subscribeScroll = (onChange: () => void) => {
  const onScroll = () => { updateScroll(); onChange(); };
  window.addEventListener("scroll", onScroll, { passive: true });
  // The page may already be scrolled (a reload, or Back to a scrolled page): start from there, with
  // the header in view, so it only slides away on a real scroll down.
  lastY = Math.max(0, window.scrollY);
  scrollState = lastY <= 8 ? "top" : "scrolled";
  onChange();
  return () => window.removeEventListener("scroll", onScroll);
};
const readScroll = () => scrollState;
const atTop = (): ScrollState => "top";

/** Keys pressed inside the search dialog belong to it, not to the header's menus. */
const inDialog = (event: KeyboardEvent) => event.target instanceof Element && event.target.closest("dialog[open]") !== null;


/**
 * The nav label. The current page (or section) carries a 2px ink underline; hover, keyboard focus and
 * an open menu show a lighter 1.5px grey one, so pointing at a link never looks like being on it.
 */
function NavText({ current, open = false, children }: { current: boolean; open?: boolean; children: ReactNode }) {
  return <span className={`underline-offset-[7px] ${current ? "underline decoration-2" : `decoration-border-strong decoration-[1.5px] group-hover/nav:underline group-focus-visible/nav:underline ${open ? "underline" : ""}`}`}>{children}</span>;
}

/** The small grey heading at the top of a menu column ("Training areas", "Focused programmes"). */
function MenuHeading({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return <p id={id} className={`type-label text-muted-foreground ${className}`}>{children}</p>;
}

/**
 * The sticky white site header, Nike style (64px). Desktop (lg and up): the wordmark on the left, the
 * main nav centred (16px medium ink, underlined on hover), and on the right the grey search pill and
 * the black pill CTA. Training and Company open full-width white panels under the header. Below lg:
 * the wordmark, a search button and a Menu button that opens a full-screen white sheet, rendered as a
 * sibling after <header> so that nothing on the header can collapse it.
 *
 * The black pill (and the sheet's pinned one) opens the enquiry form, with the page's programme or
 * training area as the topic (`topicForPath`), as the page's own pills do. On /contact-us it is a
 * same-page "#enquiry" link, which SmoothAnchors scrolls to the form (keeping any ?topic= in the URL),
 * and the desktop pill is left out on /thank-you, where the enquiry has just been sent.
 *
 * Menus open on hover intent (the mouse moves onto a trigger and stays 120ms, so sweeping across the bar
 * opens nothing, and nor does a page loading under a resting cursor; with one menu open, the other replaces it at once, in one frame) or on click, and close on
 * Escape (focus returns to the trigger), on a pointer-down outside the header (a light scrim dims the
 * page meanwhile), when focus tabs out of them, once the page scrolls more than 64px, and on
 * navigation: each menu remembers the path it was opened on, so a new pathname closes it without an
 * effect. Links in a closed panel are never prefetched; they prefetch while their panel is open.
 *
 * Below lg the header slides up out of view while the visitor scrolls down (more than 400px from the
 * top) and returns on any scroll up, as Nike's phone header does, so while the visitor reads downwards
 * the phone action bar is the only chrome on screen; on a scroll up both show (the bar does not track
 * the header). It never hides while a menu or the sheet is open, or while
 * keyboard focus is inside it (the skip link, the search or Menu buttons): `:focus-visible`, so a
 * button merely tapped on a touch screen does not pin it. Desktop keeps it pinned.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [opened, setOpened] = useState<Opened | null>(null);
  const openMenu = opened?.path === pathname ? opened.name : null;
  const switched = openMenu !== null && opened?.switched === true;
  // Forget a menu left open on another page, so going Back to that page does not reopen it.
  if (opened && opened.path !== pathname) setOpened(null);
  const scroll = useSyncExternalStore(subscribeScroll, readScroll, atTop);
  const scrolled = scroll !== "top";
  // Below lg only, and never while a menu or the sheet is open; the :has(:focus-visible) guard keeps
  // it in view while a header control has keyboard focus.
  const tucked = scroll === "away" && openMenu === null;

  const headerRef = useRef<HTMLElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const triggers = useRef<Partial<Record<MenuName, HTMLButtonElement | null>>>({});
  const hoverTimer = useRef<number | undefined>(undefined);
  // The menu a pending hover timer will open (null while none is pending, or while it is a close).
  const pendingOpen = useRef<MenuName | null>(null);
  // True while a desktop menu is open only because the mouse is over it: a click then pins it open
  // instead of closing it under the pointer.
  const hoverOpened = useRef(false);

  const cancelHover = () => { window.clearTimeout(hoverTimer.current); pendingOpen.current = null; };
  const close = () => { cancelHover(); hoverOpened.current = false; setOpened(null); };
  const isDesktopMenu = (name: MenuName | null) => name === "training" || name === "company";
  const toggle = (name: MenuName) => { hoverOpened.current = false; setOpened(openMenu === name ? null : { name, path: pathname, switched: isDesktopMenu(name) && isDesktopMenu(openMenu) }); };
  // A click (or Enter or Space) also cancels a pending hover open, so it is never followed by a stale one.
  const clickTrigger = (name: MenuName) => {
    cancelHover();
    if (openMenu === name && hoverOpened.current) { hoverOpened.current = false; return; }
    toggle(name);
  };
  // Hover intent: with no desktop menu open, a menu opens 120ms after the mouse moves over its trigger;
  // with the other one open, it replaces it at once. It starts on pointermove, never on pointerenter:
  // a page that loads (or scrolls) under a resting cursor fires pointerenter, and must not open a menu
  // by itself. Further moves while the timer runs leave it running.
  const hoverOpen = (name: "training" | "company") => {
    if (pendingOpen.current === name) return;
    cancelHover();
    if (openMenu === name) return;
    if (isDesktopMenu(openMenu)) { hoverOpened.current = true; setOpened({ name, path: pathname, switched: true }); return; }
    pendingOpen.current = name;
    hoverTimer.current = window.setTimeout(() => { pendingOpen.current = null; hoverOpened.current = true; setOpened({ name, path: pathname }); }, 120);
  };
  // Re-entering a menu only cancels its pending close; a pending open is left alone.
  const keepOpen = (event: ReactPointerEvent) => { if (event.pointerType === "mouse" && pendingOpen.current === null) window.clearTimeout(hoverTimer.current); };
  const hoverClose = () => {
    cancelHover();
    hoverTimer.current = window.setTimeout(() => { hoverOpened.current = false; setOpened((current) => (current?.name === "mobile" ? current : null)); }, 160);
  };
  // Hover intent is for a real mouse only, so touch taps never open or close a menu by "hovering".
  const leaveMenus = (event: ReactPointerEvent) => { if (event.pointerType === "mouse") hoverClose(); };
  // Tabbing out of a menu closes it. A click on blank panel space blurs to nothing (relatedTarget is
  // null) and is left to the outside pointer-down rule.
  const closeOnFocusOut = (name: MenuName) => (event: FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget;
    if (next instanceof Node && !event.currentTarget.contains(next)) setOpened((current) => (current?.name === name ? null : current));
  };

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  // Closed by SmoothAnchors (a same-page link was followed) and by the viewport growing past the mobile
  // breakpoint while the sheet is open. Site search opening closes the desktop menus only: search can
  // open over the mobile sheet by shortcut, and closing search then returns to the sheet as it was.
  useEffect(() => {
    const closeAll = () => { hoverOpened.current = false; setOpened(null); };
    const closeDesktopMenus = () => {
      // Focus inside a panel that is about to hide moves to its trigger first, so search returns
      // focus somewhere visible when it closes.
      const active = document.activeElement;
      for (const name of ["training", "company"] as const) {
        if (active && document.getElementById(`menu-${name}`)?.contains(active)) triggers.current[name]?.focus({ preventScroll: true });
      }
      hoverOpened.current = false;
      setOpened((current) => (current?.name === "mobile" ? current : null));
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = (event: MediaQueryListEvent) => { if (event.matches) setOpened((current) => (current?.name === "mobile" ? null : current)); };
    window.addEventListener(CLOSE_MENU_EVENT, closeAll);
    window.addEventListener(SEARCH_OPEN_EVENT, closeDesktopMenus);
    desktop.addEventListener("change", onBreakpoint);
    return () => { window.removeEventListener(CLOSE_MENU_EVENT, closeAll); window.removeEventListener(SEARCH_OPEN_EVENT, closeDesktopMenus); desktop.removeEventListener("change", onBreakpoint); };
  }, []);

  // Desktop menus: Escape closes and returns focus to the trigger; a pointer-down outside closes; so
  // does scrolling the page more than 64px from where the menu opened (focus inside the panel moves
  // to its trigger first, so it is not lost when the panel hides).
  useEffect(() => {
    if (openMenu !== "training" && openMenu !== "company") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || inDialog(event)) return;
      triggers.current[openMenu]?.focus({ preventScroll: true });
      hoverOpened.current = false;
      setOpened(null);
    };
    const onPointerDown = (event: PointerEvent) => { if (!headerRef.current?.contains(event.target as Node)) { hoverOpened.current = false; setOpened(null); } };
    const openedAt = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - openedAt) <= 64) return;
      if (document.getElementById(`menu-${openMenu}`)?.contains(document.activeElement)) triggers.current[openMenu]?.focus({ preventScroll: true });
      hoverOpened.current = false;
      setOpened(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { document.removeEventListener("keydown", onKeyDown); document.removeEventListener("pointerdown", onPointerDown); window.removeEventListener("scroll", onScroll); };
  }, [openMenu]);

  // The mobile sheet: locks page scroll (the shared lock, which search may also hold), moves focus to
  // its first link, keeps Tab inside it, closes on Escape, and returns focus to the toggle.
  useEffect(() => {
    if (openMenu !== "mobile") return;
    const sheet = sheetRef.current;
    const toggleButton = triggers.current.mobile;
    const releaseScroll = lockPageScroll();
    sheet?.querySelector<HTMLElement>("nav a")?.focus({ preventScroll: true });
    const onKeyDown = (event: KeyboardEvent) => {
      if (inDialog(event)) return;
      if (event.key === "Escape") { setOpened(null); return; }
      if (event.key !== "Tab" || !sheet) return;
      const focusable = Array.from(sheet.querySelectorAll<HTMLElement>("a[href], button, summary")).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !sheet.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || !sheet.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      releaseScroll();
      const active = document.activeElement;
      if (!active || active === document.body || sheet?.contains(active)) toggleButton?.focus({ preventScroll: true });
    };
  }, [openMenu]);

  const isCurrent = (href: string) => pathname === href;
  const trainingCurrent = TRAINING_PATHS.includes(pathname);
  const companyCurrent = COMPANY_PATHS.includes(pathname);
  const current = (href: string) => (isCurrent(href) ? ("page" as const) : undefined);
  // The enquiry pills. next/link would not scroll to a hash on the page it is already on (and would drop
  // a ?topic= already in the URL), so on /contact-us they are plain same-page links to the form.
  const onContact = pathname === PRIMARY_CTA.href.split(/[?#]/)[0];
  const ctaHref = onContact ? "#enquiry" : enquiryHref(topicForPath(pathname));
  const showCta = pathname !== "/thank-you";

  const navItem = "group/nav inline-flex min-h-11 items-center gap-1 text-[0.9375rem] font-medium text-foreground xl:text-[1rem]";
  // The panel surface is opaque and never fades, so the page never shows through it: it unrolls down
  // from the header's edge (a clip-path wipe, 280ms, eased out; it rolls back up in 180ms, eased in),
  // and only its content fades in, after a 60ms beat. The open clip reaches 48px below the panel so
  // its shadow shows. When one menu replaces the other (`switched`) nothing transitions, so the swap
  // is a single frame with no crossfade.
  // Opening turns visibility on at once (it is not transitioned), so a Tab pressed straight after Enter
  // lands in the panel; closing transitions it, so the panel stays visible while it rolls up.
  // Under reduced motion the global rule gives every element a 0.01ms duration, and since the default
  // transition-property is `all`, each nested element would then transition the inherited visibility
  // a frame after its parent: the links would stay unfocusable for about 100ms. The descendants
  // therefore get no transitions there.
  const panelState = (name: MenuName) => {
    const open = openMenu === name;
    const motion = switched ? "transition-none" : open ? "transition-[clip-path] duration-[280ms] ease-out" : "transition-[clip-path,visibility] duration-[180ms] ease-in";
    return `${open ? "visible [clip-path:inset(0_0_-48px_0)]" : "invisible [clip-path:inset(0_0_100%_0)]"} ${motion} motion-reduce:[&_*]:transition-none`;
  };
  const panelContent = (name: MenuName) => {
    const open = openMenu === name;
    const motion = switched ? "transition-none" : open ? "transition-opacity duration-[160ms] delay-[60ms] ease-out" : "transition-opacity duration-[180ms] ease-in";
    return `${open ? "opacity-100" : "opacity-0"} ${motion}`;
  };
  // Links in a closed panel are not prefetched (both panels are always in the page); they prefetch
  // as usual while their panel is open.
  const prefetchIn = (name: MenuName) => (openMenu === name ? null : false);
  // The sheet's links likewise prefetch only while the sheet is open: closed, it sits just off screen,
  // close enough for next/link's viewport check to fetch every route in it.
  const sheetPrefetch = openMenu === "mobile" ? null : false;
  const desktopOpen = isDesktopMenu(openMenu);
  const chevron = (name: MenuName) => <ChevronIcon className={`size-3.5 text-muted-foreground transition-transform duration-200 ${openMenu === name ? "rotate-180" : ""}`} />;
  // Menu rows: a grey fill on hover and for the current page, Nike style; no icons.
  const menuItem = (href: string) => `block rounded-[var(--radius-control)] transition-colors duration-150 ${isCurrent(href) ? "bg-field" : "hover:bg-field"}`;
  // The panels drop from the header's bottom edge across the full width: white over the dimmed page, with a hairline.
  const panel = "border-b border-border bg-background";
  const iconButton = "relative inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors duration-200 hover:bg-field before:absolute before:-inset-0.5";
  const sheetTitle = "font-display text-[1.5rem] font-medium leading-[1.25] tracking-[-0.025em] text-foreground";
  const sheetRow = (href: string) => `flex min-h-14 items-center justify-between gap-4 ${sheetTitle} ${isCurrent(href) ? "underline decoration-2 underline-offset-[6px]" : ""}`;
  // The sheet's second level: 18px ink (grey on hover), so it reads as live links under the 24px rows.
  const sheetLink = (href: string) => `flex min-h-11 items-center py-2 text-[1.125rem] leading-[1.3] text-foreground transition-colors duration-200 hover:text-muted-foreground ${isCurrent(href) ? "underline decoration-[1.5px] underline-offset-4" : ""}`;
  // Training and Company in the sheet: a 24px row like the links above it, with a chevron that turns when open.
  const sheetGroup = `flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 ${sheetTitle} [&::-webkit-details-marker]:hidden`;
  const sheetChevron = <ChevronIcon className="size-5 text-foreground transition-transform duration-200 group-open:rotate-180" />;
  // The sheet's email and phones: underlined, so they read as links, each a 44px row.
  const sheetContact = "inline-flex min-h-11 items-center underline decoration-border-strong decoration-1 underline-offset-4 transition-colors duration-200 hover:text-foreground hover:decoration-foreground";
  const sheetOpen = openMenu === "mobile";

  return <>
    {/* [&_*]:scroll-mt-[-96px] cancels the page's 96px scroll-padding for everything in the sticky header:
        without it, focusing a header control while scrolled down (Shift+Tab back up, or focus returning
        from a menu or search) counts as "hidden under the header" and jumps the page by half a screen.
        has-[:focus-visible]:transition-[border-color] makes the un-tuck instant while keyboard focus is in
        the header, so focus navigation never scrolls the page to reach a header that is still mid-slide.
        Below lg on a short (landscape) screen the header is not sticky, so it never covers a third of the view. */}
    <header ref={headerRef} className={`sticky top-0 z-50 border-b bg-background transition-[border-color,translate] duration-300 ease-out motion-reduce:transition-none has-[:focus-visible]:transition-[border-color] max-lg:[@media(max-height:30rem)]:static [&_*]:scroll-mt-[-96px] ${scrolled ? "border-border" : "border-transparent"} ${tucked ? "max-lg:[&:not(:has(:focus-visible))]:-translate-y-full" : ""}`}>
      {/* Focused, the skip link covers the whole bar in white with its black pill centred, so nothing of
          the wordmark shows around it; its ring sits inside the bar. */}
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:inset-x-0 focus:top-0 focus:z-10 focus:flex focus:h-16 focus:items-center focus:justify-center focus:bg-background focus-visible:outline-offset-[-6px]"><span className="rounded-full bg-foreground px-4 py-2 text-[14px] font-medium text-background">Skip to content</span></a>
      <Container>
        {/* From xl the nav is truly centred between equal side columns, as on nike.com; between 1024 and
            1279px the three groups are spread apart instead, and search shrinks to its round button. The
            row is at least 64px, and grows rather than overflows under enlarged text spacing. */}
        <div className="flex min-h-16 items-center justify-between gap-6 xl:grid xl:grid-cols-[1fr_auto_1fr]">
          <Wordmark className="justify-self-start" />

          <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex xl:gap-7">
            <Link href="/what-we-do" aria-current={current("/what-we-do")} onPointerEnter={leaveMenus} className={navItem}><NavText current={isCurrent("/what-we-do")}>What we do</NavText></Link>

            {/* The Training panel is positioned against the header (this wrapper is not `relative`), so it
                spans the full width under the header, yet it follows its trigger in the tab order. */}
            <div onPointerEnter={keepOpen} onPointerMove={(event) => { if (event.pointerType === "mouse") hoverOpen("training"); }} onPointerLeave={leaveMenus} onBlur={closeOnFocusOut("training")}>
              <button type="button" ref={(element) => { triggers.current.training = element; }} aria-expanded={openMenu === "training"} aria-controls="menu-training" onClick={() => clickTrigger("training")} className={navItem}>
                <NavText current={trainingCurrent} open={openMenu === "training"}>Training</NavText>{chevron("training")}
              </button>
              <div id="menu-training" className={`absolute inset-x-0 top-full ${panelState("training")}`}>
                <div className={panel}>
                  <Container className={panelContent("training")}>
                    <div className="grid grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] gap-x-12 pb-10 pt-7 xl:gap-x-20">
                      <div>
                        <MenuHeading>Training areas</MenuHeading>
                        <ul className="-mx-3 mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
                          {AREAS.map((area) => <li key={area.slug}>
                            <Link href={area.href} prefetch={prefetchIn("training")} aria-current={current(area.href)} onClick={close} className={`${menuItem(area.href)} h-full px-3 py-3`}>
                              <span className="block text-[1rem] font-medium leading-[1.35] text-foreground">{area.title}</span>
                              <span className="mt-1 block text-[0.875rem] leading-[1.45] text-muted-foreground">{AREA_COPY[area.slug as AreaSlug].summary}</span>
                              <span className="mt-1.5 block text-[0.875rem] tabular-nums text-muted-foreground">{area.topics} topics</span>
                            </Link>
                          </li>)}
                        </ul>
                        {/* The catalogue, then the two questions buyers ask before they enquire (is the exam
                            covered, can it be onsite), each a chapter of /what-we-do. */}
                        <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                          <TextLink href="/corporate-training-services" size="sm" prefetch={prefetchIn("training")} onClick={close}>All training topics</TextLink>
                          <TextLink href="/what-we-do#cert" size="sm" prefetch={prefetchIn("training")} onClick={close}>Certification preparation</TextLink>
                          <TextLink href="/what-we-do#formats" size="sm" prefetch={prefetchIn("training")} onClick={close}>Online, onsite or hybrid</TextLink>
                        </div>
                      </div>
                      <div>
                        <MenuHeading>Focused programmes</MenuHeading>
                        <ul className="-mx-3 mt-3">
                          {COURSES.map((course) => <li key={course.slug}>
                            <Link href={`/${course.slug}`} prefetch={prefetchIn("training")} aria-current={current(`/${course.slug}`)} onClick={close} className={`${menuItem(`/${course.slug}`)} px-3 py-2 text-[1rem] font-medium leading-[1.35] text-foreground`}>{course.title}</Link>
                          </li>)}
                        </ul>
                      </div>
                    </div>
                  </Container>
                </div>
              </div>
            </div>

            <Link href="/training-methodology" aria-current={current("/training-methodology")} onPointerEnter={leaveMenus} className={navItem}><NavText current={isCurrent("/training-methodology")}>How we work</NavText></Link>

            {/* The Company panel also spans the full width under the header. */}
            <div onPointerEnter={keepOpen} onPointerMove={(event) => { if (event.pointerType === "mouse") hoverOpen("company"); }} onPointerLeave={leaveMenus} onBlur={closeOnFocusOut("company")}>
              <button type="button" ref={(element) => { triggers.current.company = element; }} aria-expanded={openMenu === "company"} aria-controls="menu-company" onClick={() => clickTrigger("company")} className={navItem}>
                <NavText current={companyCurrent} open={openMenu === "company"}>Company</NavText>{chevron("company")}
              </button>
              <div id="menu-company" className={`absolute inset-x-0 top-full ${panelState("company")}`}>
                <div className={panel}>
                  <Container className={panelContent("company")}>
                    <ul className="-mx-3 grid grid-cols-5 gap-x-4 pb-10 pt-7">
                      {COMPANY_MENU.map((item) => <li key={item.href}>
                        <Link href={item.href} prefetch={prefetchIn("company")} aria-current={current(item.href)} onClick={close} className={`${menuItem(item.href)} h-full px-3 py-3`}>
                          <span className="block text-[1rem] font-medium leading-[1.35] text-foreground">{item.title}</span>
                          <span className="mt-1 block text-[0.875rem] leading-[1.45] text-muted-foreground">{item.line}</span>
                        </Link>
                      </li>)}
                    </ul>
                  </Container>
                </div>
              </div>
            </div>
          </nav>

          <div className="hidden items-center gap-3 justify-self-end lg:flex" onPointerEnter={leaveMenus}>
            {/* The wrappers carry the breakpoint display, so it never competes with the buttons' own. */}
            <div className="flex xl:hidden"><SearchButton compact filled /></div>
            <div className="hidden xl:flex"><SearchButton /></div>
            {showCta && <ButtonLink href={ctaHref} size="sm" aria-current={onContact ? "page" : undefined}>{PRIMARY_CTA.label}</ButtonLink>}
          </div>

          <div className="-mr-2.5 flex items-center gap-1 lg:hidden">
            <SearchButton compact />
            <button type="button" ref={(element) => { triggers.current.mobile = element; }} aria-expanded={openMenu === "mobile"} aria-controls="mobile-navigation" onClick={() => toggle("mobile")} className={iconButton}>
              <span className="sr-only">Menu</span><MenuIcon className="size-5" />
            </button>
          </div>
        </div>
      </Container>
    </header>

    {/* Desktop only: a light ink wash over the page while a menu is open (no blur). It sits under the
        header, so it never covers the bar, and takes no pointer events while hidden. */}
    <div aria-hidden="true" onClick={close} className={`fixed inset-x-0 top-16 bottom-0 z-40 hidden bg-foreground/12 transition-opacity duration-200 lg:block ${desktopOpen ? "opacity-100" : "pointer-events-none opacity-0"}`} />

    {/* The mobile sheet: a sibling of <header>, never inside it. It is opaque and slides in from the
        right edge (320ms, eased out like iOS sheets; 220ms back out, eased in), so the page never shows
        through it; while closed it is off screen, invisible, inert and aria-hidden. Opening turns
        visibility on at once, so focus can move into it straight away; closing transitions it, so the
        sheet stays visible while it slides out. Its scroll padding clears the pinned top row (64px) and
        pill (about 77px), so a link Tab scrolls into view never lands under either; the pinned controls
        cancel it, as the header does. */}
    <div ref={sheetRef} id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Site menu" inert={!sheetOpen} aria-hidden={!sheetOpen} className={`fixed inset-0 z-[60] scroll-pt-18 scroll-pb-[calc(5.25rem+env(safe-area-inset-bottom))] overflow-y-auto overscroll-contain bg-background [scrollbar-width:thin] [scrollbar-color:var(--border-strong)_transparent] motion-reduce:transition-none motion-reduce:[&_*]:transition-none lg:hidden ${sheetOpen ? "visible translate-x-0 transition-[translate] duration-[320ms] ease-[cubic-bezier(0.32,0.72,0,1)]" : "pointer-events-none invisible translate-x-full transition-[translate,visibility] duration-[220ms] ease-in"}`}>
      {/* A column at least the sheet's height, so the pinned pill sits at the bottom edge even when the
          list is short. The contacts follow the list directly, open groups or not, so a short list never
          leaves an empty band in the middle of the sheet. */}
      <Container className="flex min-h-full flex-col">
        {/* The top row stays pinned while the sheet scrolls, so Close is always in reach. It bleeds over
            the container gutters so nothing shows through beside it. */}
        <div className="sticky top-0 z-10 -mx-5 flex h-16 items-center justify-between gap-6 bg-background px-5 sm:-mx-8 sm:px-8 [&_*]:scroll-mt-[-4.5rem]">
          <Wordmark onClick={close} />
          <button type="button" onClick={close} className={`${iconButton} -mr-2.5`}><span className="sr-only">Close menu</span><CloseIcon className="size-5" /></button>
        </div>
        {/* Search opens on the next frame, once the sheet has closed and handed focus back to the Menu
            toggle, so closing search returns focus there. */}
        <button type="button" onClick={() => { close(); window.requestAnimationFrame(() => openSiteSearch()); }} className="mt-2 mb-2 flex h-12 w-full items-center gap-3 rounded-full border border-transparent bg-field px-5 text-left text-[1rem] text-muted-foreground transition-colors duration-200 hover:bg-border hover:text-foreground">
          <SearchIcon className="size-[18px] text-foreground" />Search topics and pages
        </button>
        <nav aria-label="Mobile navigation" className="mb-6 [@media(max-height:600px)]:mb-3">
          <Link href="/what-we-do" prefetch={sheetPrefetch} aria-current={current("/what-we-do")} onClick={close} className={sheetRow("/what-we-do")}>What we do<ChevronIcon direction="right" className="size-5 text-foreground" /></Link>

          {/* Training and Company are disclosure rows: closed, except the one holding the current page, so
              the closed sheet shows its four rows, the contacts and the pill on one phone screen. Short
              screens (600px tall or less) tighten the gaps, so this holds down to about 553px. */}
          <details className="disclosure group mt-4 [@media(max-height:600px)]:mt-1" open={trainingCurrent || undefined}>
            <summary className={sheetGroup}><span id="sheet-training">Training</span>{sheetChevron}</summary>
            <div className="pb-4">
              <MenuHeading id="sheet-training-areas" className="mt-1">Training areas</MenuHeading>
              <ul aria-labelledby="sheet-training-areas" className="mt-1">
                {AREAS.map((area) => <li key={area.slug}><Link href={area.href} prefetch={sheetPrefetch} aria-current={current(area.href)} onClick={close} className={sheetLink(area.href)}>{area.title}</Link></li>)}
                <li><Link href="/corporate-training-services" prefetch={sheetPrefetch} aria-current={current("/corporate-training-services")} onClick={close} className={sheetLink("/corporate-training-services")}>All training topics</Link></li>
              </ul>
              <MenuHeading id="sheet-programmes" className="mt-5">Focused programmes</MenuHeading>
              <ul aria-labelledby="sheet-programmes" className="mt-1">
                {COURSES.map((course) => <li key={course.slug}><Link href={`/${course.slug}`} prefetch={sheetPrefetch} aria-current={current(`/${course.slug}`)} onClick={close} className={sheetLink(`/${course.slug}`)}>{course.title}</Link></li>)}
              </ul>
              {/* Certification and delivery formats, as in the desktop panel: not training areas, so a
                  list of their own, and never marked current (they are chapters of /what-we-do). */}
              <ul className="mt-3">
                <li><Link href="/what-we-do#cert" prefetch={sheetPrefetch} onClick={close} className={sheetLink("/what-we-do#cert")}>Certification preparation</Link></li>
                <li><Link href="/what-we-do#formats" prefetch={sheetPrefetch} onClick={close} className={sheetLink("/what-we-do#formats")}>Online, onsite or hybrid</Link></li>
              </ul>
            </div>
          </details>

          <Link href="/training-methodology" prefetch={sheetPrefetch} aria-current={current("/training-methodology")} onClick={close} className={`mt-4 [@media(max-height:600px)]:mt-1 ${sheetRow("/training-methodology")}`}>How we work<ChevronIcon direction="right" className="size-5 text-foreground" /></Link>

          <details className="disclosure group mt-4 [@media(max-height:600px)]:mt-1" open={companyCurrent || undefined}>
            <summary className={sheetGroup}><span id="sheet-company">Company</span>{sheetChevron}</summary>
            <ul aria-labelledby="sheet-company" className="pb-4">
              {COMPANY_MENU.map((item) => <li key={item.href}><Link href={item.href} prefetch={sheetPrefetch} aria-current={current(item.href)} onClick={close} className={sheetLink(item.href)}>{item.title}</Link></li>)}
            </ul>
          </details>
        </nav>

        {/* The email (as "Email us"; the footer shows the address) and the phones, under a hairline right
            after the menu (the nav's own bottom margin), the same gap whether a group is open or not. */}
        <div className="border-t border-border pt-5 pb-4 [@media(max-height:600px)]:pt-3 [@media(max-height:600px)]:pb-2">
          <MenuHeading>Contact</MenuHeading>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-5 type-ui text-copy">
            <a href={`mailto:${CONTACT_INFO.email}`} className={sheetContact}>{UI_LABELS.emailUs}</a>
            {/* Each middot trails its phone, so a wrapped line never starts with one. */}
            <span className="flex flex-wrap items-center tabular-nums">
              {CONTACT_INFO.phones.map((phone, index) => <span key={phone} className="flex items-center">
                <a href={tel(phone)} className={`${sheetContact} whitespace-nowrap`}>{phone}</a>
                {index < CONTACT_INFO.phones.length - 1 && <span aria-hidden="true" className="mx-2 text-border-strong">·</span>}
              </span>)}
            </span>
          </div>
        </div>

        {/* Only the black pill stays pinned to the bottom of the sheet (about 76px), so it is always in
            reach while the sheet is open, as the header pill is on desktop, without weighing the sheet
            down. It sits where the page's own phone action bar does, whether the list is open or not.
            On a short (landscape) screen it scrolls with the list instead, so the pinned rows never
            cover most of the view. */}
        <div className="sticky bottom-0 -mx-5 mt-auto [@media(max-height:30rem)]:static border-t border-border bg-background px-5 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:-mx-8 sm:px-8 [&_*]:scroll-mb-[calc(-5.25rem-env(safe-area-inset-bottom))]">
          <ButtonLink href={ctaHref} onClick={close} className="w-full">{PRIMARY_CTA.label}</ButtonLink>
        </div>
      </Container>
    </div>
  </>;
}
