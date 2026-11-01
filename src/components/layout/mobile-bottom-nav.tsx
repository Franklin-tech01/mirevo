"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { topNav } from "./nav";

/** Full-width dock pinned to the bottom edge on phones. */
export function MobileBottomNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Primary"
      className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t-[1.5px] border-ink bg-card md:hidden"
    >
      <ul className="grid grid-cols-5">
        {topNav.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-bold transition-colors",
                  active ? "bg-ink text-accent" : "text-muted-foreground",
                )}
              >
                <item.icon className="size-5" />
                {item.short}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
