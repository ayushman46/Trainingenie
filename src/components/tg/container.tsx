import type { ReactNode } from "react";

/** Page-width wrapper: at most 1200px of content, with 20 / 32 / 40px gutters. */
export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}
