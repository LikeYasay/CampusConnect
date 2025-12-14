import { TeamMemberCard } from "./team-member-card"

const TEAM_MEMBERS = [
  {
    name: "Lichael Yashua Ursulo",
    role: "Front End Developer",
    bio: "Specializes in React, Vue.js, and modern CSS frameworks. Creates beautiful, responsive user interfaces that provide exceptional user experiences.",
    image: "/nega.jpeg",
    skills: ["React", "Vue.js", "TypeScript", "Tailwind CSS"],
    skillBgColor: "#e8f5e8",
    skillTextColor: "#2d5016",
  },
  {
    name: "Jay Yan Tiongzon",
    role: "Back End Developer",
    bio: "Expert in Node.js, Python, and database architecture. Builds robust, scalable server-side applications and APIs that power our platform.",
    image: "/nega.jpeg",
    skills: ["Node.js", "Python", "MongoDB", "PostgreSQL"],
    skillBgColor: "#d1ecf1",
    skillTextColor: "#0c5460",
  },
  {
    name: "Treasure Louise Abadinas",
    role: "UI/UX Designer",
    bio: "Creates intuitive and engaging user experiences through thoughtful design. Specializes in user research, wireframing, and visual design systems.",
    image: "/nega.jpeg",
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
    skillBgColor: "#ffe4e1",
    skillTextColor: "#8a252c",
  },
]

export function TeamGrid() {
  return (
    <section className="text-center mt-16">
      <h2 className="text-[#8a252c] text-4xl md:text-5xl font-black">Our Development Team</h2>
      <p className="text-gray-700 text-lg mt-3 max-w-2xl mx-auto">
        Meet the passionate developers who bring Campus Connect to life with their expertise and dedication.
      </p>

      <div className="mt-10 flex flex-col md:flex-row justify-center gap-8 px-6">
        {TEAM_MEMBERS.map((member) => (
          <TeamMemberCard key={member.name} member={member} />
        ))}
      </div>
    </section>
  )
}
