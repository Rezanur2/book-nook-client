import React from "react";
import Link from "next/link";
import { Library, ArrowRight } from "lucide-react";

export default function NoBorrows() {
  return (
    <div className="bg-white rounded-2xl border border-[#E6E0D6] p-10 sm:p-14 text-center max-w-lg mx-auto my-8 shadow-xs">
      <div className="w-14 h-14 rounded-2xl bg-[#F5F2EA] border border-[#E6E0D6] text-[#762F3D] flex items-center justify-center mx-auto mb-4">
        <Library className="w-6 h-6" />
      </div>
      <h2 className="text-xl sm:text-2xl font-bold font-playfair text-gray-900 mb-2">
        No borrowed books yet
      </h2>
      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-sm mx-auto mb-6">
        You haven&apos;t borrowed any books from the library yet. Explore our
        collection and start reading today.
      </p>
      <Link
        href="/books"
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#762F3D] hover:underline"
      >
        <span>Browse All Books</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
