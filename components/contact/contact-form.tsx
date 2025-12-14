"use client"

export default function ContactForm() {
  return (
    <div className="bg-white border border-gray-200 hover:border-[#8A252C] transition-all duration-300 rounded-2xl shadow-lg p-10 w-full md:w-[600px] transform hover:-translate-y-1 hover:shadow-xl">
      <h2 className="text-[#8A252C] text-3xl font-bold mb-8 text-center">Send Us a Message</h2>

      <form className="flex flex-col gap-6">
        {[
          { id: "name", label: "Full Name", type: "text", placeholder: "Enter your full name" },
          { id: "email", label: "Email Address", type: "email", placeholder: "example@cit.edu" },
          { id: "subject", label: "Subject", type: "text", placeholder: "Enter subject" },
        ].map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-semibold text-gray-700 mb-2">
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
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
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
  )
}
