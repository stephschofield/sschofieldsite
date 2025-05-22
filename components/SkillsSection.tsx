"use client"

import { motion } from "framer-motion"

export default function SkillsSection() {
  const skills = [
    { name: "UI/UX Design", level: 90 },
    { name: "Web Development", level: 85 },
    { name: "Branding", level: 95 },
    { name: "Typography", level: 80 },
    { name: "Motion Design", level: 75 },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Skills & Expertise</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Specialized in creating minimal, elegant designs with attention to detail
          </p>
        </motion.div>

        <div className="space-y-8">
          {skills.map((skill, index) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">{skill.name}</span>
                <span className="text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
