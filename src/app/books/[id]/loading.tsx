import { Spinner } from "@/components/ui/spinner";
import { BookOpen } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[75vh] bg-[#FAF8F3] flex flex-col items-center justify-center gap-3.5">
      <div className="relative flex items-center justify-center">
        <Spinner className="size-10 text-[#762F3D]" />
        <BookOpen className="w-4 h-4 text-[#B76E59] absolute animate-pulse" />
      </div>
      <span className="text-xs font-semibold text-gray-500 tracking-widest font-josefin uppercase">
        Loading book details...
      </span>
    </div>
  );
}
