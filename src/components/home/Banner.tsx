"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ArrowLeft, ArrowRight } from "lucide-react";
import BannerSlide from "./BannerSlide";

import "swiper/css";
import { ISlide } from "@/types/slide.type";

const slides: ISlide[] = [
  {
    id: 1,
    pill: "Antiquarian Lending Guild • Sanctuary of Curiosity",
    title: "Every Book Opens a New World.",
    description:
      "Discover captivating stories and timeless prose from our collection. Borrow freely, read deeply, and explore literature preserved by readers.",
    tag: "RARE INSCRIPTION",
    bookTitle: "The Secret History",
    bookAuthor: "Donna Tartt • First Edition",
    feature: "Preserved in Archival Vellum",
    lentCount: "Lent out 38 times",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    pill: "Curated Archives • History & Heritage",
    title: "Your Next Favorite Book Awaits.",
    description:
      "Explore handpicked historical chronicles, philosophy, and memoirs. Discover treasures preserved in our community archives.",
    tag: "COMMUNITY FAVORITE",
    bookTitle: "A Distant Mirror",
    bookAuthor: "Barbara W. Tuchman • Classic",
    feature: "Archival Cloth Binding",
    lentCount: "Lent out 52 times",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    pill: "Community Repository • Cosmic Wisdom",
    title: "Read More. Share More. Connect.",
    description:
      "Join fellow book lovers cataloging their favorite editions. Together, we are building an open sanctuary for knowledge and curiosity.",
    tag: "GUILD CHOICE",
    bookTitle: "Cosmos",
    bookAuthor: "Carl Sagan • Illustrated Edition",
    feature: "Gold Foil Embossed Edition",
    lentCount: "Lent out 44 times",
    rating: "5.0",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
  },
];

const arrowBtnClass =
  "w-8 h-8 rounded-lg bg-[#F0EDE5] hover:bg-[#E6E0D6] text-gray-800 flex items-center justify-center transition-colors cursor-pointer";

const Banner = () => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full bg-[#FAF8F3] border-b border-[#E6E0D6] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-5 sm:pt-6 sm:pb-6">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          slidesPerView={1}
          spaceBetween={24}
          loop={true}
          observer={true}
          observeParents={true}
          resizeObserver={true}
          onSwiper={setSwiper}
          onSlideChange={(s) => setActiveIndex(s.realIndex)}
          className="w-full overflow-hidden"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="w-full select-none">
              <BannerSlide slide={slide} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Dot/Pill Navigation Bar */}
        <div className="mt-3 pt-3 border-t border-[#E6E0D6] flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 shrink-0">
            SLIDE{" "}
            <strong className="text-gray-900 text-sm">
              0{activeIndex + 1}
            </strong>{" "}
            / 03
          </span>

          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => swiper?.slideToLoop(idx)}
                className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                  activeIndex === idx
                    ? "w-7 bg-[#762F3D]"
                    : "w-2 bg-[#D1C9BE] hover:bg-[#B76E59]"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="hidden sm:flex items-center space-x-1.5 shrink-0">
            <button
              type="button"
              onClick={() => swiper?.slidePrev()}
              className={arrowBtnClass}
              aria-label="Previous slide"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => swiper?.slideNext()}
              className={arrowBtnClass}
              aria-label="Next slide"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
