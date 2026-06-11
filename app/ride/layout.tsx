import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "London → Amsterdam Live Tracker | ESPS PTA",
  description:
    "Follow ESPS parents live as they cycle from London to Amsterdam for our school libraries.",
};

export default function RideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
