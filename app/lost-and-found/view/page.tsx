"use client";

import Image from "next/image";
import Link from "next/link";
import React, { JSX } from "react";

export default function LostItemViewPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 flex flex-col">
      {/* ─── BREADCRUMB ───────────────────────────── */}
      <div className="max-w-7xl mx-auto w-full mt-8 px-6 flex items-center gap-2 text-sm text-[#666]">
        <Link href="/lost-and-found" className="hover:underline">
          Lost &amp; Found
        </Link>
        <span>/</span>
        <p className="font-medium text-[#8A252C]">Black iPhone 14 Pro</p>
      </div>

      {/* ─── MAIN CONTENT ───────────────────────────── */}
      <main className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-8 mt-6 px-6 mb-20">
        {/* LEFT SECTION – ITEM DETAILS */}
        <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm p-8">
          {/* Tags */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-[#FFE4E1] text-[#8A252C] text-xs font-semibold">
              LOST
            </span>
            <span className="px-3 py-1 rounded-full bg-[#FFE4E1] text-[#8A252C] text-xs font-semibold">
              URGENT
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-semibold">
              Electronics
            </span>
          </div>

          {/* Title + Icons */}
          <div className="flex items-start justify-between mb-3">
            <h1 className="text-3xl font-extrabold">Black iPhone 14 Pro</h1>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-gray-500"
                >
                  <path d="M14.1667 2.5H5.83335C4.91669 2.5 4.16669 3.25 4.16669 4.16667V17.5L10 15L15.8334 17.5V4.16667C15.8334 3.25 15.0834 2.5 14.1667 2.5Z" />
                </svg>
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 15 20"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-[15px] h-5 text-gray-500"
                >
                  <path d="M8 1.7c.9 0 1.7.8 1.7 1.7S8.9 5 8 5 6.3 4.2 6.3 3.3 7.1 1.7 8 1.7ZM15.5 7.5V5.8L10.5.8 9.2 2.1l2.3 2.2c-.8-.1-1.6-.2-2.4-.2-2.5 0-4.7 1-6.2 2.3l1.3 1.3c1.4-1 3.1-1.6 4.9-1.6s3.5.6 4.9 1.6L15.5 7.5ZM8 6.7A5 5 0 1 0 8 16.7a5 5 0 0 0 0-10Zm0 8.3A3.7 3.7 0 1 1 8 8.3a3.7 3.7 0 0 1 0 7Z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#666] mb-6">
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="w-4 h-4 text-gray-500"
              >
                <path d="M8 1.3A4.7 4.7 0 0 0 3.3 6c0 3.5 4.7 8.7 4.7 8.7S12.7 9.5 12.7 6A4.7 4.7 0 0 0 8 1.3Zm0 6.3a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
              </svg>
              <p>Library 3rd Floor</p>
            </div>
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="w-4 h-4 text-gray-500"
              >
                <path d="M8 1.3A6.7 6.7 0 1 0 8 14.7 6.7 6.7 0 0 0 8 1.3Zm.7 10H7.3V10h1.4v1.3Zm0-2.7H7.3V4.7h1.4v3.9Z" />
              </svg>
              <p>Lost on March 15, 2024</p>
            </div>
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="w-4 h-4 text-gray-500"
              >
                <path d="M8 1.3A6.7 6.7 0 1 0 8 14.7 6.7 6.7 0 0 0 8 1.3Zm.7 10H7.3V10h1.4v1.3Zm0-2.7H7.3V4.7h1.4v3.9Z" />
              </svg>
              <p>Reported 2 hours ago</p>
            </div>
          </div>

          {/* Image */}
          <div className="w-full h-56 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center mb-8">
            <Image
              src="/Iphone-14.jpeg"
              alt="Black iPhone 14 Pro"
              width={500}
              height={500}
              className="object-contain w-full h-full"
            />
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">Description</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Black iPhone 14 Pro with cracked screen protector. Has a red case
              with some scratches on the corners. The phone was last seen in the
              Library on the 3rd floor near the study tables. It contains
              important personal data and work files. Please contact me if found
              – there will be a reward for its safe return.
            </p>
          </div>

          {/* Additional Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-[#8A252C] font-bold mb-4">
              Additional Details
            </h3>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <p className="text-gray-600">
                Brand: <span className="font-medium text-black">Apple</span>
              </p>
              <p className="text-gray-600">
                Model:{" "}
                <span className="font-medium text-black">iPhone 14 Pro</span>
              </p>
              <p className="text-gray-600">
                Color:{" "}
                <span className="font-medium text-black">Space Black</span>
              </p>
              <p className="text-gray-600">
                Storage: <span className="font-medium text-black">256GB</span>
              </p>
              <p className="text-gray-600">
                Condition:{" "}
                <span className="font-medium text-black">
                  Good (cracked protector)
                </span>
              </p>
              <p className="text-gray-600">
                Case:{" "}
                <span className="font-medium text-black">Red silicone</span>
              </p>
            </div>
          </div>

          {/* Location Details */}
          <div>
            <h3 className="text-xl font-bold mb-3">Location Details</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#8A252C"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" />
                </svg>
                <div>
                  <p className="font-bold">Library 3rd Floor</p>
                  <p className="text-sm text-gray-600">
                    Near the study tables, close to the computer section
                  </p>
                  <p className="text-sm text-gray-600">
                    Last seen: March 15, 2024 at 2:30 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR – OWNER + TIPS */}
        <aside className="w-full lg:w-[370px] flex flex-col gap-8">
          {/* Owner Info */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/user-avatar.png"
                alt="John Smith"
                width={50}
                height={50}
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-bold">John Smith</p>
                <p className="text-sm text-gray-600">
                  Computer Science Student
                </p>
                <p className="text-xs text-green-600">● Active 5 minutes ago</p>
              </div>
            </div>
            <div className="text-sm text-gray-700 mb-3">
              <p>
                Member since{" "}
                <span className="font-medium text-black">January 2024</span>
              </p>
              <p>
                Items posted{" "}
                <span className="font-medium text-black">3 items</span>
              </p>
            </div>
            <button className="w-full bg-[#8A252C] text-white font-bold py-3 rounded-lg mt-3 hover:opacity-90">
              Contact Owner
            </button>
            <button className="w-full border-2 border-[#8A252C] text-[#8A252C] font-bold py-3 rounded-lg mt-3 hover:bg-[#8A252C]/10">
              Send Message
            </button>
          </div>

          {/* Safety Tips */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold mb-4">Safety Tips</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>⚫ Meet in a public place on campus</li>
              <li>⚫ Verify item details before meeting</li>
              <li>⚫ Bring a friend if possible</li>
              <li>⚫ Report suspicious activity</li>
            </ul>
          </div>

          {/* Similar Items */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold mb-4">Similar Items</h3>
            <div className="space-y-3">
              {[
                {
                  title: "iPhone 13 Pro",
                  location: "Engineering Building",
                  status: "FOUND",
                  color: "bg-[#E8F5E8]",
                  textColor: "text-[#2D5016]",
                },
                {
                  title: "Black Samsung Galaxy",
                  location: "Student Center",
                  status: "LOST",
                  color: "bg-[#FFE4E1]",
                  textColor: "text-[#8A252C]",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border border-gray-200 rounded-lg p-3"
                >
                  <div>
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-xs text-gray-600">{item.location}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-semibold ${item.color} ${item.textColor}`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
