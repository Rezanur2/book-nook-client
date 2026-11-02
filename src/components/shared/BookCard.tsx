import React from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";

export interface BookType {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description?: string;
  totalCopies?: number;
  availableCopies?: number;
}

const BookCard = ({ book }: { book: BookType }) => {
  // Check stock availability
  const copies = book.availableCopies ?? book.totalCopies ?? 1;
  const isAvailable = copies > 0;

  return (
    <div className="bg-white rounded-2xl border border-[#E6E0D6] p-3.5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group">
      {/* 1. Top Section: Image & Badges */}
      <div>
        <div className="relative w-full aspect-3/4 rounded-xl overflow-hidden bg-[#FAF8F3]">
          {/* Cover Photo */}
          <Image
            src={book.image}
            alt={book.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Top-Left Category Badge */}
          <span className="absolute top-2.5 left-2.5 text-[10px] font-bold tracking-wider uppercase bg-white/95 text-gray-800 px-2.5 py-1 rounded shadow-sm border border-black/5">
            {book.category}
          </span>

          {/* Top-Right Availability Badge */}
          <span
            className={`absolute top-2.5 right-2.5 text-[10px] font-semibold px-2.5 py-0.5 rounded-full flex items-center space-x-1 shadow-sm border ${
              isAvailable
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-[#FDF2F2] text-[#991B1B] border-[#F8D7DA]"
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

          {/* Bottom Gradient Overlay on Image */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/75 to-transparent flex items-end justify-between px-3 pb-2.5 text-[11px] text-white/90">
            <div className="flex items-center space-x-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-semibold text-white">4.9</span>
            </div>
            <span className="text-white/80 font-medium">Edition Folio</span>
          </div>
        </div>

        {/* 2. Middle Section: Author, Title, Description */}
        <div className="mt-3.5 space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#B76E59]">
            {book.author}
          </p>
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

      {/* 3. Bottom Row: Category & View Details Button */}
      <div className="mt-4 pt-3 border-t border-[#F0EDE5] flex items-center justify-between">
        <span className="text-[11px] font-medium text-gray-500">
          Copies: <strong className="text-gray-800">{copies}</strong>
        </span>

        <Link
          href={`/books/${book._id}`}
          className="inline-flex items-center space-x-1.5 bg-[#762F3D] hover:bg-[#5e2530] text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm transition-all"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
