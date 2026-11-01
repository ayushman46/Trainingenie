"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "copied" | "selected" | "failed";

// Insecure contexts and older browsers have no async clipboard; a hidden textarea with execCommand still works there.
// Selecting the textarea moves focus to it, so focus is handed back to the button afterwards. Shared with ShareActions.
export function legacyCopy(text: string) {
  const active = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.cssText = "position:fixed;top:0;left:0;opacity:0;pointer-events:none";
  document.body.appendChild(area);
  area.select();
  let copied = false;
  try { copied = document.execCommand("copy"); } catch { copied = false; }
  area.remove();
  active?.focus({ preventScroll: true });
  return copied;
}

// When nothing can copy, select the visible detail so the visitor only has to use their copy shortcut.
function selectText(id?: string) {
  const node = id ? document.getElementById(id) : null;
  const selection = window.getSelection();
  if (!node || !selection) return false;
  const range = document.createRange();
  range.selectNodeContents(node);
  selection.removeAllRanges();
  selection.addRange(range);
  return true;
}

/**
 * Copies one contact detail. A plain underlined word ("Copy"), not a boxed control: it changes to
 * "Copied" and a polite status region says what was copied; if no clipboard is available it says so
 * and selects the detail (the element with id `target`). Render inside <ClientOnly>, so visitors
 * without JavaScript never meet a dead button. The text is 13px; the button itself is a 44px-tall
 * target, so it is easy to tap on phones. `label` replaces the idle word ("Copy company details",
 * "Copy link"); it names what it copies, so `what` is then not repeated after it for screen readers.
 */
export function CopyButton({ value, what, target, label: idle = "Copy", className = "" }: { value: string; what: string; target?: string; label?: string; className?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const finish = (copied: boolean) => {
    setStatus(copied ? "copied" : selectText(target) ? "selected" : "failed");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus("idle"), copied ? 2000 : 6000);
  };

  // Without the async clipboard, the fallback runs synchronously, while the click still counts as a user gesture.
  const copy = () => {
    if (!navigator.clipboard?.writeText) { finish(legacyCopy(value)); return; }
    navigator.clipboard.writeText(value).then(() => finish(true), () => finish(legacyCopy(value)));
  };

  const done = status === "copied";
  const label = done ? "Copied" : status === "selected" ? "Selected" : status === "failed" ? "Select to copy" : idle;
  const named = status === "idle" && idle !== "Copy";
  const message = done ? `Copied ${what}` : status === "selected" ? `Copying is not available here. The ${what} is selected; use your copy shortcut.` : status === "failed" ? `Copying is not available here. Select the ${what} to copy it.` : "";
  return <>
    <button type="button" onClick={copy} className={`inline-flex min-h-11 shrink-0 items-center type-label underline decoration-1 underline-offset-4 transition-colors duration-200 hover:text-foreground hover:decoration-foreground ${done ? "text-foreground decoration-foreground" : "text-muted-foreground decoration-border-strong"} ${className}`}>
      <span>{label}</span>{!named && <span className="sr-only"> {what}</span>}
    </button>
    <span role="status" className="sr-only">{message}</span>
  </>;
}
