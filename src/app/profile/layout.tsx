import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookNook | Profile",
  description: "View and manage your BookNook reader profile.",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
