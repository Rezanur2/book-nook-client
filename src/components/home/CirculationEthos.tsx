import React from "react";
import {
  ArrowLeftRight,
  Search,
  MousePointerClick,
  RotateCcw,
  Compass,
  Sparkles,
  Bookmark,
} from "lucide-react";

const CirculationEthos = () => {
  return (
    <section className="w-full bg-[#FAF8F3] py-12 sm:py-16 lg:py-20 border-b border-[#E6E0D6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#B76E59] uppercase mb-2 sm:mb-3">
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Circulation Ethos</span>
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-playfair text-[#762F3D] tracking-tight">
          A Simpler Way to Discover Books.
        </h2>

        <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed mt-2 sm:mt-3">
          Rooted in ancient reading guilds and modernized for seamless neighborhood exchanges. No overdue penalization, simply shared stewardship.
        </p>

        {/* 3 Responsive Natural Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12 text-left">
          {/* Card 1: Discover */}
          <div className="bg-white rounded-2xl border border-[#E6E0D6] p-5 sm:p-7 lg:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
            <div>
              {/* Header: On mobile (01 -> Discover -> Icon on right), on desktop (Icon on top, 01, Discover) */}
              <div className="flex items-center justify-between mb-3.5 md:flex-col md:items-start md:mb-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl bg-[#F0EDE5] text-[#762F3D] flex items-center justify-center shrink-0 order-2 md:order-1 md:mb-6">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="flex items-baseline gap-2.5 order-1 md:order-2 md:block">
                  <span className="text-xs font-bold tracking-widest text-[#B76E59] md:block md:mb-1">
                    01
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold font-playfair text-gray-900 md:mb-2">
                    Discover
                  </h3>
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
          <div className="bg-white rounded-2xl border border-[#E6E0D6] p-5 sm:p-7 lg:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
            <div>
              {/* Header: On mobile (02 -> Borrow -> Icon on right), on desktop (Icon on top, 02, Borrow) */}
              <div className="flex items-center justify-between mb-3.5 md:flex-col md:items-start md:mb-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl bg-[#F0EDE5] text-[#762F3D] flex items-center justify-center shrink-0 order-2 md:order-1 md:mb-6">
                  <MousePointerClick className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="flex items-baseline gap-2.5 order-1 md:order-2 md:block">
                  <span className="text-xs font-bold tracking-widest text-[#B76E59] md:block md:mb-1">
                    02
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold font-playfair text-gray-900 md:mb-2">
                    Borrow
                  </h3>
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
          <div className="bg-white rounded-2xl border border-[#E6E0D6] p-5 sm:p-7 lg:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
            <div>
              {/* Header: On mobile (03 -> Return -> Icon on right), on desktop (Icon on top, 03, Return) */}
              <div className="flex items-center justify-between mb-3.5 md:flex-col md:items-start md:mb-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl bg-[#F0EDE5] text-[#762F3D] flex items-center justify-center shrink-0 order-2 md:order-1 md:mb-6">
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="flex items-baseline gap-2.5 order-1 md:order-2 md:block">
                  <span className="text-xs font-bold tracking-widest text-[#B76E59] md:block md:mb-1">
                    03
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold font-playfair text-gray-900 md:mb-2">
                    Return
                  </h3>
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
      </div>
    </section>
  );
};

export default CirculationEthos;
