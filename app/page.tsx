// app/page.tsx (App Router with TypeScript)

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ESPS PTA - Coming Soon',
  description: 'ESPS PTA website coming soon',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="relative text-[#287cb4] text-3xl md:text-5xl font-bold text-center border-4 border-[#287cb4] p-8 md:p-12 mb-16 before:content-[''] before:absolute before:-top-3 before:-left-3 before:-right-3 before:-bottom-3 before:border-4 before:border-[#287cb4] before:-z-10">
        ESPS PTA
      </div>
      <div className="text-[#287cb4] text-xl md:text-2xl font-light text-center">
        Coming Soon
      </div>
    </main>
  )
}