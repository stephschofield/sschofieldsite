"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ProjectCard } from "@/components/ProjectCard"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { projects, type Project } from "@/lib/projects-data"

export default function ProjectsPage() {
  const [loadedProjects, setLoadedProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Load projects
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setLoadedProjects(projects)
      setFilteredProjects(projects)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filter projects based on search query
  useEffect(() => {
    const filtered = loadedProjects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesSearch
    })

    setFilteredProjects(filtered)
  }, [searchQuery, loadedProjects])

  // Handle project click
  const handleProjectClick = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer")
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <motion.section className="py-16 px-4 md:px-8" initial="hidden" animate="visible" variants={containerVariants}>
          <div className="container mx-auto">
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">My Projects</h1>
              <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                A showcase of my recent work including data platforms, fitness applications, and custom websites.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search projects..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              {/* Loading state */}
              {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-[350px] rounded-lg bg-muted animate-pulse"></div>
                  ))}
                </div>
              )}

              {/* Projects grid */}
              {!isLoading && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onClick={() => handleProjectClick(project.link)}
                      />
                    ))}
                  </div>

                  {/* Empty state */}
                  {filteredProjects.length === 0 && (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium">No projects found</h3>
                      <p className="text-muted-foreground mt-2">Try a different search term</p>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}
