"use client";

import React, { useState } from "react";
import { ArrowRight, Pencil, Upload, User, Mail, Save, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { IBook } from "@/types/book.type";

interface EditBooksDialogProps {
  book: IBook;
  onBookUpdated?: () => void;
}

const EditBooksDialog = ({ book, onBookUpdated }: EditBooksDialogProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const updatedData = {
      title: formValues.title,
      author: formValues.author,
      category: formValues.category,
      image: formValues.image,
      totalCopies: Number(formValues.totalCopies),
      description: formValues.description,
    };

    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/books/${book._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      const data = await result.json();

      if (data.acknowledged || data.modifiedCount > 0 || data.matchedCount > 0 || result.ok) {
        toast.add({
          title: "Book Updated Successfully",
          description: `"${updatedData.title || book.title}" has been updated.`,
          type: "success",
        });
        setOpen(false);
        onBookUpdated?.();
        router.refresh();
      } else {
        toast.add({
          title: "Update Failed",
          description: "Could not update the book. Please try again.",
          type: "error",
        });
      }
    } catch (err) {
      console.error("Error updating book:", err);
      toast.add({
        title: "Network Error",
        description: "Failed to connect to the server. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 text-xs font-semibold text-[#1E293B] bg-white hover:bg-[#FAF8F3] border border-[#E6E0D6] rounded-xl sm:rounded-full transition-colors cursor-pointer shadow-xs w-full sm:w-auto">
        <Pencil className="w-3.5 h-3.5 text-[#762F3D]" />
        <span>Edit</span>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl bg-white border border-[#E6E0D6] rounded-2xl p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold font-playfair text-[#762F3D]">
            Edit Book Details
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-gray-500">
            Update the information for this book in your collection.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* 1. Book Title */}
          <div className="space-y-1.5">
            <Label
              htmlFor={`title-${book._id}`}
              className="text-xs sm:text-sm font-semibold text-[#292521]"
            >
              Book Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id={`title-${book._id}`}
              name="title"
              defaultValue={book.title}
              required
              placeholder="e.g. The Secret History"
              className="h-10 sm:h-11 bg-[#FAF8F3]/50 text-sm border-[#E6E0D6] focus-visible:ring-[#762F3D]"
            />
          </div>

          {/* 2. Author & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor={`author-${book._id}`}
                className="text-xs sm:text-sm font-semibold text-[#292521]"
              >
                Author Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id={`author-${book._id}`}
                name="author"
                defaultValue={book.author}
                required
                placeholder="e.g. Donna Tartt"
                className="h-10 sm:h-11 bg-[#FAF8F3]/50 text-sm border-[#E6E0D6] focus-visible:ring-[#762F3D]"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor={`category-${book._id}`}
                className="text-xs sm:text-sm font-semibold text-[#292521]"
              >
                Category <span className="text-red-500">*</span>
              </Label>
              <select
                id={`category-${book._id}`}
                name="category"
                defaultValue={book.category}
                className="h-10 sm:h-11 w-full rounded-lg border border-[#E6E0D6] bg-[#FAF8F3]/50 px-3 text-sm text-[#292521] cursor-pointer outline-none focus:border-[#762F3D] focus:ring-1 focus:ring-[#762F3D]"
              >
                <option value="Fiction">Fiction</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Kids">Kids</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>

          {/* 3. Image URL & Total Copies */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor={`image-${book._id}`}
                className="text-xs sm:text-sm font-semibold text-[#292521]"
              >
                Book Image URL <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id={`image-${book._id}`}
                  name="image"
                  defaultValue={book.image}
                  type="url"
                  required
                  placeholder="https://i.ibb.co/..."
                  className="h-10 sm:h-11 pr-10 bg-[#FAF8F3]/50 text-sm border-[#E6E0D6] focus-visible:ring-[#762F3D]"
                />
                <Upload className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor={`totalCopies-${book._id}`}
                className="text-xs sm:text-sm font-semibold text-[#292521]"
              >
                Total Copies <span className="text-red-500">*</span>
              </Label>
              <Input
                id={`totalCopies-${book._id}`}
                name="totalCopies"
                type="number"
                min="1"
                defaultValue={book.totalCopies || 1}
                required
                className="h-10 sm:h-11 bg-[#FAF8F3]/50 text-sm border-[#E6E0D6] focus-visible:ring-[#762F3D]"
              />
            </div>
          </div>

          {/* 4. Short Description */}
          <div className="space-y-1.5">
            <Label
              htmlFor={`description-${book._id}`}
              className="text-xs sm:text-sm font-semibold text-[#292521]"
            >
              Short Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id={`description-${book._id}`}
              name="description"
              defaultValue={book.description || ""}
              required
              rows={3}
              placeholder="Write a brief overview of the book..."
              className="bg-[#FAF8F3]/50 text-sm leading-relaxed border-[#E6E0D6] focus-visible:ring-[#762F3D]"
            />
          </div>

          {/* 5. User Info (Read-only) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1.5">
              <Label className="text-xs text-gray-600 font-semibold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-gray-400" />
                <span>Listed By</span>
              </Label>
              <Input
                readOnly
                value={book.creatorName || user?.name || "Anonymous"}
                className="h-10 bg-white/70 border-[#E6E0D6] text-xs text-gray-700 cursor-not-allowed font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-gray-600 font-semibold flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
                <span>Creator Email</span>
              </Label>
              <Input
                readOnly
                value={book.creatorEmail || user?.email || ""}
                className="h-10 bg-white/70 border-[#E6E0D6] text-xs text-gray-700 cursor-not-allowed font-medium"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-[#E6E0D6] text-gray-700 text-xs sm:text-sm h-10 px-4 rounded-xl cursor-pointer hover:bg-[#FAF8F3]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#762F3D] hover:bg-[#5e2530] text-white text-xs sm:text-sm font-semibold px-5 h-10 rounded-xl flex items-center gap-2 cursor-pointer shadow-xs transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBooksDialog;
