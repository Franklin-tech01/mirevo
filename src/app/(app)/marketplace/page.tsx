import type { Metadata } from "next";
import { ErrorNotice, PageHeader } from "@/components/layout/page-header";
import { MarketplaceView } from "@/components/marketplace/marketplace-view";
import { getShares } from "@/lib/data";

export const metadata: Metadata = { title: "Marketplace" };

export default async function MarketplacePage() {
  const { data, error } = await getShares();
  return (
    <>
      <PageHeader title="Packages" description="Pick a package and earn every day for 40 days." />
      {error ? <ErrorNotice message={error} /> : <MarketplaceView shares={data} />}
    </>
  );
}
