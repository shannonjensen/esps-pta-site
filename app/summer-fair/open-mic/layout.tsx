import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Mic Sign-Up — ESPS Summer Fair",
  description:
    "Sign up to perform at the East Sheen Primary Summer Fair Open Mic, 5:15–6pm on Saturday 27 June. Singers, musicians and performers of all ages welcome!",
};

export default function OpenMicLayout({ children }: { children: React.ReactNode }) {
  return children;
}
