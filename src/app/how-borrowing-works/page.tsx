import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import CirculationEthos from "@/components/home/CirculationEthos";

export const metadata: Metadata = {
  title: "How Borrowing Works | BookNook",
  description:
    "Learn about BookNook's circulation ethos, community lending principles, and how readers borrow and share books seamlessly.",
};

export default function HowBorrowingWorksPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-[#E6E0D6] bg-[#FAF8F3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
          <nav className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-gray-500 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-primary font-bold">How Borrowing Works</span>
          </nav>
        </div>
      </div>

      {/* Main Circulation Ethos Section */}
      <CirculationEthos />

      {/* Guild Principles & Guidelines */}
      <section className="py-12 sm:py-16 lg:py-20 border-b border-[#E6E0D6] bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B76E59] block mb-1.5 sm:mb-2">
              Lending Principles
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-playfair text-[#762F3D] tracking-tight">
              Rooted in Mutual Trust.
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-2">
              Our lending guild operates on fellowship, care, and the shared
              love of literature.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Principle 1 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F3] border border-[#E6E0D6] space-y-2.5 sm:space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F0EDE5] text-[#762F3D] flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-playfair font-bold text-lg text-gray-900">
                Shared Stewardship
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Books are preserved by the community for the community. Treat
                each volume with care and reverence.
              </p>
            </div>

            {/* Principle 2 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F3] border border-[#E6E0D6] space-y-2.5 sm:space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F0EDE5] text-[#762F3D] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-playfair font-bold text-lg text-gray-900">
                Zero Penalties
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                No punitive late fees. We rely on mutual reader trust and open
                communication to keep books in motion.
              </p>
            </div>

            {/* Principle 3 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F3] border border-[#E6E0D6] space-y-2.5 sm:space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F0EDE5] text-[#762F3D] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-playfair font-bold text-lg text-gray-900">
                Open Guild Access
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Borrow freely anytime, and contribute your own treasures when
                you are ready to expand the collection.
              </p>
            </div>
          </div>

          {/* Bottom Action Card (Fully Responsive for Mobile) */}
          <div className="mt-10 sm:mt-14 p-6 sm:p-8 md:p-10 rounded-2xl bg-[#762F3D] text-white flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 text-center md:text-left">
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-bold font-playfair">
                Ready to find your next read?
              </h3>
              <p className="text-[#F0EDE5] text-xs sm:text-sm max-w-lg">
                Explore thousands of hand-bound editions, classics, and modern
                discoveries.
              </p>
            </div>
            <Link
              href="/books"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#F0EDE5] hover:bg-white text-[#762F3D] px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-sm shrink-0 whitespace-nowrap cursor-pointer"
            >
              <span>Explore The Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
