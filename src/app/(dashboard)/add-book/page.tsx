"use client";

import React from "react";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { ArrowRight, BookPlus, Upload, User, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const AddBookPage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[85vh]">
        <Spinner className="size-8 text-[#762F3D]" />
      </div>
    );
  }
  
  const user = session?.user;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());
    const totalCopies = parseInt(formValues.totalCopies as string) || 1;
    const book = {
      ...formValues,
      totalCopies,
      availableCopies: totalCopies,
      creatorName: user?.name,
      creatorEmail: user?.email,
      createdAt: new Date().toISOString(),
      creatorImage: user?.image,
    };
    const token = await getTokenFromClient()

    const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(book),
    });

    const data = await result.json();

    if (data.acknowledged) {
      toast.add({
        title: "Book Added Successfully",
        description: "The book has been added to the catalog.",
        type: "success",
      });
      router.push("/books");
    } else {
      toast.add({
        title: "Failed to Add Book",
        description: "There was an error adding the book to the catalog.",
        type: "error",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: "Add Book" }]} />

      {/* Header */}
      <div className="border-b border-[#E6E0D6] pb-5 sm:pb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-playfair text-[#762F3D] tracking-tight">
          Add a New Book
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
          Contribute a volume to the BookNook library collection.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-sm font-semibold text-[#292521]"
              >
                Book Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                required
                placeholder="e.g. The Secret History"
                className="h-11 bg-[#FAF8F3]/50 text-sm"
              />
            </div>

            {/* 2. Author & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label
                  htmlFor="author"
                  className="text-sm font-semibold text-[#292521]"
                >
                  Author Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="author"
                  name="author"
                  required
                  placeholder="e.g. Donna Tartt"
                  className="h-11 bg-[#FAF8F3]/50 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="category"
                  className="text-sm font-semibold text-[#292521]"
                >
                  Category <span className="text-red-500">*</span>
                </Label>
                <select
                  id="category"
                  name="category"
                  defaultValue="Fiction"
                  className="h-11 w-full rounded-lg border border-input bg-[#FAF8F3]/50 px-3 text-sm text-[#292521] cursor-pointer outline-none focus:border-primary"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label
                  htmlFor="image"
                  className="text-sm font-semibold text-[#292521]"
                >
                  Book Image URL <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    required
                    placeholder="https://i.ibb.co/..."
                    className="h-11 pr-10 bg-[#FAF8F3]/50 text-sm"
                  />
                  <Upload className="w-4 h-4 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="totalCopies"
                  className="text-sm font-semibold text-[#292521]"
                >
                  Total Copies <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="totalCopies"
                  name="totalCopies"
                  type="number"
                  min="1"
                  defaultValue="1"
                  required
                  className="h-11 bg-[#FAF8F3]/50 text-sm"
                />
              </div>
            </div>

            {/* 4. Short Description */}
            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-sm font-semibold text-[#292521]"
              >
                Short Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                required
                rows={4}
                placeholder="Write a brief overview of the book's narrative, themes, or historical significance..."
                className="bg-[#FAF8F3]/50 text-sm leading-relaxed"
              />
            </div>

            {/* 5. Read-only User Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
              <div className="space-y-2">
                <Label className="text-sm text-gray-600 font-semibold flex items-center gap-1.5">
                  <User className="w-4 h-4 text-gray-400 shrink-0 relative top-[-1.5px]" />
                  <span>User Name</span>
                </Label>
                <Input
                  readOnly
                  value={user?.name}
                  placeholder="Loading user name..."
                  className="h-11 bg-white/70 border-border text-sm text-gray-700 cursor-not-allowed font-medium"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-gray-600 font-semibold flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-gray-400 shrink-0 relative top-[-1.5px]" />
                  <span>User Email</span>
                </Label>
                <Input
                  readOnly
                  value={user?.email}
                  placeholder="Loading user email..."
                  className="h-11 bg-white/70 border-border text-sm text-gray-700 cursor-not-allowed font-medium"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3 flex justify-end">
              <Button
                type="submit"
                className="bg-[#762F3D] hover:bg-[#5e2530] text-white text-sm font-semibold px-7 py-2.5 rounded-xl flex items-center justify-center gap-2 w-full sm:w-auto h-11 transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <BookPlus className="w-4 h-4" />
                <span>Add Book</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default AddBookPage;
