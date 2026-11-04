"use client";

import Link from "next/link";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { Plus } from "lucide-react";
import NoBooks from "./_components/NoBooks";
import MyBooksList from "./_components/MyBooksList";
import { useSession } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import { IBook } from "@/types/book.type";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { buttonVariants } from "@/components/ui/button";

const MyBooksPage = () => {

  const { data: session, isPending } = useSession();
  const [books, setBooks] = useState<IBook[] | null>(null);
  const [error, setError] = useState(false);

  const email = session?.user.email;

  useEffect(() => {
    if (!email) return;
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/my-books/${encodeURIComponent(email)}`,
    )
      .then((res) => res.json())
      .then((data: IBook[]) => setBooks(data))
      .catch(() => {
        setError(true);
      });
  }, [email]);

  if (isPending || (email && !books && !error)) {
    return (
      <div className="flex justify-center items-center h-[85vh]">
        <Spinner className="size-8 text-[#762F3D]" />
      </div>
    );
  }
  
  if (!session) {
    return (
      <div className="p-6 md:p-10">
        <Empty className="border bg-card">
          <EmptyHeader>
            <EmptyTitle className="text-lg">
              You&apos;re not signed in
            </EmptyTitle>
            <EmptyDescription>
              Sign in to see the books you&apos;ve listed;
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link href="login" className={buttonVariants()}>
              Sign In
            </Link>
          </EmptyContent>
        </Empty>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-[#FAF8F3] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: "My Books" }]} />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E0D6] pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-playfair text-[#762F3D] tracking-tight">
              My Books
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Manage and update the books you have added.
            </p>
          </div>

          <Link
            href="/add-book"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#762F3D] hover:bg-[#5e2530] text-white text-xs font-bold shadow-xs transition-all cursor-pointer w-fit"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Book</span>
          </Link>
        </div>

        {/* Content */}
        {!books || books.length === 0 ? <NoBooks /> : <MyBooksList books={books} />}
      </div>
    </div>
  );
}

export default MyBooksPage;