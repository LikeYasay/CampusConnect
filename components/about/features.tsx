"use client"

export default function Feature({
  id,
  title,
  icon,
  text,
}: {
  id: string
  title: string
  icon: React.ReactNode
  text: string
}) {
  return (
    <div
      id={id}
      className="group relative w-full max-w-[360px] text-center rounded-xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10 hover:border-[#8a252c]/30 ring-1 ring-transparent hover:ring-[#ffd700]/40"
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#8a252c] transition-colors group-hover:bg-[#731a21]">
        {icon}
      </div>

      <h3 className="mt-4 text-xl sm:text-2xl font-bold text-[#8a252c]">{title}</h3>
      <p className="mt-2 text-base sm:text-lg text-black/80">{text}</p>
    </div>
  )
}
