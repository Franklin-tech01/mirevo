"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowDownToLine, ArrowUpFromLine, LogOut, Settings, ShieldCheck, UserRound } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { useModals } from "@/components/modals/modals-provider";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth";
import { cn, initials } from "@/lib/utils";
import { topNav } from "./nav";

/** Sticky top bar: brand, primary links (desktop), cash actions and the account menu. */
export function TopNav({
  name,
  email,
  isAdmin = false,
}: {
  name: string | null;
  email: string | null;
  isAdmin?: boolean;
}) {
  const pathname = usePathname();
  const { openDeposit, openWithdraw } = useModals();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const menuItem =
    "flex h-10 w-full items-center gap-2.5 rounded-lg px-3 text-sm font-semibold transition-colors hover:bg-muted";

  return (
    <header className="sticky top-0 z-30 border-b-[1.5px] border-ink bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 md:px-8">
        <Link href="/dashboard" aria-label="Mirevo home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="ml-4 hidden items-center gap-1 md:flex">
          {topNav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3.5 py-2 text-sm font-bold transition-colors",
                  active ? "bg-ink text-accent" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="accent" onClick={openDeposit} className="hidden sm:inline-flex">
            <ArrowDownToLine /> Deposit
          </Button>
          <Button size="sm" variant="outline" onClick={openWithdraw} className="hidden sm:inline-flex">
            <ArrowUpFromLine /> Withdraw
          </Button>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              aria-label="Account menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="grid size-10 place-items-center rounded-xl border-[1.5px] border-ink bg-primary text-xs font-extrabold text-primary-foreground shadow-hard-sm transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              {initials(name, email)}
            </button>
            {open && (
              <div className="surface surface-hard absolute right-0 top-12 w-56 p-1.5" onClick={() => setOpen(false)}>
                <div className="px-3 pb-2 pt-1.5">
                  <p className="truncate text-sm font-bold">{name ?? "Mirevo member"}</p>
                  {email && <p className="truncate text-xs text-muted-foreground">{email}</p>}
                </div>
                <div className="border-t pt-1.5">
                  <Link href="/profile" className={menuItem}>
                    <UserRound className="size-4" /> Profile
                  </Link>
                  <Link href="/settings" className={menuItem}>
                    <Settings className="size-4" /> Settings
                  </Link>
                  {isAdmin && (
                    <Link href="/admin" className={menuItem}>
                      <ShieldCheck className="size-4" /> Admin
                    </Link>
                  )}
                  <form action={signOut}>
                    <button type="submit" className={cn(menuItem, "text-danger")}>
                      <LogOut className="size-4" /> Log out
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
