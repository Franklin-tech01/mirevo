export function DashboardHeader({ name }: { name: string }) {
  return (
    <div className="mb-8">
      <p className="eyebrow">Invest • Grow • Earn</p>
      <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
        Hello, {name}<span className="text-primary">.</span>
      </h1>
      <p className="mt-2 font-medium text-muted-foreground">Here&apos;s how your money is growing today.</p>
    </div>
  );
}
