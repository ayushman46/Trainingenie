import Link from "next/link";
export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground"><ol className="flex flex-wrap items-center gap-x-2 gap-y-1"><li><Link href="/" className="underline-offset-4 hover:text-foreground hover:underline">Home</Link></li>{items.map((item) => <li key={item.label} className="flex items-center gap-2"><span aria-hidden="true">/</span>{item.href ? <Link href={item.href} className="underline-offset-4 hover:text-foreground hover:underline">{item.label}</Link> : <span aria-current="page" className="text-foreground">{item.label}</span>}</li>)}</ol></nav>;
}
