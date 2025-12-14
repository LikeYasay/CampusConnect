import Feature from "./features";

export default function FeatureSection() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-[#8a252c] text-2xl sm:text-3xl md:text-5xl font-black">
          Why Choose CIT-U Campus Connect?
        </h2>

        <p className="mt-3 text-center text-base sm:text-lg md:text-xl text-black/90 max-w-3xl mx-auto">
          Your one-stop platform for staying connected with the CIT-U community.
        </p>

        <div className="mt-8 sm:mt-10 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          <Feature
            id="lost-found"
            title="Lost & Found System"
            icon={
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path
                  d="M20.6667 18.6667H19.6133L19.24 18.3067C20.5467 16.7867 21.3333 14.8133 21.3333 12.6667C21.3333 7.88 17.4533 4 12.6667 4C7.88 4 4 7.88 4 12.6667C4 17.4533 7.88 21.3333 12.6667 21.3333C14.8133 21.3333 16.7867 20.5467 18.3067 19.24L18.6667 19.6133V20.6667L25.3333 27.32L27.32 25.3333L20.6667 18.6667Z"
                  fill="#FFD700"
                />
              </svg>
            }
            text="Quickly report lost items or browse found items with detailed descriptions, photos, and location information."
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
            text="Connect with fellow Wildcats, ask questions, share experiences, and build lasting friendships."
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
            text="Get instant alerts when your lost item is found or when someone responds to your forum posts."
          />
        </div>
      </div>
    </section>
  )
}
