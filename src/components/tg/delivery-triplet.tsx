import { DELIVERY_FORMATS } from "@/data/site-copy";

/**
 * The delivery formats as a display triplet (What we do, "Delivery formats"): "Online", "Onsite" and
 * "Hybrid" set large in Geist 500, each with its plain definition. Three columns from `md`, each
 * opened by its own hairline, like the rest of the page's rows; stacked on phones. No icons, no
 * dividers between columns. The columns start at `md` rather than `sm`: between 640 and 767px the
 * large words would not fit a third of the width. Phones set the stack a little tighter (32px between
 * formats), and set the words at row size (22px), so they never outrank the 28px chapter heading
 * above them; from `md` they take the display triplet size.
 */
export function DeliveryTriplet({ className = "" }: { className?: string }) {
  return <ul className={`grid gap-y-8 md:grid-cols-3 md:gap-x-8 md:gap-y-10 ${className}`}>
    {DELIVERY_FORMATS.map((format) => <li key={format.name} className="min-w-0 border-t border-border pt-5 md:pt-6">
      <p className="type-row text-foreground md:type-triplet">{format.name}</p>
      <p className="mt-3 max-w-[28ch] type-small text-copy md:mt-4">{format.text}</p>
    </li>)}
  </ul>;
}
