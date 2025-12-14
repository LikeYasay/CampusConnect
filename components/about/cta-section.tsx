"use client"
import Link from "next/link"

export default function CTASection() {
  return (
    <section className="bg-[#f8f9fa] py-12 sm:py-16 text-center">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-[#8a252c]">Ready to Join the Community?</h2>

        <p className="mt-3 text-base sm:text-lg md:text-xl">
          Be part of the largest student community at CIT-U. Help others, find your lost items,
          and make lasting connections.
        </p>

        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/register"
            className="rounded-xl bg-[#ffd700] px-5 sm:px-6 py-3 text-base sm:text-lg font-bold text-black shadow hover:opacity-90"
          >
            Join Community
          </Link>

          <Link
            href="/#why-choose"
            className="rounded-xl border-2 border-black px-5 sm:px-6 py-2.5 sm:py-3 text-base sm:text-lg font-bold hover:bg-black hover:text-white transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}
