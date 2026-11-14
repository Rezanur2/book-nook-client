import Link from "next/link";
import type { Metadata } from "next";
import { BookOpen, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "BookNook | 404 Not Found",
  description:
    "The page or manuscript you are searching for does not exist in our library catalog.",
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-[#FAF8F3] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-2xl border border-[#E6E0D6] shadow-sm">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#FAF8F3] border border-[#E6E0D6] flex items-center justify-center text-[#762F3D]">
          <BookOpen className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-5xl font-bold font-playfair text-[#762F3D] block">
            404
          </span>
          <h1 className="text-xl sm:text-2xl font-bold font-playfair text-gray-900">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
            The page or manuscript you are searching for does not exist in our library catalog, or has been moved to another wing.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#762F3D] hover:bg-[#5e2530] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/books"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-[#FAF8F3] text-gray-700 border border-[#E6E0D6] text-xs sm:text-sm font-semibold shadow-xs transition-all"
          >
            <BookOpen className="w-4 h-4 text-[#762F3D]" />
            <span>Explore Catalog</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
