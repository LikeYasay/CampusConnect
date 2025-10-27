import Image from "next/image";
import Link from "next/link";
import Testimonials from "./Testimonials";

export default function Landing() {
  return (
    <main className="flex flex-col">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[60vh] md:h-[520px] flex items-center justify-center text-center">
        {/* Background image fills safely, crops only when needed for very small screens */}
        <Image
          src="/CIT-LIB.jpg"
          alt="CIT-U Library"
          fill
          className="object-cover -z-20"
          priority
        />

        {/* soft black overlay for readability */}
        <div className="absolute inset-0 bg-black/45 -z-10" />

        <div className="px-4 sm:px-6">
          <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-wide drop-shadow-md">
            CIT-U CAMPUS CONNECT
          </h1>

          <p className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold mt-3">
            <span className="text-[#8a252c]">FIND.</span>{" "}
            <span className="text-[#ffd700]">CONNECT.</span>{" "}
            <span className="text-white">SHARE.</span>
          </p>

          <p className="text-white/95 text-base sm:text-lg md:text-xl mt-3 sm:mt-4 max-w-3xl mx-auto">
            Your all-in-one hub for lost &amp; found and student forums.
          </p>

          <div className="mt-5 sm:mt-6 flex flex-wrap justify-center gap-3 sm:gap-4">
            <button className="bg-[#ffd700] text-black font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow hover:opacity-90">
              FIND LOST ITEMS
            </button>
            <button className="bg-[#ffd700] text-black font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow hover:opacity-90">
              START A DISCUSSION
            </button>
            <button className="bg-[#ffd700] text-black font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow hover:opacity-90">
              REPORT AN ITEM
            </button>
          </div>
        </div>
      </section>

      {/* ===== NUMBERS ===== */}
      <section className="bg-[#8a252c] py-10 sm:py-14 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl sm:text-3xl md:text-5xl font-bold">
            Campus Connect by the Numbers
          </h2>
          <div className="mt-8 sm:mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 text-center">
            <Stat value="1,247" label="Items Reported Lost" />
            <Stat value="892" label="Items Successfully Found" />
            <Stat value="3,456" label="Forum Discussions" />
            <Stat value="2,134" label="Active Students" />
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE ===== */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-[#8a252c] text-2xl sm:text-3xl md:text-5xl font-black">
            Why Choose CIT-U Campus Connect?
          </h2>
          <p className="mt-3 text-center text-base sm:text-lg md:text-xl text-black/90 max-w-3xl mx-auto">
            Your one-stop platform for staying connected with the CIT-U community. Find what you&apos;ve lost,
            help others, and engage in meaningful discussions.
          </p>

          <div className="mt-8 sm:mt-10 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center items-stretch">
            <Feature
              id="lost-found"
              title="Lost &amp; Found System"
              icon={
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M20.6667 18.6667H19.6133L19.24 18.3067C20.5467 16.7867 21.3333 14.8133 21.3333 12.6667C21.3333 7.88 17.4533 4 12.6667 4C7.88 4 4 7.88 4 12.6667C4 17.4533 7.88 21.3333 12.6667 21.3333C14.8133 21.3333 16.7867 20.5467 18.3067 19.24L18.6667 19.6133V20.6667L25.3333 27.32L27.32 25.3333L20.6667 18.6667Z"
                    fill="#FFD700"
                  />
                </svg>
              }
              text="Quickly report lost items or browse found items with detailed descriptions, photos, and location information. Our smart matching system helps reunite you with your belongings faster."
            />
            <Feature
              id="forum"
              title="Student Forum"
              icon={
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M26.6667 2.66663H5.33341C3.86675 2.66663 2.66675 3.86663 2.66675 5.33329V21.3333C2.66675 22.8 3.86675 24 5.33341 24H24.0001L29.3334 29.3333V5.33329C29.3334 3.86663 28.1334 2.66663 26.6667 2.66663ZM24.0001 18.6666H8.00008V16H24.0001V18.6666ZM24.0001 14.6666H8.00008V12H24.0001V14.6666ZM24.0001 10.6666H8.00008V7.99996H24.0001V10.6666Z"
                    fill="#FFD700"
                  />
                </svg>
              }
              text="Connect with fellow Wildcats, ask questions, share experiences, and build lasting friendships. Join study groups, get academic help, and stay updated on campus events."
            />
            <Feature
              id="report"
              title="Real-time Notifications"
              icon={
                <svg width="30" height="30" viewBox="0 0 33 32" fill="none">
                  <path
                    d="M16.5 29.3334C18.0125 29.3334 19.25 28.1334 19.25 26.6667H13.75C13.75 28.1334 14.9875 29.3334 16.5 29.3334ZM24.75 21.3334V14.6667C24.75 10.5734 22.495 7.14671 18.5625 6.24004V5.33337C18.5625 4.22671 17.6413 3.33337 16.5 3.33337C15.3588 3.33337 14.4375 4.22671 14.4375 5.33337V6.24004C10.4913 7.14671 8.25 10.56 8.25 14.6667V21.3334L5.5 24V25.3334H27.5V24L24.75 21.3334Z"
                    fill="#FFD700"
                  />
                </svg>
              }
              text="Get instant alerts when your lost item is found, when someone responds to your forum posts, or when there are important campus updates. Stay connected and never miss a beat."
            />
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="bg-[#f8f9fa] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl sm:text-3xl md:text-5xl font-black text-[#8a252c]">
            How It Works
          </h2>
          <p className="mt-2 text-center text-base sm:text-lg md:text-xl">
            Getting started with Campus Connect is simple and straightforward
          </p>

          <div className="mt-8 sm:mt-10 grid gap-8 md:grid-cols-3">
            <Step
              n={1}
              title="Create Your Account"
              text="Sign up with your CIT-U email address to join the exclusive Wildcat community and access all features."
            />
            <Step
              n={2}
              title="Post or Browse"
              text="Report lost items, browse found items, or start discussions in the forum. Upload photos and provide detailed descriptions."
            />
            <Step
              n={3}
              title="Connect & Recover"
              text="Get matched with potential findings, connect with other students, and build meaningful relationships within the campus community."
            />
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIAL ===== */}
      <Testimonials />

      {/* ===== CTA ===== */}
      <section className="bg-[#f8f9fa] py-12 sm:py-16 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-[#8a252c]">
            Ready to Join the Community?
          </h2>
          <p className="mt-3 text-base sm:text-lg md:text-xl">
            Be part of the largest student community at CIT-U. Help others, find your lost items, and make lasting connections.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link
              href="#"
              className="rounded-xl bg-[#ffd700] px-5 sm:px-6 py-3 text-base sm:text-lg font-bold text-black shadow hover:opacity-90"
            >
              Join Community
            </Link>
            <Link
              href="#"
              className="rounded-xl border-2 border-black px-5 sm:px-6 py-2.5 sm:py-3 text-base sm:text-lg font-bold hover:bg-black hover:text-white transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <br />
    </main>
  );
}

