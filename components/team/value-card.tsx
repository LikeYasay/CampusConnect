interface ValueCardProps {
  icon: string
  title: string
  description: string
}

export function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-8 w-full md:w-[360px]">
      <div className="bg-[#8a252c] rounded-xl w-14 h-14 flex items-center justify-center mx-auto mb-4">
        <span className="text-[#8a252c] text-2xl">{icon}</span>
      </div>
      <h3 className="text-[#8a252c] text-xl font-bold">{title}</h3>
      <p className="text-gray-600 text-sm mt-3">{description}</p>
    </div>
  )
}
