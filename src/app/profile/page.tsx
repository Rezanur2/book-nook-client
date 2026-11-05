"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, updateUser } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { Spinner } from "@/components/ui/spinner";
import { User, BookOpen, Library, Save, Sparkles } from "lucide-react";
import { IBook } from "@/types/book.type";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [contributedCount, setContributedCount] = useState<number>(0);

  const email = user?.email;

  useEffect(() => {
    if (!email) return;

    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/books?email=${encodeURIComponent(email)}`,
    )
      .then((res) => res.json())
      .then((data: IBook[]) => {
        if (Array.isArray(data)) {
          setContributedCount(data.length);
        }
      })
      .catch((err) => {
        console.error("Error fetching contributed books:", err);
      });
  }, [email]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[85vh]">
        <Spinner className="size-8 text-[#762F3D]" />
      </div>
    );
  }

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const image = formData.get("image") as string;

    const { error } = await updateUser({
      name,
      image,
    });

    setLoading(false);

    if (error) {
      toast.add({
        title: "Update Failed",
        description: error.message || "Failed to update profile.",
      });
      return;
    }

    toast.add({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });

    router.refresh();
  };

  const currentPhoto = imageUrl !== null ? imageUrl : user?.image || "";

  return (
    <div className="w-full min-h-[calc(100vh-65px)] bg-[#FAF8F3] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: "Profile" }]} />

        {/* Hero Card */}
        <div className="rounded-2xl border border-[#E6E0D6] bg-white overflow-hidden shadow-xs">
          {/* Top Banner */}
          <div className="h-28 sm:h-36 bg-linear-to-r from-[#762F3D] to-[#5C1D27] p-4 flex justify-end items-start">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase border border-white/20">
              <Sparkles className="w-3 h-3 text-[#C6A46A]" />
              <span>Reader Member</span>
            </span>
          </div>

          {/* Profile Details Header */}
          <div className="px-5 sm:px-8 pb-6 pt-0 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-end gap-4 -mt-12 sm:-mt-14">
              {/* Overlapping Avatar */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white shadow-md relative overflow-hidden bg-[#FAF8F3] shrink-0">
                {currentPhoto ? (
                  <Image
                    src={currentPhoto}
                    alt={user?.name || "User"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#762F3D] text-white text-2xl font-bold">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                )}
              </div>

              {/* User Name & Email */}
              <div className="pb-1">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 font-playfair">
                  {user?.name || "Reader Name"}
                </h1>
                <p className="text-xs sm:text-sm text-gray-500">
                  {user?.email || "reader@booknook.com"}
                </p>
              </div>
            </div>

            {/* Stats Pills */}
            <div className="flex items-center gap-2.5 shrink-0 pt-2 sm:pt-0">
              <Link href="/my-books" className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF8F3] border border-[#E6E0D6]">
                <BookOpen className="w-3.5 h-3.5 text-[#762F3D]" />
                <div className="text-left leading-none">
                  <span className="text-xs font-bold text-gray-900 block">
                    {contributedCount}
                  </span>
                  <span className="text-[9px] text-gray-500 uppercase font-semibold">
                    Contributed
                  </span>
                </div>
              </Link>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF8F3] border border-[#E6E0D6]">
                <Library className="w-3.5 h-3.5 text-[#762F3D]" />
                <div className="text-left leading-none">
                  <span className="text-xs font-bold text-gray-900 block">
                    0
                  </span>
                  <span className="text-[9px] text-gray-500 uppercase font-semibold">
                    Borrows
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Row */}
        <div className="flex items-center gap-6 border-b border-[#E6E0D6] text-sm">
          <div className="pb-2.5 border-b-2 border-[#762F3D] font-bold text-[#762F3D] flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>Profile Details</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-[#E6E0D6] bg-white p-5 sm:p-7 shadow-xs">
          <div className="border-b border-[#E6E0D6] pb-3 mb-5">
            <h2 className="text-lg font-bold font-playfair text-[#762F3D]">
              Profile Information
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Update your name and profile picture.
            </p>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-5">
            {/* Photo Preview and URL Input */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E6E0D6]">
              <div className="w-14 h-14 rounded-xl border border-[#E6E0D6] relative overflow-hidden bg-white shrink-0">
                {currentPhoto ? (
                  <Image
                    src={currentPhoto}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#762F3D] text-white text-sm font-bold">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                )}
              </div>
              <div className="flex-1 w-full space-y-1">
                <label
                  htmlFor="image"
                  className="block text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Profile Photo URL
                </label>
                <Input
                  id="image"
                  name="image"
                  type="url"
                  value={currentPhoto}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="h-10 bg-white border-[#E6E0D6] text-sm rounded-xl focus-visible:ring-[#762F3D]/20 focus-visible:border-[#762F3D]"
                />
              </div>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1">
                <label
                  htmlFor="name"
                  className="block text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={user?.name || ""}
                  placeholder="Your Name"
                  required
                  className="h-10 bg-white border-[#E6E0D6] text-sm rounded-xl focus-visible:ring-[#762F3D]/20 focus-visible:border-[#762F3D]"
                />
              </div>

              {/* Email (Read-only) */}
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="h-10 bg-[#F5F2EA] border-[#E6E0D6] text-sm rounded-xl text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E6E0D6]">
              <Link
                href="/"
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
              >
                Cancel
              </Link>
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#762F3D] hover:bg-[#5e2530] text-white font-bold text-xs h-9 px-5 rounded-xl cursor-pointer flex items-center gap-2 shadow-xs transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{loading ? "Saving..." : "Save Changes"}</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
