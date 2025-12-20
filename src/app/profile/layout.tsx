"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { User, ShoppingBag, MapPin } from "lucide-react";
import useAuth from "@/hooks/useAuth";

const navItems = [
  { href: "/profile", icon: User, label: "Profile" },
  { href: "/profile/orders", icon: ShoppingBag, label: "Orders" },
  { href: "/profile/addresses", icon: MapPin, label: "Addresses" },
];

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuth();

  const isActive = (href: string) => {
    return href === pathname;
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6">
      {/* HEADER */}
      <header className="mb-6">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
          My Account
        </h1>
        <p className="mt-1 text-sm md:text-lg text-muted-foreground">
          Welcome back, {user?.name ?? "User"}
        </p>
      </header>

      {/* MOBILE NAV */}
      <div className="mb-6 md:hidden">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm transition",
                isActive(item.href)
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="grid md:grid-cols-4 gap-6">
        {/* SIDEBAR */}
        <aside className="hidden md:block md:col-span-1">
          <div className="sticky top-24 space-y-1 rounded-xl border p-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                  isActive(item.href)
                    ? "bg-muted font-semibold text-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </aside>

        {/* CONTENT */}
        <main className="md:col-span-3">{children}</main>
      </div>
    </div>
  );
}
