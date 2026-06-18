import type { Metadata } from "next";

const ogDescription =
  "Sign up to perform at the East Sheen Primary Summer Fair Open Mic, 5:15–6pm on Saturday 27 June. Singers, musicians and performers of all ages welcome!";

export const metadata: Metadata = {
  title: "Open Mic Sign-Up — ESPS Summer Fair",
  description: ogDescription,
  openGraph: {
    title: "Open Mic — ESPS Summer Fair 🎤",
    description: ogDescription,
    url: "https://www.espspta.org/summer-fair/open-mic",
    siteName: "ESPS PTA",
    type: "website",
    images: [
      {
        url: "https://www.espspta.org/open-mic-og.jpg",
        width: 1200,
        height: 630,
        alt: "Open Mic at the ESPS Summer Fair — Saturday 27 June, 5:15–6pm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Mic — ESPS Summer Fair 🎤",
    description: ogDescription,
    images: ["https://www.espspta.org/open-mic-og.jpg"],
  },
};

export default function OpenMicLayout({ children }: { children: React.ReactNode }) {
  return children;
}
