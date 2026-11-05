import React from "react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
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

  console.log("My Borrows Data:", borrows);

  return (
    <div className="min-h-screen bg-[#FAF8F3] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
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
        </div>

        {/* Content: Table or Empty state */}
        {!borrows || borrows.length === 0 ? (
          <NoBorrows />
        ) : (
          <MyBorrowsTable borrows={borrows} />
        )}
      </div>
    </div>
  );
};

export default MyBorrowsPage;
