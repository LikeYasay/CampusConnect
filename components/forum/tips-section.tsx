import { MessageSquare, BookOpen, HeartHandshake } from "lucide-react";

export function TipsSection() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-200 py-24">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#8A252C] mb-4">
            Tips for Better Discussions
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Help us maintain a productive and welcoming environment for everyone by following these simple guidelines.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: MessageSquare, 
              title: "Engage Thoughtfully", 
              text: "Contribute meaningfully to conversations. Respect diverse opinions and avoid low-effort responses." 
            },
            { 
              icon: BookOpen, 
              title: "Stay On-Topic", 
              text: "Keep discussions focused and clear. If you have a new question, please start a new thread." 
            },
            { 
              icon: HeartHandshake, 
              title: "Be Supportive", 
              text: "Build a helpful, inclusive community. Offer guidance to newcomers and report harmful content." 
            },
          ].map((tip, i) => (
            <div 
              key={i} 
              className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out text-center"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 bg-[#FFF9C4] rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner">
                <tip.icon className="w-8 h-8 text-[#8A252C]" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#8A252C] transition-colors">
                {tip.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {tip.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}