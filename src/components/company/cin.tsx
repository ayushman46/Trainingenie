import { useId } from "react";
import { ClientOnly } from "@/components/utility/client-only";
import { CopyButton } from "@/components/utility/copy-button";
import { LEGAL_ENTITY } from "@/data";

/**
 * The company's CIN as a verifiable detail: the number in tabular figures, so "2022OPC" reads digit by
 * digit, with a Copy button beside it for pasting into a registry search. The button appears after
 * hydration (ClientOnly); its slot keeps 48px reserved from the first paint and cancels the button's
 * 44px tap height with a negative margin, so neither the row's width nor its height changes when it
 * appears. It inherits the surrounding text size, so it fits a fact row or a legal line. `copyFirst`
 * (a fact row, whose values end flush right) shows Copy before the number from sm, the button set
 * against the number's start, so the CIN ends on the same edge as the other values; on phones, where
 * the value stacks left-aligned under its term, Copy stays after it. The DOM order is unchanged.
 */
export function Cin({ copyFirst = false, className = "" }: { copyFirst?: boolean; className?: string }) {
  const id = `cin-value-${useId()}`;
  return <span className={`inline-flex flex-wrap items-baseline gap-x-3 ${copyFirst ? "sm:flex-row-reverse" : ""} ${className}`}>
    <span id={id} className="tabular-nums">{LEGAL_ENTITY.cin}</span>
    <span className={`inline-flex min-w-12 ${copyFirst ? "sm:justify-end" : ""}`}><ClientOnly><CopyButton value={LEGAL_ENTITY.cin} what="CIN" target={id} className="-my-3.5" /></ClientOnly></span>
  </span>;
}
