"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { legacyCopy } from "./copy-button";

type Status = "idle" | "copied" | "failed";

const subscribe = () => () => {};
// What the first action does in this browser: the system share sheet where there is one, else copying
// the link. Null on the server and during hydration, so nothing renders until the page has mounted.
const shareMode = () => (typeof navigator.share === "function" ? "share" : "copy");

// TextLink's `md` look on a button: 16px medium ink with a 1px underline, grey on hover, and the
// invisible ::before that pads the hit area to 45px tall without moving the layout.
const action = "relative inline-flex items-center font-medium text-[1rem] text-foreground underline decoration-1 underline-offset-4 transition-colors duration-200 ease-out hover:text-muted-foreground before:absolute before:inset-x-0 before:-inset-y-3";

/**
 * Two quiet text actions for passing a page on to an approver: "Share" (the system share sheet with
 * the page's `title` and `url`; where there is none, "Copy link", which copies the url and says
 * "Link copied" in a polite status region), and "Print or save as PDF". No icons and no colour. They
 * render only after mount, inside a 44px-tall row that is there from the first paint, so nothing
 * shifts and the server markup matches; print hides them.
 */
export function ShareActions({ title, url, className = "" }: { title: string; url: string; className?: string }) {
  const mode = useSyncExternalStore(subscribe, shareMode, () => null);
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const finish = (copied: boolean) => {
    setStatus(copied ? "copied" : "failed");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus("idle"), copied ? 2000 : 6000);
  };

  // As CopyButton: without the async clipboard the fallback runs synchronously, inside the click's user gesture.
  const copy = () => {
    if (!navigator.clipboard?.writeText) { finish(legacyCopy(url)); return; }
    navigator.clipboard.writeText(url).then(() => finish(true), () => finish(legacyCopy(url)));
  };

  // Closing the share sheet rejects with an AbortError, which is not a failure. Any other refusal
  // (a blocked or unsupported share) falls back to copying the link.
  const share = () => {
    if (mode !== "share") { copy(); return; }
    navigator.share({ title, url }).catch((error: unknown) => {
      if (!(error instanceof DOMException && error.name === "AbortError")) copy();
    });
  };

  const label = status === "copied" ? "Link copied" : status === "failed" ? "Copying unavailable" : mode === "share" ? "Share" : "Copy link";
  const message = status === "copied" ? "Link copied" : status === "failed" ? "Copying is not available here. Copy the page address from the address bar." : "";
  return <div className={`flex min-h-11 flex-wrap items-center gap-x-8 gap-y-4 print:hidden ${className}`}>
    {mode && <>
      <button type="button" onClick={share} className={action}>{label}</button>
      <button type="button" onClick={() => window.print()} className={action}>Print or save as PDF</button>
      <span role="status" className="sr-only">{message}</span>
    </>}
  </div>;
}
