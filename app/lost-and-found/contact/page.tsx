"use client";

import Image from "next/image";
import Link from "next/link";

export default function ContactOwnerPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900 flex flex-col">
      {/* ─── BREADCRUMB ───────────────────────────── */}
      <div className="max-w-7xl mx-auto w-full mt-8 px-6 flex items-center gap-2 text-sm text-[#666]">
        <Link href="/lost-and-found" className="hover:underline">
          Lost &amp; Found
        </Link>
        <span>/</span>
        <Link href="/lost-and-found/view" className="hover:underline">
          Black iPhone 14 Pro
        </Link>
        <span>/</span>
        <p className="font-medium text-[#8A252C]">Contact Owner</p>
      </div>

      <main className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-8 mt-6 px-6 mb-20">
        {/* ─── LEFT CONTENT (CHAT + INFO) ───────────────────────────── */}
        <section className="flex-1 flex flex-col gap-6">
          {/* Chat Box */}
          <div className="bg-white border border-neutral-200 rounded-xl shadow-sm p-6">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#8A252C] flex items-center justify-center text-white font-semibold">
                  JS
                </div>
                <div>
                  <p className="font-bold">John Smith</p>
                  <p className="text-sm text-green-600">● Online now</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 bg-[#FFD700] text-black px-4 py-2 rounded-lg font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M12.667 2H12V.667h-1.333V2H5.333V.667H4V2h-.667A1.333 1.333 0 0 0 2 3.333V12.667A1.333 1.333 0 0 0 3.333 14H12.667A1.333 1.333 0 0 0 14 12.667V3.333A1.333 1.333 0 0 0 12.667 2ZM12.667 12.667H3.333V5.333H12.667V12.667ZM4.667 6.667H8V10H4.667V6.667Z"
                      fill="black"
                    />
                  </svg>
                  Schedule Meeting
                </button>

                <button className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M10 6.667c-1.842 0-3.334 1.492-3.334 3.333 0 1.842 1.492 3.334 3.334 3.334 1.841 0 3.333-1.492 3.333-3.334 0-1.841-1.492-3.333-3.333-3.333Zm0-5A8.333 8.333 0 1 0 10 18.333 8.333 8.333 0 0 0 10 1.667ZM10 16.667A6.667 6.667 0 1 1 10 3.333a6.667 6.667 0 0 1 0 13.334Z"
                      fill="#666"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="h-[480px] bg-gray-50 mt-4 rounded-lg border border-gray-200"></div>

            {/* Chat Input */}
            <div className="flex items-center mt-4 border border-gray-200 rounded-xl px-4 py-3 bg-white">
              <button className="w-10 h-10 bg-[#8A252C] rounded-lg flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M1.675 17.5 19.167 10 1.675 2.5l-.008 5.833L14.167 10 1.667 11.667l.008 5.833Z"
                    fill="white"
                  />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 outline-none text-sm bg-transparent"
              />
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 20 20"
                  className="text-gray-500"
                >
                  <path
                    d="M13.75 5v9.583c0 1.842-1.492 3.334-3.333 3.334S7.083 16.425 7.083 14.583V4.167c0-1.15.933-2.083 2.083-2.083s2.084.933 2.084 2.083v8.75a.833.833 0 0 1-1.667 0V5H8.333v7.917a2.083 2.083 0 1 0 4.167 0V4.167a3.333 3.333 0 0 0-6.667 0v10.416A4.583 4.583 0 0 0 10.417 19.167 4.583 4.583 0 0 0 15 14.583V5h-1.25Z"
                    fill="#666"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M14 12.667V3.333A1.333 1.333 0 0 0 12.667 2H3.333A1.333 1.333 0 0 0 2 3.333v9.334A1.333 1.333 0 0 0 3.333 14h9.334A1.333 1.333 0 0 0 14 12.667ZM5.667 9l1.666 2.007L9.667 8l3 4H3.333L5.667 9Z"
                    fill="#666"
                  />
                </svg>
                <p className="text-sm">Photo</p>
              </div>
            </div>
          </div>

          {/* Item Details */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h2 className="font-bold mb-4">Item Details</h2>
            <div className="flex items-center gap-4">
              <Image
                src="/Iphone-14.jpeg"
                alt="Black iPhone 14 Pro"
                width={60}
                height={60}
                className="rounded-lg object-cover"
              />
              <div>
                <p className="font-medium text-sm">Black iPhone 14 Pro</p>
                <p className="text-xs text-gray-600">Library 3rd Floor</p>
                <span className="inline-block bg-[#FFE4E1] text-[#8A252C] text-[10px] font-medium px-3 py-1 rounded-full mt-2">
                  LOST
                </span>
              </div>
            </div>
            <Link
              href="/lost-and-found/view"
              className="text-[#8A252C] text-sm font-medium mt-3 inline-block hover:underline"
            >
              View full details →
            </Link>
          </div>

          {/* Safety Guidelines */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h2 className="font-bold mb-4">Safety Guidelines</h2>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>⚫ Always meet in public campus locations</li>
              <li>⚫ Verify item details before meeting</li>
              <li>⚫ Bring a friend if possible</li>
              <li>⚫ Report any suspicious behavior</li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h2 className="font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3 text-sm font-medium">
              <button className="w-full bg-gray-50 py-2 rounded-lg hover:bg-gray-100 text-black flex items-center justify-center gap-2">
                📍 Suggest Location
              </button>
              <button className="w-full bg-gray-50 py-2 rounded-lg hover:bg-gray-100 text-black flex items-center justify-center gap-2">
                ✉️ Share Contact
              </button>
              <button className="w-full bg-[#FFE4E1] py-2 rounded-lg hover:bg-[#FFD6D6] text-[#8A252C] flex items-center justify-center gap-2">
                🚨 Report Issue
              </button>
            </div>
          </div>

          {/* User Profile */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h2 className="font-bold mb-4">User Profile</h2>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#8A252C] flex items-center justify-center text-white font-semibold">
                JS
              </div>
              <div>
                <p className="font-medium">John Smith</p>
                <p className="text-xs text-gray-600">Computer Science</p>
                <p className="text-xs text-gray-600">
                  Member since Jan 2024
                </p>
              </div>
            </div>
            <div className="flex justify-around text-center">
              <div>
                <p className="text-[#8A252C] font-bold text-lg">3</p>
                <p className="text-xs text-gray-600">Items Posted</p>
              </div>
              <div>
                <p className="text-[#8A252C] font-bold text-lg">98%</p>
                <p className="text-xs text-gray-600">Response Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── RIGHT SIDEBAR ───────────────────────────── */}
        <aside className="w-full lg:w-[340px] flex flex-col gap-6">
          {/* Tips for Success */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-[#8A252C] mb-4">
              Tips for Success
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                ⭐ <span className="font-bold">Be Specific</span> — Include
                brand names, colors, and unique features.
              </li>
              <li>
                ⚡ <span className="font-bold">Act Quickly</span> — Report items
                as soon as possible for best results.
              </li>
              <li>
                📸 <span className="font-bold">Add Photos</span> — Images
                increase chances of successful matches.
              </li>
            </ul>
          </div>

          {/* Recent Activity */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-[#8A252C] mb-4">
              Recent Activity
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg">
                <div>
                  <p className="font-bold">iPhone Found</p>
                  <p className="text-xs text-gray-600">Library 3rd Floor</p>
                </div>
                <span className="text-xs text-gray-500">2h ago</span>
              </li>
              <li className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg">
                <div>
                  <p className="font-bold">Backpack Lost</p>
                  <p className="text-xs text-gray-600">Cafeteria Area</p>
                </div>
                <span className="text-xs text-gray-500">4h ago</span>
              </li>
              <li className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg">
                <div>
                  <p className="font-bold">Wallet Found</p>
                  <p className="text-xs text-gray-600">Student Center</p>
                </div>
                <span className="text-xs text-gray-500">6h ago</span>
              </li>
            </ul>
          </div>

          {/* Similar Items */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold mb-4">Similar Items</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between border border-gray-200 rounded-lg p-3">
                <div>
                  <p className="font-semibold text-sm">iPhone 13 Pro</p>
                  <p className="text-xs text-gray-600">Engineering Building</p>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-[#E8F5E8] text-[#2D5016]">
                  FOUND
                </span>
              </div>
              <div className="flex items-center justify-between border border-gray-200 rounded-lg p-3">
                <div>
                  <p className="font-semibold text-sm">Black Samsung Galaxy</p>
                  <p className="text-xs text-gray-600">Student Center</p>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-[#FFE4E1] text-[#8A252C]">
                  LOST
                </span>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
