"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE (unchanged content) */}
      <div className="relative w-1/2 hidden lg:flex items-center justify-center">
        <Image
          src="/CIT_LIB_SIGN.jpg"
          alt="CIT-U Library"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Centered Content */}
        <div className="relative z-10 text-white text-center max-w-xl">
          <h1 className="text-[42px] font-extrabold leading-tight tracking-tight">
            <span className="block">Welcome to</span>
            <span className="block text-[44px] font-extrabold">
              CIT-U CAMPUS CONNECT
            </span>
          </h1>
          <p className="text-[18px] mt-4 text-gray-100">
            Join your student community platform
          </p>

          {/* Card */}
          <div className="mt-10 bg-[#8a252c] border-2 border-[#FFD700] rounded-xl p-8 w-[460px] mx-auto text-left shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#FFD700"
                className="w-7 h-7"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
              </svg>
              <p className="text-xl font-semibold">What You Can Do</p>
            </div>

            {/* Yellow bullets */}
            <ul className="list-disc list-inside text-[16px] leading-relaxed space-y-2 text-gray-100 marker:text-[#FFD700]">
              <li>
                A student-run community platform by students, for students
              </li>
              <li>Share posts about campus life, events, and experiences</li>
              <li>Connect and chat with fellow students from your campus</li>
              <li>Post and find lost & found items around campus</li>
              <li>
                Join discussions about courses, professors, and study tips
              </li>
              <li>Discover student-organized events and meetups</li>
            </ul>

            <div className="border border-[#FFD700] rounded-lg mt-7 p-4 flex items-center gap-3 bg-[#7a1f26]/60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#FFD700"
                className="w-6 h-6"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
              </svg>
              <div>
                <p className="font-semibold text-[15px] text-white">
                  100% Student-Run
                </p>
                <p className="text-[13px] text-gray-300">
                  Made by students, for students
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 sm:px-10">
        {/* CARD CONTAINER */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* HEADER */}
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900">
              Create Your Account
            </h2>
            <p className="text-base text-gray-500 mt-1">
              Join the CIT-U student community
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-5">
            {/* FULL NAME */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-4 pr-10 text-sm focus:ring-2 focus:ring-[#8a252c] focus:outline-none"
                />
                <UserIcon className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Student Email
              </label>
              <div className="relative mt-1">
                <input
                  type="email"
                  placeholder="Enter your student email"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-4 pr-10 text-sm focus:ring-2 focus:ring-[#8a252c] focus:outline-none"
                />
                <EnvelopeIcon className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-4 pr-10 text-sm focus:ring-2 focus:ring-[#8a252c] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#8a252c]"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-4 pr-10 text-sm focus:ring-2 focus:ring-[#8a252c] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#8a252c]"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* TERMS */}
            <div className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-gray-600">
                I agree to the{" "}
                <Link href="#" className="text-[#8a252c] hover:underline">
                  Terms of Service
                </Link>
              </span>
            </div>

            {/* BUTTON */}
            <button className="w-full bg-[#8a252c] text-white py-3 rounded-lg font-semibold hover:opacity-90 shadow-md">
              Create Account
            </button>

            {/* DIVIDER */}
            <div className="flex items-center text-gray-400 text-sm">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="px-3 text-gray-500">Or sign up with</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            {/* SOCIAL BUTTONS */}
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 bg-white hover:bg-gray-50">
                <Image src="/google.png" alt="Google" width={20} height={20} />
                <span className="text-sm font-medium text-gray-700">
                  Google
                </span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 bg-white hover:bg-gray-50">
                <Image
                  src="/facebook.png"
                  alt="Facebook"
                  width={20}
                  height={20}
                />
                <span className="text-sm font-medium text-gray-700">
                  Facebook
                </span>
              </button>
            </div>

            {/* LOGIN LINK */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#8a252c] font-medium hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
