"use client"

interface Props {
  stats: { value: string; label: string; color: string }[]
}

export default function StatsSection({ stats }: Props) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 overflow-hidden">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="group p-6 text-center border-b md:border-b-0 border-r border-gray-100 last:border-r-0 hover:bg-white transition-colors duration-300"
          >
            <p className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-1 transition-transform duration-300 group-hover:-translate-y-1 ${stat.color}`}>
              {stat.value}
            </p>
            <p className="text-[11px] md:text-xs text-gray-500 uppercase tracking-widest font-bold">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}