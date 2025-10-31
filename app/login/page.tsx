"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      {/* Background */}
      <Image
        src="/CIT_LIB_SIGN.jpg"
        alt="CIT-U Library"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />

      {/* Login Card */}
      <div className="relative z-10 w-[90%] max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#8a252c] py-8 text-center relative">
          <div className="w-16 h-16 mx-auto bg-white rounded-2xl shadow-md flex items-center justify-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.9998 4L2.6665 12L15.9998 20L27.9997 13.4533V22.6667H30.6664V12L15.9998 4Z"
                fill="#FFD700"
              />
              <path
                d="M6.66699 17.5732V22.9066L16.0003 27.9999L25.3336 22.9066V17.5732L16.0003 22.6666L6.66699 17.5732Z"
                fill="#FFD700"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mt-4">Welcome Back</h1>
          <p className="text-white/80 text-sm-1 mt-1">Sign in to CIT-U Campus Connect</p>
        </div>

        {/* Form */}
        <div className="p-8 space-y-5">
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

          {/* REMEMBER + FORGOT */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <Link
              href="#"
              className="text-[#8a252c] font-medium hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* BUTTON */}
          <button className="w-full bg-[#8a252c] text-white py-3 rounded-lg font-semibold hover:opacity-90 shadow-md">
            Sign In
          </button>

          {/* DIVIDER (same as register) */}
          <div className="flex items-center text-gray-400 text-sm">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-3 text-gray-500">Or continue with</span>
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

          {/* FOOTER LINK */}
          <p className="text-center text-sm text-gray-600">
            New to Campus Connect?{" "}
            <Link
              href="/register"
              className="text-[#8a252c] font-medium hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
