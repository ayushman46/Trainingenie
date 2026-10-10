"use client";

import { useEffect } from "react";

// The App Router replaces the server-rendered <title> of the root not-found page with the layout default
// once it hydrates; this puts the page's own title back.
export function DocumentTitle({ title }: { title: string }) {
  useEffect(() => { document.title = title; }, [title]);
  return null;
}
