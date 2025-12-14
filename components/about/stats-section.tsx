import Stat from "./stat"

export default function StatsSection() {
  return (
    <section className="bg-[#8a252c] py-10 sm:py-14 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-2xl sm:text-3xl md:text-5xl font-bold">Campus Connect by the Numbers</h2>

        <div className="mt-8 sm:mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 text-center">
          <Stat value="1,247" label="Items Reported Lost" />
          <Stat value="892" label="Items Successfully Found" />
          <Stat value="3,456" label="Forum Discussions" />
          <Stat value="2,134" label="Active Students" />
        </div>
      </div>
    </section>
  )
}
