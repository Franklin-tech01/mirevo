import { cn } from "@/lib/utils";

/** The Mirevo "M" mark: a rising zig-zag on an ink tile. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Mirevo"
      className={cn("grid size-8 shrink-0 place-items-center rounded-lg bg-ink", className)}
    >
      <svg viewBox="0 0 64 64" className="size-[68%]" fill="none" aria-hidden>
        <path
          d="M10 50V16l22 22 22-22v34"
          stroke="var(--accent)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark />
      <span
        className={cn(
          "font-display text-xl font-extrabold tracking-tight",
          tone === "light" ? "text-ink-foreground" : "text-foreground",
        )}
      >
        mirevo
      </span>
    </span>
  );
}
