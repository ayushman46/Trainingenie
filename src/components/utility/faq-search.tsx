"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { Accordion } from "@/components/kit/accordion";
import { CloseIcon, SearchIcon } from "@/components/tg/icons";
import { RowLink } from "@/components/tg/programme-list";
import { TextLink } from "@/components/tg/text-link";
import { CONTACT_INFO } from "@/data";

// Case, accents and punctuation are ignored, so "on-site", "Onsite" and "onsite" all match.
const normalise = (text: string) => text.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9+]+/g, " ").trim();
// Nike's search-term pills: grey, 44px tall (a full tap target), 14px medium ink; darker grey on hover, black with
// white text while pressed (a little lighter on hover, like the primary pill). Sized so "Try" and the four pills
// keep to one line in the desktop search column, and, a little tighter on phones, so the four pills keep to one
// row under "Try" from 360px. Forced colours drop the grey fill, so there each pill gets a button edge and the
// pressed one the system highlight.
const termPill = "inline-flex h-11 shrink-0 items-center rounded-full bg-field px-[0.8125rem] max-sm:px-2.5 text-[0.875rem] font-medium text-foreground transition-colors duration-200 hover:bg-border aria-pressed:bg-foreground aria-pressed:text-background aria-pressed:hover:bg-[color-mix(in_srgb,var(--foreground),var(--background)_17%)] forced-colors:border forced-colors:border-[color:ButtonText] forced-colors:aria-pressed:forced-color-adjust-none forced-colors:aria-pressed:border-[color:Highlight] forced-colors:aria-pressed:bg-[color:Highlight] forced-colors:aria-pressed:text-[color:HighlightText] forced-colors:aria-pressed:focus-visible:outline-[color:CanvasText]";
// A button that looks like the TextLink beside it (medium ink text over a 1px rule that stays while the
// colour turns grey on hover), with the same ~44px hit area.
const linkButton = "relative inline-flex items-center pb-[3px] text-[1rem] font-medium text-foreground bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1px] bg-[position:0_100%] bg-no-repeat transition-colors duration-200 hover:text-muted-foreground before:absolute before:inset-x-0 before:-inset-y-2.5";
// A broad query (a single letter matches every question) only filters; answers open once the list is this short.
const OPEN_LIMIT = 4;
const plural = (count: number) => `${count} ${count === 1 ? "question" : "questions"}`;
// Phone numbers in an answer stay whole on one line, as they do everywhere else on the site; the text is unchanged.
const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const phonePattern = new RegExp(`(${CONTACT_INFO.phones.map(escapeRegExp).join("|")})`);
const keepPhones = (answer: string) => answer.split(phonePattern).map((part, index) => index % 2 ? <span key={index} className="whitespace-nowrap">{part}</span> : part);

export type FaqGroup = { id: string; title: string; questions: string[] };
export type FaqLink = { href: string; label: string };

/**
 * Hands a ?q= in the URL to the search, so a link can open an answer directly
 * (/faqs?q=Can%20TraininGenie%20deliver%20onsite%20training%3F), on arrival or from the site search while
 * already on this page. Only a search term travels in the URL. It renders nothing and sits in its own
 * Suspense boundary, so only it waits for the URL when the page is prerendered: every question and answer
 * stays in the HTML.
 */
function LinkedQuery({ onQuery }: { onQuery: (query: string) => void }) {
  const linked = useSearchParams().get("q")?.trim().slice(0, 160) ?? "";
  useEffect(() => { if (linked) onQuery(linked); }, [linked, onQuery]);
  return null;
}

/**
 * The FAQ page's questions, grouped by topic, with a live filter. A search column (sticky on desktop)
 * holds the field, suggested words, the count and an index of the topics; the grouped accordions sit
 * beside it. Every word typed must appear in a question or its answer; matching questions are listed,
 * and opened when there are few enough to read. The count is announced politely once typing pauses.
 * With nothing typed, all questions and answers are in the server-rendered HTML, as the FAQPage
 * structured data expects. `related` adds a link to the page that covers a question in more depth. A ?q= in
 * the URL is searched on arrival, and again whenever it changes (LinkedQuery).
 */
