import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { requireAdmin } from "@/lib/data/admin";
import { AdminNav } from "@/components/admin/admin-nav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-30 bg-ink text-ink-foreground">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3">
            <Logo tone="light" />
            <span className="rounded-md bg-accent px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-widest text-accent-foreground">
              Admin
            </span>
          </div>
          <Link href="/dashboard" className="flex items-center gap-1.5 text-sm font-bold text-ink-muted hover:text-white">
            <ArrowLeft className="size-4" /> Back to app
          </Link>
        </div>
        <AdminNav />
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-8">{children}</main>
    </div>
  );
}
