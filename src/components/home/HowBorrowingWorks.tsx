import React from "react";
import Link from "next/link";
import {
  ArrowLeftRight,
  Search,
  MousePointerClick,
  RotateCcw,
  Compass,
  Sparkles,
  Bookmark,
  HeartHandshake,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const HowBorrowingWorks = () => {
  return (
    <section
      id="how-borrowing-works"
      className="w-full bg-[#FAF8F3] py-14 sm:py-20 lg:py-24 border-b border-[#E6E0D6] scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Section */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#B76E59] uppercase mb-2 sm:mb-3">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Circulation Ethos & Process</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-playfair text-[#762F3D] tracking-tight">
            How Borrowing Works.
          </h2>

          <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed mt-2.5 sm:mt-3">
            A seamless, trust-rooted cycle for book lovers. Explore thematic shelves, borrow copies effortlessly, and share literature across the community.
          </p>
        </div>

        {/* Part 1: 3-Step Process (Discover, Borrow, Return) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 text-left">
          {/* Card 1: Discover */}
          <div className="bg-white rounded-2xl border border-[#E6E0D6] p-5 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between gap-3 mb-3.5 sm:mb-4">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span className="text-xs sm:text-sm font-bold tracking-widest text-[#B76E59] font-mono">
                    01
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-playfair text-gray-900">
                    Discover
                  </h3>
                </div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#F0EDE5] text-[#762F3D] flex items-center justify-center shrink-0">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>

              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Explore a growing collection of books curated by fellow readers. Browse thematic shelves, read member critiques, and discover hidden literary wonders.
              </p>
            </div>

            <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-[#F0EDE5] flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-[#B76E59]">
              <Compass className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">INTELLIGENT CATALOG INDEX</span>
            </div>
          </div>

          {/* Card 2: Borrow */}
          <div className="bg-white rounded-2xl border border-[#E6E0D6] p-5 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between gap-3 mb-3.5 sm:mb-4">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span className="text-xs sm:text-sm font-bold tracking-widest text-[#B76E59] font-mono">
                    02
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-playfair text-gray-900">
                    Borrow
                  </h3>
                </div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#F0EDE5] text-[#762F3D] flex items-center justify-center shrink-0">
                  <MousePointerClick className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>

              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Choose your next read and borrow it with a single tap. Reserve your copy at a local participating nook or request eco-pouch mailing directly to your door.
              </p>
            </div>

            <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-[#F0EDE5] flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-[#B76E59]">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">SINGLE-TAP RESERVATION</span>
            </div>
          </div>

          {/* Card 3: Return */}
          <div className="bg-white rounded-2xl border border-[#E6E0D6] p-5 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
            <div>
              <div className="flex items-center justify-between gap-3 mb-3.5 sm:mb-4">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span className="text-xs sm:text-sm font-bold tracking-widest text-[#B76E59] font-mono">
                    03
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-playfair text-gray-900">
                    Return
                  </h3>
                </div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#F0EDE5] text-[#762F3D] flex items-center justify-center shrink-0">
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>

              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Return your book seamlessly and make room for another story. Slip a bookmark reflection into the sleeve to pass your thoughts to the subsequent reader.
              </p>
            </div>

            <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-[#F0EDE5] flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-[#B76E59]">
              <Bookmark className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">COMMUNITY STEWARDSHIP CYCLE</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-14 sm:my-16 border-t border-[#E6E0D6]" />

        {/* Part 2: Lending Principles Header */}
        <div id="privacy" className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B76E59] block mb-2">
            Lending Principles
          </span>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-playfair text-[#762F3D] tracking-tight">
            Rooted in Mutual Trust.
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-2">
            Our lending guild operates on fellowship, care, and the shared love of literature.
          </p>
        </div>

        {/* Part 2: Lending Principles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 text-left">
          {/* Principle 1 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E6E0D6] space-y-2.5 sm:space-y-3 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between gap-3">
              <h4 className="font-playfair font-bold text-lg sm:text-xl text-gray-900">
                Shared Stewardship
              </h4>
              <div className="w-10 h-10 rounded-xl bg-[#F0EDE5] text-[#762F3D] flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Books are preserved by the community for the community. Treat each volume with care and reverence.
            </p>
          </div>

          {/* Principle 2 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E6E0D6] space-y-2.5 sm:space-y-3 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between gap-3">
              <h4 className="font-playfair font-bold text-lg sm:text-xl text-gray-900">
                Zero Penalties
              </h4>
              <div className="w-10 h-10 rounded-xl bg-[#F0EDE5] text-[#762F3D] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              No punitive late fees. We rely on mutual reader trust and open communication to keep books in motion.
            </p>
          </div>

          {/* Principle 3 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E6E0D6] space-y-2.5 sm:space-y-3 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between gap-3">
              <h4 className="font-playfair font-bold text-lg sm:text-xl text-gray-900">
                Open Guild Access
              </h4>
              <div className="w-10 h-10 rounded-xl bg-[#F0EDE5] text-[#762F3D] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Borrow freely anytime, and contribute your own treasures when you are ready to expand the collection.
            </p>
          </div>
        </div>

        {/* Part 3: Action Banner */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 md:p-10 rounded-2xl bg-[#762F3D] text-white flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 text-center md:text-left shadow-sm">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold font-playfair">
              Ready to find your next read?
            </h3>
            <p className="text-[#F0EDE5] text-xs sm:text-sm max-w-lg">
              Explore thousands of hand-bound editions, classics, and modern discoveries.
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
  );
};

export default HowBorrowingWorks;
