"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { CloseIcon, SearchIcon } from "@/components/tg/icons";
import { CONTACT_INFO } from "@/data";
import { searchSite, type SearchItem } from "@/lib/search-index";

/** Dispatched on window to open site search (the header also listens, to close its menus). */
export const SEARCH_OPEN_EVENT = "trainingenie:open-search";

export function openSiteSearch() {
  window.dispatchEvent(new Event(SEARCH_OPEN_EVENT));
}

// One page-scroll lock shared by the search dialog and the mobile sheet. Search can open over the
// sheet (by shortcut), and either can close first, so the page is released only when every holder has
// let go, and then back to the styles it had before the first lock.
let scrollLocks = 0;
let unlockedBody = { overflow: "", paddingRight: "" };

/**
 * Locks page scroll (overflow only; the scroll position is never touched) and returns its release.
 * A classic, non-overlay scrollbar disappears with the lock, so the body is padded by its width and
 * the page does not shift sideways.
 */
export function lockPageScroll(): () => void {
  const body = document.body;
  if (scrollLocks === 0) {
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    unlockedBody = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
  }
  scrollLocks += 1;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    scrollLocks = Math.max(0, scrollLocks - 1);
    if (scrollLocks === 0) { body.style.overflow = unlockedBody.overflow; body.style.paddingRight = unlockedBody.paddingRight; }
  };
}

type Row = Pick<SearchItem, "id" | "title" | "href" | "hint">;
type ResultGroup = { key: string; label: string; items: Row[] };

// The one shortcut this platform uses, read once on the client (the server renders none).
const subscribeNever = () => () => {};
const readShortcut = () => {
  const platform = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform ?? navigator.platform;
  return /mac|iphone|ipad/i.test(platform) ? "⌘K" : "Ctrl K";
};
const onServer = () => null;
const tel = (phone: string) => `tel:${phone.replace(/\s+/g, "")}`;

/**
 * Site search on a native modal <dialog>, opened with ⌘K / Ctrl+K (no single-key shortcut, so typing
 * with a speech or switch tool never opens it by accident). It fades and rises in and out (the
 * `search-dialog` styles in globals.css). The input is an ARIA combobox controlling a grouped listbox:
 * arrows move, Enter opens, Escape closes and returns focus. The active row is painted only once the
 * visitor has typed or moved (arrows or the mouse), so nothing looks pressed when it opens, and Enter
 * does nothing until then; in forced colours it shows in the system Highlight. Before anything is
 * typed it suggests the focused programmes, the areas and the pages buyers ask for. Typed results are
 * grouped in the order of each group's best match, and any query of two or more characters ends on
 * "Ask about “…”", which opens the enquiry form with the query as its topic, so a search never
 * dead-ends. Styled as a white panel with Nike's grey search pill: the only shadowed surface besides
 * the header menus. On phones it is a full-screen white sheet (like the
 * menu sheet), and each result's hint runs on its own line under the title, so neither is cut short.
 */
