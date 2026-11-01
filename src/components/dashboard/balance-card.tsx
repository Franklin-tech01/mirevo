"use client";

import { ArrowDownToLine, ArrowUpFromLine, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModals } from "@/components/modals/modals-provider";
import { formatMoney } from "@/lib/utils";

export function BalanceCard({ balance, lockedBonus = 0 }: { balance: number; lockedBonus?: number }) {
  const { openDeposit, openWithdraw } = useModals();
  return (
    <div className="surface-ink relative overflow-hidden p-6 shadow-pop md:p-8">
      {/* decorative rising bars */}
      <div aria-hidden className="absolute bottom-0 right-6 flex items-end gap-2 opacity-90">
        {[28, 44, 36, 64, 52, 84, 112].map((h, i) => (
          <span
            key={i}
            style={{ height: h }}
            className={i === 6 ? "w-5 rounded-t-md bg-accent" : "w-5 rounded-t-md bg-ink-2"}
          />
        ))}
      </div>

      <p className="eyebrow !text-ink-muted">Total balance</p>
      <p className="tabular relative mt-3 font-display text-5xl font-extrabold tracking-tight md:text-6xl">
        {formatMoney(balance)}
      </p>
      <p className="mt-1.5 text-sm font-medium text-ink-muted">Available to invest or withdraw</p>

      {lockedBonus > 0 && (
        <p className="relative mt-4 flex max-w-sm items-start gap-1.5 rounded-lg bg-ink-2 p-3 text-xs text-ink-muted">
          <Lock className="mt-0.5 size-3 shrink-0 text-accent" />
          <span>
            Includes {formatMoney(lockedBonus)} in bonus money. It can be withdrawn after your first
            package purchase.
          </span>
        </p>
      )}

      <div className="relative mt-7 grid grid-cols-2 gap-3 sm:max-w-sm">
        <Button variant="accent" size="lg" onClick={openDeposit} className="!shadow-[2px_2px_0_0_var(--ink-foreground)]">
          <ArrowDownToLine /> Deposit
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={openWithdraw}
          className="!border-ink-foreground !bg-transparent !text-ink-foreground !shadow-[2px_2px_0_0_var(--ink-foreground)] hover:!bg-ink-2"
        >
          <ArrowUpFromLine /> Withdraw
        </Button>
      </div>
    </div>
  );
}
