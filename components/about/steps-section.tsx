import Step from "./step"

export default function StepsSection() {
  return (
    <section className="bg-[#f8f9fa] py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-2xl sm:text-3xl md:text-5xl font-black text-[#8a252c]">How It Works</h2>

        <p className="mt-2 text-center text-base sm:text-lg md:text-xl">
          Getting started is simple and straightforward
        </p>

        <div className="mt-8 sm:mt-10 grid gap-8 md:grid-cols-3">
          <Step n={1} title="Create Your Account" text="Sign up with your CIT-U email address to join the community." />
          <Step n={2} title="Post or Browse" text="Report lost items, browse found items, or start discussions." />
          <Step n={3} title="Connect & Recover" text="Get matched with findings and build meaningful relationships." />
        </div>
      </div>
    </section>
  )
}