export function FaqSearch({ items, groups, related = {}, suggestions, title, intro }: { items: [question: string, answer: string][]; groups: FaqGroup[]; related?: Record<string, FaqLink>; suggestions: string[]; title: string; intro: string }) {
  const [query, setQuery] = useState("");
  const [closed, setClosed] = useState<string[]>([]);
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const terms = normalise(query).split(" ").filter(Boolean);
  const searching = terms.length > 0;
  const results = searching ? items.filter(([question, answer]) => { const text = normalise(`${question} ${answer}`); return terms.every((term) => text.includes(term)); }) : items;
  const total = items.length;
  const status = !searching ? `${total} questions in ${groups.length} topics` : results.length ? `${results.length} of ${total} questions match` : "No questions match";

  // Questions keep their topic, and the topic's own order, while filtering; any question not placed in a topic is listed last.
  const grouped = groups.map((group) => ({ ...group, results: group.questions.flatMap((name) => results.filter(([question]) => question === name)) }));
  const loose = results.filter(([question]) => !groups.some((group) => group.questions.includes(question)));
  if (loose.length) grouped.push({ id: "other", title: "Other questions", questions: loose.map(([question]) => question), results: loose });

  // Screen readers hear the count once typing pauses, not every intermediate count; the visible count stays immediate.
  const [announced, setAnnounced] = useState(status);
  useEffect(() => { const timer = window.setTimeout(() => setAnnounced(status), 400); return () => window.clearTimeout(timer); }, [status]);

  const search = (value: string) => { setQuery(value); setClosed([]); };
  // The clear buttons disappear once used, so focus goes back to the field instead of falling to the page body.
  const clear = () => { search(""); inputRef.current?.focus(); };

  // A linked query (see LinkedQuery) is searched as if typed, so its matches open as typed ones do. Once they are
  // rendered, the page scrolls to the topic holding the first match, which leads its list (html's scroll-padding
  // keeps it clear of the sticky header).
  const resultsRef = useRef<HTMLDivElement>(null);
  const [jumps, setJumps] = useState(0);
  const followLink = useCallback((value: string) => { setQuery(value); setClosed([]); setJumps((count) => count + 1); }, []);
  useEffect(() => { if (jumps) resultsRef.current?.querySelector("section")?.scrollIntoView({ block: "start" }); }, [jumps]);

  // Matches open on their own. A click on one of those closes it here, before the accordion's own
  // toggle runs, so the question still responds to its button while a search is active.
  const opening = searching && results.length <= OPEN_LIMIT;
  const onClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!opening) return;
    const question = (event.target as HTMLElement).closest("button[aria-expanded]")?.textContent ?? "";
    if (results.some(([text]) => text === question) && !closed.includes(question)) { event.stopPropagation(); setClosed([...closed, question]); }
  };

  // The answer, then a link to the page that covers the question in more depth.
  const entry = ([question, answer]: [string, string]) => ({ question, answer: related[question] ? <><p>{keepPhones(answer)}</p><p className="mt-5"><TextLink href={related[question].href} size="sm">{related[question].label}</TextLink></p></> : <>{keepPhones(answer)}</> });

  return <div className="grid gap-y-16 lg:grid-cols-12 lg:gap-x-10">
    <Suspense fallback={null}><LinkedQuery onQuery={followLink} /></Suspense>
    {/* Five columns at 1024px, so the field and the suggestions keep to one line; four from 1280px. min-w-0 keeps
        long content from widening the column. */}
    <div className="min-w-0 lg:col-span-5 xl:col-span-4">
      <div className="lg:sticky lg:top-28">
        <h2 id="questions-heading" className="type-h3 text-foreground">{title}</h2>
        <p className="mt-2 max-w-measure type-ui text-pretty text-copy">{intro}</p>

        {/* Only the controls form the search landmark; the heading above names the whole section. */}
        <div role="search" className="mt-8 max-w-[34rem] lg:max-w-none">
          <label htmlFor={inputId} className="block type-ui font-medium text-foreground">Search the questions</label>
          {/* Nike's search pill: grey, with no edge, a little darker on hover; in focus it turns white with a 1.5px
              ink edge. Forced colours drop the fill and the shadow, so there the field keeps a text-coloured edge
              and a real focus outline (outline-hidden). Room for the clear button is kept only once there is text
              to clear. Below 360px the placeholder drops to 15px so it fits whole; typed text stays 17px, so iOS
              does not zoom on focus. */}
          <div className="relative mt-2">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-foreground" />
            <input ref={inputRef} id={inputId} type="search" value={query} onChange={(event) => search(event.target.value)} onKeyDown={(event) => { if (event.key === "Escape" && query) { event.preventDefault(); clear(); } }} placeholder="For example, onsite or founder" autoComplete="off" spellCheck={false} enterKeyHint="search" className={`block h-12 w-full min-w-0 rounded-full border-0 bg-field pl-12 ${query ? "pr-12" : "pr-5"} type-body text-foreground transition-[background-color,box-shadow] duration-200 placeholder:text-muted-foreground max-[359px]:placeholder:text-[15px] hover:bg-[color-mix(in_srgb,var(--field),var(--foreground)_3%)] focus-visible:bg-surface focus-visible:shadow-[inset_0_0_0_1.5px_var(--foreground)] focus-visible:outline-hidden forced-colors:border forced-colors:border-[color:CanvasText] [&::-webkit-search-cancel-button]:appearance-none`} />
            {query && <button type="button" onClick={clear} className="absolute right-1 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-field hover:text-foreground">
              <CloseIcon className="size-3.5" /><span className="sr-only">Clear search</span>
            </button>}
          </div>

          {/* Suggested words as Nike's grey search-term pills, after a plain "Try". On desktop they keep to one line
              beside "Try"; on phones "Try" takes its own short line and the pills wrap under it, inside the gutter,
              so none is cut at the screen edge. */}
          <p className="mt-4 flex flex-wrap items-center gap-1.5 type-label font-normal text-muted-foreground max-sm:mt-3 max-sm:gap-y-2">
            <span className="mr-0.5 shrink-0 max-sm:basis-full">Try</span>
            {suggestions.map((suggestion) => {
              const pressed = normalise(query) === normalise(suggestion);
              return <button key={suggestion} type="button" aria-pressed={pressed} onClick={() => search(pressed ? "" : suggestion)} className={termPill}>{suggestion}</button>;
            })}
          </p>
          <p className="mt-5 type-label font-normal tabular-nums text-muted-foreground max-sm:mt-3.5"><span aria-hidden="true">{status}</span><span aria-live="polite" className="sr-only">{announced}</span></p>
        </div>

        {/* The topics as an index of the site's hairline link rows: each jumps to its group, with the number
            of questions it holds (or matches) beside the arrow. A topic with no match keeps its row, in grey and
            without a link; its count stays in line with the others (pr-7 stands in for the 16px arrow and its
            12px gap). Desktop only: on phones the groups follow straight after the search. */}
        <nav aria-label="Question topics" className="mt-3 max-lg:hidden">
          <ul className="border-t border-border">
            {grouped.map((group) => <li key={group.id}>
              {group.results.length
                ? <RowLink href={`#faq-${group.id}`} title={group.title} aside={<span className="tabular-nums">{plural(group.results.length)}</span>} />
                : <span className="flex min-h-13 items-center justify-between gap-4 border-b border-border py-3.5 pr-7 text-muted-foreground"><span className="text-[1rem] leading-[1.45]">{group.title}</span><span className="shrink-0 text-[0.875rem] tabular-nums">{plural(0)}</span></span>}
            </li>)}
          </ul>
        </nav>
      </div>
    </div>

    <div ref={resultsRef} className="min-w-0 lg:col-span-7 xl:col-span-8" onClickCapture={onClickCapture}>
      {results.length > 0
        ? <div className="grid gap-16 md:gap-20">
            {grouped.filter((group) => group.results.length).map((group) => <section key={group.id} id={`faq-${group.id}`} aria-labelledby={`faq-${group.id}-heading`}>
              <div className="flex items-baseline justify-between gap-6 pb-5">
                <h2 id={`faq-${group.id}-heading`} className="type-h3 text-foreground">{group.title}</h2>
                {/* On desktop the topic index beside the groups already shows this count; phones have no index. */}
                <p className="shrink-0 type-label font-normal tabular-nums text-muted-foreground lg:hidden">{plural(group.results.length)}</p>
              </div>
              <Accordion key={searching ? terms.join(" ") : "all"} items={group.results.map(entry)} forceOpen={(index) => opening && !closed.includes(group.results[index]?.[0])} />
            </section>)}
          </div>
        : <div>
            {/* A heading, as it stands in for the group headings it replaces. */}
            <h2 className="type-h3 text-foreground">No questions match “{query.trim()}”.</h2>
            <p className="mt-3 max-w-[60ch] type-body text-copy">Try another word, or ask TraininGenie directly about your requirement.</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
              <TextLink href="/contact-us">Ask TraininGenie directly</TextLink>
              <button type="button" onClick={clear} className={linkButton}>Clear search</button>
            </div>
          </div>}
    </div>
  </div>;
}
