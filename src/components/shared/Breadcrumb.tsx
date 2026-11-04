import React from "react";
import Link from "next/link";
import { Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-xs font-medium text-gray-500"
    >
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 hover:text-[#762F3D] transition-colors"
      >
        <Home className="w-3.5 h-3.5 shrink-0 -translate-y-px text-gray-500" />
        <span>Home</span>
      </Link>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <span className="text-gray-400 select-none">/</span>
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-[#762F3D] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#762F3D] font-bold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
