import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Check, Star } from "lucide-react";
import { ISlide } from "@/types/slide.type";

const btnClass =
  "px-6 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 w-auto md:w-auto shrink-0 whitespace-nowrap mx-2 sm:mx-0";

const BannerSlide = ({ slide }: { slide: ISlide }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center py-2 w-full max-w-full min-w-0 overflow-hidden">
      {/* Left: Typography & Actions */}
      <div className="lg:col-span-7 space-y-4 text-left w-full min-w-0">
        <span className="inline-flex items-center gap-2 bg-[#F0EDE5] border border-[#E6E0D6] px-3.5 py-1.5 rounded-full text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#77716A] max-w-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#762F3D] shrink-0" />
          <span className="truncate">{slide.pill}</span>
        </span>

        <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-bold font-playfair text-[#762F3D] leading-[1.15] tracking-tight">
          {slide.title}
        </h1>

        <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl">
          {slide.description}
        </p>

        {/* Responsive CTA Buttons */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 pt-2 px-1 sm:px-0">
          <Link
            href="/books"
            className={`${btnClass} bg-[#762F3D] hover:bg-[#5e2530] text-white shadow-sm`}
          >
            <span>Browse Books</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#how-borrowing-works"
            className={`${btnClass} border border-[#E6E0D6] bg-white hover:bg-[#F0EDE5] text-gray-700 cursor-pointer`}
          >
            <span>How Borrowing Works</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Right: Archival Book Folio Card */}
      <div className="lg:col-span-5 flex justify-center lg:justify-end py-4 px-2 sm:px-6 w-full min-w-0 overflow-hidden">
        <div className="relative w-full max-w-67.5 sm:max-w-72.5 lg:max-w-80 my-2">
          <div className="absolute inset-0 bg-linear-to-tr from-[#B76E59]/20 via-[#C6A46A]/15 to-transparent rounded-3xl blur-xl -z-20 pointer-events-none" />

          {/* Layer 1: Back Archival */}
          <div className="absolute inset-0 bg-[#EDE7DC] border border-[#DDD5C7] rounded-2xl -rotate-2 sm:-rotate-3 scale-96 shadow-xs -z-10 pointer-events-none transition-transform" />

          {/* Layer 2: Middle Vellum Sheet */}
          <div className="absolute inset-0 bg-[#F7F4EE] border border-[#E6E0D6] rounded-2xl rotate-1 sm:rotate-2 scale-98 shadow-xs -z-10 pointer-events-none transition-transform" />

          {/* Foreground Card*/}
          <div className="bg-white border border-[#E6E0D6] rounded-2xl shadow-md shadow-[#762F3D]/5 overflow-hidden flex flex-col">
            <div className="px-5 pt-4 pb-2.5 flex items-center justify-between border-b border-[#F0EDE5]">
              <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-[#B76E59]/10 text-[#B76E59] border border-[#B76E59]/20">
                {slide.tag}
              </span>
              <BookOpen className="w-4 h-4 text-[#77716A]" />
            </div>

            <div className="px-5 pt-3 pb-2">
              <div className="relative w-full aspect-16/10 rounded-xl overflow-hidden shadow-inner border border-[#E6E0D6] bg-[#FAF8F3]">
                <Image
                  src={slide.image}
                  alt={slide.bookTitle}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            <div className="px-5 py-3 text-center space-y-1">
              <div className="w-8 h-0.5 bg-[#C6A46A] mx-auto mb-1.5" />
              <h3 className="font-playfair italic font-bold text-xl sm:text-2xl text-[#762F3D] leading-tight truncate">
                {slide.bookTitle}
              </h3>
              <p className="text-xs text-[#77716A] tracking-wider uppercase font-medium truncate">
                {slide.bookAuthor}
              </p>
              <div className="pt-1 flex justify-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#5C554E] bg-[#F5F2EA] px-3 py-1 rounded-full border border-[#E6E0D6]">
                  <Check className="w-3 h-3 text-[#B76E59]" />
                  <span>{slide.feature}</span>
                </span>
              </div>
            </div>

            <div className="mt-auto px-5 py-2.5 bg-[#FAF8F3] border-t border-[#E6E0D6] flex items-center justify-between text-xs">
              <span className="text-[#77716A] font-medium">
                {slide.lentCount}
              </span>
              <div className="flex items-center gap-1 text-[#292521] font-bold">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                <span>{slide.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSlide;
