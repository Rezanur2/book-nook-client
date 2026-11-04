"use client";

import { useState } from "react";
import Image from "next/image";
import Logo from "@/assets/booknook.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/toast";
import {
  BookOpen,
  Bookmark,
  ChevronRight,
  Clock,
  Home,
  Library,
  LogOut,
  Menu,
  PlusCircle,
  User,
  X,
} from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    setPopoverOpen(false);
    await authClient.signOut();
    toast.add({
      title: "Signed Out",
      description: "You have successfully signed out.",
    });
    router.push("/");
  };

  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  const desktopLinkStyles = (path: string) => {
    const isActive = pathname === path;
    return `relative px-3.5 py-1.5 text-sm font-semibold tracking-wide rounded-lg transition-all duration-200 ease-out inline-flex items-center justify-center ${
      isActive
        ? "text-[#762F3D] font-bold bg-[#762F3D]/10"
        : "text-[#5C554E] hover:text-[#762F3D] hover:bg-[#762F3D]/8 hover:-translate-y-0.5"
    } after:content-[''] after:absolute after:bottom-1 after:left-3.5 after:right-3.5 after:h-0.5 after:bg-[#762F3D] after:rounded-full after:transition-all after:duration-200 ${
      isActive
        ? "after:opacity-100 after:scale-x-100"
        : "after:opacity-0 after:scale-x-0 hover:after:opacity-100 hover:after:scale-x-100"
    }`;
  };

  const mobileLinkStyles = (path: string) => {
    const isActive = pathname === path;
    return `flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-[#762F3D]/10 text-[#762F3D] font-bold border border-[#762F3D]/20 shadow-2xs"
        : "text-gray-700 hover:text-[#762F3D] hover:bg-[#FAF8F3]"
    }`;
  };

  const loginButtonStyles =
    "whitespace-nowrap px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#762F3D] border border-[#762F3D]/30 rounded-lg bg-transparent hover:bg-[#762F3D] hover:text-white hover:border-[#762F3D] shadow-xs hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 cursor-pointer";

  const signupButtonStyles =
    "whitespace-nowrap px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-white border border-[#762F3D] rounded-lg bg-[#762F3D] hover:bg-[#5e2530] hover:border-[#5e2530] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer";

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/books", label: "All Books", icon: Library },
    { href: "/add-book", label: "Add Book", icon: PlusCircle },
    { href: "/my-books", label: "My Books", icon: BookOpen },
    { href: "/my-borrows", label: "My Borrows", icon: Clock },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F5F3EE]/95 backdrop-blur-md border-b border-[#E6E0D6] shadow-xs transition-all">
      <div className="text-[#5C554E] px-3 py-2.5 sm:py-3.5">
        <nav className="container mx-auto flex items-center justify-between w-full">
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src={Logo}
                width={40}
                height={40}
                alt="BookNook Logo"
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain shrink-0"
              />
              <div className="flex flex-col text-left leading-tight">
                <span className="font-bold text-xl sm:text-2xl font-josefin tracking-tight text-[#292521]">
                  Book<span className="text-[#762F3D]">Nook</span>
                </span>
                <span className="text-[8px] sm:text-[9px] font-semibold text-[#8C5E50] tracking-[0.2em] uppercase">
                  A World Between Pages
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex">
            <ul className="flex space-x-6 items-center px-1">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={desktopLinkStyles(item.href)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {user ? (
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger
                  render={
                    <button
                      type="button"
                      className="cursor-pointer rounded-full p-0.5 hover:ring-2 hover:ring-[#762F3D]/25 transition-all outline-none"
                      aria-label="User profile"
                    >
                      <Avatar className="w-8 h-8 sm:w-9 sm:h-9 border border-[#E6E0D6] shadow-2xs">
                        <AvatarImage
                          referrerPolicy="no-referrer"
                          src={(user?.image) as string}
                          alt={user?.name || "User"}
                        />
                        <AvatarFallback className="bg-[#762F3D] text-white text-xs font-bold">
                          {user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  }
                />
                <PopoverContent
                  align="end"
                  sideOffset={8}
                  className="w-64 p-0 bg-white border border-[#E6E0D6] rounded-2xl shadow-xl shadow-stone-900/10 overflow-hidden z-50 text-[#292521] space-y-0 outline-none ring-0 focus:outline-none"
                >
                  <div className="p-3.5 bg-linear-to-b from-[#FAF8F3] to-white border-b border-[#E6E0D6] flex items-center gap-3">
                    <Avatar className="w-10 h-10 border border-[#E6E0D6] shadow-2xs shrink-0">
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={(user?.image) as string}
                        alt={user?.name || "User"}
                      />
                      <AvatarFallback className="bg-[#762F3D] text-white text-xs font-bold">
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <p className="font-bold text-sm text-gray-900 truncate font-playfair">
                          {user?.name || "User"}
                        </p>
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#762F3D]/10 text-[#762F3D] border border-[#762F3D]/20 shrink-0">
                          Member
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 truncate mt-0.5">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="p-1.5 space-y-0.5">
                    <Link
                      href="/profile"
                      onClick={() => setPopoverOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-700 hover:text-[#762F3D] hover:bg-[#FAF8F3] rounded-xl transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <User className="w-4 h-4 text-gray-500 group-hover:text-[#762F3D]" />
                        <span>My Profile</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#762F3D] transition-transform group-hover:translate-x-0.5" />
                    </Link>

                    <Link
                      href="/my-books"
                      onClick={() => setPopoverOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-700 hover:text-[#762F3D] hover:bg-[#FAF8F3] rounded-xl transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <BookOpen className="w-4 h-4 text-gray-500 group-hover:text-[#762F3D]" />
                        <span>My Listed Books</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#762F3D] transition-transform group-hover:translate-x-0.5" />
                    </Link>

                    <Link
                      href="/my-borrows"
                      onClick={() => setPopoverOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-700 hover:text-[#762F3D] hover:bg-[#FAF8F3] rounded-xl transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Bookmark className="w-4 h-4 text-gray-500 group-hover:text-[#762F3D]" />
                        <span>My Borrows</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#762F3D] transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>

                  <div className="p-2 border-t border-[#E6E0D6] bg-[#FAF8F3]/40">
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:text-white bg-rose-50/70 hover:bg-rose-600 border border-rose-200/80 hover:border-rose-600 rounded-xl transition-all cursor-pointer shadow-2xs"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <>
                <Link href="/login" className={loginButtonStyles}>
                  Login
                </Link>
                <Link href="/signup" className={signupButtonStyles}>
                  Sign Up
                </Link>
              </>
            )}

            <div className="relative lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-9 h-9 rounded-xl border border-[#E6E0D6] bg-white hover:bg-[#FAF8F3] text-[#762F3D] shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer flex items-center justify-center focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>

              {mobileMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                  <ul className="absolute right-0 mt-3 w-60 bg-white border border-[#E6E0D6] rounded-2xl shadow-xl shadow-stone-900/10 p-2 z-50 transition-all text-[#292521] space-y-1">
                    <li className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#B76E59] border-b border-[#F0EDE5] mb-1">
                      Menu
                    </li>
                    {navLinks.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={mobileLinkStyles(item.href)}
                          >
                            <div className="flex items-center gap-2.5">
                              <Icon className="w-4 h-4 text-[#762F3D]" />
                              <span>{item.label}</span>
                            </div>
                            {pathname === item.href && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#762F3D]" />
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
