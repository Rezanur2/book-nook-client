import React from "react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BookmarkCheck } from "lucide-react";
import { auth } from "@/lib/auth";
import Breadcrumb from "@/components/shared/Breadcrumb";
import NoBorrows from "./_components/NoBorrows";
import MyBorrowsTable from "./_components/MyBorrowsTable";
import { IBorrow } from "@/types/borrow.type";

export const metadata: Metadata = {
  title: "BookNook | My Borrows",
  description: "View and manage all the books you have borrowed from BookNook.",
};

export const dynamic = "force-dynamic";

const MyBorrowsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login?callbackUrl=/my-borrows");
  }

  const email = session.user.email;

  let borrows: IBorrow[] = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/borrows?email=${encodeURIComponent(email)}`,
      {
        cache: "no-store",
      }
    );

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        borrows = data;
      }
    }
  } catch (error) {
    console.error("Error fetching borrows:", error);
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: "My Borrows" }]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E0D6] pb-5 sm:pb-6">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-playfair text-[#762F3D] tracking-tight">
            My Borrowed Books
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
            Track and manage all the books you have currently borrowed from the library.
          </p>
        </div>

        {/* Total Borrows Counter */}
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border border-[#E6E0D6] shadow-xs shrink-0 self-start sm:self-center">
          <div className="w-9 h-9 rounded-xl bg-[#762F3D]/10 flex items-center justify-center text-[#762F3D]">
            <BookmarkCheck className="w-5 h-5" />
          </div>
          <div className="text-left leading-tight">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
              Total Borrows
            </span>
            <span className="text-base sm:text-lg font-bold text-gray-900 font-playfair">
              {borrows.length} {borrows.length === 1 ? "Book" : "Books"}
            </span>
          </div>
        </div>
      </div>

      {/* Content: Table or Empty state */}
      {!borrows || borrows.length === 0 ? (
        <NoBorrows />
      ) : (
        <MyBorrowsTable borrows={borrows} />
      )}
    </div>
  );
};

export default MyBorrowsPage;
