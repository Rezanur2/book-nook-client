"use client";

import Link from "next/link";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { Plus } from "lucide-react";
import NoBooks from "./_components/NoBooks";
import MyBooksList from "./_components/MyBooksList";
import { useSession } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";
import { useCallback, useEffect, useState } from "react";
import { IBook } from "@/types/book.type";

const MyBooksPage = () => {

  const { data: session, isPending } = useSession();
  const [books, setBooks] = useState<IBook[] | null>(null);
  const [error, setError] = useState(false);

  const email = session?.user.email;

  const fetchBooks = useCallback(() => {
    if (!email) return;
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/books?email=${encodeURIComponent(email)}`,
    )
      .then((res) => res.json())
      .then((data: IBook[]) => setBooks(data))
      .catch(() => {
        setError(true);
      });
  }, [email]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  if (isPending || (email && !books && !error)) {
    return (
      <div className="flex justify-center items-center h-[85vh]">
        <Spinner className="size-8 text-[#762F3D]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F3] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: "My Books" }]} />

        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-[#E6E0D6] pb-5 sm:pb-6">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-playfair text-[#762F3D] tracking-tight">
              My Books
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-1 sm:line-clamp-none leading-relaxed">
              Manage and update the books you have added.
            </p>
          </div>

          <Link
            href="/add-book"
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#762F3D] hover:bg-[#5e2530] text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-sm transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add New Book</span>
            <span className="inline sm:hidden">Add Book</span>
          </Link>
        </div>

        {/* Content */}
        {!books || books.length === 0 ? (
          <NoBooks />
        ) : (
          <MyBooksList books={books} onBookUpdated={fetchBooks} />
        )}
      </div>
    </div>
  );
}

export default MyBooksPage;