import { HeadphonesIcon, LayoutDashboard, Receipt, Store, UserRound, type LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  /** Shorter label for the phone dock. */
  short: string;
  icon: LucideIcon;
  href: string;
}

export const topNav: NavItem[] = [
  { label: "Dashboard", short: "Home", href: "/dashboard", icon: LayoutDashboard },
  { label: "Packages", short: "Packages", href: "/marketplace", icon: Store },
  { label: "Transactions", short: "History", href: "/transactions", icon: Receipt },
  { label: "Support", short: "Support", href: "/support", icon: HeadphonesIcon },
  { label: "Profile", short: "Profile", href: "/profile", icon: UserRound },
];
