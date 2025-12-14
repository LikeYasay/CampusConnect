"use client"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative min-h-[60vh] md:h-[520px] flex items-center justify-center text-center">
      <Image src="/CIT-LIB.jpg" alt="CIT-U Library" fill className="object-cover -z-20" priority />
      <div className="absolute inset-0 bg-black/45 -z-10" />

      <div className="px-4 sm:px-6">
        <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-wide drop-shadow-md">
          CIT-U CAMPUS CONNECT
        </h1>

        <p className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold mt-3">
          <span className="text-[#8a252c]">FIND.</span>{" "}
          <span className="text-[#ffd700]">CONNECT.</span>{" "}
          <span className="text-white">SHARE.</span>
        </p>

        <p className="text-white/95 text-base sm:text-lg md:text-xl mt-3 sm:mt-4 max-w-3xl mx-auto">
          Your all-in-one hub for lost & found and student forums.
        </p>

        <div className="mt-5 sm:mt-6 flex flex-wrap justify-center gap-3 sm:gap-4">
          <button className="bg-[#ffd700] text-black font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow hover:opacity-90">
            FIND LOST ITEMS
          </button>
          <button className="bg-[#ffd700] text-black font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow hover:opacity-90">
            START A DISCUSSION
          </button>
          <button className="bg-[#ffd700] text-black font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow hover:opacity-90">
            REPORT AN ITEM
          </button>
        </div>
      </div>
    </section>
  )
}
