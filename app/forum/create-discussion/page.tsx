"use client";

import Link from "next/link";
import React from "react";

export default function CreateDiscussionPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900 flex flex-col">
      {/* Back to Forum */}
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

      <main className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-8 mt-6 px-6 mb-20">
        {/* ─── LEFT SIDE – FORM ───────────────────────────── */}
        <section className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-2">Start a New Discussion</h1>
          <p className="text-gray-600 mb-6">
            Share your thoughts, ask questions, or start a conversation with the
            CIT-U community.
          </p>

          {/* Category */}
          <h2 className="text-base font-bold mb-2">Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {[
              "Academic",
              "Events",
              "General",
              "Lost & Found",
              "Tech",
              "Sports",
            ].map((cat, i) => (
              <button
                key={i}
                className={`px-4 py-3 rounded-xl border text-sm font-bold ${
                  cat === "Academic"
                    ? "bg-[#8A252C] text-white"
                    : "bg-white border-gray-300 text-black hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Discussion Title */}
          <label className="block text-base font-bold mb-2">
            Discussion Title
          </label>
          <input
            type="text"
            placeholder="Enter a clear and descriptive title..."
            className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm mb-6 outline-none focus:ring-2 focus:ring-[#8A252C]/40"
          />

          {/* Upload Image */}
          <label className="block text-base font-bold mb-2">
            Upload Image (Optional)
          </label>
          <div className="border-2 border-gray-200 rounded-xl flex flex-col items-center justify-center h-[120px] mb-6 text-center cursor-pointer hover:bg-gray-50 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#666"
              className="w-12 h-12 mb-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5V8.25A2.25 2.25 0 0 1 5.25 6h13.5A2.25 2.25 0 0 1 21 8.25v8.25m-18 0A2.25 2.25 0 0 0 5.25 18h13.5A2.25 2.25 0 0 0 21 16.5m-18 0v1.5A2.25 2.25 0 0 0 5.25 20.25h13.5A2.25 2.25 0 0 0 21 18v-1.5M3 16.5l4.5-4.5a1.5 1.5 0 0 1 2.121 0l1.879 1.879a1.5 1.5 0 0 0 2.121 0L15 11.25l6 6"
              />
            </svg>
            <p className="text-sm text-gray-600 font-medium">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-400 font-medium">
              PNG, JPG up to 5MB
            </p>
          </div>

          {/* Description */}
          <label className="block text-base font-bold mb-2">Description</label>
          <textarea
            placeholder="Write your discussion details..."
            className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-[#8A252C]/40 h-[200px]"
          ></textarea>
          <p className="text-sm text-gray-500 mt-1 text-right">0/500</p>

          {/* Tags */}
          <label className="block text-base font-bold mt-6 mb-2">Tags</label>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="text"
              placeholder="Add a tag..."
              className="flex-1 border-2 border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-[#8A252C]/40"
            />
            <button className="bg-[#8A252C] text-white font-bold px-5 py-3 rounded-xl hover:opacity-90">
              Add
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Add relevant tags to help others find your discussion. Press Enter
            or click Add.
          </p>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button className="bg-[#8A252C] text-white font-bold px-5 py-3 rounded-xl hover:opacity-90">
              Preview
            </button>
            <button
              className="bg-[#FFD700] text-black font-bold px-5 py-3 rounded-xl shadow-md hover:opacity-90"
              style={{
                boxShadow: "0 8px 25px rgba(255, 215, 0, 0.4)",
              }}
            >
              Post Discussion
            </button>
          </div>
        </section>

        {/* ─── RIGHT SIDEBAR ───────────────────────────── */}
        <aside className="w-full lg:w-[360px] flex flex-col gap-6">
          {/* Discussion Tips */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold mb-4">💡 Discussion Tips</h3>
            <ul className="space-y-2 text-sm text-gray-800">
              <li>• Use clear, descriptive titles that summarize your topic</li>
              <li>• Provide context and details to help others understand</li>
              <li>• Add relevant tags to increase visibility</li>
              <li>• Be respectful and constructive in your posts</li>
            </ul>
          </div>

          {/* Trending Topics */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold mb-4">🔥 Trending Topics</h3>
            <div className="space-y-3">
              {[
                { tag: "#DataStructures", count: "234 posts" },
                { tag: "#StudyGroups", count: "189 posts" },
                { tag: "#CampusEvents", count: "156 posts" },
                { tag: "#TechHelp", count: "143 posts" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-[#f8f8f8] rounded-lg px-4 py-3"
                >
                  <p className="text-base font-medium">{item.tag}</p>
                  <p className="text-sm text-gray-500">{item.count}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Community Guidelines */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-[#8A252C] mb-4">
              📋 Community Guidelines
            </h3>
            <ul className="space-y-3 text-sm text-gray-800">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FFD700] flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <p>Be respectful and constructive in all discussions</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FFD700] flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <p>Use appropriate categories and tags</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FFD700] flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <p>No spam, harassment, or inappropriate content</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FFD700] flex items-center justify-center text-xs font-bold">
                  4
                </div>
                <p>Help maintain a positive learning environment</p>
              </li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
