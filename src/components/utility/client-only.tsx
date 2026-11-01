"use client";

import { useSyncExternalStore, type ReactNode } from "react";

const subscribe = () => () => {};

/**
 * Renders its children only in the browser, after hydration. For controls that do nothing
 * without JavaScript, so visitors without it never meet a dead button.
 */
export function ClientOnly({ children }: { children: ReactNode }) {
  const isClient = useSyncExternalStore(subscribe, () => true, () => false);
  return isClient ? children : null;
}
