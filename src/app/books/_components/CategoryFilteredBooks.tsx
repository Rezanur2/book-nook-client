"use client";

import React, { useState } from "react";
import BookCard from "@/components/shared/BookCard";
import { IBook } from "@/types/book.type";
import { BookOpen } from "lucide-react";

interface CategoryFilteredBooksProps {
  books: IBook[];
  initialCategory?: string;
}

const CATEGORIES = ["All", "Fiction", "Science", "History", "Kids", "Others"];

export default function CategoryFilteredBooks({
  books,
  initialCategory = "All",
}: CategoryFilteredBooksProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const filteredBooks =
    selectedCategory === "All"
      ? books
      : books.filter(
          (b) => b.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="space-y-6">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive =
            selectedCategory.toLowerCase() === cat.toLowerCase();

          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                isActive
                  ? "bg-[#762F3D] text-white border-[#762F3D] shadow-xs"
                  : "bg-white text-gray-700 border-[#E6E0D6] hover:bg-[#FAF8F3] hover:text-[#762F3D]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Books Grid */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-[#E6E0D6] space-y-3">
          <BookOpen className="w-10 h-10 text-gray-400 mx-auto" />
          <h3 className="text-lg font-semibold font-playfair text-[#292521]">
            No Books Found
          </h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            No books found under &quot;{selectedCategory}&quot; category.
          </p>
          <button
            type="button"
            onClick={() => setSelectedCategory("All")}
            className="inline-block mt-2 text-xs font-semibold bg-[#762F3D] hover:bg-[#5e2530] text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Show All Books
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
          {filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
