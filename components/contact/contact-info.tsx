"use client"

import Image from "next/image"

export default function ContactInfo() {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200 p-8 w-full md:w-[340px] flex flex-col justify-start hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
      <h2 className="text-[#8A252C] text-2xl font-bold mb-6 text-center">Contact Information</h2>

      <div className="space-y-6 text-gray-700 text-sm">
        <div className="flex items-start gap-3">
          <div className="bg-[#FFD700]/20 p-2 rounded-full flex items-center justify-center">
            <Image src="/location.png" alt="Location" width={20} height={20} />
          </div>
          <p>
            <span className="font-semibold text-[#8A252C]">CIT-U Campus:</span> <br />
            N. Bacalso Ave, Cebu City, Philippines 6000
          </p>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-[#FFD700]/20 p-2 rounded-full flex items-center justify-center">
            <Image src="/mail.png" alt="Email" width={20} height={20} />
          </div>
          <p>
            <span className="font-semibold text-[#8A252C]">Email Us:</span> <br />
            info@cit.edu
          </p>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-[#FFD700]/20 p-2 rounded-full flex items-center justify-center">
            <Image src="/phone.png" alt="Phone" width={20} height={20} />
          </div>
          <p>
            <span className="font-semibold text-[#8A252C]">Call Us:</span> <br />
            +63 32 411 2000 (trunkline)
          </p>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-200 pt-6">
        <p className="text-center text-gray-500 mb-3 text-sm">Connect with us on social media</p>
        <div className="flex justify-center gap-4">
          {["facebook", "instagram"].map((icon) => (
            <div
              key={icon}
              className="bg-[#8A252C] hover:bg-[#FFD700] transition-all duration-300 p-3 rounded-full cursor-pointer hover:-translate-y-1"
            >
              <Image src={`/${icon}.png`} alt={icon} width={20} height={20} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
