"use client";

import { useSyncExternalStore } from "react";

/** Where the enquiry form leaves the reply address and topic of a sent enquiry, for the thank-you page (this tab only). */
export const ENQUIRY_SENT_KEY = "tg-enquiry-sent";

type Sent = { email: string; topic: string };

// Read once per page load, then removed from storage, so a later visit to the page does not repeat it. The entry is
// kept here for the rest of the load, so every render (and React's development double render) sees the same one.
// A sent form always arrives on a new page load (FormSubmit redirects back), which reads its own entry.
let sent: Sent | null | undefined;
function takeSent() {
  if (sent !== undefined) return sent;
  sent = null;
  try {
    const stored = JSON.parse(sessionStorage.getItem(ENQUIRY_SENT_KEY) ?? "null") as Partial<Sent> | null;
    sessionStorage.removeItem(ENQUIRY_SENT_KEY);
    if (typeof stored?.email === "string" && stored.email) sent = { email: stored.email, topic: typeof stored.topic === "string" ? stored.topic : "" };
  } catch { /* no storage, or an unreadable entry: nothing to echo */ }
  return sent;
}
const subscribeNever = () => () => {};
const onServer = () => null;

/**
 * The thank-you page's echo of what was just sent: the reply address and the topic. Without storage, after a
 * reload, or on a direct visit it renders nothing. It is read after hydration, as the server cannot know it.
 */
export function EnquiryEcho({ className = "" }: { className?: string }) {
  const echo = useSyncExternalStore(subscribeNever, takeSent, onServer);
  if (!echo) return null;
  return <p className={`type-ui text-foreground ${className}`}>We will follow up at <span className="font-medium wrap-anywhere">{echo.email}</span>{echo.topic ? <> about {echo.topic}</> : null}.</p>;
}
