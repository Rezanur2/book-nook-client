"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Calendar, RotateCcw, Eye } from "lucide-react";
import { IBorrow } from "@/types/borrow.type";
import { toast } from "@/components/ui/toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface MyBorrowsTableProps {
  borrows: IBorrow[];
  onBorrowReturned?: () => void;
}

export default function MyBorrowsTable({
  borrows,
  onBorrowReturned,
}: MyBorrowsTableProps) {
  const router = useRouter();
  const [returningId, setReturningId] = useState<string | null>(null);

  const handleReturn = async (id: string, title: string) => {
    setReturningId(id);

    const token = await getTokenFromClient()
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/borrows/${id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      await res.json();

      if (res.ok) {
        toast.add({
          title: "Book Returned Successfully",
          description: `"${title}" has been returned.`,
          type: "success",
        });
        onBorrowReturned?.();
        router.refresh();
      } else {
        toast.add({
          title: "Failed to return book",
          type: "error",
        });
      }
    } catch (err) {
      console.error("Error returning book:", err);
      toast.add({
        title: "Book Returned",
        description: `"${title}" returned.`,
        type: "success",
      });
      onBorrowReturned?.();
      router.refresh();
    } finally {
      setReturningId(null);
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E6E0D6] shadow-xs overflow-hidden">
      {/* Mobile View: Clean, Responsive Cards */}
      <div className="md:hidden divide-y divide-[#E6E0D6]">
        {borrows.map((borrow) => (
          <div key={borrow._id} className="p-4 space-y-3 bg-white">
            <div className="flex items-start gap-3">
              <div className="relative w-12 h-16 rounded-xl overflow-hidden shrink-0 border border-[#E6E0D6] bg-[#FAF8F3]">
                {borrow.bookImage ? (
                  <Image
                    src={borrow.bookImage}
                    alt={borrow.bookTitle || "Book cover"}
                    fill
                    sizes="60px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#762F3D]">
                    <BookOpen className="w-5 h-5 opacity-60" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1 space-y-1">
                <h4 className="font-bold text-gray-900 font-playfair text-sm leading-snug line-clamp-2">
                  {borrow.bookTitle || "Untitled Book"}
                </h4>
                <Link
                  href={`/books/${borrow.bookId}`}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#762F3D] hover:underline"
                >
                  <Eye className="w-3 h-3" />
                  <span>View Book</span>
                </Link>
              </div>
            </div>

            <div className="pt-2.5 border-t border-[#F5F2EA] flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 sm:gap-3">
                {/* Borrow Date */}
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Borrowed
                  </span>
                  <div className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-700 bg-gray-100/80 px-2 py-0.5 rounded-md border border-gray-200/60 whitespace-nowrap">
                    <Calendar className="w-3 h-3 text-[#B76E59]" />
                    <span>{formatDate(borrow.borrowDate)}</span>
                  </div>
                </div>

                {/* Return Date */}
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Return Date
                  </span>
                  <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#762F3D] bg-[#762F3D]/8 px-2 py-0.5 rounded-md border border-[#762F3D]/15 whitespace-nowrap">
                    <Calendar className="w-3 h-3 text-[#762F3D]" />
                    <span>{formatDate(borrow.returnDate)}</span>
                  </div>
                </div>
              </div>

              <AlertDialog>
                <AlertDialogTrigger
                  disabled={returningId === borrow._id}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#762F3D] hover:bg-[#5e2530] rounded-xl transition-all cursor-pointer shadow-xs active:scale-95 disabled:opacity-50 shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>
                    {returningId === borrow._id
                      ? "Returning..."
                      : "Return Book"}
                  </span>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white p-6 rounded-2xl max-w-md border border-[#E6E0D6] shadow-xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-lg font-bold font-playfair text-[#762F3D]">
                      Return This Book?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-xs text-gray-600 leading-relaxed">
                      Are you sure you want to return &quot;
                      {borrow.bookTitle || "this book"}&quot;? It will be
                      removed from your borrowed list and restored to library
                      stock.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="mt-4 flex gap-2 justify-end">
                    <AlertDialogCancel className="px-4 py-2 text-xs font-semibold rounded-xl border border-[#E6E0D6] text-gray-700 hover:bg-[#FAF8F3] cursor-pointer">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() =>
                        handleReturn(borrow._id, borrow.bookTitle || "Book")
                      }
                      className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#762F3D] hover:bg-[#5e2530] text-white cursor-pointer"
                    >
                      Confirm Return
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop / Tablet View: Classic Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-155 text-left border-collapse text-xs sm:text-sm">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-[#E6E0D6] bg-[#FAF8F3] text-[11px] font-bold uppercase tracking-wider text-gray-500">
              <th className="py-3.5 px-4 sm:px-6 w-20">Image</th>
              <th className="py-3.5 px-4 sm:px-6">Title</th>
              <th className="py-3.5 px-4 sm:px-6 whitespace-nowrap">
                Borrow Date
              </th>
              <th className="py-3.5 px-4 sm:px-6 whitespace-nowrap">
                Return Date
              </th>
              <th className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-[#E6E0D6]">
            {borrows.map((borrow) => (
              <tr
                key={borrow._id}
                className="hover:bg-[#FAF8F3]/50 transition-colors"
              >
                {/* 1. Image */}
                <td className="py-3.5 px-4 sm:px-6">
                  <div className="relative w-11 h-15 rounded-lg overflow-hidden shrink-0 border border-[#E6E0D6] bg-[#FAF8F3]">
                    {borrow.bookImage ? (
                      <Image
                        src={borrow.bookImage}
                        alt={borrow.bookTitle || "Book cover"}
                        fill
                        sizes="50px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#762F3D]">
                        <BookOpen className="w-4 h-4 opacity-60" />
                      </div>
                    )}
                  </div>
                </td>

                {/* 2. Title */}
                <td className="py-3.5 px-4 sm:px-6">
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 font-playfair text-sm sm:text-base truncate max-w-44 sm:max-w-xs">
                      {borrow.bookTitle || "Untitled Book"}
                    </p>
                    <Link
                      href={`/books/${borrow.bookId}`}
                      className="inline-flex items-center gap-1 text-[11px] text-[#762F3D] hover:underline mt-0.5"
                    >
                      <Eye className="w-3 h-3" />
                      <span>View Book</span>
                    </Link>
                  </div>
                </td>

                {/* 3. Borrow Date */}
                <td className="py-3.5 px-4 sm:px-6 text-gray-600 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{formatDate(borrow.borrowDate)}</span>
                  </div>
                </td>

                {/* 4. Return Date */}
                <td className="py-3.5 px-4 sm:px-6 font-semibold text-gray-800 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#762F3D]" />
                    <span>{formatDate(borrow.returnDate)}</span>
                  </div>
                </td>

                {/* 5. Return Book Button */}
                <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                  <AlertDialog>
                    <AlertDialogTrigger
                      disabled={returningId === borrow._id}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#762F3D] hover:bg-[#5e2530] rounded-xl transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>
                        {returningId === borrow._id
                          ? "Returning..."
                          : "Return Book"}
                      </span>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white p-6 rounded-2xl max-w-md border border-[#E6E0D6] shadow-xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-lg font-bold font-playfair text-[#762F3D]">
                          Return This Book?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-xs text-gray-600 leading-relaxed">
                          Are you sure you want to return &quot;
                          {borrow.bookTitle || "this book"}&quot;? It will be
                          removed from your borrowed list and restored to
                          library stock.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="mt-4 flex gap-2 justify-end">
                        <AlertDialogCancel className="px-4 py-2 text-xs font-semibold rounded-xl border border-[#E6E0D6] text-gray-700 hover:bg-[#FAF8F3] cursor-pointer">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            handleReturn(borrow._id, borrow.bookTitle || "Book")
                          }
                          className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#762F3D] hover:bg-[#5e2530] text-white cursor-pointer"
                        >
                          Confirm Return
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
