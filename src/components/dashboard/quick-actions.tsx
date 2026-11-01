"use client";

import Link from "next/link";
import { ArrowDownToLine, ArrowUpFromLine, Receipt, ShoppingBag } from "lucide-react";
import { useModals } from "@/components/modals/modals-provider";

const base =
  "group flex items-center gap-3 rounded-xl border-[1.5px] border-ink bg-card px-4 py-3 text-left shadow-hard-sm transition-all hover:bg-accent active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";

function Tile({ icon: Icon, label, hint }: { icon: typeof Receipt; label: string; hint: string }) {
  return (
    <>
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-ink text-accent">
        <Icon className="size-[18px]" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-bold leading-tight">{label}</span>
        <span className="block truncate text-xs text-muted-foreground group-hover:text-foreground/70">{hint}</span>
      </span>
    </>
  );
}

export function QuickActions() {
  const { openDeposit, openWithdraw } = useModals();
  return (
    <section aria-label="Quick actions" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <button type="button" onClick={openDeposit} className={base}>
        <Tile icon={ArrowDownToLine} label="Deposit" hint="Add funds" />
      </button>
      <button type="button" onClick={openWithdraw} className={base}>
        <Tile icon={ArrowUpFromLine} label="Withdraw" hint="Cash out" />
      </button>
      <Link href="/marketplace" className={base}>
        <Tile icon={ShoppingBag} label="Packages" hint="Start earning" />
      </Link>
      <Link href="/transactions" className={base}>
        <Tile icon={Receipt} label="History" hint="All activity" />
      </Link>
    </section>
  );
}
