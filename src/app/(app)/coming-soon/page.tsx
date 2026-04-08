import type { Metadata } from "next";
import { ComingSoonPage } from "@/app/components/shared/coming-soon-page";

export const metadata: Metadata = {
  title: "Coming Soon",
  description: "This page is not live yet. Explore the image tools that are already available.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <ComingSoonPage />;
}
