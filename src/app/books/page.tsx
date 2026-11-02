import React, { Suspense } from "react";
import BookCard, { BookType } from "@/components/shared/BookCard";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export const instant = false;

const AllBooksPage = async () => {
  const books = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/books`, {
    cache: "no-store",
  });
  const booksData = await books.json();

  const bookList: BookType[] = Array.isArray(booksData)
    ? [...booksData].sort((a: BookType, b: BookType) =>
        b._id.localeCompare(a._id),
      )
    : [];

  return (
    <div className="min-h-screen bg-[#FAF8F3] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <p className="text-xs font-semibold tracking-wider uppercase text-gray-500">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>{" "}
          / All Books
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E6E0D6] pb-6">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#B76E59]">
              THE MAIN READING ROOMS &bull; Archival Ledger 2025
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-playfair text-[#762F3D] tracking-tight">
              Explore the Collection.
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Find your next favorite read from our growing library of physical
              editions and tactile bindings.
            </p>
          </div>

          {/* Total Books Badge */}
          <div className="flex sm:justify-end">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#762F3D]/10 text-[#762F3D] border border-[#762F3D]/20">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{bookList.length} Total Books</span>
            </span>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookList.map((book: BookType) => (
            <Suspense
              key={book._id}
              fallback={
                <div className="bg-white rounded-2xl border border-[#E6E0D6] p-30.5 shadow-sm" />
              }
            >
              <BookCard book={book} />
            </Suspense>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBooksPage;
