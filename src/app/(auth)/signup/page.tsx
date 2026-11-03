import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { BookOpen, Quote, CheckCircle2 } from "lucide-react";
import Logo from "@/assets/booknook.png";
import AuthBackground from "@/assets/AuthBackground.png";
import { SignUpForm } from "@/app/(auth)/_components/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up | BookNook",
  description:
    "Sign up for your reader account to borrow books, reserve editions, and contribute to the BookNook library.",
};

export default function SignUpPage() {
  return (
    <div className="w-full min-h-screen flex bg-[#FAF8F3]">
      {/* Left Column */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#3D1018] text-white flex-col justify-between p-8 lg:p-10 overflow-hidden border-r border-[#E6E0D6]">
        {/* Background Image with Visual Color Grading */}
        <div className="absolute inset-0 z-0">
          <Image
            src={AuthBackground}
            alt="BookNook Sanctuary"
            fill
            priority
            sizes="50vw"
            className="object-cover object-center filter contrast-105 brightness-90 saturate-105"
          />
          {/* Layer 1: Atmospheric Burgundy Blend */}
          <div className="absolute inset-0 bg-linear-to-tr from-[#3D1018]/95 via-[#5C1D27]/60 to-[#2A0B11]/85 mix-blend-multiply" />
          {/* Layer 2: Vignette Edge Shadow */}
          <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/75" />
          {/* Layer 3: Contrast Floor Gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/30" />
        </div>

        {/* Top: Pill Badge */}
        <div className="relative z-10 h-10 flex items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-[0.2em] uppercase text-[#F3E5D0]">
            <BookOpen className="w-3.5 h-3.5 text-[#C6A46A]" />
            <span>The BookNook Scriptorium</span>
          </div>
        </div>

        {/* Middle: Editorial Literary Quote & Reader Privileges */}
        <div className="relative z-10 max-w-lg my-auto py-6">
          <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#C6A46A] mb-5 shadow-sm">
            <Quote className="w-5 h-5 fill-current" />
          </div>

          <blockquote className="font-playfair italic text-2xl xl:text-3xl font-medium leading-relaxed text-[#FAF8F3] mb-4 drop-shadow-sm">
            &ldquo;A book is a version of the world. If you do not like it,
            ignore it; or offer your own version in return.&rdquo;
          </blockquote>

          <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#C6A46A] mb-6">
            &mdash; Salman Rushdie
          </p>

          {/* Reader Privileges Clean List */}
          <div className="space-y-2.5 pt-2 border-t border-white/15">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C6A46A] block mb-2">
              Reader Privileges
            </span>
            <div className="flex items-center gap-2 text-xs text-[#F0EDE5]/90">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Borrow physical hardbound & vintage editions seamlessly</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#F0EDE5]/90">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero late penalties with community trust stewardship</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#F0EDE5]/90">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Catalog and contribute your own treasures to the shelves</span>
            </div>
          </div>
        </div>

        {/* Bottom: Live Sanctuary Status Bar */}
        <div className="relative z-10 h-14 border-t border-white/15 flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="font-bold text-[#FAF8F3]">
              8,420+ Readers in Sanctuary
            </span>
          </div>
          <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#C6A46A] border border-white/15">
            Open Guild
          </span>
        </div>
      </div>

      {/* Right Column: Sign Up Form Panel */}
      <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-between p-6 sm:p-8 lg:p-10 bg-[#FAF8F3]">
        {/* Top Header Row */}
        <div className="h-10 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 group hover:opacity-90 transition-opacity"
          >
            <Image
              src={Logo}
              alt="BookNook Logo"
              width={38}
              height={38}
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain group-hover:scale-105 transition-transform"
              priority
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

          <Link
            href="/"
            className="text-xs font-semibold text-gray-500 hover:text-[#762F3D] transition-colors"
          >
            &larr; Back to Home
          </Link>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-sm sm:max-w-md mx-auto my-auto py-6">
          <SignUpForm />
        </div>

        {/* Bottom Trust & Copyright */}
        <div className="h-auto sm:h-14 border-t border-[#E6E0D6] flex flex-col sm:flex-row items-center justify-center sm:justify-between text-xs text-gray-500 shrink-0 gap-1.5 sm:gap-0 py-3 sm:py-0 text-center">
          <span>🔒 256-Bit Secure Encryption</span>
          <span>
            &copy; {new Date().getFullYear()} BookNook &bull; Sanctuary of
            Curiosity
          </span>
        </div>
      </div>
    </div>
  );
}
