"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookCopy,
  BookmarkCheck,
  BookPlus,
  ArrowRight,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";

const navItems = [
  {
    label: "Add Book",
    href: "/add-book",
    icon: BookPlus,
  },
  {
    label: "My Books",
    href: "/my-books",
    icon: BookCopy,
  },
  {
    label: "My Borrows",
    href: "/my-borrows",
    icon: BookmarkCheck,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [isPending, user, router, pathname]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] bg-[#FAF8F3]">
        <Spinner className="size-8 text-[#762F3D]" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FAF8F3] py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Mobile / Tablet Navigation Tabs */}
        <div className="lg:hidden bg-white rounded-2xl border border-[#E6E0D6] p-1.5 sm:p-2 shadow-xs">
          <div className="grid grid-cols-3 gap-1 sm:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all text-center ${
                    isActive
                      ? "bg-[#762F3D] text-white shadow-xs"
                      : "text-gray-700 hover:text-[#762F3D] hover:bg-[#FAF8F3]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Main Dashboard Flex Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 xl:w-72 shrink-0 space-y-5 sticky top-24">
            {/* User Profile Card */}
            <div className="bg-white rounded-2xl border border-[#E6E0D6] p-4 shadow-xs">
              <div className="flex items-center gap-3">
                <Avatar className="w-11 h-11 border-2 border-[#E6E0D6] shadow-2xs shrink-0">
                  <AvatarImage
                    referrerPolicy="no-referrer"
                    src={(user?.image as string) || ""}
                    alt={user?.name || "Reader"}
                  />
                  <AvatarFallback className="bg-[#762F3D] text-white font-bold text-sm">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1.5">
                    <h3 className="font-bold text-sm text-[#292521] truncate font-playfair">
                      {user?.name || "Reader"}
                    </h3>
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#762F3D]/10 text-[#762F3D] border border-[#762F3D]/20 shrink-0">
                      Member
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 truncate mt-0.5">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="bg-white rounded-2xl border border-[#E6E0D6] p-3 shadow-xs space-y-1">
              <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 font-josefin">
                Reader Menu
              </div>

              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                      isActive
                        ? "bg-[#762F3D] text-white shadow-xs"
                        : "text-gray-700 hover:text-[#762F3D] hover:bg-[#FAF8F3]"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105 ${
                        isActive
                          ? "text-white"
                          : "text-gray-500 group-hover:text-[#762F3D]"
                      }`}
                    />
                    <div className="min-w-0 flex-1 text-left">
                      <span className="block truncate">{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Quick Explore Banner */}
            <div className="bg-linear-to-br from-[#762F3D] to-[#5e2530] rounded-2xl p-4 text-white shadow-xs space-y-2.5">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200/90 font-josefin block">
                  Library Catalog
                </span>
                <h4 className="text-sm font-bold font-playfair">
                  Discover More Books
                </h4>
                <p className="text-[11px] text-white/80 leading-relaxed">
                  Browse through rare volumes and timeless literary classics.
                </p>
              </div>

              <Link
                href="/books"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors"
              >
                <span>Browse All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>

          {/* Main Dashboard Content Area */}
          <main className="flex-1 min-w-0 w-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
