"use client"
import Image from "next/image"

export default function ContactHero() {
  return (
    <div className="relative w-full h-[420px] overflow-hidden">
      <Image src="/CIT_GLE-POV.jpg" alt="CIT_GLE-POV" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10">
        <h1 className="text-6xl md:text-7xl font-black drop-shadow-lg">
          Get in <span className="text-[#FFD700]">Touch</span> with{" "}
          <span className="text-[#8A252C]">Us</span>
        </h1>
        <p className="text-lg md:text-2xl mt-3 drop-shadow-md max-w-2xl">
          We’d love to hear from you — whether it’s feedback, inquiries, or partnership opportunities.
        </p>
      </div>
    </div>
  )
}
