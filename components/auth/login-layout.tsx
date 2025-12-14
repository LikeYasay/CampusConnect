import Image from "next/image"

interface LoginLayoutProps {
  children: React.ReactNode
}

export function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      <Image src="/CIT_LIB_SIGN.jpg" alt="CIT-U Library" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 w-[90%] max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-[#8a252c] py-8 text-center relative">
          <div className="w-16 h-16 mx-auto bg-white rounded-2xl shadow-md flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.9998 4L2.6665 12L15.9998 20L27.9997 13.4533V22.6667H30.6664V12L15.9998 4Z" fill="#FFD700" />
              <path
                d="M6.66699 17.5732V22.9066L16.0003 27.9999L25.3336 22.9066V17.5732L16.0003 22.6666L6.66699 17.5732Z"
                fill="#FFD700"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mt-4">Welcome Back</h1>
          <p className="text-white/80 text-sm mt-1">Sign in to CIT-U Campus Connect</p>
        </div>

        {children}
      </div>
    </div>
  )
}
