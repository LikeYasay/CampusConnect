// components/HomePage.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import NavBar from "./NavBar";
import Footer from "./Footer";

type LostItem = {
  id: string;
  status: "LOST" | "FOUND";
  badge?: "ACTIVE" | "CLAIMED";
  title: string;
  place: string;
  time: string;
  img: string;
};

type ForumItem = {
  id: string;
  title: string;
  author: string;
  time: string;
  tag: string;
  replies: number;
};

const STATS = [
  { value: "1247", label: "Items Reported" },
  { value: "892", label: "Items Found" },
  { value: "3456", label: "Forum Posts" },
  { value: "2134", label: "Active Users" },
];

const LOST_ITEMS: LostItem[] = [
  {
    id: "1",
    status: "LOST",
    badge: "ACTIVE",
    title: "Black iPhone 14 Pro",
    place: "Library 3rd Floor",
    time: "2 hours ago",
    img: "/image.png",
  },
  {
    id: "2",
    status: "FOUND",
    badge: "CLAIMED",
    title: "Blue CIT-U ID Lace",
    place: "Engineering Building",
    time: "4 hours ago",
    img: "/image-2.png",
  },
  {
    id: "3",
    status: "LOST",
    badge: "ACTIVE",
    title: "Red Jansport Backpack",
    place: "Cafeteria Area",
    time: "6 hours ago",
    img: "/image-3.png",
  },
];

const FORUM: ForumItem[] = [
  {
    id: "a",
    title: "Looking for study group for Data Structures",
    author: "Maria Santos",
    time: "1 hour ago",
    tag: "Academic",
    replies: 12,
  },
  {
    id: "b",
    title: "Anyone going to the basketball game tonight?",
    author: "John Dela Cruz",
    time: "3 hours ago",
    tag: "Events",
    replies: 8,
  },
  {
    id: "c",
    title: "Best places to eat near campus?",
    author: "Sarah Kim",
    time: "5 hours ago",
    tag: "General",
    replies: 24,
  },
];

