import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Short, shareable link for the Creative IQ robotics booking page.
        source: "/robotics-workshop",
        destination:
          "https://activities.bookpebble.co.uk/activity/creative-iq-robotics-workshop-east-sheen-primary-school-london-5dc0afa2-dbae-416b-989c-e085f7587cf4",
        permanent: false, // 307 — easy to repoint if the booking URL changes
      },
    ];
  },
};

export default nextConfig;
