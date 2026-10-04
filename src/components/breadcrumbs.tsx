import Link from "next/link";
export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link href="/" className="hover:text-foreground">Home</Link></li>{items.map((item) => <li key={item.label}>{item.href ? <Link href={item.href} className="hover:text-foreground">{item.label}</Link> : <span aria-current="page">{item.label}</span>}</li>)}</ol></nav>;
}
