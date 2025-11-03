"use client";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#fafafa] to-[#f8f9fa] flex flex-col">
      {/* Hero Section */}
      <div className="relative w-full h-[420px] overflow-hidden">
        <Image
          src="/CIT_GLE-POV.jpg"
          alt="CIT_GLE-POV"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10">
          <h1 className="text-6xl md:text-7xl font-black drop-shadow-lg">
            Get in <span className="text-[#FFD700]">Touch</span> with{" "}
            <span className="text-[#8A252C]">Us</span>
          </h1>
          <p className="text-lg md:text-2xl mt-3 drop-shadow-md max-w-2xl">
            We’d love to hear from you — whether it’s feedback, inquiries, or
            partnership opportunities.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <section className="flex flex-col md:flex-row justify-center gap-10 py-20 px-6 md:px-20">
        {/* Left - Contact Form */}
        <div className="bg-white border border-gray-200 hover:border-[#8A252C] transition-all duration-300 rounded-2xl shadow-lg p-10 w-full md:w-[600px] transform hover:-translate-y-1 hover:shadow-xl">
          <h2 className="text-[#8A252C] text-3xl font-bold mb-8 text-center">
            Send Us a Message
          </h2>

          <form className="flex flex-col gap-6">
            {[
              { id: "name", label: "Full Name", type: "text", placeholder: "Enter your full name" },
              { id: "email", label: "Email Address", type: "email", placeholder: "example@cit.edu" },
              { id: "subject", label: "Subject", type: "text", placeholder: "Enter subject" },
            ].map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition"
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Write your message here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition"
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-[#8A252C] hover:bg-[#731F25] text-white font-bold py-3 rounded-lg transition-transform transform hover:-translate-y-1 hover:shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right - Contact Info (smaller and compact) */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200 p-8 w-full md:w-[340px] flex flex-col justify-start hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <h2 className="text-[#8A252C] text-2xl font-bold mb-6 text-center">
            Contact Information
          </h2>

          <div className="space-y-6 text-gray-700 text-sm">
            {/* Address */}
            <div className="flex items-start gap-3">
              <div className="bg-[#FFD700]/20 p-2 rounded-full flex items-center justify-center">
                <Image src="/location.png" alt="Location" width={20} height={20} />
              </div>
              <p>
                <span className="font-semibold text-[#8A252C]">CIT-U Campus:</span> <br />
                N. Bacalso Ave, Cebu City, Philippines 6000
              </p>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <div className="bg-[#FFD700]/20 p-2 rounded-full flex items-center justify-center">
                <Image src="/mail.png" alt="Email" width={20} height={20} />
              </div>
              <p>
                <span className="font-semibold text-[#8A252C]">Email Us:</span> <br />
                info@cit.edu
              </p>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <div className="bg-[#FFD700]/20 p-2 rounded-full flex items-center justify-center">
                <Image src="/phone.png" alt="Phone" width={20} height={20} />
              </div>
              <p>
                <span className="font-semibold text-[#8A252C]">Call Us:</span> <br />
                +63 32 411 2000 (trunkline)
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-200 pt-6">
            <p className="text-center text-gray-500 mb-3 text-sm">
              Connect with us on social media
            </p>
            <div className="flex justify-center gap-4">
              {["facebook", "instagram"].map((icon) => (
                <div
                  key={icon}
                  className="bg-[#8A252C] hover:bg-[#FFD700] transition-all duration-300 p-3 rounded-full cursor-pointer hover:-translate-y-1"
                >
                  <Image src={`/${icon}.png`} alt={icon} width={20} height={20} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="text-center mt-10">
        <h2 className="text-[#8A252C] text-4xl font-bold mb-2">
          Visit <span className="text-[#FFD700]">Our Campus</span>
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          Drop by our campus located in the heart of Cebu City
        </p>

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
      <br />
    </div>
  );
}
