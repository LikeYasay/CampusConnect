"use client"
import ActionCard from "./action-card"

export default function ActionCardsSection() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <ActionCard title="Find Lost Items" subtitle="Search reported items" link="/lost-and-found" icon="🔍" />

      <ActionCard title="Start Discussion" subtitle="Connect with students" link="/forum/create-discussion" icon="💬" />

      <ActionCard title="Report an Item" subtitle="Help find belongings" link="/lost-and-found/report" icon="📢" />
    </div>
  )
}
