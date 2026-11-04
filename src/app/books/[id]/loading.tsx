import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-[85vh]">
      <Spinner className="size-8 text-[#762F3D]" />
    </div>
  );
}
