import Image from "next/image"

interface RegisterLayoutProps {
  children: React.ReactNode
}

export function RegisterLayout({ children }: RegisterLayoutProps) {
  return (
    <div className="min-h-screen flex">
      <div className="relative w-1/2 hidden lg:flex items-center justify-center">
        <Image src="/CIT_LIB_SIGN.jpg" alt="CIT-U Library" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-white text-center max-w-xl">
          <h1 className="text-[42px] font-extrabold leading-tight tracking-tight">
            <span className="block">Welcome to</span>
            <span className="block text-[44px] font-extrabold">CIT-U CAMPUS CONNECT</span>
          </h1>
          <p className="text-[18px] mt-4 text-gray-100">Join your student community platform</p>

          <div className="mt-10 bg-[#8a252c] border-2 border-[#FFD700] rounded-xl p-8 w-[460px] mx-auto text-left shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFD700" className="w-7 h-7">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
              </svg>
              <p className="text-xl font-semibold">What You Can Do</p>
            </div>

            <ul className="list-disc list-inside text-[16px] leading-relaxed space-y-2 text-gray-100 marker:text-[#FFD700]">
              <li>A student-run community platform by students, for students</li>
              <li>Share posts about campus life, events, and experiences</li>
              <li>Connect and chat with fellow students from your campus</li>
              <li>Post and find lost &amp; found items around campus</li>
              <li>Join discussions about courses, professors, and study tips</li>
              <li>Discover student-organized events and meetups</li>
            </ul>

            <div className="border border-[#FFD700] rounded-lg mt-7 p-4 flex items-center gap-3 bg-[#7a1f26]/60">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFD700" className="w-6 h-6">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
              </svg>
              <div>
                <p className="font-semibold text-[15px] text-white">100% Student-Run</p>
                <p className="text-[13px] text-gray-300">Made by students, for students</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 sm:px-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900">Create Your Account</h2>
            <p className="text-base text-gray-500 mt-1">Join the CIT-U student community</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
