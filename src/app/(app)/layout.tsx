import { ModalsProvider } from "@/components/modals/modals-provider";
import { WelcomeCommunityModal } from "@/components/modals/welcome-community-modal";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { TopNav } from "@/components/layout/top-nav";
import { getProfile, requireUser } from "@/lib/data";
import { realEmail } from "@/lib/phone";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  const { data: profile } = await getProfile();

  return (
    <ModalsProvider>
      <div className="flex min-h-dvh flex-col">
        <TopNav
          name={profile?.full_name ?? null}
          email={realEmail(user.email)}
          isAdmin={profile?.is_admin ?? false}
        />
        {/* bottom padding clears the fixed mobile dock */}
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-28 pt-6 md:px-8 md:pb-14 md:pt-10">
          {children}
        </main>
      </div>
      <MobileBottomNav />
      <WelcomeCommunityModal userId={user.id} />
    </ModalsProvider>
  );
}
