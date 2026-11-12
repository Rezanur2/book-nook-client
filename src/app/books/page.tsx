import React from "react";
import { IBook } from "@/types/book.type";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { BookOpen } from "lucide-react";
import type { Metadata } from "next";
import CategoryFilteredBooks from "./_components/CategoryFilteredBooks";

export const metadata: Metadata = {
  title: "BookNook | All Books",
  description: "Explore our collection of available books in the library.",
};

interface AllBooksPageProps {
  searchParams?: Promise<{ category?: string }>;
}

const AllBooksPage = async ({ searchParams }: AllBooksPageProps) => {
  const params = await searchParams;
  const initialCategory = params?.category || "All";

  const books = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/books`, {
    cache: "no-store",
  });
  const booksData = await books.json();

  const bookList: IBook[] = Array.isArray(booksData) ? booksData : [];

  return (
    <div className="min-h-screen bg-[#FAF8F3] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: "All Books" }]} />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E0D6] pb-5 sm:pb-6">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-playfair text-[#762F3D] tracking-tight">
              All Books
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
              Explore our complete library collection of available editions and
              volumes.
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

        {/* Category Filter & Books Grid */}
        <CategoryFilteredBooks
          books={bookList}
          initialCategory={initialCategory}
        />
      </div>
    </div>
  );
};

export default AllBooksPage;
