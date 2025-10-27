"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 py-2">

        {/* LEFT: logo + text */}
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

        {/* RIGHT: desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6 text-sm lg:text-base">
            <Link href="/home" className="hover:text-[#8a252c] transition">Home</Link>
            <Link href="/forum" className="hover:text-[#8a252c] transition">Forum</Link>
            <Link href="/lostfound" className="hover:text-[#8a252c] transition">Lost &amp; Found</Link>
            <Link href="/about" className="hover:text-[#8a252c] transition">About</Link>
          </nav>

          <Link
            href="/join"
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
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md border px-3 py-2"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <nav className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-3">
            <Link href="/" className="py-2">Home</Link>
            <Link href="/forum" className="py-2">Forum</Link>
            <Link href="/lostfound" className="py-2">Lost &amp; Found</Link>
            <Link href="/about" className="py-2">About</Link>

            <div className="flex gap-3 pt-2">
              <Link
                href="/join"
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
