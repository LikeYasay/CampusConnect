"use client"

export default function Badge({ color, label }: { color: string; label: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 ${color} shadow-sm hover:shadow-md`}
    >
      {label}
    </span>
  )
}
