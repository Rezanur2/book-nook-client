import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import BookCard from "@/components/shared/BookCard";
import { IBook } from "@/types/book.type";

const NewArrivals = async () => {
  let books: IBook[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/books?limit=6`,
      {
        cache: "no-store",
      },
    );
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        books = data;
      }
    }
  } catch (error) {
    console.error("Failed to load new arrivals:", error);
  }

  return (
    <section className="w-full bg-[#FAF8F3] py-16 sm:py-20 border-b border-[#E6E0D6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#B76E59] uppercase mb-2 sm:mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Latest Additions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-playfair text-[#762F3D] tracking-tight">
            New Arrivals.
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed mt-2 sm:mt-3">
            Hand-curated treasures and timeless volumes recently accessioned
            into our open lending library.
          </p>
        </div>

        {/* 6 Books Grid */}
        {books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-[#E6E0D6] p-8">
            <p className="text-gray-500 text-sm">
              No new arrivals available right now.
            </p>
          </div>
        )}

        {/* See All Books Button */}
        <div className="mt-12 text-center">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 bg-[#762F3D] hover:bg-[#5e2530] text-white px-8 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-sm"
          >
            <span>See All Books</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
