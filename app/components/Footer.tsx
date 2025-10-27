import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#8a252c] text-white">
      <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-xs sm:text-sm">
          © 2025 Cebu Institute of Technology University • Campus Connect • All rights reserved
        </p>

        <nav className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
          <Link href="/home" className="hover:underline">Home</Link>
          <Link href="/forum" className="hover:underline">Forum</Link>
          <Link href="/lostfound" className="hover:underline">Lost &amp; Found</Link>
          <Link href="/about" className="hover:underline">About</Link>
        </nav>
      </div>
    </footer>
  );
}
