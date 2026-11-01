import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { getCurrentUser } from "@/lib/data";

const ticker = ["Invest", "Grow", "Earn", "40 days", "Daily profit", "Instant bonus"];

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  // Validates the session against the database (not just the cookie).
  if (await getCurrentUser()) redirect("/dashboard");

  return (
    <main className="flex min-h-dvh flex-col">
      <header className="flex h-16 items-center justify-between border-b-[1.5px] border-ink px-4 md:px-8">
        <Logo />
        <p className="eyebrow hidden sm:block">Invest • Grow • Earn</p>
      </header>

      <div className="grid flex-1 lg:grid-cols-[1fr_minmax(0,28rem)_1fr]">
        {/* pitch, shown beside the form on large screens */}
        <aside className="hidden flex-col justify-center p-12 lg:flex xl:p-16">
          <p className="eyebrow">Earn every day</p>
          <h1 className="mt-4 font-display text-6xl font-extrabold leading-[0.95] tracking-tight">
            Put it to work.
            <span className="block text-primary">Watch it grow.</span>
          </h1>
          <p className="mt-6 max-w-sm font-medium text-muted-foreground">
            Pick a package from ₦4,000, collect your profit daily for 40 days and withdraw whenever you like.
          </p>
        </aside>

        <section className="flex flex-col justify-center px-4 py-10 sm:px-8">
          <div className="surface surface-hard w-full p-6 sm:p-8">{children}</div>
          <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs font-medium text-muted-foreground">
            <ShieldCheck className="size-4 text-primary" /> Secured with server-side access checks.
          </p>
        </section>

        <div aria-hidden className="hidden lg:block" />
      </div>

      {/* scrolling ticker */}
      <div aria-hidden className="overflow-hidden border-t-[1.5px] border-ink bg-ink py-3 text-ink-foreground">
        <div className="marquee flex w-max gap-10 whitespace-nowrap font-display text-sm font-extrabold uppercase tracking-widest">
          {[...ticker, ...ticker, ...ticker, ...ticker].map((t, i) => (
            <span key={i} className="flex items-center gap-10">
              {t} <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
