import React from "react";
import type { Metadata } from "next";
import Breadcrumb from "@/components/shared/Breadcrumb";
import NoBorrows from "./_components/NoBorrows";

export const metadata: Metadata = {
  title: "My Borrows | BookNook",
  description: "View and manage your borrowed books from the BookNook library.",
};

const MyBorrowsPage = () => {
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

        {/* Empty State Component */}
        <NoBorrows />
      </div>
    </div>
  );
};

export default MyBorrowsPage;
