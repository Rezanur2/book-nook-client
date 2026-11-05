import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookNook | My Books",
  description: "View and manage the books you have contributed to the BookNook library.",
};

export default function MyBooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
