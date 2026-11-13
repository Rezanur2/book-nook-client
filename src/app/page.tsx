import type { Metadata } from "next";
import Banner from "@/components/home/Banner";
import NewArrivals from "@/components/home/NewArrivals";
import HowBorrowingWorks from "@/components/home/HowBorrowingWorks";
import TopCategories from "@/components/home/TopCategories";
import JoinCommunity from "@/components/home/JoinCommunity";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "BookNook | Home",
  description:
    "A small online library where readers can discover books, borrow editions, and share their collection.",
};

export default function Home() {
  return (
    <div className="space-y-0">
      <Banner />
      <NewArrivals />
      <HowBorrowingWorks />
      <TopCategories />
      <JoinCommunity />
    </div>
  );
}
