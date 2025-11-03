"use client";
import Image from "next/image";

export default function OurTeamPage() {
  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-[400px]">
        {/* Background image */}
        <Image
          src="/Team.jpg"
          alt="Team Banner"
          fill
          className="object-cover"
          priority
        />

        {/* Gradient overlay (more natural than solid black) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />

        {/* Text content (above the overlay) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10">
          <h1 className="text-7xl md:text-8xl font-black drop-shadow-lg text-white">
            Meet <span className="text-[#FFD700]">Our</span>{" "}
            <span className="text-[#8A252C]">Team</span>
          </h1>
          <p className="text-lg md:text-2xl mt-2 drop-shadow-md">
            The talented developers behind Campus Connect
          </p>
        </div>
      </div>

      {/* Development Team Section */}
      <section className="text-center mt-16">
        <h2 className="text-[#8a252c] text-4xl md:text-5xl font-black">
          Our Development Team
        </h2>
        <p className="text-gray-700 text-lg mt-3 max-w-2xl mx-auto">
          Meet the passionate developers who bring Campus Connect to life with
          their expertise and dedication.
        </p>

        <div className="mt-10 flex flex-col md:flex-row justify-center gap-8 px-6">
          {/* Card 1 - Lichael */}
          <div className="bg-white border-2 border-gray-300 hover:border-[#8a252c] rounded-xl shadow-md p-6 w-full md:w-[360px] transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
            <div className="flex justify-center">
              <Image
                src="/nega.jpeg"
                alt="Lichael Yashua Ursulo"
                width={120}
                height={120}
                className="w-[120px] h-[120px] rounded-full border-4 border-[#ffffff] object-cover"
              />
            </div>
            <h3 className="text-[#8a252c] text-2xl font-bold mt-4">
              Lichael Yashua Ursulo
            </h3>
            <div className="bg-[#ffd700] rounded-lg inline-block px-4 py-1 mt-2">
              <p className="text-sm font-medium text-black">
                Front End Developer
              </p>
            </div>
            <p className="text-gray-600 text-sm mt-4">
              Specializes in React, Vue.js, and modern CSS frameworks. Creates
              beautiful, responsive user interfaces that provide exceptional
              user experiences.
            </p>

            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="px-3 py-1 rounded-full bg-[#e8f5e8] text-[#2d5016] text-xs font-medium">
                React
              </span>
              <span className="px-3 py-1 rounded-full bg-[#e8f5e8] text-[#2d5016] text-xs font-medium">
                Vue.js
              </span>
              <span className="px-3 py-1 rounded-full bg-[#e8f5e8] text-[#2d5016] text-xs font-medium">
                TypeScript
              </span>
              <span className="px-3 py-1 rounded-full bg-[#e8f5e8] text-[#2d5016] text-xs font-medium">
                Tailwind CSS
              </span>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <div className="bg-[#ffffff] p-2 rounded-lg cursor-pointer">
                <Image
                  src="/linkedin.png"
                  alt="LinkedIn"
                  width={20}
                  height={20}
                />
              </div>
              <div className="bg-[#ffffff] p-2 rounded-lg cursor-pointer">
                <Image src="/github.png" alt="GitHub" width={20} height={20} />
              </div>
            </div>
          </div>

          {/* Card 2 - Jay */}
          <div className="bg-white border-2 border-gray-300 hover:border-[#8a252c] rounded-xl shadow-md p-6 w-full md:w-[360px] transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
            <div className="flex justify-center">
              <Image
                src="/nega.jpeg"
                alt="Jay Yan Tiongzon"
                width={120}
                height={120}
                className="w-[120px] h-[120px] rounded-full border-4 border-[#ffffff] object-cover"
              />
            </div>
            <h3 className="text-[#8a252c] text-2xl font-bold mt-4">
              Jay Yan Tiongzon
            </h3>
            <div className="bg-[#ffd700] rounded-lg inline-block px-4 py-1 mt-2">
              <p className="text-sm font-medium text-black">
                Back End Developer
              </p>
            </div>
            <p className="text-gray-600 text-sm mt-4">
              Expert in Node.js, Python, and database architecture. Builds
              robust, scalable server-side applications and APIs that power our
              platform.
            </p>

            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="px-3 py-1 rounded-full bg-[#d1ecf1] text-[#0c5460] text-xs font-medium">
                Node.js
              </span>
              <span className="px-3 py-1 rounded-full bg-[#d1ecf1] text-[#0c5460] text-xs font-medium">
                Python
              </span>
              <span className="px-3 py-1 rounded-full bg-[#d1ecf1] text-[#0c5460] text-xs font-medium">
                MongoDB
              </span>
              <span className="px-3 py-1 rounded-full bg-[#d1ecf1] text-[#0c5460] text-xs font-medium">
                PostgreSQL
              </span>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <div className="bg-[#ffffff] p-2 rounded-lg cursor-pointer">
                <Image
                  src="/linkedin.png"
                  alt="LinkedIn"
                  width={20}
                  height={20}
                />
              </div>
              <div className="bg-[#ffffff] p-2 rounded-lg cursor-pointer">
                <Image src="/github.png" alt="GitHub" width={20} height={20} />
              </div>
            </div>
          </div>

          {/* Card 3 - Treasure */}
          <div className="bg-white border-2 border-gray-300 hover:border-[#8a252c] rounded-xl shadow-md p-6 w-full md:w-[360px] transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
            <div className="flex justify-center">
              <Image
                src="/nega.jpeg"
                alt="Treasure Louise Abadinas"
                width={120}
                height={120}
                className="w-[120px] h-[120px] rounded-full border-4 border-[#ffffff] object-cover"
              />
            </div>
            <h3 className="text-[#8a252c] text-2xl font-bold mt-4">
              Treasure Louis Abadinas
            </h3>
            <div className="bg-[#ffd700] rounded-lg inline-block px-4 py-1 mt-2">
              <p className="text-sm font-medium text-black">UI/UX Designer</p>
            </div>
            <p className="text-gray-600 text-sm mt-4">
              Creates intuitive and engaging user experiences through thoughtful
              design. Specializes in user research, wireframing, and visual
              design systems.
            </p>

            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="px-3 py-1 rounded-full bg-[#ffe4e1] text-[#8a252c] text-xs font-medium">
                Figma
              </span>
              <span className="px-3 py-1 rounded-full bg-[#ffe4e1] text-[#8a252c] text-xs font-medium">
                Adobe XD
              </span>
              <span className="px-3 py-1 rounded-full bg-[#ffe4e1] text-[#8a252c] text-xs font-medium">
                Sketch
              </span>
              <span className="px-3 py-1 rounded-full bg-[#ffe4e1] text-[#8a252c] text-xs font-medium">
                Prototyping
              </span>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <div className="bg-[#ffffff] p-2 rounded-lg cursor-pointer">
                <Image
                  src="/linkedin.png"
                  alt="LinkedIn"
                  width={20}
                  height={20}
                />
              </div>
              <div className="bg-[#ffffff] p-2 rounded-lg cursor-pointer">
                <Image src="/github.png" alt="GitHub" width={20} height={20} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Built Section */}
      <section className="bg-[#f8f9fa] text-center py-16 mt-20">
        <h2
          id="why-we-built"
          className="text-[#8a252c] text-4xl md:text-5xl font-bold"
        >
          Why We Built Campus Connect
        </h2>
        <p className="text-gray-600 text-lg mt-4 max-w-3xl mx-auto">
          Our team is passionate about creating technology that brings people
          together and solves real problems in the campus community.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-8 mt-12 px-6">
          <div className="bg-white rounded-xl shadow p-8 w-full md:w-[360px]">
            <div className="bg-[#8a252c] rounded-xl w-14 h-14 flex items-center justify-center mx-auto mb-4">
              <span className="text-[#8a252c] text-2xl">😊</span>
            </div>
            <h3 className="text-[#8a252c] text-xl font-bold">
              User-Centered Design
            </h3>
            <p className="text-gray-600 text-sm mt-3">
              We prioritize user experience in every decision, ensuring our
              platform is intuitive and accessible for all students.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-8 w-full md:w-[360px]">
            <div className="bg-[#8a252c] rounded-xl w-14 h-14 flex items-center justify-center mx-auto mb-4">
              <span className="text-[#8a252c] text-2xl">⭐</span>
            </div>
            <h3 className="text-[#8a252c] text-xl font-bold">Quality First</h3>
            <p className="text-gray-600 text-sm mt-3">
              We maintain high standards in code quality, performance, and
              reliability to deliver the best possible experience.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-8 w-full md:w-[360px]">
            <div className="bg-[#8a252c] rounded-xl w-14 h-14 flex items-center justify-center mx-auto mb-4">
              <span className="text-[#8a252c] text-2xl">🤝</span>
            </div>
            <h3 className="text-[#8a252c] text-xl font-bold">
              Community Impact
            </h3>
            <p className="text-gray-600 text-sm mt-3">
              Our goal is to strengthen campus connections and help students
              succeed through better communication and collaboration.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
