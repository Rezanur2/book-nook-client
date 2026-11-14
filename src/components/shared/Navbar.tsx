"use client";

import { useEffect, useState } from "react";
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
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".mobile-nav-menu")) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const isGoogleAuth = sessionStorage.getItem("booknook_google_auth");
    if (isGoogleAuth && user) {
      sessionStorage.removeItem("booknook_google_auth");
      toast.add({
        title: "Welcome to BookNook!",
        description: `Successfully signed in as ${user.name || "reader"}.`,
        type: "success",
      });
    }
  }, [user]);

  const handleSignOut = async () => {
    setPopoverOpen(false);
    await authClient.signOut();
    toast.add({
      title: "Signed Out",
      description: "You have successfully signed out.",
      type: "info",
    });
    router.push("/");
  };

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
    "whitespace-nowrap px-2.5 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#762F3D] border border-[#762F3D]/30 rounded-lg bg-transparent hover:bg-[#762F3D] hover:text-white hover:border-[#762F3D] shadow-xs hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 cursor-pointer";

  const signupButtonStyles =
    "whitespace-nowrap px-2.5 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-white border border-[#762F3D] rounded-lg bg-[#762F3D] hover:bg-[#5e2530] hover:border-[#5e2530] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer";

  const isPrivateRoute =
    pathname.startsWith("/my-") ||
    pathname === "/add-book" ||
    pathname === "/profile" ||
    (pathname.startsWith("/books/") && pathname !== "/books");

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/books", label: "All Books", icon: Library },
    ...(user || (isPending && isPrivateRoute)
      ? [
          { href: "/add-book", label: "Add Book", icon: PlusCircle },
          { href: "/my-books", label: "My Books", icon: BookOpen },
          { href: "/my-borrows", label: "My Borrows", icon: Clock },
        ]
      : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F5F3EE]/95 backdrop-blur-md border-b border-[#E6E0D6] shadow-xs">
      <div className="text-[#5C554E] px-3 py-2.5 sm:py-3.5">
        <nav className="container mx-auto flex items-center justify-between w-full">
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
              <Image
                src={Logo}
                width={40}
                height={40}
                alt="BookNook Logo"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain shrink-0"
              />
              <div className="flex flex-col text-left leading-tight">
                <span className="font-bold text-lg sm:text-2xl font-josefin tracking-tight text-[#292521]">
                  Book<span className="text-[#762F3D]">Nook</span>
                </span>
                <span className="text-[8px] sm:text-[9px] font-semibold text-[#8C5E50] tracking-normal sm:tracking-[0.2em] uppercase">
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

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {isPending ? (
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#E6E0D6]/60 animate-pulse border border-[#E6E0D6] shrink-0" />
            ) : user ? (
              <div className="relative inline-flex items-center shrink-0">
                <Popover
                  open={popoverOpen}
                  onOpenChange={setPopoverOpen}
                  modal={false}
                >
                  <PopoverTrigger
                    render={
                      <button
                        type="button"
                        className="cursor-pointer rounded-full p-0.5 hover:ring-2 hover:ring-[#762F3D]/25 outline-none shrink-0"
                        aria-label="User profile"
                      >
                        <Avatar className="w-8 h-8 sm:w-9 sm:h-9 border border-[#E6E0D6] shadow-2xs shrink-0">
                          <AvatarImage
                            referrerPolicy="no-referrer"
                            src={user?.image as string}
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
                    className="w-56 p-2 bg-white border border-[#E6E0D6] rounded-2xl shadow-xl shadow-stone-900/10 z-50 text-[#292521] space-y-1 outline-none ring-0 focus:outline-none"
                  >
                    {/* User Info Header */}
                    <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#FAF8F3]">
                      <Avatar className="w-9 h-9 border border-[#E6E0D6] shrink-0">
                        <AvatarImage
                          referrerPolicy="no-referrer"
                          src={user?.image as string}
                          alt={user?.name || "User"}
                        />
                        <AvatarFallback className="bg-[#762F3D] text-white text-xs font-bold">
                          {user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-xs text-[#292521] truncate font-playfair">
                          {user?.name || "User"}
                        </p>
                        <p className="text-[10px] text-gray-500 truncate mt-0.5">
                          {user?.email}
                        </p>
                      </div>
                    </div>

                    {/* My Profile Link */}
                    <Link
                      href="/profile"
                      onClick={() => setPopoverOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:text-[#762F3D] hover:bg-[#FAF8F3] rounded-xl transition-colors"
                    >
                      <User className="w-4 h-4 text-[#762F3D]" />
                      <span>My Profile</span>
                    </Link>

                    {/* Sign Out Button */}
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <>
                <Link href="/login" className={loginButtonStyles}>
                  Login
                </Link>
                <Link href="/register" className={signupButtonStyles}>
                  Register
                </Link>
              </>
            )}

            <div className="relative lg:hidden mobile-nav-menu">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-9 h-9 rounded-xl border border-[#E6E0D6] bg-white hover:bg-[#762F3D] hover:text-white hover:border-[#762F3D] text-[#762F3D] shadow-2xs hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-4.5 h-4.5" />
                ) : (
                  <Menu className="w-4.5 h-4.5" />
                )}
              </button>

              {mobileMenuOpen && (
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

                    {!user && (
                      <li className="pt-2 mt-1 border-t border-[#F0EDE5] space-y-1.5">
                        <Link
                          href="/login"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-center w-full px-3 py-2 text-xs font-semibold text-[#762F3D] border border-[#762F3D]/30 rounded-xl hover:bg-[#762F3D] hover:text-white transition-all duration-200"
                        >
                          Login
                        </Link>
                        <Link
                          href="/register"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-center w-full px-3 py-2 text-xs font-semibold text-white bg-[#762F3D] hover:bg-[#5e2530] rounded-xl transition-all duration-200"
                        >
                          Register
                        </Link>
                      </li>
                    )}
                  </ul>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