/* ===== small reusable bits ===== */
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-[#ffd700] text-3xl sm:text-4xl md:text-5xl font-black">{value}</p>
      <p className="mt-1 sm:mt-2 text-sm sm:text-base md:text-lg">{label}</p>
    </div>
  );
}

function Feature({
  id,
  title,
  icon,
  text,
}: {
  id: string;
  title: string;
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div
      id={id}
      className="
        group relative w-full max-w-[360px] text-center
        rounded-xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-sm
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10 hover:border-[#8a252c]/30
        focus-within:-translate-y-1 focus-within:shadow-lg focus-within:shadow-black/10 focus-within:border-[#8a252c]/30
        ring-1 ring-transparent hover:ring-[#ffd700]/40 focus-within:ring-[#ffd700]/40
      "
      tabIndex={0}
    >
      {/* icon tile */}
      <div
        className="
          mx-auto flex h-12 w-12 items-center justify-center rounded-xl
          bg-[#8a252c] transition-colors duration-300
          group-hover:bg-[#731a21] group-focus-within:bg-[#731a21]
        "
      >
        {icon}
      </div>

      <h3 className="mt-4 text-xl sm:text-2xl font-bold text-[#8a252c]">{title}</h3>
      <p className="mt-2 text-base sm:text-lg text-black/80">{text}</p>

      {/* subtle gold glow at bottom on hover */}
      <span
        className="
          pointer-events-none absolute inset-x-6 -bottom-2 h-2 rounded-full opacity-0 blur-sm transition-opacity duration-300
          group-hover:opacity-100 group-focus-within:opacity-100
        "
      />
    </div>
  );
}


function Step({ n, title, text }: { n: number; title: string; text: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto grid h-14 w-14 sm:h-16 sm:w-16 place-items-center rounded-full bg-[#ffd700] shadow">
        <span className="text-xl sm:text-2xl font-black text-[#8a252c]">{n}</span>
      </div>
      <h4 className="mt-3 text-xl sm:text-2xl font-bold text-[#8a252c]">{title}</h4>
      <p className="mt-2 text-base sm:text-lg text-black/80">{text}</p>
    </div>
  );
}
