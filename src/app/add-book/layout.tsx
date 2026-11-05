import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookNook | Add Book",
  description: "Contribute a new book to the BookNook library collection.",
};

export default function AddBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
