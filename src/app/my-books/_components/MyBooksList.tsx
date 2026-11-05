"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Eye, Layers, Library } from "lucide-react";
import { IBook } from "@/types/book.type";
import EditBooksDialog from "./EditBooksDialog";
import DeleteBooksDialog from "./DeleteBooksDialog";

interface MyBooksListProps {
  books: IBook[];
  onBookUpdated?: () => void;
}

// Fallback book cover
function BookCoverImage({ src, title }: { src?: string; title: string }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="w-16 h-22 sm:w-16 sm:h-22 rounded-xl overflow-hidden bg-[#FAF8F3] relative shrink-0 border border-[#E6E0D6] shadow-xs flex items-center justify-center">
      {!hasError && src ? (
        <Image
          src={src}
          alt={title}
          fill
          sizes="80px"
          className="object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="flex flex-col items-center justify-center p-2 text-[#762F3D] text-center">
          <BookOpen className="w-6 h-6 opacity-60" />
          <span className="text-[9px] font-semibold tracking-wider uppercase mt-1 opacity-70">
            Book
          </span>
        </div>
      )}
    </div>
  );
}

export default function MyBooksList({ books, onBookUpdated }: MyBooksListProps) {
  // 1. Total books
  const totalBooksCount = books.length;

  // 2. Total copies
  let totalCopiesCount = 0;
  for (const book of books) {
    totalCopiesCount += Number(book.totalCopies) || 1;
  }

  // 3. Unique categories 
  const categoryList: string[] = [];
  for (const book of books) {
    if (book.category && !categoryList.includes(book.category)) {
      categoryList.push(book.category);
    }
  }
  const totalCategoriesCount = categoryList.length;

  return (
    <div className="space-y-6">
      {/* 3 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {/* Total Books */}
        <div className="bg-white rounded-2xl border border-[#E6E0D6] p-4 sm:p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Total Books
            </p>
            <h3 className="text-xl sm:text-2xl font-bold font-playfair text-gray-900 mt-1">
              {totalBooksCount} {totalBooksCount === 1 ? "Volume" : "Volumes"}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Across {totalCategoriesCount}{" "}
              {totalCategoriesCount === 1 ? "category" : "categories"}
            </p>
          </div>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FAF8F3] border border-[#E6E0D6] text-[#762F3D] flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Total Copies */}
        <div className="bg-white rounded-2xl border border-[#E6E0D6] p-4 sm:p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Total Copies
            </p>
            <h3 className="text-xl sm:text-2xl font-bold font-playfair text-gray-900 mt-1">
              {totalCopiesCount} {totalCopiesCount === 1 ? "Copy" : "Copies"}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">Available in library</p>
          </div>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FAF8F3] border border-[#E6E0D6] text-[#762F3D] flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-2xl border border-[#E6E0D6] p-4 sm:p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Categories
            </p>
            <h3 className="text-xl sm:text-2xl font-bold font-playfair text-gray-900 mt-1">
              {totalCategoriesCount}{" "}
              {totalCategoriesCount === 1 ? "Genre" : "Genres"}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Diverse reading selection
            </p>
          </div>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FAF8F3] border border-[#E6E0D6] text-[#762F3D] flex items-center justify-center shrink-0">
            <Library className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
      </div>

      {/* Books List */}
      <div className="space-y-3.5">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-2xl border border-[#E6E0D6] p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-[#FAF8F3]/40"
          >
            {/* Top / Left: Cover & Information */}
            <div className="flex items-center gap-3.5 sm:gap-4 w-full sm:w-auto flex-1 min-w-0">
              <BookCoverImage src={book.image} title={book.title} />

              <div className="flex-1 min-w-0 space-y-1 sm:space-y-1.5">
                {/* Category & Copies */}
                <div className="flex items-center justify-between sm:justify-start sm:gap-2.5">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F5F2EA] text-[#762F3D] border border-[#E6E0D6]">
                    {book.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                    {book.totalCopies || 1} Copies
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 font-playfair text-base sm:text-lg truncate">
                  {book.title}
                </h3>
                <p className="text-xs text-gray-600 font-medium truncate">
                  by{" "}
                  <span className="text-gray-900 font-semibold">
                    {book.author}
                  </span>
                </p>
              </div>
            </div>

            {/* Bottom / Right: Action Buttons (Edit, View, Delete) */}
            <div className="pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E6E0D6] grid grid-cols-3 sm:flex sm:items-center gap-2 px-0.5 sm:px-0 shrink-0 w-full sm:w-auto">
              <EditBooksDialog book={book} onBookUpdated={onBookUpdated} />
              <Link
                href={`/books/${book._id}`}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 text-xs font-semibold text-[#1E293B] bg-white hover:bg-[#FAF8F3] border border-[#E6E0D6] rounded-xl sm:rounded-full transition-colors cursor-pointer shadow-xs w-full sm:w-auto"
              >
                <Eye className="w-3.5 h-3.5 text-[#762F3D]" />
                <span>View</span>
              </Link>

              <DeleteBooksDialog book={book} onBookDeleted={onBookUpdated} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
