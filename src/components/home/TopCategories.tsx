import React from "react";
import {
  BookOpen,
  Compass,
  Sparkles,
  Bookmark,
  Palette,
  Layers,
} from "lucide-react";
import CategoryCard from "./CategoryCard";

const categories = [
  {
    title: "Fiction & Classics",
    description: "Timeless literature, historical prose, and unforgettable storytelling from master authors.",
    icon: BookOpen,
  },
  {
    title: "History & Archives",
    description: "Ancient chronicles, medieval folios, and profound documentary records of humanity.",
    icon: Compass,
  },
  {
    title: "Science & Cosmos",
    description: "Astronomical journeys, quantum wonders, and insightful inquiries into natural laws.",
    icon: Sparkles,
  },
  {
    title: "Philosophy & Ethics",
    description: "Foundational meditations, moral discourse, and timeless philosophical wisdom.",
    icon: Bookmark,
  },
  {
    title: "Art & Poetry",
    description: "Illustrated collections, poetic anthologies, and aesthetics of the written craft.",
    icon: Palette,
  },
  {
    title: "Memoirs & Biographies",
    description: "Intimate life journeys, extraordinary memoirs, and letters of historic figures.",
    icon: Layers,
  },
];

const TopCategories = () => {
  return (
    <section className="w-full bg-white py-16 sm:py-20 border-b border-[#E6E0D6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.title}
              title={cat.title}
              description={cat.description}
              icon={cat.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
