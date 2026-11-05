import React, { Suspense } from "react";
import BookCard from "@/components/shared/BookCard";
import { IBook } from "@/types/book.type";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { BookOpen } from "lucide-react";
import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookNook | All Books",
  description: "Explore our collection of available books in the library.",
};


const AllBooksPage = async () => {
  const books = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/books`, {
    cache: "no-store",
  });
  const booksData = await books.json();

  const bookList: IBook[] = Array.isArray(booksData)
    ? [...booksData].sort((a: IBook, b: IBook) =>
        b._id.localeCompare(a._id),
      )
    : [];

  return (
    <div className="min-h-screen bg-[#FAF8F3] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: "All Books" }]} />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E0D6] pb-5 sm:pb-6">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-playfair text-[#762F3D] tracking-tight">
              All Books
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
              Explore our complete library collection of available editions and volumes.
            </p>
          </div>

          {/* Total Books Badge */}
          <div className="flex items-center sm:justify-end shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#762F3D]/10 text-[#762F3D] border border-[#762F3D]/20 shadow-2xs">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{bookList.length} Total Books</span>
            </span>
          </div>
        </div>

        {/* Books Grid / Empty Fallback */}
        {bookList.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-[#E6E0D6] space-y-3">
            <BookOpen className="w-10 h-10 text-gray-400 mx-auto" />
            <h3 className="text-lg font-semibold font-playfair text-[#292521]">No Books Found</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              Our shelves are currently empty. Be the first to catalog a book!
            </p>
            <Link
              href="/add-book"
              className="inline-block mt-2 text-xs font-semibold bg-[#762F3D] hover:bg-[#5e2530] text-white px-4 py-2 rounded-lg transition-colors"
            >
              Add a Book
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookList.map((book: IBook) => (
              <Suspense
                key={book._id}
                fallback={
                  <div className="bg-white rounded-2xl border border-[#E6E0D6] p-4 shadow-sm" />
                }
              >
                <BookCard book={book} />
              </Suspense>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooksPage;
