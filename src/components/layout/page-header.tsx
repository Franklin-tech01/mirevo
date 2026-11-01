export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b-[1.5px] border-ink pb-5">
      <div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h1>
        {description && <p className="mt-1.5 text-sm font-medium text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function ErrorNotice({ message }: { message: string }) {
  return (
    <div role="alert" className="rounded-xl border-[1.5px] border-danger bg-danger-soft p-4 text-sm font-medium text-danger">
      Something went wrong loading this section. {message}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border-[1.5px] border-dashed border-ink/50 bg-card/60 px-6 py-12 text-center">
      <div className="grid size-12 place-items-center rounded-xl bg-accent text-accent-foreground">{icon}</div>
      <p className="mt-4 font-display text-lg font-extrabold">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
