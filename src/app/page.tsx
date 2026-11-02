import Banner from "@/components/home/Banner";
import NewArrivals from "@/components/home/NewArrivals";
import HowBorrowingWorks from "@/components/home/HowBorrowingWorks";
import TopCategories from "@/components/home/TopCategories";
import JoinCommunity from "@/components/home/JoinCommunity";

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
