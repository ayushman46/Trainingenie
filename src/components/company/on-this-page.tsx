import { IndexList } from "@/components/tg/index-list";

type Item = { href: string; label: string };

/**
 * A page's sections as an index of jump links: the shared IndexList ("On this page", hairline rows
 * with a down arrow). From `lg` it is open in the hero aside, one column; below `lg` it folds into
 * IndexList's one closed disclosure row ("On this page"), so a phone hero does not stack
 * open rows before the content. Every chapter is still one tap away once it is open.
 */
export function OnThisPage({ items, className = "" }: { items: Item[]; className?: string }) {
  return <IndexList
    id="on-this-page-heading"
    title="On this page"
    collapsible
    sections={[{ rows: items.map((item) => ({ href: item.href, label: item.label, arrow: "down" as const })) }]}
    className={className}
  />;
}
