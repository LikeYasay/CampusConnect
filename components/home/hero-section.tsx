"use client"

import Image from "next/image"
import StatsSection from "./stats-section"

interface Props {
  stats: { value: string; label: string; color: string }[]
}

export default function HeroSection({ stats }: Props) {
  return (
    <section className="relative w-full flex flex-col mb-24">
      {/* BACKGROUND IMAGE - Fixed Height 550px */}
      <div className="relative w-full h-[550px] flex flex-col items-center justify-center text-center overflow-visible">
        <Image src="/CIT_GLE-POV.jpg" alt="CIT-U campus" fill priority className="object-cover" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/50 to-black/65" />

        {/* HERO TEXT CONTENT */}
        <div className="relative z-10 px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 drop-shadow-lg text-white leading-none">
            <span>Welcome, </span>
            <span className="text-[#FFD700] block md:inline">Wildcat!</span>
          </h1>

          <p className="text-base md:text-xl text-gray-50 font-medium drop-shadow-md max-w-2xl mx-auto leading-relaxed">
            Your central hub to connect, find lost items, and share knowledge with the campus community.
          </p>
        </div>

        {/* OVERLAPPING STATS SECTION */}
        <div className="absolute -bottom-16 w-full z-20">
          <StatsSection stats={stats} />
        </div>
      </div>
    </section>
  )
}
