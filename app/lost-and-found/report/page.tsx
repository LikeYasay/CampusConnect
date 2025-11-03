"use client";

import Image from "next/image";
import Link from "next/link";
import React, { JSX } from "react";

interface Tip {
  icon: string;
  title: string;
  text: string;
}

interface Activity {
  color: string;
  title: string;
  subtitle: string;
  time: string;
}

export default function ReportItemPage(): JSX.Element {
  const tips: Tip[] = [
    {
      icon: "⭐",
      title: "Be Specific",
      text: "Include brand names, colors, and unique features",
    },
    {
      icon: "⚡",
      title: "Act Quickly",
      text: "Report items as soon as possible for best results",
    },
    {
      icon: "📸",
      title: "Add Photos",
      text: "Images greatly increase chances of successful matches",
    },
  ];

  const activities: Activity[] = [
    {
      color: "bg-green-800",
      title: "iPhone Found",
      subtitle: "Library 3rd Floor",
      time: "2h ago",
    },
    {
      color: "bg-[#8A252C]",
      title: "Backpack Lost",
      subtitle: "Cafeteria Area",
      time: "4h ago",
    },
    {
      color: "bg-green-800",
      title: "Wallet Found",
      subtitle: "Student Center",
      time: "6h ago",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* ─── BACK TO LOST & FOUND ───────────────────────────── */}
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
          href="/lost-and-found"
          className="text-base font-medium text-[#8A252C] hover:underline"
        >
          Back to Lost &amp; Found
        </Link>
      </div>

      {/* ─── MAIN CONTENT ─────────────────────── */}
      <main className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-8 mt-6 mb-20 px-6">
        {/* LEFT SECTION – FORM */}
        <div className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-md p-8">
          <h1 className="text-3xl font-extrabold text-[#8A252C] mb-2">
            Report an Item
          </h1>
          <p className="text-gray-600 mb-8">
            Fill out the form below with as much detail as possible to help us
            match your item.
          </p>

          {/* Item Status */}
          <div className="mb-6">
            <p className="font-semibold mb-2">Item Status *</p>
            <div className="flex gap-4">
              <button className="flex-1 bg-[#8A252C] text-white font-semibold py-3 rounded-xl">
                I Lost an Item
              </button>
              <button className="flex-1 bg-gray-100 border border-gray-300 text-gray-900 font-semibold py-3 rounded-xl">
                I Found an Item
              </button>
            </div>
          </div>

          {/* Category */}
          <div className="mb-6">
            <p className="font-semibold mb-2">Category *</p>
            <select className="w-full border border-gray-300 bg-gray-50 rounded-xl p-3 text-gray-700">
              <option>Select a category</option>
              <option>Electronics</option>
              <option>Bags</option>
              <option>Personal Items</option>
            </select>
          </div>

          {/* Item Name */}
          <div className="mb-6">
            <p className="font-semibold mb-2">Item Name/Title *</p>
            <input
              type="text"
              placeholder="e.g., Black iPhone 14 Pro, Red Jansport Backpack"
              className="w-full border border-gray-300 bg-gray-50 rounded-xl p-3 text-gray-700"
            />
          </div>

          {/* Location */}
          <div className="mb-6">
            <p className="font-semibold mb-2">Location *</p>
            <input
              type="text"
              placeholder="location where item was lost/found"
              className="w-full border border-gray-300 bg-gray-50 rounded-xl p-3 text-gray-700"
            />
          </div>

          {/* Description */}
          <div className="mb-2">
            <p className="font-semibold mb-2">Detailed Description *</p>
            <textarea
              maxLength={500}
              placeholder="Provide more details about the item..."
              className="w-full border border-gray-300 rounded-xl p-3 h-40 resize-none text-gray-700"
            ></textarea>
          </div>
          <p className="text-sm text-gray-500 mb-6 text-right">0/500</p>

          {/* Upload */}
          <div className="mb-6">
            <p className="font-semibold mb-2">Upload Image (Optional)</p>
            <div className="border-2 border-dashed border-gray-300 rounded-xl h-52 flex flex-col items-center justify-center text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-12 h-12 text-gray-400 mb-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16 10l-4-4m0 0L8 10m4-4v12"
                />
              </svg>
              <p className="text-sm">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
            </div>
          </div>

          {/* Contact Method */}
          <div className="mb-6">
            <p className="font-semibold mb-2">Preferred Contact Method *</p>
            <div className="flex gap-4 mb-4">
              <button className="flex-1 bg-[#8A252C] text-white py-2 rounded-lg font-semibold">
                Email
              </button>
              <button className="flex-1 bg-gray-100 border border-gray-300 py-2 rounded-lg font-semibold text-gray-800">
                Phone
              </button>
              <button className="flex-1 bg-gray-100 border border-gray-300 py-2 rounded-lg font-semibold text-gray-800">
                In-App Message
              </button>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-gray-400"
              />
              <p className="text-gray-800 text-sm">
                Mark as urgent (important documents, electronics, etc.)
              </p>
            </div>
          </div>

          {/* Submit */}
          <button className="w-full bg-[#FFD700] text-black font-bold py-4 rounded-xl mt-8 shadow-md hover:opacity-90 transition">
            Report Lost Item
          </button>
        </div>

        {/* RIGHT SECTION – SIDEBAR */}
        <div className="w-full lg:w-[370px] flex flex-col gap-8">
          {/* Tips for Success */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold text-[#8A252C] mb-4">
              Tips for Success
            </h2>
            <ul className="space-y-4">
              {tips.map((tip: Tip, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#FFD700] rounded-full text-[#8A252C] text-lg">
                    {tip.icon}
                  </div>
                  <div>
                    <p className="font-semibold">{tip.title}</p>
                    <p className="text-sm text-gray-600">{tip.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Activity */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold text-[#8A252C] mb-4">
              Recent Activity
            </h2>
            <div className="space-y-3">
              {activities.map((item: Activity, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${item.color}`}
                    ></span>
                    <div>
                      <p className="font-semibold text-sm">{item.title}</p>
                      <p className="text-xs text-gray-600">{item.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
