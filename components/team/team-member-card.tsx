import Image from "next/image"

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  skills: string[]
  skillBgColor: string
  skillTextColor: string
}

export function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="bg-white border-2 border-gray-300 hover:border-[#8a252c] rounded-xl shadow-md p-6 w-full md:w-[360px] transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
      <div className="flex justify-center">
        <Image
          src={member.image || "/placeholder.svg"}
          alt={member.name}
          width={120}
          height={120}
          className="w-[120px] h-[120px] rounded-full border-4 border-[#ffffff] object-cover"
        />
      </div>
      <h3 className="text-[#8a252c] text-2xl font-bold mt-4">{member.name}</h3>
      <div className="bg-[#ffd700] rounded-lg inline-block px-4 py-1 mt-2">
        <p className="text-sm font-medium text-black">{member.role}</p>
      </div>
      <p className="text-gray-600 text-sm mt-4">{member.bio}</p>

      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {member.skills.map((skill) => (
          <span
            key={skill}
            className={`px-3 py-1 rounded-full bg-[${member.skillBgColor}] text-[${member.skillTextColor}] text-xs font-medium`}
            style={{
              backgroundColor: member.skillBgColor,
              color: member.skillTextColor,
            }}
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <div className="bg-[#ffffff] p-2 rounded-lg cursor-pointer">
          <Image src="/linkedin.png" alt="LinkedIn" width={20} height={20} />
        </div>
        <div className="bg-[#ffffff] p-2 rounded-lg cursor-pointer">
          <Image src="/github.png" alt="GitHub" width={20} height={20} />
        </div>
      </div>
    </div>
  )
}
