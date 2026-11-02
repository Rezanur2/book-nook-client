import React from "react";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

export interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
}

const CategoryCard = ({
  title,
  description,
  icon: Icon,
  href = "/books",
}: CategoryCardProps) => {
  return (
    <Link
      href={href}
      className="group p-6 rounded-2xl bg-[#FAF8F3] border border-[#E6E0D6] hover:border-[#762F3D]/30 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
    >
      <div>
        <div className="w-12 h-12 rounded-xl bg-[#F0EDE5] text-[#762F3D] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="font-playfair text-xl font-bold text-gray-900 group-hover:text-[#762F3D] transition-colors mb-1.5">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="mt-6 pt-3 border-t border-[#E6E0D6]/60 flex items-center justify-between text-xs font-semibold text-[#B76E59]">
        <span>Browse Shelf</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};

export default CategoryCard;
