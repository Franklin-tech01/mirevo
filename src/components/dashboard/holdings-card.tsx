import Link from "next/link";
import { Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LogoMark } from "@/components/brand/logo";
import { formatMoney } from "@/lib/utils";
import type { Holding, ShareTier } from "@/lib/types";

const tierTone = { standard: "neutral", premium: "brand", vip: "navy" } as const;

interface Row {
  shareId: string;
  name: string;
  symbol: string;
  tier: ShareTier;
  quantity: number;
  invested: number;
}

/** One row per purchase in `holdings` — group into one row per package owned. */
function groupByShare(holdings: Holding[]): Row[] {
  const byShare = new Map<string, Row>();
  for (const h of holdings) {
    const existing = byShare.get(h.share_id);
    if (existing) {
      existing.quantity += h.quantity;
      existing.invested += h.quantity * h.purchase_price;
    } else {
      byShare.set(h.share_id, {
        shareId: h.share_id,
        name: h.shares?.name ?? "Mirevo Package",
        symbol: h.shares?.symbol ?? "",
        tier: h.shares?.tier ?? "standard",
        quantity: h.quantity,
        invested: h.quantity * h.purchase_price,
      });
    }
  }
  return [...byShare.values()];
}

export function HoldingsCard({ holdings }: { holdings: Holding[] }) {
  const rows = groupByShare(holdings);

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-extrabold">Your packages</h2>
        {rows.length > 0 && (
          <Link href="/marketplace" className="text-sm font-bold text-primary underline-offset-4 hover:underline">
            Buy more →
          </Link>
        )}
      </div>

      {rows.length === 0 ? (
        <div className="mt-4 flex flex-col items-center rounded-xl border-[1.5px] border-dashed border-ink/40 py-8 text-center">
          <div className="grid size-10 place-items-center rounded-lg bg-accent text-accent-foreground">
            <Layers className="size-5" />
          </div>
          <p className="mt-3 text-sm font-bold">You don&apos;t own any packages yet</p>
          <Link href="/marketplace" className="mt-1 text-sm font-bold text-primary underline-offset-4 hover:underline">
            Browse packages →
          </Link>
        </div>
      ) : (
        <ul className="mt-4 divide-y">
          {rows.map((r) => (
            <li key={r.shareId} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <LogoMark className="size-9 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-2 text-sm font-bold">
                  {r.name}
                  <Badge tone={tierTone[r.tier]}>{r.tier}</Badge>
                </p>
                <p className="text-xs text-muted-foreground">
                  {r.quantity} × {r.symbol}
                </p>
              </div>
              <p className="tabular shrink-0 text-right text-sm font-extrabold">{formatMoney(r.invested)}</p>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
