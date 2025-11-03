"use client";

import Image from "next/image";

export default function LostAndFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* ─── HERO SECTION ─────────────────────── */}
      <section className="relative w-full h-[550px] flex flex-col items-center justify-center text-center overflow-hidden">
        <Image
          src="/CIT_GLE_HALLWAY.jpg"
          alt="CIT-U Hallway"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10">
          <h1 className="text-9xl font-extrabold">
            <span className="text-[#FFD700]">Lost</span>
            <span className="text-white"> &amp; </span>
            <span className="text-[#8A252C]">Found</span>
          </h1>
          <p className="text-lg md:text-2xl text-white mt-3">
            Help reunite items with their owners
          </p>

          <div className="flex justify-center gap-10 mt-8 text-white">
            <div className="text-center">
              <p className="text-4xl font-bold text-[#FFD700]">2,134</p>
              <p className="text-sm">Community Members</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#FFD700]">156</p>
              <p className="text-sm">Online Now</p>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-10">
            <button className="bg-[#FFD700] text-black font-semibold px-8 py-3 rounded-lg shadow-md hover:opacity-90">
              REPORT ITEM
            </button>
            <button className="bg-[#FFD700] text-black font-semibold px-8 py-3 rounded-lg shadow-md hover:opacity-90">
              BROWSE ITEM
            </button>
          </div>
        </div>
      </section>

      {/* ─── STAT CARDS ───────────────────────── */}
      {/* ─── STAT CARDS ───────────────────────── */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-20 px-8">
        {[
          { icon: "🔍", label: "Items Found", count: "3,456" },
          { icon: "🧑", label: "Active Members", count: "2,134" },
          { icon: "💬", label: "Online Now", count: "156" },
          { icon: "📦", label: "Items Reported", count: "47" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-2xl shadow-md p-10 text-center transform transition hover:scale-105"
          >
            <div className="w-24 h-24 mx-auto flex items-center justify-center rounded-full bg-[#8A252C] text-5xl">
              <span className="text-[#FFD700]">{stat.icon}</span>
            </div>
            <p className="text-4xl font-extrabold text-[#8A252C] mt-6">
              {stat.count}
            </p>
            <p className="text-base mt-2 font-medium text-gray-700">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      {/* ─── SEARCH + FILTER ───────────────────── */}
      <section className="max-w-7xl mx-auto mt-16 px-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex-1 flex items-center border border-gray-300 rounded-xl px-4 py-2 bg-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-gray-500 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M16.65 10.35A6.3 6.3 0 1110.35 4a6.3 6.3 0 016.3 6.35z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search items, locations..."
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>

          <select className="border border-gray-300 rounded-xl px-4 py-2 bg-gray-50">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Bags</option>
            <option>Personal Items</option>
          </select>

          <select className="border border-gray-300 rounded-xl px-4 py-2 bg-gray-50">
            <option>All Status</option>
            <option>Lost</option>
            <option>Found</option>
          </select>

          <button className="bg-[#FFD700] text-black font-semibold px-6 py-2 rounded-xl shadow hover:opacity-90">
            Report Item
          </button>
        </div>

        <div className="flex items-center gap-4 mt-6">
          <button className="bg-[#8A252C] text-white px-4 py-2 rounded-lg text-sm font-medium">
            Recent
          </button>
          <button className="bg-gray-100 text-black px-4 py-2 rounded-lg text-sm font-medium">
            Urgent
          </button>
          <p className="ml-auto text-sm text-gray-600">6 items found</p>
        </div>
      </section>

      {/* ─── ITEMS LIST ───────────────────────── */}
      <section className="max-w-7xl mx-auto mt-10 px-6 space-y-6">
        {[
          {
            status: "LOST",
            category: "Electronics",
            title: "Black iPhone 14 Pro",
            location: "Library 3rd Floor",
            time: "2 hours ago",
            description:
              "Black iPhone 14 Pro with cracked screen protector. Has a red case.",
            image: "/Iphone-14.jpeg",
          },
          {
            status: "FOUND",
            category: "Personal Items",
            title: "Black CIT-U ID Lace",
            location: "Engineering Building",
            time: "4 hours ago",
            description:
              "Black lanyard with CIT-U logo, found near the entrance.",
            image: "/lanyard.jpg",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-6 flex gap-6 shadow-sm hover:shadow-md transition"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={100}
              height={100}
              className="rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex gap-2 mb-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === "LOST"
                      ? "bg-[#FFE4E1] text-[#8A252C]"
                      : "bg-[#E8F5E8] text-[#2D5016]"
                  }`}
                >
                  {item.status}
                </span>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                  {item.category}
                </span>
              </div>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-sm text-gray-600">
                {item.location} • {item.time}
              </p>
              <p className="mt-2 text-gray-700 text-sm">{item.description}</p>
              <div className="flex gap-3 mt-4">
                <button className="bg-[#8A252C] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90">
                  View Details
                </button>
                <button className="border border-[#8A252C] text-[#8A252C] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#8A252C]/10">
                  Contact Owner
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ─── TIPS FOR SUCCESS ─────────────────── */}
      <section className="bg-gray-50 py-20 mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-center text-2xl md:text-3xl font-extrabold text-[#8A252C] mb-10">
            Tips for Success
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🔍",
                title: "Be Detailed",
                text: "Provide specific descriptions, colors, brands, and distinguishing features to help identify items.",
              },
              {
                icon: "⚡",
                title: "Act Quickly",
                text: "Report lost or found items as soon as possible to increase chances of successful reunification.",
              },
              {
                icon: "💬",
                title: "Stay Connected",
                text: "Check back regularly and respond promptly to messages from potential matches.",
              },
            ].map((tip, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm p-8 text-center"
              >
                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-[#FFD700] text-3xl text-[#8A252C]">
                  {tip.icon}
                </div>
                <h3 className="text-lg font-bold mt-4">{tip.title}</h3>
                <p className="text-sm text-gray-700 mt-2">{tip.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
