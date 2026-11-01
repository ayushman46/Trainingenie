/**
 * A programme's key concepts as a plain spec list, Nike style: the concept's name (Geist 500, ink)
 * beside what it covers (body, grey-black), one hairline row each under a stronger opening rule. No
 * numbers: the <ol> keeps the order for assistive technology. From `lg` the rows sit on the
 * 12-column grid: the name in columns 1–3, on the band's stacked SectionHead edge, the detail in
 * 4–12, so the band has two left edges, not three. Below `lg` the detail drops under the name, with
 * tighter rows, so the band stays a quick read on a phone; it keeps the 17px body size at every width.
 */
export function ConceptList({ items, className = "" }: { items: { name: string; detail: string }[]; className?: string }) {
  return <ol className={`border-t border-border-strong ${className}`}>
    {items.map((concept) => <li key={concept.name} className="grid gap-y-1.5 border-b border-border py-5 lg:grid-cols-12 lg:items-baseline lg:gap-x-10 lg:gap-y-2 lg:py-7">
      <h3 className="max-w-[28ch] text-balance type-h4 text-foreground lg:col-span-3">{concept.name}</h3>
      <p className="max-w-measure type-body text-copy lg:col-span-9">{concept.detail}</p>
    </li>)}
  </ol>;
}
