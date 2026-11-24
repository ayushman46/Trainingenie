import { DELIVERY_FORMATS, UI_LABELS } from "@/data/site-copy";

/** One ruled line: "Delivered  Online · Onsite · Hybrid", the formats a list whose dots are hidden from screen readers. No icons. On phones the label takes its own line. */
export function DeliveryLine({ className = "" }: { className?: string }) {
  return <div className={`flex flex-wrap items-baseline gap-x-6 gap-y-1 border-t border-border pt-6 type-ui ${className}`}>
    <p className="text-muted-foreground max-sm:w-full">{UI_LABELS.delivered}</p>
    <ul aria-label={UI_LABELS.delivered} className="flex flex-wrap font-medium text-foreground">
      {DELIVERY_FORMATS.map((format, index) => <li key={format.name}>
        {index > 0 && <span aria-hidden="true" className="mx-2 font-normal text-border-strong">·</span>}
        {format.name}
      </li>)}
    </ul>
  </div>;
}
