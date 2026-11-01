import * as React from "react";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-xl border-[1.5px] border-ink bg-card px-3.5 text-sm font-medium text-foreground placeholder:font-normal placeholder:text-muted-foreground/70 outline-none transition focus:shadow-hard-sm focus:ring-0 disabled:cursor-not-allowed disabled:border-input disabled:bg-muted aria-[invalid=true]:border-danger";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(field, "h-11", className)} {...props} />;
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea className={cn(field, "min-h-28 py-3", className)} {...props} />;
}

export function Select({ className, ...props }: React.ComponentProps<"select">) {
  return <select className={cn(field, "h-11", className)} {...props} />;
}
