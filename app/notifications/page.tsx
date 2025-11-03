"use client";

import Link from "next/link";

export default function NotificationsPage() {
  const notifications = [
    {
      icon: "🔍",
      color: "#8A252C",
      title: "Your lost item report has been viewed",
      desc: "Someone has viewed your Black iPhone 14 Pro report from Library 3rd Floor",
      time: "2 minutes ago",
      urgent: true,
      unread: true,
    },
    {
      icon: "💬",
      color: "#FFD700",
      title: "New reply in your discussion",
      desc: "Maria Santos replied to your post about Data Structures study group",
      time: "15 minutes ago",
      urgent: false,
      unread: true,
    },
    {
      icon: "✅",
      color: "#2D5016",
      title: "Potential match for your lost item",
      desc: "A Blue CIT-U ID Lace was found in Engineering Building that might match your report",
      time: "1 hour ago",
      urgent: true,
      unread: true,
    },
    {
      icon: "🔔",
      color: "#666",
      title: "Welcome to Campus Connect!",
      desc: "Thank you for joining the WILDCAT community. Start by exploring lost & found items or forum discussions.",
      time: "2 hours ago",
      urgent: false,
      unread: false,
    },
    {
      icon: "💬",
      color: "#FFD700",
      title: "Your post received 10 likes",
      desc: "Your discussion about basketball game tonight is getting popular with fellow students",
      time: "3 hours ago",
      urgent: false,
      unread: false,
    },
    {
      icon: "🔍",
      color: "#8A252C",
      title: "Item claim request",
      desc: "John Dela Cruz wants to claim the Red Jansport Backpack you reported found",
      time: "5 hours ago",
      urgent: false,
      unread: false,
    },
    {
      icon: "🔔",
      color: "#666",
      title: "Weekly community update",
      desc: "This week: 47 items reported, 32 items found, 156 new forum posts. Keep up the great work!",
      time: "1 day ago",
      urgent: false,
      unread: false,
    },
    {
      icon: "💬",
      color: "#FFD700",
      title: "New discussion in Academic category",
      desc: "Someone started a discussion about upcoming midterm exams preparation tips",
      time: "2 days ago",
      urgent: false,
      unread: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col">
        {/* Back Button */}
        <div className="flex items-center gap-2 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            strokeWidth={2}
            stroke="#8A252C"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12.5 15L7.5 10l5-5" />
          </svg>
          <Link href="/home" className="text-base font-medium text-[#8A252C] hover:underline">
            Back
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-[#8A252C]">Notifications</h1>
          <p className="text-lg text-gray-600">
            Stay updated with your campus community activities
          </p>
        </div>

        {/* Filter Bar (All, Unread, Urgent, Mark all as read, 3 unread) */}
        <div className="flex flex-wrap items-center justify-between border-b border-gray-200 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <button className="bg-[#8A252C] text-white px-4 py-2 rounded-lg text-sm font-medium">
              All
            </button>
            <button className="bg-[#F8F9FA] text-black px-4 py-2 rounded-lg text-sm font-medium">
              Unread
            </button>
            <button className="bg-[#F8F9FA] text-black px-4 py-2 rounded-lg text-sm font-medium">
              Urgent
            </button>
          </div>

          <div className="flex items-center gap-3 mt-3 lg:mt-0">
            <button className="text-sm font-medium text-[#8A252C] hover:underline">
              Mark all as read
            </button>
            <span className="w-px h-5 bg-gray-300"></span>
            <p className="text-sm font-medium text-gray-600">3 unread</p>
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left – Notifications List */}
          <div className="flex-1 border border-gray-200 rounded-xl p-6 shadow-sm bg-white">
            {notifications.map((n, i) => (
              <div
                key={i}
                className={`flex justify-between items-start border border-gray-200 rounded-lg p-4 mb-3 transition ${
                  n.unread ? "bg-[#FFF9E6]" : "bg-white hover:bg-[#F8F9FA]"
                }`}
              >
                <div className="flex gap-3">
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${n.color}20` }}
                  >
                    <span className="text-2xl" style={{ color: n.color }}>
                      {n.icon}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-base">{n.title}</p>
                      {n.urgent && (
                        <span className="bg-[#FFE4E1] text-[#8A252C] text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                          URGENT
                          <span className="w-2 h-2 bg-[#8A252C] rounded-full"></span>
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{n.desc}</p>
                    <p className="text-xs text-gray-500 mt-1">{n.time}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  {n.unread && (
                    <button className="bg-[#8A252C] text-white text-xs font-medium px-4 py-1.5 rounded-md hover:opacity-90 transition">
                      Mark as read
                    </button>
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 16"
                    strokeWidth="1.5"
                    stroke="#000"
                    className="w-4 h-4 cursor-pointer hover:opacity-70"
                  >
                    <path
                      d="M2 4h12M6 4V2h4v2m-7 0v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4H3z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Right – Notification Settings */}
          <div className="w-full lg:w-[340px] flex flex-col gap-6">
            {/* Settings */}
            <div className="border border-neutral-300 rounded-xl p-5 bg-white shadow-sm">
              <h3 className="text-xl font-bold text-[#8A252C] mb-4">
                Notification Settings
              </h3>
              {[
                { label: "Lost & Found Updates", enabled: true },
                { label: "Forum Replies", enabled: true },
                { label: "System Updates", enabled: false },
                { label: "Email Notifications", enabled: true },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center mb-3">
                  <p className="text-sm font-medium">{item.label}</p>
                  <div
                    className={`w-11 h-6 rounded-full flex items-center ${
                      item.enabled ? "bg-[#8A252C]" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition ${
                        item.enabled ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stay Connected */}
            <div className="border border-neutral-300 rounded-xl p-5 bg-white shadow-md text-center">
              <div className="w-12 h-12 mx-auto rounded-lg bg-[#8A252C] flex items-center justify-center mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#FFD700"
                  className="w-6 h-6"
                >
                  <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold">Stay Connected</h4>
              <p className="text-sm font-medium text-gray-700 mt-1">
                Get instant updates about your campus community activities
              </p>
              <button className="mt-5 bg-[#8A252C] text-white font-bold text-sm px-6 py-2 rounded-lg hover:opacity-90 transition">
                Enable Push Notifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
