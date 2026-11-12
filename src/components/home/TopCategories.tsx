import React from "react";
import {
  BookOpen,
  Compass,
  Sparkles,
  Bookmark,
  Layers,
} from "lucide-react";
import CategoryCard from "./CategoryCard";

const categories = [
  {
    title: "Fiction & Novels",
    description: "Immersive storytelling, classic narratives, and award-winning literature from master authors.",
    icon: BookOpen,
    href: "/books?category=Fiction",
  },
  {
    title: "Science & Nature",
    description: "Fascinating breakthroughs, cosmic phenomena, and analytical explorations of the universe.",
    icon: Sparkles,
    href: "/books?category=Science",
  },
  {
    title: "History & Heritage",
    description: "Documented chronicles of ancient eras, cultural movements, and pivotal global history.",
    icon: Compass,
    href: "/books?category=History",
  },
  {
    title: "Kids & Young Minds",
    description: "Engaging picture books, inspiring moral tales, and fun adventures tailored for young readers.",
    icon: Bookmark,
    href: "/books?category=Kids",
  },
];

const TopCategories = () => {
  return (
    <section className="w-full bg-white py-16 sm:py-20 border-b border-[#E6E0D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#B76E59] uppercase mb-2 sm:mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Curated Shelves</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-playfair text-[#762F3D] tracking-tight">
            Top Categories.
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed mt-2 sm:mt-3">
            Explore dedicated aisles of classical prose, scientific inquiries, and rare chronicles preserved by our reading guild.
          </p>
        </div>

        {/* 4 Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.title}
              title={cat.title}
              description={cat.description}
              icon={cat.icon}
              href={cat.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
