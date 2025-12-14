"use client"
import Link from "next/link"

export default function ActionCard({
  title,
  subtitle,
  icon,
  link,
}: {
  title: string
  subtitle: string
  icon: string
  link: string
}) {
  return (
    <Link href={link} className="block w-full h-full group">
      <div className="h-full bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-2xl hover:border-[#8A252C]/40 transition-all duration-300 cursor-pointer flex flex-col items-center text-center hover:-translate-y-2">
        <div className="w-28 h-28 bg-gradient-to-br from-[#FFF9C4] via-[#FFEB99] to-[#FFE082] rounded-3xl flex items-center justify-center text-6xl mb-6 group-hover:scale-125 transition-transform duration-300 shadow-xl group-hover:shadow-2xl">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#8A252C] transition-colors mb-2">{title}</h3>
        <p className="text-gray-500 text-base font-medium leading-relaxed">{subtitle}</p>
        <div className="mt-5 flex items-center gap-1.5 text-[#8A252C] font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
          Explore <span className="text-lg">→</span>
        </div>
      </div>
    </Link>
  )
}
