import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import { IBook } from "@/types/book.type";
export type BookType = IBook;

const BookCard = ({ book }: { book: IBook }) => {
  // Check stock availability
  const copies = book.availableCopies ?? book.totalCopies ?? 1;
  const isAvailable = copies > 0;
  const addedDate = book.createdAt
    ? new Date(book.createdAt).toLocaleDateString("en-US", {
        dateStyle: "medium",
      })
    : null;

  return (
    <div className="bg-white rounded-2xl border border-[#E6E0D6] p-3.5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group">
      {/* 1. Top Section: Image & Badges */}
      <div>
        <div className="relative w-full aspect-4/4 rounded-xl overflow-hidden bg-[#FAF8F3]">
          {/* Cover Photo */}
          <Image
            src={book.image}
            alt={book.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Top-Left Category Badge */}
          <span className="absolute top-2.5 left-2.5 text-[10px] font-bold tracking-wider uppercase bg-[#FBF4F5]/95 backdrop-blur-xs text-[#762F3D] px-2.5 py-0.5 rounded-full shadow-xs border border-[#E8D1D5]">
            {book.category}
          </span>

          {/* Top-Right Availability Badge */}
          <span
            className={`absolute top-2.5 right-2.5 text-[10px] font-semibold px-2.5 py-0.5 rounded-full flex items-center space-x-1 shadow-xs border backdrop-blur-md ${
              isAvailable
                ? "bg-emerald-50/95 text-emerald-800 border-emerald-200/80"
                : "bg-[#FDF2F2]/95 text-[#991B1B] border-[#F8D7DA]/80"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isAvailable ? "bg-emerald-600" : "bg-[#DC2626]"
              }`}
            />
            <span>
              {isAvailable ? `${copies} Available` : "Waitlist (0 Available)"}
            </span>
          </span>

          {/* Bottom Gradient Overlay on Image: Added Date */}
          {addedDate && (
            <div className="absolute inset-x-0 bottom-0 h-14 bg-linear-to-t from-black/80 via-black/40 to-transparent flex items-end px-3 pb-2 text-[11px] text-white/90">
              <div className="flex items-center space-x-1.5 text-[11px] text-white/90 font-medium">
                <Calendar className="w-3.5 h-3.5 text-amber-200 shrink-0" />
                <span>Added: {addedDate}</span>
              </div>
            </div>
          )}
        </div>

        {/* 2. Middle Section: Author, Stock, Title, Description */}
        <div className="mt-3.5 space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#B76E59] truncate">
              {book.author}
            </p>
            <span className="text-sm font-medium text-gray-500 shrink-0">
              <strong className="text-gray-800">
                {copies} {copies === 1 ? "Copy" : "Copies"}
              </strong>
            </span>
          </div>
          <h3
            className="font-playfair text-xl font-bold text-[#292521] leading-tight line-clamp-1 group-hover:text-primary transition-colors"
            title={book.title}
          >
            {book.title}
          </h3>
          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {book.description ||
              "A timeless literary volume preserved by readers for deep exploration and study."}
          </p>
        </div>
      </div>

      {/* 3. Bottom Row: Full-Width View Details Button */}
      <div className="mt-4">
        <Link
          href={`/books/${book._id}`}
          className="w-full inline-flex items-center justify-center space-x-2 bg-[#762F3D] hover:bg-[#5e2530] text-white text-xs font-semibold py-2.5 rounded-xl shadow-xs transition-all duration-200 group-hover:shadow-md"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
