"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * The bulb icon and the "TraininGenie" wordmark (Geist 600, lightly tracked), linking home. The
 * header and footer sizes match: a 28px icon and 19.2px text on phones, 30px and 20px from `lg`.
 * Away from the landing the link is not prefetched: the landing's route would bring its slogan font
 * (Archivo, used nowhere else) onto every inner page.
 */
export function Wordmark({ size = "header", className = "", onClick }: { size?: "header" | "footer"; className?: string; onClick?: () => void }) {
  const pathname = usePathname();
  const icon = size === "footer" ? "h-[30px]" : "h-7 lg:h-[30px]";
  const text = size === "footer" ? "text-[1.25rem]" : "text-[1.2rem] lg:text-[1.25rem]";
  // A 44px tap target; the negative margin keeps the layout box at the icon's height (28px / 30px).
  const target = size === "footer" ? "min-h-11 -my-[7px]" : "min-h-11 -my-2 lg:-my-[7px]";
  return <Link href="/" prefetch={pathname === "/" ? null : false} aria-label="TraininGenie home" onClick={onClick} className={`inline-flex shrink-0 items-center gap-2.5 ${target} ${className}`}>
    <Image src="/logo_icon.png" alt="" width={315} height={279} sizes="36px" preload={size === "header"} className={`${icon} w-auto`} />
    <span className={`font-semibold leading-none tracking-[-0.022em] text-foreground ${text}`}>TraininGenie</span>
  </Link>;
}
