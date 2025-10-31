"use client";

import Image from "next/image";

export default function StudentForumPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* ─── HERO SECTION ─────────────────────── */}
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
          <h1 className="text-8xl md:text-9xl font-extrabold">
            <span className="text-[#FFD700]">Student</span>{" "}
            <span className="text-[#8A252C]">Forum</span>
          </h1>
          <p className="text-lg md:text-2xl text-white mt-3">
            Connect, discuss, and share knowledge with your fellow Wildcats
          </p>

          <div className="flex flex-wrap justify-center gap-10 mt-8 text-white">
            <div className="text-center">
              <p className="text-4xl font-bold text-[#FFD700]">3,456</p>
              <p className="text-sm">Active Discussions</p>
            </div>
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
              START DISCUSSION
            </button>
            <button className="bg-[#FFD700] text-black font-semibold px-8 py-3 rounded-lg shadow-md hover:opacity-90">
              BROWSE TOPIC
            </button>
          </div>
        </div>
      </section>

      {/* ─── STAT CARDS ───────────────────────── */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-20 px-8">
        {[
          { icon: "💬", label: "Total Discussions", count: "3,456" },
          { icon: "🧑", label: "Active Members", count: "2,134" },
          { icon: "🌐", label: "Online Now", count: "156" },
          { icon: "📝", label: "Today's Posts", count: "47" },
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

      {/* ─── SEARCH + CATEGORIES ───────────────── */}
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
              placeholder="Search discussions, topics, or users..."
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>

          <button className="bg-[#FFD700] text-black font-semibold px-6 py-2 rounded-xl shadow hover:opacity-90">
            + New Discussion
          </button>
        </div>

        <div className="flex items-center gap-4 mt-6 flex-wrap">
          {[
            "All",
            "Academic",
            "Events",
            "General",
            "Lost & Found",
            "Tech",
            "Sports",
          ].map((cat, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                i === 0
                  ? "bg-[#8A252C] text-white"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ─── DISCUSSIONS + SIDEBAR ─────────────── */}
      <section className="max-w-7xl mx-auto mt-16 px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {[
            {
              tag: "Academic",
              color: "#8A252C",
              user: "Maria Santos",
              title: "Looking for study group for Data Structures",
              time: "1 hour ago",
              content:
                "I'm struggling with some concepts in Data Structures and would love to form a study group. Anyone interested in meeting up this week?",
              replies: "12",
              likes: "24",
              hashtags: ["#study-group", "#data-structures", "#computer-science"],
            },
            {
              tag: "Events",
              color: "#FFD700",
              user: "John Dela Cruz",
              title: "Anyone going to the basketball game tonight?",
              time: "3 hours ago",
              content:
                "The Wildcats are playing tonight at 7 PM! Looking for people to go with. Let me know if you're interested!",
              replies: "8",
              likes: "18",
              hashtags: ["#basketball", "#sports", "#wildcats"],
            },
            {
              tag: "General",
              color: "#8A252C",
              user: "Sarah Kim",
              title: "Best places to eat near campus?",
              time: "5 hours ago",
              content:
                "New student here! What are your favorite restaurants and food spots around CIT-U? Looking for budget-friendly options.",
              replies: "24",
              likes: "45",
              hashtags: ["#food", "#restaurants", "#budget"],
            },
          ].map((post, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <span
                  className="px-3 py-1 text-xs font-bold uppercase rounded-full text-white"
                  style={{ backgroundColor: post.color }}
                >
                  {post.tag}
                </span>
                <span className="text-sm text-gray-600">{post.time}</span>
              </div>
              <h2 className="text-xl font-bold mt-4">{post.title}</h2>
              <p className="mt-2 text-gray-700 text-sm">{post.content}</p>
              <p className="mt-4 text-sm text-gray-600">
                by{" "}
                <span className="font-bold text-[#8A252C]">{post.user}</span> •{" "}
                {post.replies} replies •{" "}
                <span className="text-yellow-500">{post.likes} likes</span>
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {post.hashtags.map((tag, j) => (
                  <span
                    key={j}
                    className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button className="bg-[#8A252C] text-white px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90">
                  Join Discussion
                </button>
                <button className="border border-[#8A252C] text-[#8A252C] px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#8A252C]/10">
                  Share
                </button>
              </div>
            </div>
          ))}
          <div className="text-center">
            <button className="border-2 border-[#8A252C] text-[#8A252C] font-bold px-6 py-3 rounded-xl hover:bg-[#8A252C] hover:text-white transition">
              Load More Discussions
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="space-y-8">
          {/* Trending Topics */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold mb-4">🔥 Trending Topics</h3>
            <ul className="space-y-3">
              {[
                "#DataStructures",
                "#WildcatsBasketball",
                "#CampusFood",
                "#StudyGroups",
                "#TechClub",
                "#SoftwareEngineering",
              ].map((topic, i) => (
                <li
                  key={i}
                  className="bg-gray-100 p-3 rounded-lg flex justify-between items-center hover:bg-gray-200 transition"
                >
                  <span className="font-bold">{topic}</span>
                  <span className="text-sm text-gray-500">#{i + 1}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Contributors */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-[#8A252C] mb-4">🏆 Top Contributors</h3>
            {[
              { name: "John Dela Cruz", posts: "234", medal: "🥇" },
              { name: "Maria Santos", posts: "189", medal: "🥈" },
              { name: "Anna Chen", posts: "156", medal: "🥉" },
            ].map((user, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-3 rounded-lg mb-2 ${
                  i === 0 ? "bg-gradient-to-r from-yellow-500 to-[#FFD700]" : "bg-gray-50"
                }`}
              >
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-600">
                    {user.posts} helpful posts
                  </p>
                </div>
                <span className="text-2xl">{user.medal}</span>
              </div>
            ))}
          </div>

          {/* Community Guidelines */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-[#8A252C] mb-4">
              📋 Community Guidelines
            </h3>
            <ul className="space-y-3 text-gray-700 text-sm">
              <li>1️⃣ Be respectful and constructive in all discussions</li>
              <li>2️⃣ Use appropriate categories and tags</li>
              <li>3️⃣ No spam, harassment, or inappropriate content</li>
              <li>4️⃣ Help maintain a positive learning environment</li>
            </ul>
          </div>
        </aside>
      </section>

      {/* ─── TIPS FOR SUCCESS ─────────────────── */}
      <section className="bg-gray-50 py-20 mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-center text-2xl md:text-3xl font-extrabold text-[#8A252C] mb-10">
            Tips for Better Discussions
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "💬",
                title: "Engage Thoughtfully",
                text: "Contribute meaningfully to conversations and encourage others’ ideas.",
              },
              {
                icon: "📚",
                title: "Stay On-Topic",
                text: "Keep discussions focused on relevant subjects and avoid off-topic content.",
              },
              {
                icon: "🤝",
                title: "Be Supportive",
                text: "Foster a welcoming environment where everyone feels heard and respected.",
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
