import { PRIDE_VALUES } from "@/data";

/**
 * The five PRIDE values as an open list under a strong rule: the ink display letter, the value's name
 * and its text, one hairline row each. No colour: the letter is set at the h2 size in Geist 500, ink
 * like the name beside it, so the acronym reads down the left edge on its own. From `md` the row sits
 * on the 12-column grid (letter in column 1, name in 2–4, text in 5–12); the term is a subgrid, so the
 * letter and the name share the page's columns and the markup stays a valid dt / dd pair. The row
 * aligns to the top and the text is padded down onto the letter's baseline, which every engine
 * measures the same (a baseline-aligned grid around a subgrid did not). Below `md` the letter hangs
 * in its own narrow column, the term's box drops out (`contents`) and the name and the text share
 * one left edge beside it.
 */
export function ValuesList({ className = "" }: { className?: string }) {
  return <dl className={`border-t border-border-strong ${className}`}>
    {PRIDE_VALUES.map((value) => <div key={value.letter} className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-baseline gap-x-0 gap-y-2 border-b border-border py-7 md:grid-cols-12 md:items-start md:gap-x-10">
      <dt className="max-md:contents md:col-span-4 md:grid md:grid-cols-subgrid md:items-baseline md:gap-x-10">
        <span aria-hidden="true" className="font-display text-[1.75rem] font-medium leading-none tracking-[-0.04em] text-foreground md:col-span-1 md:text-[2.5rem]">{value.letter}</span>
        <span className="type-h3 text-foreground md:col-span-3">{value.title}</span>
      </dt>
      <dd className="max-w-measure type-body text-copy max-md:col-start-2 md:col-span-8 md:pt-[0.9375rem]">{value.text}</dd>
    </div>)}
  </dl>;
}
