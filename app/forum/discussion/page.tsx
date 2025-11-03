"use client";

import Link from "next/link";
import Image from "next/image";

export default function DiscussionPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* ─── BACK TO FORUM ───────────────────────────── */}
      <div className="max-w-7xl mx-auto w-full mt-8 px-6 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
          strokeWidth={2}
          stroke="#8A252C"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12.5 15L7.5 10l5-5"
          />
        </svg>
        <Link
          href="/forum"
          className="text-base font-medium text-[#8A252C] hover:underline"
        >
          Back to Forum
        </Link>
      </div>

      {/* ─── MAIN CONTENT ───────────────────────────── */}
      <main className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-8 mt-6 mb-20 px-6">
        {/* LEFT SECTION – MAIN DISCUSSION */}
        <div className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-md p-8">
          {/* POST HEADER */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#8A252C] flex items-center justify-center text-white font-bold text-lg">
              MS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#8A252C] text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Academic
                </span>
                <p className="text-sm text-gray-600">1 hour ago</p>
              </div>
            </div>
          </div>

          {/* POST CONTENT */}
          <h1 className="text-2xl font-extrabold mb-2">
            Looking for study group for Data Structures
          </h1>
          <p className="text-gray-800 mb-6 leading-relaxed">
            Hi everyone! I'm struggling with some concepts in Data Structures and would love to form
            a study group. Anyone interested in meeting up this week? We could go over binary trees,
            heaps, graph algorithms, and practice some coding problems together. I think it would be
            really helpful to work through these topics as a group!
          </p>

          <p className="text-sm text-gray-800 mb-4">
            by{" "}
            <span className="font-bold text-[#8A252C]">Maria Santos</span> •{" "}
            <span className="inline-flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#8A252C"
                viewBox="0 0 20 20"
                className="w-4 h-4"
              >
                <path d="M17.5 2.5H2.5C1.675 2.5 1 3.175 1 4V14C1 14.825 1.675 15.5 2.5 15.5H15L19 19.5V4C19 3.175 18.325 2.5 17.5 2.5Z" />
              </svg>
              12 replies
            </span>{" "}
            •{" "}
            <span className="inline-flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#FFD700"
                viewBox="0 0 20 20"
                className="w-4 h-4"
              >
                <path d="M10 1.5L12.09 5.68L17.5 6.41L13.75 10.09L14.68 15.5L10 13.27L5.32 15.5L6.25 10.09L2.5 6.41L7.91 5.68L10 1.5Z" />
              </svg>
              24 likes
            </span>
          </p>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["#study-group", "#data-structures", "#computer-science"].map((tag, i) => (
              <span
                key={i}
                className="bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-3 mb-8">
            <button className="border-2 border-[#8A252C] text-[#8A252C] font-bold px-5 py-2 rounded-lg hover:bg-[#8A252C]/10 transition">
              Share
            </button>
            <button className="w-11 h-11 flex items-center justify-center bg-gray-100 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
                viewBox="0 0 20 20"
                className="w-5 h-5"
              >
                <path d="M10 1.5L12.09 5.68L17.5 6.41L13.75 10.09L14.68 15.5L10 13.27L5.32 15.5L6.25 10.09L2.5 6.41L7.91 5.68L10 1.5Z" />
              </svg>
            </button>
          </div>

          {/* REPLIES */}
          <h2 className="text-xl font-bold mb-4">Replies (12)</h2>

          {[
            {
              name: "Alex Thompson",
              time: "45 minutes ago",
              content:
                "I'd love to join! I'm also struggling with binary trees and graph algorithms. When are you thinking of meeting?",
              likes: 8,
            },
            {
              name: "Jessica Wong",
              time: "38 minutes ago",
              content:
                "Count me in! I have some good study materials for heaps and sorting algorithms that we could go through together.",
              likes: 12,
            },
            {
              name: "David Kim",
              time: "32 minutes ago",
              content:
                "This sounds great! I'm free Tuesday and Thursday evenings. Should we meet at the library or somewhere else on campus?",
              likes: 6,
            },
          ].map((reply, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#8A252C] flex items-center justify-center text-white font-bold text-sm">
                  {reply.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <p className="font-bold text-[#8A252C]">{reply.name}</p>
                <p className="text-sm text-gray-700">{reply.time}</p>
              </div>
              <p className="text-sm text-gray-800 mb-3">{reply.content}</p>
              <div className="flex items-center gap-3 text-sm">
                <span className="flex items-center gap-1 text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#666"
                    viewBox="0 0 16 16"
                    className="w-4 h-4"
                  >
                    <path d="M8 1.2L9.67 4.54L14 5.13L11 8.07L11.74 12.4L8 10.62L4.26 12.4L5 8.07L2 5.13L6.33 4.54L8 1.2Z" />
                  </svg>
                  {reply.likes} likes
                </span>
                <button className="text-[#8A252C] font-medium hover:underline">
                  Reply
                </button>
              </div>
            </div>
          ))}

          {/* SHOW MORE + ADD REPLY */}
          <div className="flex justify-between items-center mt-6">
            <button className="border border-[#8A252C] text-[#8A252C] font-bold px-6 py-2 rounded-lg hover:bg-[#8A252C]/10 transition">
              Show More Replies
            </button>

            <button
              className="bg-[#FFD700] text-black font-bold py-3 px-6 rounded-xl shadow-md hover:opacity-90 transition"
              style={{ boxShadow: "0px 8px 25px rgba(255,215,0,0.4)" }}
            >
              + Add Reply
            </button>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="w-full lg:w-[370px] flex flex-col gap-8">
          {/* Trending Topics */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold mb-4">🔥 Trending Topics</h3>
            {[
              "#DataStructures",
              "#WildcatsBasketball",
              "#CampusFood",
              "#StudyGroups",
              "#TechClub",
            ].map((topic, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 mb-2"
              >
                <p className="font-bold">{topic}</p>
                <p className="text-sm text-gray-700">#{index + 1}</p>
              </div>
            ))}
          </div>

          {/* Top Contributors */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-[#8A252C] mb-4">
              🏆 Top Contributors
            </h3>

            <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-lg flex items-center gap-3 p-3 mb-3">
              <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center bg-white text-[#8A252C] font-bold">
                JD
              </div>
              <div>
                <p className="font-bold text-sm">John Dela Cruz</p>
                <p className="text-xs text-black opacity-80">234 helpful posts</p>
              </div>
              <p className="ml-auto text-xl text-white">🥇</p>
            </div>

            <div className="flex items-center gap-3 p-3 mb-3">
              <div className="w-12 h-12 rounded-full border-2 border-[#8A252C] flex items-center justify-center text-[#8A252C] font-bold">
                MS
              </div>
              <div>
                <p className="font-bold text-sm">Maria Santos</p>
                <p className="text-xs text-black opacity-80">189 helpful posts</p>
              </div>
              <p className="ml-auto text-xl">🥈</p>
            </div>

            <div className="flex items-center gap-3 p-3">
              <div className="w-12 h-12 rounded-full border-2 border-[#8A252C] flex items-center justify-center text-[#8A252C] font-bold">
                AC
              </div>
              <div>
                <p className="font-bold text-sm">Anna Chen</p>
                <p className="text-xs text-black opacity-80">156 helpful posts</p>
              </div>
              <p className="ml-auto text-xl">🥉</p>
            </div>
          </div>

          {/* Related Discussions */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold mb-4">Related Discussions</h3>
            {[
              { title: "Algorithm Study Tips", author: "Alex Chen", time: "2 hours ago" },
              { title: "CS Midterm Prep", author: "Sarah Kim", time: "4 hours ago" },
              { title: "Programming Resources", author: "Mike Rodriguez", time: "6 hours ago" },
            ].map((post, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-3 mb-2 hover:bg-gray-50 transition"
              >
                <p className="font-bold text-[#8A252C] text-sm">{post.title}</p>
                <p className="text-xs text-gray-700">
                  by {post.author} • {post.time}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}
