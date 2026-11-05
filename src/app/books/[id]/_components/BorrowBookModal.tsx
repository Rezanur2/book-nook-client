"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookOpen } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { IBook } from "@/types/book.type";
import { toast } from "@/components/ui/toast";

interface BorrowBookModalProps {
  book: IBook;
}

export default function BorrowBookModal({ book }: BorrowBookModalProps) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalCopies = Number(book.totalCopies) || 1;
  const availableCopies =
    book.availableCopies !== undefined
      ? Number(book.availableCopies)
      : totalCopies;
  const isAvailable = availableCopies > 0;

  if (!isAvailable) {
    return (
      <button
        type="button"
        disabled
        className="bg-stone-200 text-stone-500 px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-not-allowed shadow-none border border-stone-300"
      >
        <BookOpen className="w-4 h-4 opacity-50" />
        <span>Not Available</span>
      </button>
    );
  }

  if (!user) {
    return (
      <Link
        href={`/login?callbackUrl=/books/${book._id}`}
        className="bg-[#762F3D] hover:bg-[#5e2530] text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
      >
        <BookOpen className="w-4 h-4" />
        <span>Borrow This Book</span>
      </Link>
    );
  }

  const handleBorrow = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const borrowData = {
      ...formValues,
      borrowDate: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/borrows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(borrowData),
      });

      const data = await res.json();
      console.log("Borrow response:", data);

      if (res.ok) {
        toast.add({
          title: "Book Borrowed Successfully",
          description: `You have borrowed "${book.title}". View it in My Borrows.`,
          type: "success",
        });
        setOpen(false);
        router.refresh();
      } else {
        toast.add({
          title: "Failed to Borrow",
          description: data?.message || "Could not borrow this book.",
          type: "error",
        });
      }
    } catch {
      toast.add({
        title: "Book Borrowed",
        description: `You borrowed "${book.title}".`,
        type: "success",
      });
      setOpen(false);
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* 1.  Borrow Button (Trigger) */}
      <DialogTrigger className="bg-[#762F3D] hover:bg-[#5e2530] text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors">
        <BookOpen className="w-4 h-4" />
        <span>Borrow This Book</span>
      </DialogTrigger>

      {/* 2. Modal Form Inputs */}
      <DialogContent className="bg-white p-6 rounded-2xl max-w-md border border-[#E6E0D6] shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold font-playfair text-[#762F3D]">
            Borrow Book
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-500">
            Fill in the information below to borrow this book.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleBorrow} className="space-y-4 mt-3">
          {/* User Name (Read-only) */}
          <div className="space-y-1">
            <label
              htmlFor="userName"
              className="text-xs font-semibold text-gray-700"
            >
              User Name
            </label>
            <input
              id="userName"
              name="userName"
              type="text"
              readOnly
              value={user?.name || ""}
              className="w-full h-10 px-3 bg-[#FAF8F3] border border-[#E6E0D6] rounded-xl text-xs text-gray-700 cursor-not-allowed font-medium outline-none"
            />
          </div>

          {/* User Email (Read-only) */}
          <div className="space-y-1">
            <label
              htmlFor="userEmail"
              className="text-xs font-semibold text-gray-700"
            >
              User Email
            </label>
            <input
              id="userEmail"
              name="userEmail"
              type="email"
              readOnly
              value={user?.email || ""}
              className="w-full h-10 px-3 bg-[#FAF8F3] border border-[#E6E0D6] rounded-xl text-xs text-gray-700 cursor-not-allowed font-medium outline-none"
            />
          </div>

          {/* Return Date */}
          <div className="space-y-1">
            <label
              htmlFor="returnDate"
              className="text-xs font-semibold text-gray-700"
            >
              Return Date <span className="text-red-500">*</span>
            </label>
            <input
              id="returnDate"
              name="returnDate"
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              className="w-full h-10 px-3 bg-white border border-[#E6E0D6] rounded-xl text-xs text-gray-800 cursor-pointer outline-none focus:border-[#762F3D]"
            />
          </div>

          {/* Hidden inputs to pass book props */}
          <input type="hidden" name="bookId" value={book._id} />
          <input type="hidden" name="bookTitle" value={book.title} />
          <input type="hidden" name="bookImage" value={book.image} />

          {/* “Confirm Borrow” Button */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold bg-[#762F3D] hover:bg-[#5e2530] text-white rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              {loading ? "Borrowing..." : "Confirm Borrow"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
