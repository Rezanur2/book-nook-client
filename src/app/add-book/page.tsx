"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookPlus, Upload, User, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

const AddBookPage = () => {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const book = Object.fromEntries(formData.entries());

    const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    <div className="min-h-screen bg-[#FAF8F3] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="border-b border-border pb-4">
          <p className="text-xs font-semibold tracking-wider uppercase text-gray-500">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>{" "}
            /{" "}
            <Link href="/books" className="hover:text-primary">
              Catalog
            </Link>{" "}
            /{" "}
            <span className="text-primary border-b-2 border-primary pb-0.5">
              Add a Book
            </span>
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold font-playfair text-primary mt-1">
            Add a New Book
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Catalog a physical volume into the collective lending sanctuary.
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
                  disabled
                  value={"John Doe"}
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
                  disabled
                  value={"john.doe@booknook.lib"}
                  className="h-11 bg-white/70 border-border text-sm text-gray-700 cursor-not-allowed font-medium"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3 flex justify-end">
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white text-sm font-medium px-7 py-2.5 rounded-lg flex items-center space-x-2 w-full sm:w-auto h-11"
              >
                <BookPlus className="w-4 h-4" />
                <span>Add Book</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBookPage;
