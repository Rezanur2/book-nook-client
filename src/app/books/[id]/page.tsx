import React, { cache } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, User } from "lucide-react";
import { IBook } from "@/types/book.type";
import { toast } from "@/components/ui/toast";

interface BookDetailsProps {
  params: Promise<{ id: string }>;
}

const getBook = cache(async (id: string): Promise<IBook | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/books/${id}`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    toast.add({
      title: "Failed to fetch book",
      type: "error",
    });
    return null;
  }
});

export async function generateMetadata({
  params,
}: BookDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const book = await getBook(id);

  return {
    title: book?.title ? `${book.title} | BookNook` : "Book Details | BookNook",
  };
}

const BookDetailsPage = async ({ params }: BookDetailsProps) => {
  const { id } = await params;
  const book = await getBook(id);

  if (!book || !book._id) {
    return notFound();
  }

  // Stock calculations
  const totalCopies = Number(book.totalCopies) || 1;
  const availableCopies =
    book.availableCopies !== undefined
      ? Number(book.availableCopies)
      : totalCopies;
  const borrowedCopies = Math.max(0, totalCopies - availableCopies);
  const isAvailable = availableCopies > 0;

  // Who added the book
  const addedByName = book.addedBy?.name || "Library Patron";
  const addedByEmail = book.addedBy?.email || null;

  return (
    <div className="min-h-screen bg-[#FAF8F3] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <p className="text-xs font-semibold tracking-wider uppercase text-gray-500">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/books" className="hover:text-primary">
            Catalog
          </Link>{" "}
          /{" "}
          <span className="text-primary border-b-2 border-primary pb-0.5">
            {book.title}
          </span>
        </p>

        {/* Main Details Card */}
        <div className="bg-white rounded-2xl border border-[#E6E0D6] p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* 1. Book Cover Image */}
          <div className="md:col-span-5 relative w-full aspect-3/4 rounded-xl overflow-hidden bg-[#FAF8F3] border border-[#E6E0D6]">
            <Image
              src={
                book.image ||
                "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop"
              }
              alt={book.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>

          {/* 2. Book Info */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <div className="flex items-center justify-between gap-2">
                {/* Category */}
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#B76E59] bg-[#FAF8F3] px-2.5 py-1 rounded border border-[#E6E0D6]">
                  {book.category}
                </span>

                {/* Availability Badge */}
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center space-x-1.5 shadow-xs border ${
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
                    {isAvailable
                      ? `${availableCopies} Available`
                      : "Waitlist (0 Available)"}
                  </span>
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-bold font-playfair text-[#292521] mt-2 leading-tight">
                {book.title}
              </h1>

              {/* Author */}
              <p className="text-sm text-gray-600 mt-1">
                By{" "}
                <strong className="text-gray-900 font-semibold">
                  {book.author}
                </strong>
              </p>
            </div>

            {/* Copies: Total, Borrowed, Available */}
            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E6E0D6] text-center sm:text-left">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Total Copies
                </span>
                <span className="text-xl font-bold font-playfair text-[#292521]">
                  {totalCopies}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Borrowed
                </span>
                <span className="text-xl font-bold font-playfair text-[#B76E59]">
                  {borrowedCopies}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Available
                </span>
                <span
                  className={`text-xl font-bold font-playfair ${
                    isAvailable ? "text-emerald-700" : "text-red-600"
                  }`}
                >
                  {availableCopies}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Description
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {book.description ||
                  "A captivating book available in our lending library collection."}
              </p>
            </div>

            {/* Who Added It */}
            <div className="border-t border-[#F0EDE5] pt-3 flex items-center gap-2 text-xs text-gray-600">
              <User className="w-4 h-4 text-[#B76E59] shrink-0" />
              <span>
                Added by:{" "}
                <strong className="text-gray-800 font-semibold">
                  {addedByName}
                </strong>
                {addedByEmail && (
                  <span className="text-gray-400"> ({addedByEmail})</span>
                )}
              </span>
            </div>

            {/* Borrow This Book Button & Back to Catalog */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 pt-2">
              <button
                disabled={!isAvailable}
                className="bg-[#762F3D] hover:bg-[#5e2530] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer w-full md:w-auto shrink-0 whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>Borrow This Book</span>
              </button>

              <Link
                href="/books"
                className="inline-flex items-center justify-center gap-1.5 border border-[#E6E0D6] bg-white hover:bg-[#FAF8F3] text-gray-700 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-xs w-full md:w-auto shrink-0 whitespace-nowrap text-center"
              >
                <ArrowLeft className="w-4 h-4 shrink-0" />
                <span>Back to Catalog</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
