export default function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-[#ffd700] text-3xl sm:text-4xl md:text-5xl font-black">{value}</p>
      <p className="mt-1 sm:mt-2 text-sm sm:text-base md:text-lg">{label}</p>
    </div>
  )
}
