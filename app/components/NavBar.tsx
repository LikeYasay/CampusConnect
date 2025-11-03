"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 py-2">
        {/* LEFT: logo + title */}
        <div className="flex items-center gap-3">
          <Image
            src="/CIT_LOGO.png"
            alt="CIT-U Logo"
            width={48}
            height={48}
            priority
          />
          <div className="leading-tight">
            <p className="text-[#8a252c] font-bold text-base sm:text-lg">
              CAMPUS CONNECT
            </p>
            <p className="text-[#ffcf01] text-[11px] sm:text-xs font-semibold -mt-0.5">
              WILDCAT Community
            </p>
          </div>
        </div>

        {/* RIGHT: nav links */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6 text-sm lg:text-base">
            <Link href="/home" className="hover:text-[#8a252c] transition">
              Home
            </Link>
            <Link href="/forum" className="hover:text-[#8a252c] transition">
              Forum
            </Link>
            <Link
              href="/lost-and-found"
              className="hover:text-[#8a252c] transition"
            >
              Lost &amp; Found
            </Link>
            <Link
              href="/#why-choose"
              className="hover:text-[#8a252c] transition"
            >
              About
            </Link>
            <Link href="/team" className="hover:text-[#8a252c] transition">
              Our Team
            </Link>
                        <Link href="/contact" className="hover:text-[#8a252c] transition">
              Contact Us 
            </Link>
          </nav>

          {/* Notification bell */}
          <Link
            href="/notifications"
            className="relative flex items-center justify-center cursor-pointer hover:opacity-80 transition"
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              preserveAspectRatio="none"
            >
              <path
                d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z"
                fill="#8A252C"
              />
            </svg>
            <div className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-[#FFD700]">
              <p className="text-xs font-bold text-black">2</p>
            </div>
          </Link>

          {/* Buttons */}
          <Link
            href="/register"
            className="rounded-md bg-[#8a252c] text-white px-4 py-2 font-semibold hover:opacity-90"
          >
            Join Community
          </Link>
          <Link
            href="/login"
            className="rounded-md bg-[#ffd700] text-black px-4 py-2 font-semibold hover:opacity-90"
          >
            Login
          </Link>

          {/* Profile Button */}
          <Link
            href="/profile"
            className="flex items-center justify-center cursor-pointer hover:opacity-90 transition"
          >
            <Image src="/profile.png" alt="Profile" width={36} height={36} />
          </Link>
        </div>

        {/* MOBILE BURGER */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md border px-3 py-2"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <nav className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-3">
            <Link href="/home" className="py-2">
              Home
            </Link>
            <Link href="/forum" className="py-2">
              Forum
            </Link>
            <Link href="/lost-and-found" className="py-2">
              Lost &amp; Found
            </Link>
            <Link href="/about" className="py-2">
              About
            </Link>

            {/* Notification bell inside mobile */}
            <div className="flex items-center gap-2 pt-2">
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                preserveAspectRatio="none"
              >
                <path
                  d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z"
                  fill="#8A252C"
                />
              </svg>
              <div className="relative">
                <div className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-[#ffd700]">
                  <p className="text-xs font-bold text-black">2</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-3">
              <Link
                href="/register"
                className="flex-1 rounded-md bg-[#8a252c] text-center text-white px-4 py-2 font-semibold"
              >
                Join Community
              </Link>
              <Link
                href="/login"
                className="flex-1 rounded-md bg-[#ffd700] text-center text-black px-4 py-2 font-semibold"
              >
                Login
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
