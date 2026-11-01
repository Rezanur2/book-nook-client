import type { Metadata } from "next";
import { Josefin_Sans, Playfair } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
});

const playfair = Playfair({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "BookNook | A World Between Pages",
  description:
    "BookNook is a community-driven modern online library where readers can discover books, share their collection, and borrow their favorite reads effortlessly.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${josefinSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FBF9F4] text-[#292521]">
        <Navbar />
        <main>
          {children}
        </main> 
      </body>
    </html>
  );
}
