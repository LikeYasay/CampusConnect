"use client"
import Link from "next/link"

export default function CTASection() {
  return (
    <section className="bg-gradient-to-b from-[#8A252C] via-[#7a1e26] to-[#6a1822] border-t border-[#8A252C]/40 py-24 text-center relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="mx-auto max-w-3xl px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
          Ready to Join the Community?
        </h2>

        <p className="text-lg md:text-xl text-gray-100 mb-12 leading-relaxed font-medium max-w-2xl mx-auto">
          Be part of the largest student community at CIT-U. Help others, find your lost items, and make lasting
          connections.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            href="/register"
            className="w-full sm:w-auto rounded-lg bg-[#FFD700] px-10 py-4 text-base font-bold text-black shadow-xl hover:shadow-2xl hover:bg-yellow-300 transition-all transform hover:-translate-y-1 active:translate-y-0"
          >
            Join Community
          </Link>

          <Link
            href="/about"
            className="w-full sm:w-auto rounded-lg border-2 border-white px-10 py-4 text-base font-bold text-white hover:bg-white hover:text-[#8A252C] transition-all transform hover:-translate-y-1 active:translate-y-0"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}
