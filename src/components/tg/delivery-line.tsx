import { DELIVERY_FORMATS, UI_LABELS } from "@/data/site-copy";

/** One ruled line: "Delivered  Online · Onsite · Hybrid". No icons. On phones the label takes its own line. */
export function DeliveryLine({ className = "" }: { className?: string }) {
  return <p className={`flex flex-wrap items-baseline gap-x-6 gap-y-1 border-t border-border pt-6 type-ui ${className}`}>
    <span className="text-muted-foreground max-sm:w-full">{UI_LABELS.delivered}</span>
    <span className="font-medium text-foreground">
      {DELIVERY_FORMATS.map((format, index) => <span key={format.name}>
        {index > 0 && <><span aria-hidden="true" className="mx-2 font-normal text-border-strong">·</span><span className="sr-only">, </span></>}
        {format.name}
      </span>)}
    </span>
  </p>;
}
