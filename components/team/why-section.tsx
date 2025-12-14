import { ValueCard } from "./value-card"

const VALUES = [
  {
    icon: "😊",
    title: "User-Centered Design",
    description:
      "We prioritize user experience in every decision, ensuring our platform is intuitive and accessible for all students.",
  },
  {
    icon: "⭐",
    title: "Quality First",
    description:
      "We maintain high standards in code quality, performance, and reliability to deliver the best possible experience.",
  },
  {
    icon: "🤝",
    title: "Community Impact",
    description:
      "Our goal is to strengthen campus connections and help students succeed through better communication and collaboration.",
  },
]

export function WhySection() {
  return (
    <section className="bg-[#f8f9fa] text-center py-16 mt-20">
      <h2 id="why-we-built" className="text-[#8a252c] text-4xl md:text-5xl font-bold">
        Why We Built Campus Connect
      </h2>
      <p className="text-gray-600 text-lg mt-4 max-w-3xl mx-auto">
        Our team is passionate about creating technology that brings people together and solves real problems in the
        campus community.
      </p>

      <div className="flex flex-col md:flex-row justify-center gap-8 mt-12 px-6">
        {VALUES.map((value) => (
          <ValueCard key={value.title} {...value} />
        ))}
      </div>
    </section>
  )
}