export function CommandMenu() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const releaseScroll = useRef<(() => void) | null>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  // Whether the visitor has moved the active row (arrow keys or the mouse) since the dialog opened.
  const [moved, setMoved] = useState(false);
  const baseId = useId();
  const listId = `${baseId}-list`;
  const optionId = (index: number) => `${baseId}-option-${index}`;

  const shortcut = useSyncExternalStore(subscribeNever, readShortcut, onServer);
  const typed = query.trim();
  const results = useMemo(() => searchSite(query), [query]);
  const grouped = useMemo(() => {
    const groups: ResultGroup[] = [];
    for (const item of results) {
      const entry = groups.find((group) => group.key === item.group);
      if (entry) entry.items.push(item);
      else groups.push({ key: item.group, label: item.group === "Programmes" && !typed ? "Focused programmes" : item.group, items: [item] });
    }
    if (typed.length >= 2) groups.push({ key: "ask", label: "Not listed?", items: [{ id: "ask", title: `Ask about “${typed}”`, hint: "Opens the enquiry form", href: `/contact-us?topic=${encodeURIComponent(typed.slice(0, 160))}#enquiry` }] });
    return groups.map((entry, index) => ({ ...entry, start: groups.slice(0, index).reduce((total, previous) => total + previous.items.length, 0) }));
  }, [results, typed]);
  const ordered = useMemo(() => grouped.flatMap((entry) => entry.items), [grouped]);
  // The active row shows (and Enter opens it) once the visitor has typed or moved.
  const engaged = typed !== "" || moved;

  const open = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setQuery("");
    setActive(0);
    setMoved(false);
    dialog.showModal();
    releaseScroll.current?.();
    releaseScroll.current = lockPageScroll();
    inputRef.current?.focus();
  }, []);

  // Cleanup runs here, not only on the dialog's "close" event, which some browsers deliver late.
  // The field is blurred before the dialog closes, so WebKit does not scroll the page after it.
  const close = useCallback(() => {
    const dialog = dialogRef.current;
    inputRef.current?.blur();
    if (dialog?.open) dialog.close();
    releaseScroll.current?.();
    releaseScroll.current = null;
    const target = returnFocus.current;
    returnFocus.current = null;
    target?.focus({ preventScroll: true });
  }, []);

  // The shortcuts open through the event too, so the header hears it and closes its desktop menus.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isOpen = dialogRef.current?.open;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (isOpen) close(); else openSiteSearch();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(SEARCH_OPEN_EVENT, open);
    return () => { window.removeEventListener("keydown", onKeyDown); window.removeEventListener(SEARCH_OPEN_EVENT, open); };
  }, [open, close]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const go = (item: Row) => {
    returnFocus.current = null;
    close();
    router.push(item.href);
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (ordered.length === 0) return;
    if (event.key === "ArrowDown") { event.preventDefault(); setMoved(true); setActive((index) => (index + 1) % ordered.length); }
    else if (event.key === "ArrowUp") { event.preventDefault(); setMoved(true); setActive((index) => (index - 1 + ordered.length) % ordered.length); }
    else if (event.key === "Enter") { event.preventDefault(); const item = ordered[active]; if (item && engaged) go(item); }
  };

  return <dialog ref={dialogRef} aria-label="Search TraininGenie" onCancel={(event) => { event.preventDefault(); close(); }} onClick={(event) => { if (event.target === dialogRef.current) close(); }} className="search-dialog m-0 mx-auto w-full max-w-none overflow-hidden bg-surface p-0 text-foreground forced-colors:border forced-colors:border-[CanvasText] max-sm:h-dvh max-sm:max-h-none max-sm:open:flex max-sm:open:flex-col sm:mt-[12vh] sm:w-[min(680px,calc(100vw-1rem))] sm:rounded-[var(--radius-menu)] sm:shadow-[0_24px_60px_-20px_rgb(17_17_17/0.35)]">
    {/* The field is Nike's grey search pill; its keyboard focus shows as an ink ring inside the pill. On
        phones the row is the 64px of the header bar, on the page's 20px gutter. */}
    <div className="flex h-16 items-center gap-2 px-5 sm:h-auto sm:gap-3 sm:p-4">
      <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-full bg-field pl-4 pr-2 transition-shadow duration-200 has-[input:focus-visible]:shadow-[inset_0_0_0_1.5px_var(--foreground)]">
      <SearchIcon className="size-[18px] text-foreground" />
      <input ref={inputRef} type="text" role="combobox" aria-expanded={ordered.length > 0} aria-controls={listId} aria-autocomplete="list" aria-activedescendant={engaged && ordered.length > 0 ? optionId(active) : undefined} aria-label="Search topics and pages" placeholder="Search topics and pages" autoComplete="off" spellCheck={false} value={query} onChange={(event) => { setQuery(event.target.value); setActive(0); }} onKeyDown={onKeyDown} className="h-12 min-w-0 flex-1 text-ellipsis bg-transparent text-base text-foreground outline-hidden placeholder:text-muted-foreground max-[399px]:placeholder:text-[0.9375rem]" />
      </div>
      <button type="button" onClick={close} aria-keyshortcuts="Escape" className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-foreground transition-colors duration-200 hover:bg-field"><CloseIcon className="size-4" /><span className="sr-only">Close search</span></button>
    </div>
    <p className="sr-only" aria-live="polite">{typed ? (results.length ? `${results.length} result${results.length === 1 ? "" : "s"}` : `Nothing matches “${typed}”`) : ""}</p>
    <div ref={listRef} id={listId} role="listbox" aria-label="Search results" className={`overflow-y-auto overscroll-contain px-2.5 pb-2.5 [scrollbar-width:thin] [scrollbar-color:var(--border-strong)_transparent] max-sm:min-h-0 sm:max-h-[min(62vh,30rem)] ${results.length > 0 ? "max-sm:flex-1" : ""}`}>
      {grouped.map(({ key, label, items, start }) => {
        const labelId = `${baseId}-${key.replace(/\W+/g, "-")}`;
        return <div key={key} role="group" aria-labelledby={labelId}>
          <div id={labelId} role="presentation" className="px-3 pb-1.5 pt-4 type-label text-muted-foreground">{label}</div>
          {items.map((item, offset) => {
            const index = start + offset;
            const selected = index === active;
            const painted = selected && engaged;
            const highlight = selected ? "forced-colors:text-[HighlightText]" : "";
            return <div key={item.id} id={optionId(index)} role="option" aria-selected={selected} data-index={index} onMouseMove={() => { setMoved(true); setActive(index); }} onClick={() => go(item)} className={`flex cursor-pointer justify-between rounded-[var(--radius-control)] px-3 py-[11px] transition-colors duration-150 forced-colors:aria-selected:bg-[Highlight] forced-colors:aria-selected:text-[HighlightText] max-sm:flex-col max-sm:gap-0.5 sm:items-baseline sm:gap-6 ${painted ? "bg-field" : ""}`}>
              <span className={`min-w-0 truncate text-[1rem] font-medium leading-[1.45] text-foreground max-sm:whitespace-normal ${highlight}`}>{item.title}</span>
              <span className={`shrink-0 truncate text-[0.875rem] text-muted-foreground max-sm:whitespace-normal sm:max-w-[45%] ${highlight}`}>{item.hint}</span>
            </div>;
          })}
        </div>;
      })}
    </div>
    {/* With nothing found, the Ask row above is the only option; this line offers the way out by phone. */}
    {typed && results.length === 0 && <p className="px-5.5 pb-10 pt-2 type-ui text-muted-foreground">
      Nothing matches “{typed}”. Try “ITIL”, “ISO&nbsp;27001” or “leadership”. Or call <a href={tel(CONTACT_INFO.phones[0])} className="whitespace-nowrap text-foreground underline decoration-border-strong decoration-1 underline-offset-4 transition-colors duration-200 hover:text-muted-foreground">{CONTACT_INFO.phones[0]}</a>.
    </p>}
    {/* Keyboard hints, for keyboards: hidden on phones and wherever nothing hovers (a tablet). */}
    <div className="hidden items-center gap-6 border-t border-border px-5 py-3 text-[0.8125rem] text-muted-foreground sm:flex [@media(hover:none)]:hidden">
      <span>↑ ↓ to move</span><span>↵ to open</span>{shortcut && <span className="ml-auto">Press {shortcut} to search</span>}
    </div>
  </dialog>;
}

