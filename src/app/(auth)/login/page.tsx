import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { BookOpen, Quote } from "lucide-react";
import AuthBackground from "@/assets/AuthBackground.png";
import { LoginForm } from "@/app/(auth)/_components/LoginForm";

export const metadata: Metadata = {
  title: "BookNook | Login",
  description:
    "Enter your email below to access your BookNook sanctuary account.",
};

export default function LoginPage() {
  return (
    <div className="w-full min-h-[calc(100vh-140px)] flex bg-[#FAF8F3]">
      {/* Left Column */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#3D1018] text-white flex-col justify-between p-8 lg:p-10 overflow-hidden border-r border-[#E6E0D6]">
        {/* Background Image */}
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

        {/* Middle: Editorial Literary Quote & Atmosphere */}
        <div className="relative z-10 max-w-lg my-auto py-6">
          <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#C6A46A] mb-5 shadow-sm">
            <Quote className="w-5 h-5 fill-current" />
          </div>

          <blockquote className="font-playfair italic text-2xl xl:text-3xl font-medium leading-relaxed text-[#FAF8F3] mb-4 drop-shadow-sm">
            &ldquo;A reader lives a thousand lives before he dies. The man who
            never reads lives only one.&rdquo;
          </blockquote>

          <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#C6A46A] mb-4">
            &mdash; George R.R. Martin
          </p>

          <p className="text-xs xl:text-sm text-[#F0EDE5]/85 leading-relaxed max-w-md">
            Immerse yourself in over 12,400 curated volumes, community shelves,
            and timeless stories preserved by readers.
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-[#FAF8F3]">
        <div className="w-full max-w-sm sm:max-w-md mx-auto py-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
