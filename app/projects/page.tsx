"use client"

import { motion } from "framer-motion"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ProjectCard from "@/components/ProjectCard"

export default function ProjectsPage() {
  const projects = [
    {
      title: "Productivity App",
      description: "A task management application with calendar integration and productivity analytics.",
      image: "/productivity-app-interface.png",
      tags: ["React", "TypeScript", "Firebase"],
      link: "/projects/productivity",
    },
    {
      title: "Meditation App",
      description: "A mindfulness and meditation app with guided sessions and progress tracking.",
      image: "/meditation-app-interface.png",
      tags: ["React Native", "Redux", "Node.js"],
      link: "/projects/meditation",
    },
    {
      title: "Color Palette Tool",
      description: "A design tool for creating and exploring color palettes for digital projects.",
      image: "/color-palette-tool.png",
      tags: ["JavaScript", "Canvas API", "CSS Variables"],
      link: "/projects/palette",
    },
    {
      title: "Typography Tool",
      description: "An interactive tool for testing and comparing typography options for web design.",
      image: "/typography-tool-interface.png",
      tags: ["Vue.js", "SCSS", "Web Fonts API"],
      link: "/projects/typography",
    },
  ]

  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <section className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-4">My Projects</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A collection of my recent work across web development, mobile applications, and design tools.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  imageSrc={project.image}
                  tags={project.tags}
                  href={project.link}
                />
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
