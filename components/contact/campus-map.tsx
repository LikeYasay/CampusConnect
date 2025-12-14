"use client"

export default function CampusMap() {
  return (
    <section className="text-center mt-10">
      <h2 className="text-[#8A252C] text-4xl font-bold mb-2">
        Visit <span className="text-[#FFD700]">Our Campus</span>
      </h2>
      <p className="text-gray-600 text-lg mb-6">Drop by our campus located in the heart of Cebu City</p>

      <div className="w-full h-[400px] relative rounded-2xl overflow-hidden shadow-lg border-t-4 border-[#8A252C]">
        <iframe
          title="CIT-U Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.1212685862667!2d123.87928647478691!3d10.296139189855038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a99924ab132df9%3A0x8c5c2b7b1dcdf46d!2sCebu%20Institute%20of%20Technology%20-%20University!5e0!3m2!1sen!2sph!4v1709453567198!5m2!1sen!2sph"
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="flex justify-center mt-6">
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=Cebu+Institute+of+Technology+University"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#8A252C] hover:bg-[#731F25] text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:-translate-y-1 transition-all duration-300"
        >
          📍 Get Directions
        </a>
      </div>
    </section>
  )
}
