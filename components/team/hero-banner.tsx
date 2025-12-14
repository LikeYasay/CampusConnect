import Image from "next/image"

export function HeroBanner() {
  return (
    <div className="relative w-full h-[400px]">
      <Image src="/Team.jpg" alt="Team Banner" fill className="object-cover" priority />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10">
        <h1 className="text-7xl md:text-8xl font-black drop-shadow-lg text-white">
          Meet <span className="text-[#FFD700]">Our</span> <span className="text-[#8A252C]">Team</span>
        </h1>
        <p className="text-lg md:text-2xl mt-2 drop-shadow-md">The talented developers behind Campus Connect</p>
      </div>
    </div>
  )
}
