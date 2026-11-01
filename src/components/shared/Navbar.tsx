"use client";
import Image from "next/image";
import Logo from "@/assets/booknook.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const linkStyles = (path: string) =>
    `inline-block text-base pb-0.5 border-b-2 rounded-none hover:text-white hover:border-white transition-colors duration-200 ${
      pathname === path
        ? "text-white border-white"
        : "text-gray-300 border-transparent"
    }`;
  const buttonStyles =
    "whitespace-nowrap px-2.5 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-gray-300 border border-[#B76E59] rounded-md bg-[#893b26] hover:bg-[#9e5b47] hover:text-white shadow-sm transition-colors duration-200";

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
    <div className="navbar bg-[#8E4C39] px-3 py-2.5 shadow-sm">
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
              <div className="font-bold text-xl sm:text-2xl font-josefin tracking-tight whitespace-nowrap">
                <span className="text-white">Book</span>
                <span className="text-red-600">Nook</span>
              </div>
              <span className="text-[10px] font-semibold text-[#F0EDE5]/90 tracking-[0.2em] uppercase mt-0.5 whitespace-nowrap">
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
          <Link href="/login" className={buttonStyles}>
            Login
          </Link>
          {/* Sign Up Button */}
          <Link href="/signup" className={buttonStyles}>
            Sign Up
          </Link>
          {/* Responsive Menu Button */}
          <div className="dropdown dropdown-end lg:hidden relative">
            <div
              tabIndex={0}
              role="button"
              className="border border-[#B76E59] rounded-md p-1 sm:p-1.5 text-gray-200 hover:bg-[#9e5b47] hover:text-white focus:outline-none focus:ring-1 focus:ring-[#B76E59] transition-colors duration-200 cursor-pointer flex items-center justify-center"
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
              className="menu menu-sm dropdown-content right-0 bg-[#893b26] border border-[#B76E59] rounded-md z-10 mt-3 w-52 p-2 shadow-lg space-y-1"
            >
              {links}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