export default function HomePage() {
  return (
    <>
      
      <main className="bg-white">
        {/* ===== HERO w/ background image + stats + quick actions ===== */}
        <section className="relative">
            <div className="relative h-[500px] sm:h-[540px] md:h-[580px] lg:h-[600px]">
            <Image
                src="/CIT_GLE-POV.jpg"
                alt="CIT-U campus"
                fill
                priority
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/35" />

            {/* TEXT + CONTENT */}
            <div className="absolute inset-0">
                <div className="mx-auto max-w-6xl px-4 py-8 md:py-10 text-center">
                {/* Title */}
                <h1 className="text-white text-9xl sm:text-8xl md:text-7xl font-black mb-1">
                    Welcome, Wildcat!
                </h1>
                <p className="text-white/95 text-base sm:text-lg md:text-2xl mt-2 mb-6">
                    Stay connected with your campus community
                </p>

                {/* Stats Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center">
                    {STATS.map((s) => (
                    <div
                        key={s.label}
                        className="rounded-xl bg-[#8a252c] px-4 py-5 shadow-md w-[230px] sm:w-[250px]"
                        style={{ boxShadow: "0 4px 4px rgba(0,0,0,.5)" }}
                    >
                        <p className="text-[#ffd700] text-3xl sm:text-4xl font-black text-center">
                        {s.value}
                        </p>
                        <p className="text-white text-sm sm:text-base font-medium text-center mt-1">
                        {s.label}
                        </p>
                    </div>
                    ))}
                </div>

                {/* Quick Actions INSIDE IMAGE */}
                <div className="mt-8 sm:mt-10 grid gap-4 md:grid-cols-3 justify-items-center">
                    <ActionCard
                    title="FIND LOST ITEMS"
                    subtitle="Search through reported items"
                    icon={
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path
                            d="M31 28H29.42L28.86 27.46C30.82 25.18 32 22.22 32 19C32 12.38 26.62 7 20 7C13.38 7 8 12.38 8 19C8 25.62 13.38 31 20 31C23.22 31 26.18 29.82 28.46 27.86L29 28.42V31L38 39.98L39.98 38L31 28ZM20 28C15.02 28 11 23.98 11 19C11 14.02 15.02 10 20 10C24.98 10 29 14.02 29 19C29 23.98 24.98 28 20 28Z"
                            fill="#8A252C"
                        />
                        </svg>
                    }
                    />
                    <ActionCard
                    title="START A DISCUSSION"
                    subtitle="Connect with fellow students"
                    icon={
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path
                            d="M40 4H8C5.79 4 4 5.79 4 8V32C4 34.21 5.79 36 8 36H36L44 44V8C44 5.79 42.21 4 40 4ZM36 28H12V24H36V28ZM36 22H12V18H36V22ZM36 16H12V12H36V16Z"
                            fill="#8A252C"
                        />
                        </svg>
                    }
                    />
                    <ActionCard
                    title="REPORT AN ITEM"
                    subtitle="Help others find their belongings"
                    icon={
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path
                            d="M24 44C26.02 44 27.67 42.4 27.67 40.44H20.33C20.33 42.4 21.98 44 24 44ZM37 32V22C37 16.07 33.64 11.13 28.17 9.68003V8.44003C28.17 6.98003 26.98 5.78003 25.5 5.78003C24.02 5.78003 22.83 6.98003 22.83 8.44003V9.68003C17.31 11.13 14 16.02 14 22V32L10 36V38H38V36L37 32Z"
                            fill="#8A252C"
                        />
                        </svg>
                    }
                    />
                </div>
                </div>
            </div>
            </div>
        </section>

        {/* ===== two-column content (Lost & Found / Forum) ===== */}
        <section className="mx-auto max-w-6xl px-4 mt-10 md:mt-14 pb-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* left: lost & found list */}
            <div className="rounded-xl border-2 border-neutral-200 bg-white shadow-sm">
              <div className="flex items-center justify-between p-4 sm:p-5">
                <h3 className="text-2xl font-bold text-[#8a252c]">Recent Lost &amp; Found</h3>
                <div className="flex gap-2">
                  <span className="rounded-lg bg-[#8a252c] text-white text-sm px-3 py-2">Recent</span>
                  <span className="rounded-lg bg-[#f8f9fa] text-sm px-3 py-2">Urgent</span>
                </div>
              </div>

              <div className="space-y-3 p-4 sm:p-5">
                {LOST_ITEMS.map((it) => (
                  <div key={it.id} className="rounded-lg bg-[#f8f9fa] p-3 sm:p-4 flex gap-3">
                    <Image
                      src={it.img}
                      alt={it.title}
                      width={80}
                      height={80}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                    <div className="min-w-0 grow">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          color={
                            it.status === "LOST"
                              ? "bg-[#ffe4e1] text-[#8a252c]"
                              : "bg-[#e8f5e8] text-[#2d5016]"
                          }
                          label={it.status}
                        />
                        {it.badge && (
                          <Badge
                            color={
                              it.badge === "ACTIVE"
                                ? "bg-[#fff3cd] text-[#856404]"
                                : "bg-[#d1ecf1] text-[#0c5460]"
                            }
                            label={it.badge}
                          />
                        )}
                      </div>
                      <p className="mt-1 font-bold">{it.title}</p>
                      <p className="text-sm text-[#666]">{it.place}</p>
                      <p className="text-xs text-[#999]">{it.time}</p>
                    </div>

                    <Link
                      href="#"
                      className="self-center rounded-lg bg-[#8a252c] px-3 py-2 text-white text-sm font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                ))}

                <div className="py-1 text-center">
                  <Link href="#" className="font-bold text-[#8a252c]">
                    View All Items →
                  </Link>
                </div>
              </div>
            </div>

            {/* right: forum list */}
            <div className="rounded-xl border-2 border-neutral-200 bg-white shadow-sm">
              <div className="flex items-center justify-between p-4 sm:p-5">
                <h3 className="text-2xl font-bold text-[#8a252c]">Latest Forum Discussions</h3>
                <Link
                  href="#"
                  className="rounded-lg bg-[#ffd700] px-4 py-2 text-sm font-bold text-black"
                >
                  New Post
                </Link>
              </div>

              <div className="space-y-3 p-4 sm:p-5">
                {FORUM.map((f) => (
                  <div key={f.id} className="rounded-lg bg-[#f8f9fa] p-3 sm:p-4">
                    <p className="font-bold">{f.title}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 text-sm text-[#666]">
                      <span>by {f.author}</span>
                      <span>{f.time}</span>
                      <span className="ml-auto rounded-full bg-[#8a252c] px-3 py-1 text-xs text-white">
                        {f.tag}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm text-[#666]">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M14 2H2C1.45 2 1 2.45 1 3V11C1 11.55 1.45 12 2 12H12L15 15V3C15 2.45 14.55 2 14 2ZM12 9H4V8H12V9ZM12 7.5H4V6.5H12V7.5ZM12 6H4V5H12V6Z"
                          fill="#666666"
                        />
                      </svg>
                      <span>{f.replies} replies</span>
                      <Link href="#" className="ml-auto font-medium text-[#8a252c]">
                        Join Discussion
                      </Link>
                    </div>
                  </div>
                ))}

                <div className="py-1 text-center">
                  <Link href="#" className="font-bold text-[#8a252c]">
                    View All Discussions →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CTA (as requested) ===== */}
        <section className="bg-[#f8f9fa] py-12 sm:py-16 text-center">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-[#8a252c]">
              Ready to Join the Community?
            </h2>
            <p className="mt-3 text-base sm:text-lg md:text-xl">
              Be part of the largest student community at CIT-U. Help others, find your lost items, and make lasting connections.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <Link
                href="#"
                className="rounded-xl bg-[#ffd700] px-5 sm:px-6 py-3 text-base sm:text-lg font-bold text-black shadow hover:opacity-90"
              >
                Join Community
              </Link>
              <Link
                href="#"
                className="rounded-xl border-2 border-black px-5 sm:px-6 py-2.5 sm:py-3 text-base sm:text-lg font-bold hover:bg-black hover:text-white transition"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>

    </>
  );
}

/* ---------------- small helpers ---------------- */

function ActionCard({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl bg-[#ffd700] px-5 py-6 text-center shadow"
      style={{ boxShadow: "0 4px 4px rgba(0,0,0,.5)" }}
    >
      <div className="mx-auto h-12 w-12">{icon}</div>
      <p className="mt-3 text-lg md:text-xl font-bold">{title}</p>
      <p className="text-sm md:text-base">{subtitle}</p>
    </div>
  );
}

function Badge({ color, label }: { color: string; label: string }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${color}`}
    >
      {label}
    </span>
  );
}
