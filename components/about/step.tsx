export default function Step({ n, title, text }: { n: number; title: string; text: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto grid h-14 w-14 sm:h-16 sm:w-16 place-items-center rounded-full bg-[#ffd700] shadow">
        <span className="text-xl sm:text-2xl font-black text-[#8a252c]">{n}</span>
      </div>

      <h4 className="mt-3 text-xl sm:text-2xl font-bold text-[#8a252c]">{title}</h4>
      <p className="mt-2 text-base sm:text-lg text-black/80">{text}</p>
    </div>
  )
}