/**
 * The header's search trigger. Default: Nike's grey search pill (40px tall, the glyph in ink and
 * "Search" in grey). `compact`: a 40px round button (a 44px hit area) with the glyph only, grey on
 * hover (`filled` gives it the grey pill fill at rest too).
 */
export function SearchButton({ compact = false, filled = false, className = "" }: { compact?: boolean; filled?: boolean; className?: string }) {
  if (compact) return <button type="button" onClick={openSiteSearch} aria-label="Search the site" aria-keyshortcuts="Control+K Meta+K" className={`relative inline-flex size-11 items-center justify-center rounded-full border border-transparent text-foreground transition-colors duration-200 before:absolute before:-inset-0.5 ${filled ? "bg-field hover:bg-border" : "hover:bg-field"} ${className}`}><SearchIcon className="size-[18px]" /></button>;
  return <button type="button" onClick={openSiteSearch} aria-keyshortcuts="Control+K Meta+K" className={`inline-flex h-10 items-center gap-2.5 rounded-full border border-transparent bg-field pl-3 pr-5 text-[1rem] text-muted-foreground transition-colors duration-200 hover:bg-border hover:text-foreground ${className}`}><SearchIcon className="size-[18px] text-foreground" /><span>Search</span></button>;
}

/** Field-shaped trigger that opens site search, for placing search inline in page content (the 404 page). */
export function SearchField({ placeholder, className = "" }: { placeholder: string; className?: string }) {
  return <button type="button" onClick={openSiteSearch} aria-keyshortcuts="Control+K Meta+K" className={`flex h-12 w-full items-center gap-3 rounded-full border border-transparent bg-field px-5 text-left text-[1rem] text-muted-foreground transition-colors duration-200 hover:bg-border hover:text-foreground ${className}`}>
    <SearchIcon className="size-[18px] text-foreground" />
    <span className="min-w-0 flex-1 truncate">{placeholder}</span>
  </button>;
}
