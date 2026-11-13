"use client";

import React, { useState } from "react";
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
import { toast } from "@/components/ui/toast";
import { IBook } from "@/types/book.type";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface DeleteBooksDialogProps {
  book: IBook;
  onBookDeleted?: () => void;
}

const DeleteBooksDialog = ({ book, onBookDeleted }: DeleteBooksDialogProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteBook = async () => {
    setIsDeleting(true);
    const token = await getTokenFromClient();
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/books/${book._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await result.json();

      if (data.acknowledged || data.deletedCount > 0 || result.ok) {
        toast.add({
          title: "Book Deleted Successfully",
          description: `"${book.title}" has been removed from the library.`,
          type: "success",
        });
        setOpen(false);
        onBookDeleted?.();
        router.refresh();
      } else {
        toast.add({
          title: "Delete Failed",
          description: "Could not delete the book. Please try again.",
          type: "error",
        });
      }
    } catch (err) {
      console.error("Error deleting book:", err);
      toast.add({
        title: "Network Error",
        description: "Failed to connect to the server. Please try again.",
        type: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <AlertDialogTrigger className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 text-xs font-semibold text-[#E11D48] bg-white hover:bg-rose-50 border border-rose-200 rounded-xl sm:rounded-full transition-colors cursor-pointer shadow-xs w-full sm:w-auto">
        <Trash2 className="w-3.5 h-3.5 text-[#E11D48]" />
        <span>Delete</span>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white border border-[#E6E0D6] rounded-2xl p-6 shadow-xl max-w-sm sm:max-w-md w-full">
        <AlertDialogHeader className="space-y-3">
          {/* Warning Icon Badge */}
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-[#E11D48] flex items-center justify-center mx-auto sm:mx-0">
            <AlertTriangle className="w-6 h-6 text-[#E11D48]" />
          </div>

          <div className="space-y-1.5 text-center sm:text-left">
            <AlertDialogTitle className="text-lg sm:text-xl font-bold font-playfair text-gray-900">
              Delete &quot;{book.title}&quot;?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Are you sure you want to delete this book? This action cannot be undone and will permanently remove it from the BookNook catalog.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-4 pt-3 flex flex-row items-center justify-end gap-2.5">
          <AlertDialogCancel
            disabled={isDeleting}
            className="border-[#E6E0D6] text-gray-700 text-xs sm:text-sm h-10 px-4 rounded-xl cursor-pointer hover:bg-[#FAF8F3]"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteBook}
            disabled={isDeleting}
            className="bg-[#E11D48] hover:bg-rose-700 text-white text-xs sm:text-sm font-semibold px-4 h-10 rounded-xl flex items-center gap-2 cursor-pointer shadow-xs transition-all"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                <span>Yes, Delete</span>
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBooksDialog;
