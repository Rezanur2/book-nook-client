import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="min-h-[70vh] bg-[#FAF8F3] flex flex-col items-center justify-center gap-3">
      <Spinner className="size-8 text-[#762F3D]" />
      <span className="text-xs font-semibold text-gray-500 tracking-wide font-josefin">
        Loading your collection...
      </span>
    </div>
  );
}
