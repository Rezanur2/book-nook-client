"use client";
import Image from "next/image";
import Logo from "@/assets/booknook.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  // Hide navbar on auth pages for an immersive, full-screen experience
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  const linkStyles = (path: string) => {
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

  const loginButtonStyles =
    "whitespace-nowrap px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#762F3D] border border-[#762F3D]/30 rounded-lg bg-transparent hover:bg-[#762F3D] hover:text-white hover:border-[#762F3D] shadow-xs hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 cursor-pointer";

  const signupButtonStyles =
    "whitespace-nowrap px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-white border border-[#762F3D] rounded-lg bg-[#762F3D] hover:bg-[#5e2530] hover:border-[#5e2530] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer";

  const links = (
    <>
      <li>
        <Link href="/" className={linkStyles("/")}>
          Home
        </Link>
      </li>
      <li>
        <Link href="/books" className={linkStyles("/books")}>
          All Books
        </Link>
      </li>
      <li>
        <Link href="/add-book" className={linkStyles("/add-book")}>
          Add Book
        </Link>
      </li>
      <li>
        <Link href="/my-books" className={linkStyles("/my-books")}>
          My Books
        </Link>
      </li>
      <li>
        <Link href="/my-borrows" className={linkStyles("/my-borrows")}>
          My Borrows
        </Link>
      </li>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F5F3EE]/95 backdrop-blur-md border-b border-[#E6E0D6] shadow-xs transition-all">
      <div className="navbar text-[#5C554E] px-3 py-2.5 sm:py-3.5">
        <nav className="container mx-auto flex items-center justify-between w-full">
        {/* Logo and Brand */}
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
              <div className="font-bold text-lg sm:text-xl md:text-2xl font-josefin tracking-tight whitespace-nowrap">
                <span className="text-[#000000]">Book</span>
                <span className="text-red-600">Nook</span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-semibold text-[#8C5E50] sm:tracking-[0.2em] uppercase mt-0.5 whitespace-nowrap">
                A World Between Pages
              </span>
            </div>
          </Link>
        </div>

        <div className="hidden lg:flex">
          <ul className="flex space-x-6 menu menu-horizontal px-1">{links}</ul>
        </div>

        <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
          {/* Login Button */}
          <Link href="/login" className={loginButtonStyles}>
            Login
          </Link>
          {/* Sign Up Button */}
          <Link href="/signup" className={signupButtonStyles}>
            Sign Up
          </Link>
          {/* Responsive Menu Button */}
          <div className="dropdown dropdown-end lg:hidden relative">
            <div
              tabIndex={0}
              role="button"
              className="border border-[#762F3D]/30 rounded-lg p-1.5 text-[#762F3D] hover:bg-[#762F3D] hover:text-white focus:outline-none focus:ring-1 focus:ring-[#762F3D] transition-all duration-200 cursor-pointer flex items-center justify-center"
            >
              <svg
                aria-label="Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content right-0 bg-white border border-[#E6E0D6] rounded-xl z-20 mt-3 w-52 p-2.5 shadow-xl space-y-1 text-[#292521]"
            >
              {links}
            </ul>
          </div>
        </div>
      </nav>
      </div>
    </header>
  );
};

export default Navbar;
