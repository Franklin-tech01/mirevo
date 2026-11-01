"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { useModals } from "@/components/modals/modals-provider";
import { cn, formatMoney } from "@/lib/utils";
import { PLAN_DURATION_DAYS } from "@/lib/config";
import type { Share } from "@/lib/types";

/** Ticket-style package card: ink header with the price, ledger rows for the payout. */
export function ShareCard({ share }: { share: Share }) {
  const { openBuy } = useModals();
  const vip = share.tier === "vip";
  return (
    <article className="surface group flex flex-col overflow-hidden transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard">
      <header className={cn("p-5", vip ? "bg-accent text-accent-foreground" : "bg-ink text-ink-foreground")}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-2xl font-extrabold leading-none">{share.name}</h3>
            <p className={cn("mt-1 text-xs font-semibold", vip ? "text-accent-foreground/70" : "text-ink-muted")}>
              {share.symbol}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge tone={vip ? "navy" : "brand"}>{share.tier}</Badge>
            {share.badge && <Badge tone="warning">{share.badge}</Badge>}
          </div>
        </div>
        <p className="tabular mt-5 font-display text-4xl font-extrabold tracking-tight">{formatMoney(share.price)}</p>
      </header>

      {/* perforation */}
      <div aria-hidden className="relative h-0 border-t-[1.5px] border-dashed border-ink">
        <span className="absolute -left-2.5 -top-2.5 size-5 rounded-full border-[1.5px] border-ink bg-background" />
        <span className="absolute -right-2.5 -top-2.5 size-5 rounded-full border-[1.5px] border-ink bg-background" />
      </div>

      <dl className="flex-1 space-y-2.5 p-5 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Daily profit</dt>
          <dd className="tabular font-extrabold text-success">{formatMoney(share.daily_earning)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Duration</dt>
          <dd className="font-bold">{PLAN_DURATION_DAYS} days</dd>
        </div>
        <div className="flex items-center justify-between border-t pt-2.5">
          <dt className="font-semibold">Total profit</dt>
          <dd className="tabular font-display text-lg font-extrabold">
            {formatMoney(share.daily_earning * PLAN_DURATION_DAYS)}
          </dd>
        </div>
      </dl>

      <footer className="flex items-center justify-between gap-3 px-5 pb-5">
        <StatusBadge kind="share" status={share.status} />
        <Button variant="accent" disabled={share.status !== "available"} onClick={() => openBuy(share)}>
          Invest
        </Button>
      </footer>
    </article>
  );
}
