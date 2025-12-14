"use client"

import { useState, useMemo, useCallback } from "react"

type T = {
  name: string
  subtitle: string 
  quote: string
}

const DATA: T[] = [
  {
    name: "Lichael Ursulo",
    subtitle: "BS Information Technology",
    quote:
      "I reported my lost ID and got matched with a post within the hour. The alerts made it effortless to coordinate and get it back.",
  },
  {
    name: "Jay Tiongzon",
    subtitle: "BS Computer Science",
    quote:
      "The forum helped me find study buddies fast. Threads move quickly and the notifications keep me in the loop.",
  },
  {
    name: "Treasure Abadinas",
    subtitle: "BS Business Administration",
    quote:
      "I found my umbrella the same day thanks to quick responses and the Lost & Found board. Love how simple the flow is!",
  },
]

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const total = DATA.length

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total])
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total])

  const active = DATA[index]

  const initials = useMemo(() => {
    return active.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0]!.toUpperCase())
      .join("")
  }, [active.name])

  return (
    <section className="py-12 sm:py-16">
      <div
        className="relative mx-auto max-w-4xl rounded-2xl bg-[#f8f9fa] px-5 sm:px-6 py-8 sm:py-10 shadow"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") next()
          if (e.key === "ArrowLeft") prev()
        }}
        tabIndex={0}
        aria-roledescription="carousel"
      >
        <div className="mx-auto grid place-items-center text-center transition-all duration-300">
          <div className="grid h-16 w-16 sm:h-20 sm:w-20 place-items-center rounded-full border-4 border-[#ffd700] bg-[#8a252c] text-white text-xl sm:text-2xl font-bold">
            {initials}
          </div>

          <p className="mt-3 sm:mt-4 text-lg sm:text-xl font-bold text-[#8a252c]">{active.name}</p>
          <p className="text-[#666] text-sm sm:text-base">{active.subtitle}</p>

          <p className="mt-3 max-w-2xl px-2 text-sm sm:text-base text-black/75">“{active.quote}”</p>

          <div className="mt-4 flex gap-2" aria-label="Select testimonial">
            {DATA.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full transition ${i === index ? "bg-[#8a252c]" : "bg-gray-300"}`}
                aria-label={`Slide ${i + 1}`}
                aria-current={i === index}
              />
            ))}
          </div>
        </div>

        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow hover:bg-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#8a252c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow hover:bg-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="#8a252c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  )
}
