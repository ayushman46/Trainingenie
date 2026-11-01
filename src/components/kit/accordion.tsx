"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { PlusIcon } from "@/components/tg/icons";

export type AccordionEntry = { question: string; answer: ReactNode };

// Whether closed answers can be hidden "until found" (find-in-page opens them). Read once on the
// client; the server renders today's inert panels.
const subscribeNever = () => () => {};
const supportsUntilFound = () => "onbeforematch" in document.body;
const onServer = () => false;

/**
 * One answer panel. Where the browser supports it, a closed answer is hidden with
 * hidden="until-found" rather than made inert, so find-in-page still finds its text and opens it
 * (the beforematch event). The attribute is set by hand, since React would treat `hidden` as a
 * boolean: at once for answers that start closed, and only after the collapse has run for an answer
 * that is closing, so it does not vanish while it folds. It is removed before an answer opens.
 * Elsewhere a closed answer is inert, as before.
 */
function AnswerPanel({ id, labelledBy, index, expanded, untilFound, onFound, children }: { id: string; labelledBy: string; index: number; expanded: boolean; untilFound: boolean; onFound: (index: number) => void; children: ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const wasExpanded = useRef(expanded);

  useLayoutEffect(() => {
    const inner = innerRef.current;
    const closing = wasExpanded.current && !expanded;
    wasExpanded.current = expanded;
    if (!inner || !untilFound) return;
    if (expanded) { inner.removeAttribute("hidden"); return; }
    const hide = () => inner.setAttribute("hidden", "until-found");
    if (!closing) { hide(); return; }
    // The collapse runs for the panel's transition (none under reduced motion).
    const timer = window.setTimeout(hide, (parseFloat(getComputedStyle(inner.parentElement ?? inner).transitionDuration) || 0) * 1000);
    return () => window.clearTimeout(timer);
  }, [expanded, untilFound]);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner || !untilFound) return;
    const found = () => onFound(index);
    inner.addEventListener("beforematch", found);
    return () => inner.removeEventListener("beforematch", found);
  }, [untilFound, onFound, index]);

  // Labelled as a region only while open, so a page of closed questions lists no empty landmarks.
  return <div id={id} role={expanded ? "region" : undefined} aria-labelledby={expanded ? labelledBy : undefined} className="collapse-grid" data-open={expanded} inert={!expanded && !untilFound}>
    <div ref={innerRef}><div className="max-w-measure pb-6 type-body text-pretty text-copy">{children}</div></div>
  </div>;
}

/**
 * Questions that expand independently, following the WAI-ARIA accordion pattern: each question is
 * a real heading containing a button (aria-expanded / aria-controls), and each open answer is a
 * labelled region. Opening one leaves the others as they are, so the question just clicked never moves under
 * the pointer. Closed answers stay in the HTML for search engines; they are hidden until found where
 * the browser supports it (find-in-page opens them), and inert elsewhere, so focus skips them.
 * `forceOpen` opens matching items (used by the FAQ search) without changing the user's choice.
 * Hairline rows with 17px medium questions (balanced wraps); a single plus turns 45° into a × when open.
 */
export function Accordion({ items, defaultOpen = -1, headingLevel = 3, forceOpen, className = "" }: { items: AccordionEntry[]; defaultOpen?: number; headingLevel?: 2 | 3; forceOpen?: (index: number) => boolean; className?: string }) {
  const [open, setOpen] = useState(() => new Set(defaultOpen >= 0 ? [defaultOpen] : []));
  const untilFound = useSyncExternalStore(subscribeNever, supportsUntilFound, onServer);
  const baseId = useId();
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const toggle = (index: number) => setOpen((current) => {
    const next = new Set(current);
    if (next.has(index)) next.delete(index); else next.add(index);
    return next;
  });
  const reveal = useCallback((index: number) => setOpen((current) => (current.has(index) ? current : new Set(current).add(index))), []);

  return <div className={`border-t border-border ${className}`}>
    {items.map(({ question, answer }, index) => {
      const expanded = open.has(index) || Boolean(forceOpen?.(index));
      const buttonId = `${baseId}-q-${index}`;
      const panelId = `${baseId}-a-${index}`;
      return <div key={question} className="border-b border-border">
        <Heading>
          <button id={buttonId} type="button" aria-expanded={expanded} aria-controls={panelId} onClick={() => toggle(index)} className="group/question flex min-h-14 w-full items-center justify-between gap-6 py-5 text-left type-item text-foreground focus-visible:rounded-none">
            <span className="text-balance decoration-1 underline-offset-4 group-hover/question:underline">{question}</span>
            <PlusIcon className={`size-[18px] text-foreground transition-transform duration-(--motion-ui) ease-out ${expanded ? "rotate-45" : ""}`} />
          </button>
        </Heading>
        <AnswerPanel id={panelId} labelledBy={buttonId} index={index} expanded={expanded} untilFound={untilFound} onFound={reveal}>{answer}</AnswerPanel>
      </div>;
    })}
  </div>;
}
