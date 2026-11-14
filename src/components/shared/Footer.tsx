"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import Logo from "@/assets/booknook.png";
import { authClient } from "@/lib/auth-client";

const Footer = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Social Media Links
  const socialLinks = (
    <div className="flex items-center justify-center sm:justify-start space-x-3">
      {/* GitHub */}
      <a
        href="https://github.com/Rezanur2"
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center text-gray-600 hover:text-primary hover:border-primary transition-colors"
        aria-label="GitHub"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      </a>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/in/md-rezanur-rahman/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center text-gray-600 hover:text-primary hover:border-primary transition-colors"
        aria-label="LinkedIn"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      </a>

      {/* X */}
      <a
        href="https://x.com/rezanurrahman02"
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center text-gray-600 hover:text-primary hover:border-primary transition-colors"
        aria-label="X (formerly Twitter)"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
    </div>
  );

  return (
    <footer className="border-t border-border bg-[#F5F3EE] text-[#5C554E] pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-border">
          {/* Column 1: Brand Logo, Tagline, Description & Social Links */}
          <div className="lg:col-span-4 space-y-3 text-center sm:text-left">
            {/* Logo Image & Logo Text */}
            <div className="flex items-center justify-center sm:justify-start">
              <Link href="/" className="inline-flex items-center space-x-3">
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

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-sm mx-auto sm:mx-0">
              A modern online library and book borrowing platform dedicated to
              reading, sharing books, and exploring timeless stories for readers
              everywhere.
            </p>

            {/* Social Links */}
            <h4 className="font-semibold text-xs sm:text-sm text-primary uppercase tracking-wider font-josefin pt-2">
              Social Links
            </h4>
            {socialLinks}
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3 text-center sm:text-left">
            <h4 className="font-semibold text-xs sm:text-sm text-primary uppercase tracking-wider font-josefin">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm flex flex-col items-center sm:items-start">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/books"
                  className="hover:text-primary transition-colors"
                >
                  All Books
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link
                      href="/add-book"
                      className="hover:text-primary transition-colors"
                    >
                      Add Book
                    </Link>
                  </li>
                  <li className="hidden sm:block">
                    <Link
                      href="/my-books"
                      className="hover:text-primary transition-colors"
                    >
                      My Books
                    </Link>
                  </li>
                  <li className="hidden sm:block">
                    <Link
                      href="/my-borrows"
                      className="hover:text-primary transition-colors"
                    >
                      My Borrows
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/login"
                      className="hover:text-primary transition-colors"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/register"
                      className="hover:text-primary transition-colors"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Column 3: Book Categories */}
          <div className="max-sm:hidden lg:col-span-3 space-y-3 text-center sm:text-left">
            <h4 className="font-semibold text-xs sm:text-sm text-primary uppercase tracking-wider font-josefin">
              Book Categories
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm flex flex-col items-center sm:items-start">
              <li>
                <Link
                  href="/books?category=Fiction"
                  className="hover:text-primary transition-colors"
                >
                  Fiction
                </Link>
              </li>
              <li>
                <Link
                  href="/books?category=Science"
                  className="hover:text-primary transition-colors"
                >
                  Science
                </Link>
              </li>
              <li>
                <Link
                  href="/books?category=History"
                  className="hover:text-primary transition-colors"
                >
                  History
                </Link>
              </li>
              <li>
                <Link
                  href="/books?category=Kids"
                  className="hover:text-primary transition-colors"
                >
                  Kids
                </Link>
              </li>
              <li>
                <Link
                  href="/books?category=Others"
                  className="hover:text-primary transition-colors"
                >
                  Others
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Library Circulation & Contact Info */}
          <div className="lg:col-span-3 space-y-3 text-center sm:text-left">
            <h4 className="max-sm:hidden font-semibold text-xs sm:text-sm text-primary uppercase tracking-wider font-josefin">
              Library Circulation
            </h4>
            <p className="max-sm:hidden text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xs mx-auto sm:mx-0">
              Borrowing desk open Monday to Saturday for book requests, reader
              support, and borrow reservations.
            </p>

            <div className="space-y-2.5 pt-1 text-xs sm:text-sm flex flex-col items-center sm:items-start w-full">
              <h4 className="font-semibold text-xs sm:text-sm text-primary uppercase tracking-wider font-josefin">
                Contact Us
              </h4>
              <div className="flex items-center justify-center sm:justify-start space-x-2 text-gray-700 w-full">
                <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                <a
                  href="mailto:mdrezanurrahman2@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  mdrezanurrahman2@gmail.com
                </a>
              </div>

              <div className="flex items-center justify-center sm:justify-start space-x-2 text-gray-700 w-full">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Amjhupi, Meherpur</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-gray-500 gap-3 text-center">
          <p>© 2026 BookNook Library Guild. All rights reserved.</p>

          <div className="flex items-center space-x-5">
            <Link
              href="/#privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/#how-borrowing-works" className="hover:text-primary transition-colors">
              Terms of Lending
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
