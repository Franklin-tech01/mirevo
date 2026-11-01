import { Layers, LineChart, PiggyBank } from "lucide-react";
import { Card } from "@/components/ui/card";
import { formatMoney } from "@/lib/utils";

interface Props {
  totalInvestment: number;
  sharesOwned: number;
  portfolioValue: number;
}

/** One ledger-style card with a row per figure. */
export function PortfolioCard({ totalInvestment, sharesOwned, portfolioValue }: Props) {
  const items = [
    { label: "Total invested", value: formatMoney(totalInvestment), icon: PiggyBank },
    { label: "Packages owned", value: String(sharesOwned), icon: Layers },
    { label: "Portfolio value", value: formatMoney(portfolioValue), icon: LineChart },
  ];
  return (
    <Card className="flex flex-col divide-y divide-ink/15 overflow-hidden">
      {items.map((it) => (
        <div key={it.label} className="flex flex-1 items-center gap-4 px-5 py-4">
          <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
            <it.icon className="size-5" />
          </div>
          <div className="min-w-0">
            <p className="eyebrow">{it.label}</p>
            <p className="tabular truncate font-display text-xl font-extrabold">{it.value}</p>
          </div>
        </div>
      ))}
    </Card>
  );
}
