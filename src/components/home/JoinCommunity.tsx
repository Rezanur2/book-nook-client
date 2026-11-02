import React from "react";
import Link from "next/link";
import { BookOpen, BookPlus } from "lucide-react";

const stats = [
  { value: "8,420+", label: "Active Patrons" },
  { value: "12,400+", label: "Titles Shared" },
  { value: "99.8%", label: "Safe Returns" },
];

const JoinCommunity = () => {
  return (
    <section className="w-full bg-[#5C1D27] text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Pill Badge */}
        <span className="inline-block px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-rose-200/90 bg-white/10 border border-white/15 mb-5 sm:mb-6">
          A Haven for Deep Thought
        </span>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-playfair tracking-tight text-white mb-4 sm:mb-5">
          Your Next Chapter Starts Here.
        </h2>

        {/* Description */}
        <p className="text-rose-100/80 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10">
          Discover something new and find a book worth remembering. Join our
          community of avid readers, bookbinders, and literary explorers today.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-14 sm:mb-16">
          <Link
            href="/books"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#FAF8F3] text-[#5C1D27] font-bold text-sm transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            <span>Explore the Collection</span>
            <BookOpen className="w-4 h-4" />
          </Link>
          <Link
            href="/add-book"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-sm transition-all cursor-pointer"
          >
            <span>Contribute a Book</span>
            <BookPlus className="w-4 h-4" />
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 max-w-2xl mx-auto gap-3 sm:gap-8 pt-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl sm:text-4xl lg:text-5xl font-bold font-playfair text-[#F3E5D0]">
                {stat.value}
              </div>
              <div className="text-[9px] sm:text-[11px] lg:text-xs tracking-[0.2em] uppercase text-rose-200/70 mt-1 sm:mt-1.5 font-bold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;
