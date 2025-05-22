"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const team = [
  {
    name: "Alex Morgan",
    role: "Lead Developer",
    bio: "Full-stack developer with expertise in React, Node.js, and cloud architecture.",
    avatar: "/placeholder.svg?height=100&width=100&query=person",
    skills: ["React", "Node.js", "AWS", "TypeScript"],
  },
  {
    name: "Jamie Smith",
    role: "UI/UX Designer",
    bio: "Designer focused on creating intuitive and beautiful user experiences.",
    avatar: "/placeholder.svg?height=100&width=100&query=person",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
  },
  {
    name: "Taylor Johnson",
    role: "Product Manager",
    bio: "Strategic product manager with a background in user-centered design and agile methodologies.",
    avatar: "/placeholder.svg?height=100&width=100&query=person",
    skills: ["Agile", "Product Strategy", "User Stories", "Roadmapping"],
  },
  {
    name: "Jordan Lee",
    role: "Mobile Developer",
    bio: "Mobile specialist with experience in React Native and native iOS/Android development.",
    avatar: "/placeholder.svg?height=100&width=100&query=person",
    skills: ["React Native", "Swift", "Kotlin", "Firebase"],
  },
]

export default function TeamSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Meet Our Team</h2>
          <p className="mt-4 text-lg text-muted-foreground">The talented people behind our successful projects</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
