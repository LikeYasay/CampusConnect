import Image from "next/image";
import { useRouter } from 'next/navigation';
import { getToken } from "@/lib/auth";

interface HeroSectionProps {
  totalDiscussions: number;
  activeMembers: number | null;
  onlineNow: number | null;
}

export function HeroSection({ totalDiscussions, activeMembers, onlineNow }: HeroSectionProps) {
  const router = useRouter();

  return (
    <section className="relative w-full h-[550px] flex flex-col items-center justify-center text-center overflow-hidden">
      <Image 
        src="/CIT_GLE-STAIRCASE.jpg" 
        alt="CIT-U Staircase" 
        fill 
        className="object-cover" 
        priority 
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 px-6">
        <h1 className="text-6xl md:text-9xl font-extrabold tracking-tight">
          <span className="text-[#FFD700]">Student</span>{" "}
          <span className="text-white">&amp;</span>{" "}
          <span className="text-[#8A252C]">Forum</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 mt-4 max-w-2xl mx-auto">
          Connect, discuss, and share knowledge with your fellow Wildcats.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <button
            onClick={() => {
              if (getToken()) {
                router.push("/forum/create-discussion");
              } else {
                router.push("/login");
              }
            }}
            className="bg-[#FFD700] text-black font-bold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-400 transition transform hover:-translate-y-1"
          >
            START DISCUSSION
          </button>
          <button
            onClick={() =>
              document.getElementById("browse-section")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:bg-white/20 transition transform hover:-translate-y-1"
          >
            BROWSE TOPICS
          </button>
        </div>
      </div>
    </section>
  );
}