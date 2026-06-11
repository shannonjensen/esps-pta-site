import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "London → Amsterdam Live Tracker | ESPS PTA",
  description:
    "Follow ESPS parents live as they cycle from London to Amsterdam for our school libraries.",
  // The page is unlisted for now — keep it out of search engines until the
  // ride is announced. Remove this to make it discoverable.
  robots: { index: false, follow: false },
};

export default function RideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
