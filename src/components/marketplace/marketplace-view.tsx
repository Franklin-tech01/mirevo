"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, Layers, List } from "lucide-react";
import { EmptyState } from "@/components/layout/page-header";
import { cn } from "@/lib/utils";
import type { Share, ShareTier } from "@/lib/types";
import { ShareCard } from "./share-card";
import { SharePricingTable } from "./share-pricing-table";

const filters: { label: string; value: "all" | ShareTier }[] = [
  { label: "All", value: "all" },
  { label: "Standard", value: "standard" },
  { label: "Premium", value: "premium" },
  { label: "VIP", value: "vip" },
];

export function MarketplaceView({ shares }: { shares: Share[] }) {
  const [tier, setTier] = useState<"all" | ShareTier>("all");
  const [view, setView] = useState<"table" | "cards">("cards");
  const visible = useMemo(
    () => (tier === "all" ? shares : shares.filter((s) => s.tier === tier)),
    [shares, tier],
  );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <div
          role="tablist"
          aria-label="Filter by tier"
          className="-ml-4 flex gap-2 overflow-x-auto py-1 pl-4 md:ml-0 md:pl-0"
        >
          {filters.map((f) => (
            <button
              key={f.value}
              role="tab"
              aria-selected={tier === f.value}
              onClick={() => setTier(f.value)}
              className={cn(
                "h-10 shrink-0 rounded-lg border-[1.5px] border-ink px-4 text-sm font-bold transition-all",
                tier === f.value
                  ? "bg-ink text-accent shadow-hard-sm"
                  : "bg-card text-muted-foreground hover:bg-muted",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="hidden shrink-0 overflow-hidden rounded-lg border-[1.5px] border-ink sm:flex" role="group" aria-label="View">
          {(
            [
              ["cards", LayoutGrid, "Card view"],
              ["table", List, "Table view"],
            ] as const
          ).map(([v, Icon, label]) => (
            <button
              key={v}
              aria-label={label}
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={cn(
                "grid size-9 place-items-center transition-colors",
                view === v ? "bg-ink text-accent" : "bg-card text-muted-foreground hover:bg-muted",
              )}
            >
              <Icon className="size-4" />
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <EmptyState
          icon={<Layers />}
          title="No packages here yet"
          description={tier === "all" ? "Packages will appear as soon as they are published." : "No packages in this tier right now."}
        />
      ) : view === "table" ? (
        <SharePricingTable shares={visible} />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((s) => (
            <ShareCard key={s.id} share={s} />
          ))}
        </div>
      )}
    </div>
  );
}
