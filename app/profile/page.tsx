"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Back Button */}
        <div className="flex items-center gap-2 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="#8A252C"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <Link href="/home" className="text-base font-medium text-[#8A252C] hover:underline">
            Back
          </Link>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: Profile Card */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            {/* Avatar */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <Image
                  src="/profile.png"
                  alt="Profile"
                  width={120}
                  height={120}  
                />
                <div className="absolute bottom-2 right-1 w-5 h-5 bg-[#28A745] border-2 border-white rounded-full"></div>
              </div>

              <h2 className="mt-4 text-2xl font-bold text-[#8A252C]">Maria Santos</h2>
              <p className="text-gray-600 text-sm">Computer Science – 3rd Year</p>
              <p className="text-gray-600 text-sm">Student ID: CIT-2021-12345</p>
              <p className="text-gray-500 text-xs">Member since September 2021</p>

              {/* Buttons */}
              <div className="flex gap-3 mt-4">
                <button className="bg-[#FFD700] text-black font-bold px-4 py-2 rounded-lg text-sm hover:opacity-90 transition">
                  Edit Profile
                </button>
                <button className="border border-[#8A252C] text-[#8A252C] px-4 py-2 rounded-lg text-sm hover:bg-[#8A252C]/10 transition">
                  Message
                </button>
              </div>
            </div>

            {/* Achievements */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-[#8A252C] mb-2">Achievements</h3>
              <p className="text-gray-500 text-sm italic">No achievements yet.</p>
            </div>

            {/* Quick Stats */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-[#8A252C] mb-3">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 23, label: "Items Reported" },
                  { value: 15, label: "Items Found" },
                  { value: 87, label: "Forum Posts" },
                  { value: 156, label: "Helpful Votes" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-[#F8F9FA] rounded-lg text-center py-3"
                  >
                    <p className="text-2xl font-bold text-[#8A252C]">{stat.value}</p>
                    <p className="text-xs text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Info Sections */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            {/* Tabs */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button className="bg-[#8A252C] text-white text-sm font-medium px-4 py-2 rounded-lg">
                Overview
              </button>
              <button className="bg-[#F8F9FA] text-black text-sm font-medium px-4 py-2 rounded-lg">
                Recent Activity
              </button>
              <button className="bg-[#F8F9FA] text-black text-sm font-medium px-4 py-2 rounded-lg">
                Forum Posts
              </button>
              <button className="bg-[#F8F9FA] text-black text-sm font-medium px-4 py-2 rounded-lg">
                Lost & Found
              </button>
            </div>

            {/* About */}
            <section className="mb-6">
              <h3 className="text-xl font-bold text-[#8A252C] mb-2">About</h3>
              <p className="text-gray-800 leading-relaxed">
                Passionate CS student interested in web development and AI. Always happy to
                help fellow students with programming questions!
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-6">
              <h3 className="text-xl font-bold text-[#8A252C] mb-3">Contact Information</h3>
              <div className="flex flex-col gap-2 text-gray-800">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      d="M16.667 3.333H3.333A1.667 1.667 0 0 0 1.667 5v10a1.667 1.667 0 0 0 1.666 1.667h13.334A1.667 1.667 0 0 0 18.333 15V5A1.667 1.667 0 0 0 16.667 3.333Zm0 3.334L10 10.833 3.333 6.667V5L10 9.167l6.667-4.167v1.667Z"
                      fill="#000"
                    />
                  </svg>
                  <span>maria.santos@cit.edu</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      d="M10 1.667A5.833 5.833 0 0 0 4.167 7.5c0 4.375 5.833 10.833 5.833 10.833S15.833 11.875 15.833 7.5A5.833 5.833 0 0 0 10 1.667ZM10 9.583A2.083 2.083 0 1 1 10 5.417a2.083 2.083 0 0 1 0 4.166Z"
                      fill="#000"
                    />
                  </svg>
                  <span>Cebu Institute of Technology University</span>
                </div>
              </div>
            </section>

            {/* Academic Information */}
            <section>
              <h3 className="text-xl font-bold text-[#8A252C] mb-3">Academic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#F8F9FA] rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-600">Course</p>
                  <p className="font-bold text-black">Computer Science</p>
                </div>
                <div className="bg-[#F8F9FA] rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-600">Year Level</p>
                  <p className="font-bold text-black">3rd Year</p>
                </div>
                <div className="bg-[#F8F9FA] rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-600">Student ID</p>
                  <p className="font-bold text-black">CIT-2021-12345</p>
                </div>
                <div className="bg-[#F8F9FA] rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-600">Member Since</p>
                  <p className="font-bold text-black">September 2021</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
